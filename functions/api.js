import { google } from 'googleapis';
import jwt from 'jsonwebtoken';

// =================================================================
// CẤU HÌNH & HÀM TIỆN ÍCH
// =================================================================

// Hàm lấy thông tin xác thực Google từ biến môi trường
async function getGoogleAuth(env) {
  const authInfo = JSON.parse(env.GOOGLE_SERVICE_ACCOUNT_KEY);
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: authInfo.client_email,
      private_key: authInfo.private_key.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}

// Hàm xử lý lỗi chuẩn
function handleError(error, message = 'Lỗi máy chủ nội bộ', status = 500) {
  console.error(message, error);
  return new Response(JSON.stringify({ success: false, message: message, error: error.message }), {
    status: status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// Hàm tạo phản hồi thành công chuẩn
function handleSuccess(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status: status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// Hàm middleware để xác thực token JWT
async function authenticate(request, env) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { error: 'Token không được cung cấp hoặc không hợp lệ', status: 401 };
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    return { user: decoded };
  } catch (err) {
    return { error: 'Token không hợp lệ hoặc đã hết hạn', status: 401 };
  }
}


// =================================================================
// HÀM XỬ LÝ LOGIC CHÍNH (TƯƠNG ĐƯƠNG Code.gs)
// =================================================================

// --- Logic xác thực người dùng ---
async function handleLogin(request, env) {
    const { username, password } = await request.json();
    if (!username || !password) {
        return handleSuccess({ success: false, message: 'Vui lòng nhập tên đăng nhập và mật khẩu.' });
    }

    const auth = await getGoogleAuth(env);
    const sheets = google.sheets({ version: 'v4', auth });
    
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: '1iHRNl-vYyKYM2NMNxgMc74JZTFGGHMycJt0BwH0yXBQ', // USER_DATA_SPREADSHEET_ID
        range: 'Users!A:E', // USER_SHEET_NAME
    });

    const rows = res.data.values;
    if (!rows) return handleSuccess({ success: false, message: 'Không tìm thấy dữ liệu người dùng.' });

    for (let i = 1; i < rows.length; i++) {
        const [storedUsername, storedPassword, fullName, , isAdmin] = rows[i];
        if (storedUsername === username && storedPassword === password) {
            const userPayload = { username, fullName, isAdmin: isAdmin === 'TRUE' };
            const token = jwt.sign(userPayload, env.JWT_SECRET, { expiresIn: '8h' });
            
            return handleSuccess({ success: true, message: 'Đăng nhập thành công!', token: token });
        }
    }
    return handleSuccess({ success: false, message: 'Sai tên đăng nhập hoặc mật khẩu.' });
}

async function handleRegister(request, env) {
    const { username, password, fullName, phone } = await request.json();
    if (!username || !password || !fullName || !phone) {
        return handleSuccess({ success: false, message: 'Vui lòng điền đầy đủ thông tin.' });
    }

    const auth = await getGoogleAuth(env);
    const sheets = google.sheets({ version: 'v4', auth });
    
    // Kiểm tra username tồn tại
    const checkRes = await sheets.spreadsheets.values.get({
        spreadsheetId: '1iHRNl-vYyKYM2NMNxgMc74JZTFGGHMycJt0BwH0yXBQ',
        range: 'Users!A:A',
    });

    if (checkRes.data.values) {
        const isExist = checkRes.data.values.flat().includes(username);
        if (isExist) {
            return handleSuccess({ success: false, message: 'Tên đăng nhập đã tồn tại.' });
        }
    }
    
    // Thêm người dùng mới
    await sheets.spreadsheets.values.append({
        spreadsheetId: '1iHRNl-vYyKYM2NMNxgMc74JZTFGGHMycJt0BwH0yXBQ',
        range: 'Users!A1',
        valueInputOption: 'USER_ENTERED',
        resource: {
            values: [[username, password, fullName, phone, 'FALSE']], // Mặc định không phải admin
        },
    });

    return handleSuccess({ success: true, message: 'Đăng ký thành công! Bây giờ bạn có thể đăng nhập.' });
}


// --- Logic lấy dữ liệu ---
async function getNotifications(env) {
    const auth = await getGoogleAuth(env);
    const sheets = google.sheets({ version: 'v4', auth });

    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: "1iHRNl-vYyKYM2NMNxgMc74JZTFGGHMycJt0BwH0yXBQ",
        range: "Notifications!A2:K", // Lấy từ A2 để bỏ header
    });
    
    const rows = res.data.values || [];
    const notifications = rows
        .map(row => ({
            category: row[1] || 'Nội bộ',
            title: row[2] || '',
            message: (row[3] || '').toString().replace(/\n/g, '<br>'),
            link: row[4] || '',
            type: row[5] || '',
            deadline: row[6] || '',
            updateDate: row[7] || '',
            isNew: row[8] === 'TRUE',
            icon: row[9] || 'fas fa-bell',
            isDone: row[10] === 'TRUE'
        }))
        .filter(item => item.title && !item.isDone); // Lọc các thông báo có tiêu đề và chưa hoàn thành

    return handleSuccess(notifications);
}

async function searchSupermarket(request, env) {
    const { maST } = await request.json();
    const auth = await getGoogleAuth(env);
    const sheets = google.sheets({ version: 'v4', auth });

    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: '1iHRNl-vYyKYM2NMNxgMc74JZTFGGHMycJt0BwH0yXBQ', // SPREADSHEET_ID
        range: 'DB-IT!A:J', // SHEET_SEARCH_INFO
    });

    const rows = res.data.values;
    if (!rows) return handleSuccess(null);

    const headers = rows[0];
    const foundRow = rows.slice(1).find(row => row[0] === maST);

    if (foundRow) {
        const result = {};
        headers.forEach((header, index) => {
            result[header] = foundRow[index] || 'N/A';
        });
        return handleSuccess(result);
    }
    return handleSuccess(null);
}

async function searchBackupStock(request, env) {
    const { maKho, maUser } = await request.json();
    const auth = await getGoogleAuth(env);
    const sheets = google.sheets({ version: 'v4', auth });

    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: '1Vqm7mlGZcq9iEUGEPV-dA_WR7K5SPmAjOFa9H7ZGIoM', // HANG_BK_SPREADSHEET_ID
        range: `${maKho}!A:J`, // Tìm trong sheet có tên là mã kho
    });
    
    const rows = res.data.values || [];
    const matchingRows = rows.slice(1).filter(row => row[0] === maUser).map(row => ({
        maNV: row[0] || 'N/A',
        maTaiSan: row[1] || 'N/A',
        tenTaiSan: row[2] || 'N/A',
        loaiTaiSan: row[3] || 'N/A',
        ngayNhap: row[4] || 'N/A',
        trangThai: row[6] || 'N/A',
        maKho: row[7] || 'N/A',
        tenKho: row[8] || 'N/A',
        userVaTenSoHuu: row[9] || 'N/A',
    }));
    
    return handleSuccess(matchingRows);
}


// =================================================================
// BỘ ĐỊNH TUYẾN (ROUTER)
// =================================================================
export async function onRequest(context) {
    const { request, env } = context;
    const url = new URL(request.url);
    const path = url.pathname;

    // Các route công khai, không cần xác thực
    if (path === '/api/login' && request.method === 'POST') {
        return handleLogin(request, env).catch(err => handleError(err));
    }
    if (path === '/api/register' && request.method === 'POST') {
        return handleRegister(request, env).catch(err => handleError(err));
    }

    // Từ đây, tất cả các route đều cần xác thực
    const authResult = await authenticate(request, env);
    if (authResult.error) {
        return handleError({ message: authResult.error }, authResult.error, authResult.status);
    }
    // Gắn thông tin user vào context để các hàm sau có thể sử dụng
    context.user = authResult.user;

    try {
        if (path === '/api/user-details') {
            return handleSuccess(context.user);
        }
        if (path === '/api/notifications') {
            return getNotifications(env);
        }
        if (path === '/api/search-store' && request.method === 'POST') {
            return searchSupermarket(request, env);
        }
        if (path === '/api/search-backup-stock' && request.method === 'POST') {
            return searchBackupStock(request, env);
        }

        // Nếu không có route nào khớp
        return new Response(JSON.stringify({ success: false, message: 'Endpoint không tồn tại' }), { status: 404 });

    } catch (error) {
        return handleError(error);
    }
}