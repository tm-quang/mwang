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
                { text: "Báo cáo nội bộ", href: "https://baocaonoibo.com", icon: "fas fa-chart-bar" },
                { text: "New Ticket", href: "https://newticket.tgdd.vn/ticket", icon: "fas fa-ticket-alt" },
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
    const homePageContent = functionContent.innerHTML;
    
    // Elements mới cho responsive và popup
    const hamburgerBtn = document.getElementById('hamburger-menu');
    const mobileOverlay = document.getElementById('overlay');
    const supportBtn = document.getElementById('supportContactButton');
    const supportPopup = document.getElementById('supportContactPopup');
    const closeSupportPopupBtn = document.getElementById('closeSupportPopup');

    const adminLoginModal = document.getElementById('adminLoginModal');
    const geminiModal = document.getElementById('geminiResultModal');
    const geminiResultContent = document.getElementById('geminiResultContent');
    const closeGeminiModalBtn = document.getElementById('closeGeminiModal');
    const copyGeminiResultBtn = document.getElementById('copyGeminiResult');
    
    // State
    let isAdminAuthenticated = false;

    // --- CÁC HÀM XỬ LÝ ---

    async function callGeminiAPI(taskTitle) {
        const apiKey = "";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
        const prompt = `Với vai trò là một quản lý dự án nhiều kinh nghiệm, hãy chia nhỏ công việc có tiêu đề "${taskTitle}" thành các công việc con cụ thể, khả thi và dễ quản lý. Trình bày kết quả dưới dạng danh sách có gạch đầu dòng.`;
        const payload = { contents: [{ parts: [{ text: prompt }] }] };
        try {
            const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
            const result = await response.json();
            if (result.candidates && result.candidates.length > 0) {
                const text = result.candidates[0].content.parts[0].text;
                const htmlResult = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/^- (.*?)$/gm, '<li>$1</li>');
                geminiResultContent.innerHTML = `<ul>${htmlResult}</ul>`;
            } else { throw new Error("Invalid response from Gemini."); }
        } catch (error) {
            console.error("Gemini API call error:", error);
            geminiResultContent.innerHTML = `<p style="color: var(--danger-color);">Đã có lỗi xảy ra. Vui lòng thử lại.</p>`;
        }
    }

    function handleGeminiSuggestClick(event) {
        const taskTitle = event.target.closest('.notification-card').querySelector('h4').textContent.trim();
        geminiResultContent.innerHTML = '<p>Đang lấy gợi ý, vui lòng chờ...</p>';
        geminiModal.style.display = 'flex';
        callGeminiAPI(taskTitle);
    }

    function addGeminiEventListeners() {
        document.querySelectorAll('.gemini-suggest-btn').forEach(button => {
            button.addEventListener('click', handleGeminiSuggestClick);
        });
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
                    button.className = 'menu-button-sidebar';
                    button.innerHTML = `<i class="${menuItem.icon} icon"></i><span>${menuItem.text}</span>`;
                    button.addEventListener('click', (e) => {
                        e.preventDefault();
                        if (window.innerWidth <= 1024) {
                            leftSidebarContainer.classList.remove('open');
                            mobileOverlay.classList.remove('show');
                        }
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
            title.innerHTML = `<span>${section.title}</span>`;
            const menuSection = document.createElement('div');
            section.items.forEach(item => {
                const link = document.createElement('a');
                link.href = item.href;
                link.target = '_blank';
                link.className = 'link-button-right';
                link.innerHTML = `<i class="${item.icon} icon"></i><span>${item.text}</span>`;
                menuSection.appendChild(link);
            });
            rightSidebarContentWrapper.append(title, menuSection);
        });
    }
    
    function updateClock() {
        const now = new Date();
        const timeEl = document.getElementById('clock-time');
        const dateEl = document.getElementById('clock-date');
        if (timeEl) timeEl.textContent = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        if (dateEl) dateEl.textContent = now.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'numeric' });
    }

    // --- GÁN SỰ KIỆN ---

    renderLeftMenu();
    renderRightMenu();
    addGeminiEventListeners();
    updateClock();
    setInterval(updateClock, 1000);

    hamburgerBtn.addEventListener('click', () => {
        leftSidebarContainer.classList.toggle('open');
        mobileOverlay.classList.toggle('show');
    });

    mobileOverlay.addEventListener('click', () => {
        leftSidebarContainer.classList.remove('open');
        mobileOverlay.classList.remove('show');
    });

    supportBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        supportPopup.classList.toggle('show');
    });

    closeSupportPopupBtn.addEventListener('click', () => {
        supportPopup.classList.remove('show');
    });

    document.addEventListener('click', (e) => {
        if (!supportPopup.contains(e.target) && !supportBtn.contains(e.target)) {
            supportPopup.classList.remove('show');
        }
    });

    closeGeminiModalBtn.addEventListener('click', () => {
        geminiModal.style.display = 'none';
    });

    copyGeminiResultBtn.addEventListener('click', () => {
        const textToCopy = geminiResultContent.innerText;
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert('Đã sao chép vào clipboard!');
        }).catch(err => {
            console.error('Không thể sao chép: ', err);
            alert('Lỗi khi sao chép.');
        });
    });
});
