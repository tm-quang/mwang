// =================================================================================
// PHẦN JAVASCRIPT - ĐÃ TÁI CẤU TRÚC VÀ THÊM TÍNH NĂNG GEMINI
// =================================================================================
document.addEventListener('DOMContentLoaded', function() {
        
    // --- DỮ LIỆU MENU ---
    const leftMenuData = [
        {
            title: 'ADMIN',
            items: [
              { id: 'btnADMIN', text: 'QUẢN TRỊ HỆ THỐNG', icon: 'fa-solid fa-sliders', isDropdown: true, isAdmin: true, 
                subItems: [
                    { id: 'btnDatabase', text: 'DATABASE', pageUrl: '#', pageTitle: 'QUẢN LÝ DỮ LIỆU', icon: 'fa-solid fa-database' },
                    { id: 'btnUserInfo', text: 'QUẢN LÝ USER', pageUrl: '#', pageTitle: 'QUẢN LÝ THÀNH VIÊN', icon: 'fa-solid fa-users' },
                    { id: 'btnThongBao', text: 'TẠO THÔNG BÁO MỚI', pageUrl: '#', pageTitle: 'TẠO THÔNG BÁO MỚI', icon: 'fa-regular fa-newspaper' },
                ]
              }
            ]
        },
        {
            title: '2025 - IT MTAY2',
            items: [
                { id: 'btnWorkLeader', text: 'TRIỂN KHAI IT MTAY2', icon: 'fas fa-laptop-code', isDropdown: true, 
                  subItems: [ { id: 'btnDeployMTay2', text: 'TRIỂN KHAI MIỀN TÂY 2', pageUrl: '#', pageTitle: 'TRIỂN KHAI MIỀN TÂY 2', icon: 'fas fa-map-marked-alt' } ] 
                },
                { id: 'btnBTKK', text: 'LỊCH BẢO TRÌ - KIỂM KÊ', pageUrl: '#', pageTitle: 'LỊCH BẢO TRÌ - KIỂM KÊ', icon: 'fas fa-tools' },
            ]
        }
    ];
    
    const rightMenuData = [
        {
            title: "TRANG CÔNG VIỆC",
            icon: "fas fa-briefcase",
            items: [
                { text: "Báo cáo nội bộ", href: "https://baocaonoibo.com", icon: "fas fa-chart-bar", className: "primary" },
                { text: "New Ticket", href: "https://newticket.tgdd.vn/ticket", icon: "fas fa-ticket-alt", className: "success" },
            ]
        },
        {
            title: "GIẢI TRÍ",
            icon: "fas fa-gamepad",
            items: [
                { text: "YouTube", href: "https://youtube.com", icon: "fab fa-youtube" },
                { text: "Facebook", href: "https://facebook.com", icon: "fab fa-facebook" },
            ]
        }
    ];

    // --- DOM ELEMENTS ---
    const functionContent = document.getElementById('functionContent');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const currentPageTitle = document.getElementById('current-page-title');
    const leftSidebarContainer = document.getElementById('left-sidebar-container');
    const rightSidebarContainer = document.getElementById('right-sidebar-container');
    const leftSidebarContentWrapper = leftSidebarContainer.querySelector('.sidebar-content-wrapper');
    const rightSidebarContentWrapper = rightSidebarContainer.querySelector('.sidebar-content-wrapper');
    const homePageContent = functionContent.innerHTML; // Lưu lại nội dung trang chủ
    
    // Modals
    const customConfirmModal = document.getElementById('customConfirmModal');
    const adminLoginModal = document.getElementById('adminLoginModal');
    const adminUsername = document.getElementById('adminUsername');
    const adminPassword = document.getElementById('adminPassword');
    const adminLoginError = document.getElementById('adminLoginError');
    const adminLoginSubmit = document.getElementById('adminLoginSubmit');
    const adminLoginCancel = document.getElementById('adminLoginCancel');
    const geminiModal = document.getElementById('geminiResultModal');
    const geminiResultContent = document.getElementById('geminiResultContent');
    const closeGeminiModalBtn = document.getElementById('closeGeminiModal');
    const copyGeminiResultBtn = document.getElementById('copyGeminiResult');
    
    // State & Timers
    let dropdownTimeout;
    let leftSidebarTimeout;
    let rightSidebarTimeout;
    const HIDE_DELAY = 300;
    let isAdminAuthenticated = false;

    // --- CÁC HÀM XỬ LÝ TÍNH NĂNG GEMINI ---

    async function callGeminiAPI(taskTitle) {
        const apiKey = ""; // API key được cung cấp tự động
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
        const prompt = `Với vai trò là một quản lý dự án nhiều kinh nghiệm, hãy chia nhỏ công việc có tiêu đề "${taskTitle}" thành các công việc con cụ thể, khả thi và dễ quản lý. Trình bày kết quả dưới dạng danh sách có gạch đầu dòng.`;
        const payload = { contents: [{ parts: [{ text: prompt }] }] };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!response.ok) throw new Error(`Lỗi API: ${response.statusText}`);
            const result = await response.json();
            if (result.candidates && result.candidates.length > 0) {
                const text = result.candidates[0].content.parts[0].text;
                const htmlResult = text
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\* (.*?)(?=\n\* |$)/g, '<li>$1</li>');
                geminiResultContent.innerHTML = `<ul>${htmlResult}</ul>`;
            } else {
               throw new Error("Không nhận được phản hồi hợp lệ từ Gemini.");
            }
        } catch (error) {
            console.error("Lỗi khi gọi Gemini API:", error);
            geminiResultContent.innerHTML = `<p style="color: var(--danger-color);">Rất tiếc, đã có lỗi xảy ra. Vui lòng thử lại sau.</p>`;
        }
    }

    function handleGeminiSuggestClick(event) {
        const button = event.target;
        const card = button.closest('.notification-card');
        const titleElement = card.querySelector('h4');
        const taskTitle = titleElement.textContent.trim();
        geminiResultContent.innerHTML = '<p>Đang lấy gợi ý, vui lòng chờ...</p>';
        geminiModal.style.display = 'flex';
        callGeminiAPI(taskTitle);
    }

    function addGeminiEventListeners() {
        document.querySelectorAll('.gemini-suggest-btn').forEach(button => {
            button.addEventListener('click', handleGeminiSuggestClick);
        });
    }
    
    closeGeminiModalBtn.addEventListener('click', () => geminiModal.style.display = 'none');
    copyGeminiResultBtn.addEventListener('click', () => {
        const textToCopy = geminiResultContent.innerText;
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert('Đã sao chép vào clipboard!');
        }).catch(err => {
            console.error('Không thể sao chép: ', err);
            alert('Lỗi khi sao chép.');
        });
    });
    
    // --- CÁC HÀM HIỂN THỊ VÀ LOGIC CHÍNH ---

    function loadContent(pageTitle) {
        hideAllDropdowns();
        collapseSidebar(leftSidebarContainer);
        functionContent.innerHTML = '';
        loadingSpinner.style.display = 'block';
        currentPageTitle.textContent = pageTitle;
        setTimeout(() => {
            loadingSpinner.style.display = 'none';
            if (pageTitle === 'TRANG CHỦ - THÔNG BÁO') {
                functionContent.innerHTML = homePageContent;
                addGeminiEventListeners();
            } else {
                functionContent.innerHTML = `<div style="text-align: center; padding: 50px; color: var(--text-secondary);"><i class="fas fa-info-circle" style="font-size: 3rem; margin-bottom: 1rem;"></i><h2>Trang "${pageTitle}"</h2><p>Nội dung cho trang này sẽ được tạo ở các bước tiếp theo.</p></div>`;
            }
        }, 300);
    }

    function renderLeftMenu() {
        leftSidebarContentWrapper.innerHTML = '';
        leftMenuData.forEach((section) => {
            const sectionDiv = document.createElement('div');
            sectionDiv.className = 'menu-section';
            sectionDiv.innerHTML = `<h3 class="menu-section-title"><span>${section.title}</span></h3>`;
            const menuItemsContainer = document.createElement('div');
            
            section.items.forEach(item => {
                const createMenuButton = (menuItem) => {
                    const button = document.createElement('a');
                    button.href = menuItem.pageUrl || '#';
                    button.id = menuItem.id;
                    button.className = `menu-button-sidebar`;
                    button.innerHTML = `<i class="${menuItem.icon} icon"></i><span>${menuItem.text}</span>`;
                    button.addEventListener('click', (e) => {
                        e.preventDefault();
                        loadContent(menuItem.pageTitle);
                    });
                    return button;
                };

                if (item.isDropdown) {
                    const dropdownDiv = document.createElement('div');
                    dropdownDiv.className = 'dropdown';
                    const dropdownButton = document.createElement('div');
                    dropdownButton.className = 'dropdown-button';
                    dropdownButton.innerHTML = `<i class="${item.icon} icon"></i><span>${item.text}</span>`;
                    const dropdownMenu = document.createElement('div');
                    dropdownMenu.className = 'dropdown-menu';
                    item.subItems.forEach(subItem => dropdownMenu.appendChild(createMenuButton(subItem)));
                    dropdownDiv.append(dropdownButton, dropdownMenu);
                    menuItemsContainer.appendChild(dropdownDiv);

                    const showMenu = () => {
                        clearTimeout(dropdownTimeout);
                        hideAllDropdowns();
                        const rect = dropdownButton.getBoundingClientRect();
                        const sidebarRect = leftSidebarContainer.getBoundingClientRect();
                        dropdownMenu.style.top = rect.top + 'px';
                        dropdownMenu.style.left = (sidebarRect.right + 5) + 'px';
                        dropdownMenu.classList.add('show');
                        dropdownButton.classList.add('active');
                    };

                    const hideMenu = () => { dropdownTimeout = setTimeout(() => {
                        dropdownMenu.classList.remove('show');
                        dropdownButton.classList.remove('active');
                    }, HIDE_DELAY)};
                    
                    if (item.isAdmin) {
                        dropdownButton.style.cursor = 'pointer';
                        dropdownButton.addEventListener('click', () => {
                            if (isAdminAuthenticated) showMenu();
                            else {
                                hideAllDropdowns();
                                adminLoginError.textContent = '';
                                adminLoginModal.style.display = 'flex';
                                adminUsername.focus();
                            }
                        });
                        dropdownDiv.onmouseleave = hideMenu;
                        dropdownMenu.onmouseenter = () => clearTimeout(dropdownTimeout);
                    } else {
                        dropdownButton.onmouseenter = showMenu;
                        dropdownButton.onmouseleave = hideMenu;
                        dropdownMenu.onmouseenter = () => clearTimeout(dropdownTimeout);
                        dropdownMenu.onmouseleave = hideMenu;
                    }
                } else {
                    menuItemsContainer.appendChild(createMenuButton(item));
                }
            });
            sectionDiv.appendChild(menuItemsContainer);
            leftSidebarContentWrapper.appendChild(sectionDiv);
        });
    }
    
    function renderRightMenu() {
        rightSidebarContentWrapper.innerHTML = '';
        rightMenuData.forEach(section => {
            const title = document.createElement('h3');
            title.innerHTML = `<i class="${section.icon}"></i><span>${section.title}</span>`;
            const menuSection = document.createElement('div');
            menuSection.className = 'right-menu-section';
            section.items.forEach(item => {
                const link = document.createElement('a');
                link.href = item.href;
                link.target = '_blank';
                link.className = `link-button-right ${item.className || ''}`;
                link.innerHTML = `<i class="${item.icon} icon"></i><span>${item.text}</span>`;
                menuSection.appendChild(link);
            });
            rightSidebarContentWrapper.append(title, menuSection);
        });
    }
    
    function handleAdminLogin() {
        const MOCK_USER = "admin", MOCK_PASS = "12345";
        if (adminUsername.value.trim() === MOCK_USER && adminPassword.value === MOCK_PASS) {
            isAdminAuthenticated = true;
            adminLoginModal.style.display = 'none';
            adminUsername.value = '';
            adminPassword.value = '';
            document.getElementById('btnADMIN').click();
        } else {
            isAdminAuthenticated = false;
            adminLoginError.textContent = 'Tên đăng nhập hoặc mật khẩu không đúng.';
            adminPassword.value = '';
            adminUsername.focus();
        }
    }

    // --- CÁC HÀM TIỆN ÍCH ---
    function collapseSidebar(sidebarElement) { sidebarElement.classList.add('collapsed'); hideAllDropdowns(); }
    function expandSidebar(sidebarElement) { sidebarElement.classList.remove('collapsed'); }
    function hideAllDropdowns() {
        document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
            menu.classList.remove('show');
            menu.previousElementSibling?.classList.remove('active');
        });
    }

    function updateClock() {
        const now = new Date();
        const timeEl = document.getElementById('clock-time');
        const dateEl = document.getElementById('clock-date');
        if(timeEl) timeEl.textContent = now.toLocaleTimeString('vi-VN');
        if(dateEl) dateEl.textContent = now.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long' });
    }
    
    // --- GÁN SỰ KIỆN ---
    renderLeftMenu();
    renderRightMenu();
    addGeminiEventListeners();
    
    leftSidebarContainer.addEventListener('mouseenter', () => { clearTimeout(leftSidebarTimeout); expandSidebar(leftSidebarContainer); });
    leftSidebarContainer.addEventListener('mouseleave', () => { leftSidebarTimeout = setTimeout(() => collapseSidebar(leftSidebarContainer), HIDE_DELAY); });
    rightSidebarContainer.addEventListener('mouseenter', () => { clearTimeout(rightSidebarTimeout); expandSidebar(rightSidebarContainer); });
    rightSidebarContainer.addEventListener('mouseleave', () => { rightSidebarTimeout = setTimeout(() => collapseSidebar(rightSidebarContainer), HIDE_DELAY); });
    
    document.getElementById('btnGoHomeHeader').addEventListener('click', () => loadContent('TRANG CHỦ - THÔNG BÁO'));
    
    adminLoginSubmit.addEventListener('click', handleAdminLogin);
    adminLoginCancel.addEventListener('click', () => { adminLoginModal.style.display = 'none'; });
    adminPassword.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleAdminLogin(); });

    updateClock();
    setInterval(updateClock, 1000);
});
