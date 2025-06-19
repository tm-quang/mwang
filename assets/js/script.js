// =================================================================================
// PHẦN 1: CẤU HÌNH & API
// =================================================================================

// DÁN URL CỦA WEB APP BẠN ĐÃ DEPLOY TỪ GOOGLE APPS SCRIPT VÀO ĐÂY
const API_URL = "https://script.google.com/macros/s/AKfycbwxmJsjhH0J4pGXXKqZHti9W9UDzHD7OGQH4NBYP2AkbzprPm5zbGkpcB7pqUlYUFVc9g/exec";

// Cấu hình menu
const leftMenuData = [
    {
        title: 'ADMIN',
        items: [
          {
            id: 'btnADMIN', text: 'QUẢN TRỊ HỆ THỐNG', icon: 'fa-solid fa-sliders', isDropdown: true, 
            isAdmin: true,
            subItems: [
                { id: 'btnDatabase', text: 'DATABASE', functionName: 'getPage_AdminDatabase', pageTitle: 'QUẢN LÝ DỮ LIỆU', icon: 'fa-solid fa-database' },
                { id: 'btnUserInfo', text: 'QUẢN LÝ USER', functionName: 'getPage_AdminThongTinThanhVien', pageTitle: 'QUẢN LÝ THÀNH VIÊN', icon: 'fa-solid fa-users' },
                { id: 'btnThongBao', text: 'TẠO THÔNG BÁO MỚI', functionName: 'getPage_ThongBao', pageTitle: 'TẠO THÔNG BÁO MỚI', icon: 'fa-regular fa-newspaper' },
            ]
          }
        ]
    
     },
    {
        title: '2025 - IT MTAY2',
        items: [
            { 
                id: 'btnWorkLeader', text: 'TRIỂN KHAI IT MTAY2', icon: 'fas fa-laptop-code', isDropdown: true, 
                 subItems: [
                    { id: 'btnDeployMTay2', text: 'TRIỂN KHAI MIỀN TÂY 2', functionName: 'getPage_CvTrienKhaiMtay2', pageTitle: 'TRIỂN KHAI MIỀN TÂY 2', icon: 'fas fa-map-marked-alt' },
                    { id: 'btnBHXToiUu', text: 'TỐI ƯU BHX 2025', functionName: 'getPage_TkBhxToiUu', pageTitle: '', icon: 'fas fa-cogs' },
                 ] 
            },
            { 
                id: 'btnDailyWork', text: 'CÔNG VIỆC HÀNG NGÀY', icon: 'fas fa-calendar-alt', isDropdown: true, 
                 subItems: [
                    { id: 'btnMonitor', text: 'KIỂM TRA LỖI HỆ THỐNG', functionName: 'getPage_CvMonitor', pageTitle: 'KIỂM TRA LỖI HỆ THỐNG', icon: 'fas fa-eye' },
                    { id: 'btnCbs', text: 'BÁO CÁO CHÀO BUỔI SÁNG', functionName: 'getPage_Cvcbs', pageTitle: 'BÁO CÁO CHÀO BUỔI SÁNG T2-T7', icon: 'fas fa-eye' },
                     { id: 'btnTEST1', text: 'MENU 1', functionName: 'getPage_TEST1', pageTitle: 'TEST', icon: 'fas fa-eye' },
                    { id: 'btnTEST2', text: 'MENU 2', functionName: 'getPage_TEST2', pageTitle: 'TEST', icon: 'fas fa-eye' },
                    { id: 'btnTEST3', text: 'MENU 3', functionName: 'getPage_TEST3', pageTitle: 'TEST', icon: 'fas fa-eye' },
                    { id: 'btnTimSheet', text: 'TÌM SHEET CÔNG VIỆC', functionName: 'getTimSheetHtml', pageTitle: 'TRA CỨU DỮ LIỆU TỪ GOOGLE SHEET', icon: 'fa-solid fa-folder-tree' }
                ] 
            },
             { id: 'btnBTKK', text: 'LỊCH BẢO TRÌ - KIỂM KÊ', functionName: 'getPage_CvBaotriKiemke', pageTitle: 'LỊCH BẢO TRÌ - KIỂM KÊ', icon: 'fas fa-tools' },
            { 
                id: 'btnTimKiem', text: 'TÌM THÔNG TIN', icon: 'fas fa-search', isDropdown: true, 
                subItems: [
                     { id: 'btnTimSieuThi', text: 'TÌM KIẾM SIÊU THỊ', functionName: 'getPage_TimKiemSieuThi', icon: 'fas fa-store-alt' },
                    { id: 'btnTimHangBK', text: 'TÌM HÀNG HÓA BACKUP', functionName: 'getPage_TimKiemHangBK', icon: 'fas fa-box-open' },
                    { id: 'btnTimDuAn', text: 'TÌM KIẾM DỰ ÁN', functionName: 'getPage_tim-kiem-du-an', pageTitle: '', icon: 'fas fa-eye' },
                    { id: 'btnTEST2', text: 'MENU 2', functionName: 'getPage_TEST2', pageTitle: 'TEST', icon: 'fas fa-eye' },
                    { id: 'btnTEST3', text: 'MENU 3', functionName: 'getPage_TEST3', pageTitle: 'TEST', icon: 'fas fa-eye' },
                ] 
             }
        ]
    },
    {
        title: 'TÀI LIỆU - HƯỚNG DẪN - PHẦN MỀM',
        items: [
            { 
                 id: 'btnHuongDanIT', text: 'TÀI LIỆU - HƯỚNG DẪN', icon: 'fas fa-question-circle', isDropdown: true, 
                subItems: [
                    { id: 'btnTGDD', text: 'TGDD & ĐMX', functionName: 'getTGDDHtml', pageTitle: 'Thế Giới Di Động & Điện Máy Xanh', icon: 'fas fa-mobile-alt' },
                     { id: 'btnBachHoaXanh', text: 'BÁCH HÓA XANH', functionName: 'getPage_HuongDanBhx', pageTitle: 'Bách Hóa XANH', icon: 'fas fa-store' },
                    { id: 'btnAvakid', text: 'AVAKID', functionName: 'getAvakidHtml', pageTitle: 'AvaKID', icon: 'fas fa-child' },
                    { id: 'btnAnKhang', text: 'AN KHANG', functionName: 'getAnKhangHtml', pageTitle: 'An Khang', icon: 'fas fa-pills' },
                    { id: 'btnKhoVp', text: 'KHO/VP', functionName: 'getKhoVpHtml', pageTitle: 'Kho/VP', icon: 'fas fa-warehouse' },
                ] 
            },
            { id: 'btnphanmem', text: 'PHẦN MỀM', functionName: 'getPage_PhanMemIt', pageTitle: 'DOWNLOAD PHẦN MỀM', icon: 'fas fa-book-open' },
            { id: 'btnDashboard', text: 'BẢNG ĐIỀU KHIỂN', functionName: 'getPage_TaiLieuDashboard', pageTitle: 'BẢNG ĐIỀU KHIỂN CHÍNH - TEST', icon: 'fas fa-tachometer-alt' },
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
            { text: "Google Docs", href: "https://docs.google.com/", icon: "fas fa-file-alt", className: "info" },
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

// =================================================================================
// PHẦN 2: LOGIC GIAO DIỆN
// =================================================================================

// DOM Elements
const functionContent = document.getElementById('functionContent');
const loadingSpinner = document.getElementById('loadingSpinner');
const currentPageTitle = document.getElementById('current-page-title');
const leftSidebarContainer = document.getElementById('left-sidebar-container');
const rightSidebarContainer = document.getElementById('right-sidebar-container');
const leftSidebarContentWrapper = leftSidebarContainer.querySelector('.sidebar-content-wrapper');
const rightSidebarContentWrapper = rightSidebarContainer.querySelector('.sidebar-content-wrapper');
const homeConfirmModal = document.getElementById('homeConfirmModal');
const customConfirmModal = document.getElementById('customConfirmModal');
const adminLoginModal = document.getElementById('adminLoginModal');
const adminUsername = document.getElementById('adminUsername');
const adminPassword = document.getElementById('adminPassword');
const adminLoginError = document.getElementById('adminLoginError');
const adminLoginSubmit = document.getElementById('adminLoginSubmit');
const adminLoginCancel = document.getElementById('adminLoginCancel');
const sidebarToggleButton = document.getElementById('sidebar-toggle-btn');

// State & Timers
let dropdownTimeout;
const HIDE_DELAY = 300;
let isAdminAuthenticated = false; 
let countdownInterval; 
let countdownSeconds = 3600; 
let isSidebarPinned = false;

/**
 * Hàm gọi API trung tâm - ĐÃ CHUYỂN SANG DÙNG GET
 * @param {string} action - Tên của hành động
 * @param {object} payload - Dữ liệu gửi đi
 */
async function callApi(action, payload = {}) {
    try {
        if (API_URL === "DÁN_URL_WEB_APP_CỦA_BẠN_VÀO_ĐÂY") {
            throw new Error("API_URL chưa được cấu hình trong file script.js.");
        }
        
        // Xây dựng URL với các tham số
        const url = new URL(API_URL);
        url.searchParams.append('action', action);
        // Đóng gói payload thành chuỗi JSON để gửi qua URL
        url.searchParams.append('payload', JSON.stringify(payload));

        // Thực hiện yêu cầu GET, không cần body hay method
        const response = await fetch(url, { redirect: 'follow' });

        if (!response.ok) {
            throw new Error(`Lỗi mạng: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Lỗi khi gọi API cho action "${action}":`, error);
        functionContent.innerHTML = `<p style="color: red; text-align: center;">Lỗi tải dữ liệu: ${error.message}</p>`;
        loadingSpinner.style.display = 'none';
        throw error;
    }
}

// ... (TOÀN BỘ PHẦN CODE CÒN LẠI GIỮ NGUYÊN NHƯ FILE BẠN GỬI) ...

function updateTimerDisplay() {
    const timerElement = document.getElementById('session-timer');
    if (timerElement) {
        const minutes = Math.floor(countdownSeconds / 60);
        const seconds = countdownSeconds % 60;
        timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
}

function startCountdown() {
    clearInterval(countdownInterval);
    countdownSeconds = 3600;
    updateTimerDisplay();
    countdownInterval = setInterval(() => {
        countdownSeconds--;
        updateTimerDisplay();
        if (countdownSeconds <= 0) {
            clearInterval(countdownInterval);
            forceLogout('Phiên đã hết hạn. Vui lòng đăng nhập lại.');
        }
    }, 1000);
}

    function renderLeftMenu() {
        leftSidebarContent.innerHTML = '';
        leftMenuData.forEach(sectionData => {
            const sectionDiv = document.createElement('div');
            sectionDiv.className = 'menu-section';
            sectionDiv.innerHTML = `<h3 class="menu-section-title"><span>${sectionData.title}</span></h3>`;
            
            sectionData.items.forEach(itemData => {
                if (itemData.isDropdown) {
                    const dropdownDiv = document.createElement('div');
                    dropdownDiv.className = 'dropdown';

                    const button = document.createElement('div');
                    button.className = 'dropdown-header';
                    button.innerHTML = `<i class="${itemData.icon} icon"></i><span class="menu-item-text">${itemData.text}</span>`;
                    
                    const menu = document.createElement('div');
                    menu.className = 'dropdown-menu';
                    itemData.subItems.forEach(subItemData => {
                        const link = createMenuItem(subItemData);
                        link.addEventListener('click', (e) => {
                            if (isMobile()) {
                                leftSidebar.classList.remove('open');
                                mobileOverlay.classList.remove('show');
                                sidebarToggleBtn.classList.remove('open');
                            }
                        });
                        menu.appendChild(link);
                    });
                    
                    dropdownDiv.append(button, menu);
                    
                    button.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const currentlyOpen = dropdownDiv.classList.contains('open');
                        document.querySelectorAll('#left-sidebar-container .dropdown.open').forEach(d => d.classList.remove('open'));
                        if (!currentlyOpen) {
                            dropdownDiv.classList.add('open');
                        }
                    });
                    sectionDiv.appendChild(dropdownDiv);
                } else {
                    const link = createMenuItem(itemData);
                     link.addEventListener('click', () => {
                        if (isMobile()) {
                            leftSidebar.classList.remove('open');
                            mobileOverlay.classList.remove('show');
                            sidebarToggleBtn.classList.remove('open');
                        }
                    });
                    sectionDiv.appendChild(link);
                }
            });
            leftSidebarContent.appendChild(sectionDiv);
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

        rightSidebarContentWrapper.appendChild(title);
        rightSidebarContentWrapper.appendChild(menuSection);
    });
}

async function loadFunctionContent(functionName, pageTitle = '') {
    functionContent.innerHTML = '';
    loadingSpinner.style.display = 'block';
    currentPageTitle.textContent = pageTitle;

    try {
        const response = await callApi('getPageContent', { functionName: functionName });
        loadingSpinner.style.display = 'none';
        if (response.success && response.html) {
            functionContent.innerHTML = response.html;
            Array.from(functionContent.querySelectorAll('script')).forEach(oldScript => {
                const newScript = document.createElement('script');
                Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
                newScript.appendChild(document.createTextNode(oldScript.innerHTML));
                oldScript.parentNode.replaceChild(newScript, oldScript);
            });
        } else {
            throw new Error(response.message || 'Không nhận được nội dung hợp lệ.');
        }
    } catch (error) {
        loadingSpinner.style.display = 'none';
        functionContent.innerHTML = `<p style="color: red; text-align: center;">Lỗi tải nội dung: ${error.message}</p>`;
    }
}

// === BẮT ĐẦU PHẦN CODE MỚI ĐỂ HIỂN THỊ THÔNG BÁO ===
function renderNotifications(allNotifications) {
    if (!functionContent) return;
    
    // Kiểm tra nếu có lỗi trả về từ API
    if (allNotifications.length === 1 && allNotifications[0].category === 'Lỗi') {
        functionContent.innerHTML = `<p style="color: red; text-align: center;">${allNotifications[0].message}</p>`;
        return;
    }

    const trienKhaiData = allNotifications.filter(item => item.category === 'Triển khai');
    const noiBoData = allNotifications.filter(item => item.category === 'Nội bộ');

    const createColumnHtml = (title, icon, data) => {
        let columnHtml = `
          <div class="content-column">
            <h2 class="column-title"><i class="fas ${icon}"></i> ${title}</h2>
            <div class="notification-list">`;

        if (data.length > 0) {
            data.forEach(item => {
                const newBadgeHtml = item.isNew ? '<span class="new-badge">NEW</span>' : '';
                const typeBadgeHtml = item.type ? `<span class="type-badge type-${item.type.toLowerCase().replace(/[\/\\s&]/g, '-')}">${item.type}</span>` : '';
                const linkButtonHtml = item.link ? `<a href="${item.link}" target="_blank" class="notification-link-btn-pb3"><i class="fas fa-link"></i> Link chi tiết</a>` : '';
                const updateDateHtml = item.updateDate ? `<span class="update-date-badge"><i class="fas fa-calendar-check"></i> ${item.updateDate}</span>` : '';
                const deadlineHtml = item.deadline ? `<span class="deadline-badge"><i class="fas fa-hourglass-half"></i> Deadline: ${item.deadline}</span>` : '';
                
                columnHtml += `
                  <div class="notification-card-pb3 collapsed">
                    <div class="notification-header-pb3">
                        <i class="${item.icon} icon"></i>
                        <h4>${item.title}</h4>
                        ${typeBadgeHtml}
                        ${newBadgeHtml}
                        <i class="fas fa-chevron-down expand-icon"></i>
                    </div>
                    <div class="notification-message-pb3">
                        ${item.message}
                        <div class="notification-footer-pb3">
                            <div class="footer-left">${updateDateHtml}</div>
                            <div class="footer-center">${deadlineHtml}</div>
                            <div class="footer-right">${linkButtonHtml}</div>
                        </div>
                    </div>
                  </div>`;
            });
        } else {
            columnHtml += '<p>Không có thông báo nào.</p>';
        }
        columnHtml += '</div></div>';
        return columnHtml;
    };
    
    let finalHtml = '<div class="columns-container-pb2">';
    finalHtml += createColumnHtml('THÔNG BÁO CÔNG VIỆC TRIỂN KHAI', 'fa-bullhorn', trienKhaiData);
    finalHtml += createColumnHtml('THÔNG BÁO CÔNG VIỆC MTAY2', 'fa-users', noiBoData);
    finalHtml += '</div>';

    functionContent.innerHTML = finalHtml;
    setupCollapseListeners();
}

function setupCollapseListeners() {
    functionContent.addEventListener('click', function(event) {
        const header = event.target.closest('.notification-header-pb3');
        if (!header) return;

        const clickedCard = header.closest('.notification-card-pb3');
        if (!clickedCard) return;

        if (event.target.closest('a')) {
            return;
        }
        
        const allCards = functionContent.querySelectorAll('.notification-card-pb3');
        allCards.forEach(card => {
            if (card !== clickedCard) {
                card.classList.add('collapsed');
            }
        });

        clickedCard.classList.toggle('collapsed');
    });
}

async function loadNotificationsPage() {
    functionContent.innerHTML = '';
    loadingSpinner.style.display = 'block';
    currentPageTitle.textContent = 'THÔNG BÁO CÔNG VIỆC';
    
    try {
        const response = await callApi('getNotifications');
        loadingSpinner.style.display = 'none';
        if (response.success && Array.isArray(response.data)) {
            renderNotifications(response.data);
        } else {
            // Nếu API trả về lỗi nhưng không bị catch, hiển thị message lỗi
            throw new Error(response.message || 'Dữ liệu trả về không hợp lệ.');
        }
    } catch (error) {
        // Hàm callApi đã xử lý hiển thị lỗi, nên ở đây không cần làm gì thêm
        // Chỉ cần đảm bảo spinner đã tắt
        loadingSpinner.style.display = 'none';
    }
}


// === KẾT THÚC PHẦN CODE MỚI ===

function goToHomePage() {
    loadNotificationsPage();
}

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
    const timeElement = document.getElementById('clock-time');
    const dateElement = document.getElementById('clock-date');
    if (timeElement) {
        timeElement.textContent = now.toLocaleTimeString('vi-VN');
    }
    if (dateElement) {
        dateElement.textContent = now.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long' });
    }
}

function forceLogout(message) {
    alert(message);
    window.location.reload();
}

async function handleAdminLogin() {
    const username = adminUsername.value.trim();
    const password = adminPassword.value;
    if (!username || !password) {
        adminLoginError.textContent = 'Vui lòng nhập đủ thông tin.';
        return;
    }
    adminLoginSubmit.disabled = true;
    adminLoginSubmit.textContent = 'Đang kiểm tra...';
    adminLoginError.textContent = '';

    try {
        const response = await callApi('verifyAdminLogin', { username, password });
        adminLoginSubmit.disabled = false;
        adminLoginSubmit.textContent = 'Đăng nhập';
        if (response.success) {
            isAdminAuthenticated = true;
            adminLoginModal.style.display = 'none';
            adminUsername.value = '';
            adminPassword.value = '';
            document.getElementById('btnADMIN').click();
        } else {
            isAdminAuthenticated = false;
            adminLoginError.textContent = response.message || 'Lỗi không xác định.';
            adminPassword.value = '';
            adminUsername.focus();
        }
    } catch (error) {
        adminLoginSubmit.disabled = false;
        adminLoginSubmit.textContent = 'Đăng nhập';
        isAdminAuthenticated = false;
        adminLoginError.textContent = 'Lỗi kết nối: ' + error.message;
    }
}

// === MAIN EXECUTION - SỰ KIỆN CHÍNH KHI TRANG TẢI XONG ===
document.addEventListener('DOMContentLoaded', function() {
    renderLeftMenu();
    renderRightMenu();
    
    leftSidebarContainer.addEventListener('mouseenter', () => expandSidebar(leftSidebarContainer));
    leftSidebarContainer.addEventListener('mouseleave', () => {
        if (!isSidebarPinned) {
            collapseSidebar(leftSidebarContainer);
        }
    });
    rightSidebarContainer.addEventListener('mouseenter', () => expandSidebar(rightSidebarContainer));
    rightSidebarContainer.addEventListener('mouseleave', () => {
        if (!isSidebarPinned) {
            collapseSidebar(rightSidebarContainer);
        }
    });

    sidebarToggleButton.addEventListener('click', () => {
        isSidebarPinned = !isSidebarPinned;
        const icon = sidebarToggleButton.querySelector('i');
        if (isSidebarPinned) {
            expandSidebar(leftSidebarContainer);
            expandSidebar(rightSidebarContainer);
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-thumbtack');
            sidebarToggleButton.title = "Bỏ ghim thanh công cụ";
        } else {
            collapseSidebar(leftSidebarContainer);
            collapseSidebar(rightSidebarContainer);
            icon.classList.remove('fa-thumbtack');
            icon.classList.add('fa-bars');
            sidebarToggleButton.title = "Ghim thanh công cụ";
        }
    });
  
    document.getElementById('btnGoHomeHeader').addEventListener('click', goToHomePage);
    
    adminLoginSubmit.addEventListener('click', handleAdminLogin);
    adminLoginCancel.addEventListener('click', () => { adminLoginModal.style.display = 'none'; });
    adminPassword.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleAdminLogin(); });

    document.getElementById('logoutButton').addEventListener('click', () => { customConfirmModal.style.display = 'flex'; });
    document.getElementById('confirmBtnNo').addEventListener('click', () => { customConfirmModal.style.display = 'none'; });
    document.getElementById('confirmBtnYes').addEventListener('click', () => {
        customConfirmModal.style.display = 'none';
        forceLogout('Bạn đã đăng xuất.');
    });

    const supportBtn = document.getElementById('supportContactButton');
    const supportPopup = document.getElementById('supportContactPopup');
    supportBtn.addEventListener('click', () => supportPopup.classList.toggle('show'));
    
    document.getElementById('closeSupportPopup').addEventListener('click', () => {
        supportPopup.classList.remove('show');
    });
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            hideAllDropdowns();
        }
        if (!supportPopup.contains(e.target) && !supportBtn.contains(e.target)) {
            supportPopup.classList.remove('show');
        }
    });
    
    updateClock();
    setInterval(updateClock, 1000);
    goToHomePage();
    
    ['load', 'mousemove', 'mousedown', 'touchstart', 'click', 'keydown', 'scroll'].forEach(evt => window.addEventListener(evt, startCountdown, true));
    startCountdown();
});