// =================================================================================
// PHẦN JAVASCRIPT - ĐÃ TÁI CẤU TRÚC VÀ THÊM TÍNH NĂNG GEMINI
// =================================================================================
document.addEventListener('DOMContentLoaded', function() {
        
    // --- DỮ LIỆU MENU (GIỮ NGUYÊN) ---
    const leftMenuData = [
        {
            title: 'ADMIN',
            items: [ { id: 'btnADMIN', text: 'QUẢN TRỊ HỆ THỐNG', icon: 'fa-solid fa-sliders', isDropdown: true, isAdmin: true, 
                subItems: [ { id: 'btnDatabase', text: 'DATABASE', pageUrl: '#', pageTitle: 'QUẢN LÝ DỮ LIỆU', icon: 'fa-solid fa-database' }, ]
              } ]
        },
        {
            title: 'Công cụ AI',
            items: [ { id: 'btnGemini', text: 'Trợ lý Gemini', icon: 'fa-solid fa-wand-magic-sparkles', pageUrl: '#', pageTitle: 'TRỢ LÝ GEMINI', } ]
        },
        // ... các menu khác
    ];
    const rightMenuData = [ /* ... */ ];

    // --- DOM ELEMENTS ---
    const functionContent = document.getElementById('functionContent');
    const homePageContent = functionContent.innerHTML;
    const geminiModal = document.getElementById('geminiResultModal');
    const geminiResultContent = document.getElementById('geminiResultContent');
    const closeGeminiModalBtn = document.getElementById('closeGeminiModal');
    const copyGeminiResultBtn = document.getElementById('copyGeminiResult');
    
    // Các elements khác...
    const currentPageTitle = document.getElementById('current-page-title');
    
    // --- CÁC HÀM XỬ LÝ TÍNH NĂNG GEMINI ---

    /**
     * Gọi Gemini API để lấy gợi ý.
     * @param {string} taskTitle - Tiêu đề của công việc cần lấy gợi ý.
     */
    async function callGeminiAPI(taskTitle) {
        const apiKey = ""; // API key được cung cấp tự động
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
        
        // Prompt tiếng Việt để yêu cầu Gemini chia nhỏ công việc
        const prompt = `Với vai trò là một quản lý dự án nhiều kinh nghiệm, hãy chia nhỏ công việc có tiêu đề "${taskTitle}" thành các công việc con cụ thể, khả thi và dễ quản lý. Trình bày kết quả dưới dạng danh sách có gạch đầu dòng.`;

        const payload = {
            contents: [{
                parts: [{ text: prompt }]
            }]
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`Lỗi API: ${response.statusText}`);
            }

            const result = await response.json();
            
            if (result.candidates && result.candidates.length > 0) {
                const text = result.candidates[0].content.parts[0].text;
                // Chuyển Markdown thành HTML (đơn giản)
                const htmlResult = text
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
                    .replace(/\* (.*?)(?=\n\* |$)/g, '<li>$1</li>'); // List items
                geminiResultContent.innerHTML = `<ul>${htmlResult}</ul>`;
            } else {
               throw new Error("Không nhận được phản hồi hợp lệ từ Gemini.");
            }

        } catch (error) {
            console.error("Lỗi khi gọi Gemini API:", error);
            geminiResultContent.innerHTML = `<p style="color: var(--danger-color);">Rất tiếc, đã có lỗi xảy ra. Vui lòng thử lại sau.</p>`;
        }
    }

    /**
     * Xử lý sự kiện khi nhấn nút "Gợi ý công việc".
     * @param {Event} event - Sự kiện click.
     */
    function handleGeminiSuggestClick(event) {
        const button = event.target;
        const card = button.closest('.notification-card');
        const titleElement = card.querySelector('h4');
        const taskTitle = titleElement.textContent.trim();

        // Hiển thị modal và trạng thái loading
        geminiResultContent.innerHTML = '<p>Đang lấy gợi ý, vui lòng chờ...</p>';
        geminiModal.style.display = 'flex';
        
        // Gọi API
        callGeminiAPI(taskTitle);
    }

    // Gán sự kiện cho các nút gợi ý
    function addGeminiEventListeners() {
        const suggestButtons = document.querySelectorAll('.gemini-suggest-btn');
        suggestButtons.forEach(button => {
            button.addEventListener('click', handleGeminiSuggestClick);
        });
    }
    
    // Đóng modal
    closeGeminiModalBtn.addEventListener('click', () => {
        geminiModal.style.display = 'none';
    });

    // Sao chép kết quả
    copyGeminiResultBtn.addEventListener('click', () => {
        const textToCopy = geminiResultContent.innerText;
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert('Đã sao chép vào clipboard!');
        }).catch(err => {
            console.error('Không thể sao chép: ', err);
            // Fallback for older browsers
            const textArea = document.createElement("textarea");
            textArea.value = textToCopy;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                alert('Đã sao chép vào clipboard!');
            } catch (err) {
                alert('Lỗi khi sao chép.');
            }
            document.body.removeChild(textArea);
        });
    });
    
    // --- CÁC HÀM HIỂN THỊ VÀ LOGIC CŨ (Đã được rút gọn) ---
    function loadContent(pageTitle) {
        currentPageTitle.textContent = pageTitle;
        if (pageTitle === 'TRANG CHỦ - THÔNG BÁO') {
            functionContent.innerHTML = homePageContent;
            addGeminiEventListeners(); // Gán lại sự kiện sau khi tải lại nội dung
        } else {
            functionContent.innerHTML = `<h2 style="text-align:center; margin-top: 50px;">Nội dung trang ${pageTitle}</h2>`;
        }
    }
    
    // Gọi hàm render các menu và gán sự kiện ban đầu
    // renderLeftMenu(); 
    // renderRightMenu();
    addGeminiEventListeners();

    document.getElementById('btnGoHomeHeader').addEventListener('click', () => loadContent('TRANG CHỦ - THÔNG BÁO'));
    
    // Logic cho đồng hồ, sidebar, modals khác... (giữ nguyên)
    // ...
});

