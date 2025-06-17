/**
 * Chào mừng bạn đến với Pages Functions!
 * File này sẽ xử lý TẤT CẢ các yêu cầu đến "/api/*".
 * Nó hoạt động như một server thu nhỏ, chạy trên mạng lưới của Cloudflare.
 */
import { Router } from 'itty-router';
import { sign, jwtVerify } from 'jose';
import { google } from 'googleapis';

// --- Router Setup ---
// Chúng ta tạo một router mới để định tuyến các request đến đúng hàm xử lý.
const router = Router({ base: '/api' }); // Chỉ xử lý các request có tiền tố /api

// --- Security & User Authentication (D1 Database) ---

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function createSessionToken(userId, isAdmin, env) {
    const secret = new TextEncoder().encode(env.JWT_SECRET);
    const token = await new sign({ userId, isAdmin })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(secret);
    return token;
}

router.post('/register', async (request, env) => {
    try {
        const { username, password, fullName, phone } = await request.json();
        if (!username || !password || !fullName) {
            return new Response(JSON.stringify({ success: false, message: 'Thiếu thông tin bắt buộc.' }), { status: 400 });
        }
        const hashedPassword = await hashPassword(password);
        await env.DB.prepare(
            'INSERT INTO Users (username, hashed_password, full_name, phone) VALUES (?, ?, ?, ?)'
        ).bind(username.toLowerCase(), hashedPassword, fullName, phone).run();
        return new Response(JSON.stringify({ success: true, message: 'Đăng ký thành công!' }), { status: 201 });
    } catch (e) {
        if (e.message.includes('UNIQUE constraint failed')) {
             return new Response(JSON.stringify({ success: false, message: 'Tên đăng nhập đã tồn tại.' }), { status: 409 });
        }
        console.error('Registration error:', e);
        return new Response(JSON.stringify({ success: false, message: 'Lỗi hệ thống khi đăng ký.' }), { status: 500 });
    }
});

router.post('/login', async (request, env) => {
    try {
        const { username, password } = await request.json();
        if (!username || !password) {
            return new Response(JSON.stringify({ success: false, message: 'Thiếu tên đăng nhập hoặc mật khẩu.' }), { status: 400 });
        }
        const user = await env.DB.prepare('SELECT id, hashed_password, is_admin FROM Users WHERE username = ?').bind(username.toLowerCase()).first();
        if (!user) {
            return new Response(JSON.stringify({ success: false, message: 'Tên đăng nhập hoặc mật khẩu không đúng.' }), { status: 401 });
        }
        const hashedPassword = await hashPassword(password);
        if (hashedPassword !== user.hashed_password) {
            return new Response(JSON.stringify({ success: false, message: 'Tên đăng nhập hoặc mật khẩu không đúng.' }), { status: 401 });
        }
        const token = await createSessionToken(user.id, user.is_admin, env);
        return new Response(JSON.stringify({ success: true, token }), { status: 200 });
    } catch (e) {
        console.error('Login error:', e);
        return new Response(JSON.stringify({ success: false, message: 'Lỗi hệ thống khi đăng nhập.' }), { status: 500 });
    }
});

// --- Google Sheets Data Retrieval ---

async function getGoogleSheetsClient(env) {
    const credentials = JSON.parse(env.GOOGLE_API_CREDENTIALS);
    const auth = new google.auth.JWT(
        credentials.client_email,
        null,
        credentials.private_key,
        ['https://www.googleapis.com/auth/spreadsheets.readonly']
    );
    return google.sheets({ version: 'v4', auth });
}

router.get('/search/store', async (request, env) => {
    // Note: In a real app, you'd add middleware here to verify the JWT from the Authorization header.
    const storeCode = request.query.code;
    if (!storeCode) {
        return new Response(JSON.stringify({ success: false, message: 'Thiếu mã siêu thị.' }), { status: 400 });
    }
    
    try {
        const sheets = await getGoogleSheetsClient(env);
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: '1iHRNl-vYyKYM2NMNxgMc74JZTFGGHMycJt0BwH0yXBQ',
            range: 'DB-IT!A:Z',
        });
        
        const rows = response.data.values;
        if (!rows || rows.length === 0) {
            return new Response(JSON.stringify({ success: false, message: 'Không tìm thấy dữ liệu.' }), { status: 404 });
        }

        const header = rows[0];
        const data = rows.slice(1);
        const codeIndex = header.indexOf('MaST');
        if (codeIndex === -1) {
             return new Response(JSON.stringify({ success: false, message: 'Cấu trúc sheet không hợp lệ.' }), { status: 500 });
        }
        
        const normalizedInput = String(storeCode).trim().toLowerCase();
        const foundRow = data.find(row => String(row[codeIndex]).trim().toLowerCase() === normalizedInput);
        
        if (foundRow) {
            const result = header.reduce((obj, key, index) => {
                obj[key] = foundRow[index];
                return obj;
            }, {});
            return new Response(JSON.stringify({ success: true, data: result }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ success: false, message: `Không tìm thấy siêu thị với mã: ${storeCode}` }), { status: 404 });
        }
    } catch(e) {
        console.error('Google Sheets API error:', e.message);
        return new Response(JSON.stringify({ success: false, message: 'Lỗi khi truy xuất dữ liệu từ Google Sheets.' }), { status: 500 });
    }
});


// Fallback for 404s
router.all('*', () => new Response(JSON.stringify({ success: false, message: 'API route not found' }), { status: 404 }));

// --- Entrypoint ---
// This is the main function that Cloudflare Pages will run.
export async function onRequest(context) {
    // `context.env` contains bindings like secrets and D1.
    // We pass it to our router.
    return router.handle(context.request, context.env);
}
