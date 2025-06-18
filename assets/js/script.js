// =================================================================================
// PHẦN 1: CẤU HÌNH & API
// =================================================================================

// DÁN URL CỦA WEB APP BẠN ĐÃ DEPLOY TỪ GOOGLE APPS SCRIPT VÀO ĐÂY
const API_URL = "DÁN_URL_WEB_APP_CỦA_BẠN_VÀO_ĐÂY";

// Cấu hình menu được giữ nguyên
const leftMenuData = [
    {
        title: 'ADMIN',
        items: [
          {
            id: 'btnADMIN', text: 'QUẢN TRỊ HỆ THỐNG', icon: 'fa-solid fa-sliders', isDropdown: true, 
            isAdmin: true, // Đánh dấu menu cần bảo vệ
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
                    { id: 'btnBHXToiUu', text: 'TỐI ƯU BHX 2025', functionName: 'getPage_TkBhxToiUu', pageTitle: 'TÌM KIẾM TỐI ƯU BÁCH HÓA XANH', icon: 'fas fa-cogs' },
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
                    { id: 'btnTEST1', text: 'MENU 1', functionName: 'getPage_TEST1', pageTitle: 'TEST', icon: 'fas fa-eye' },
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
 * Hàm gọi API trung tâm
 * @param {string} action - Tên của hành động (tương ứng tên hàm backend)
 * @param {object} payload - Dữ liệu gửi đi
 * @returns {Promise<any>} - Promise với kết quả từ server
 */
async function callApi(action, payload = {}) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action, payload }),
            redirect: 'follow' 
        });
        if (!response.ok) {
            throw new Error(`Lỗi mạng: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Lỗi khi gọi API cho action "${action}":`, error);
        functionContent.innerHTML = `<p style="color: red; text-align: center;">Lỗi kết nối đến máy chủ. Vui lòng kiểm tra lại đường truyền hoặc liên hệ quản trị viên.</p>`;
        loadingSpinner.style.display = 'none';
        throw error;
    }
}

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
    leftSidebarContentWrapper.innerHTML = '';
    leftMenuData.forEach((section) => {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'menu-section';
        sectionDiv.innerHTML = `<h3 class="menu-section-title"><span>${section.title}</span></h3>`;
        const menuItemsContainer = document.createElement('div');
        menuItemsContainer.className = 'menu-items-container';
        section.items.forEach(item => {
             if (item.isDropdown) {
                const dropdownDiv = document.createElement('div');
                dropdownDiv.className = 'dropdown';
                const dropdownButton = document.createElement('div');
                dropdownButton.className = `dropdown-button ${item.className || ''}`;
                dropdownButton.innerHTML = `<i class="${item.icon} icon"></i><span>${item.text}</span>`;
                dropdownButton.id = item.id;
                const dropdownMenu = document.createElement('div');
                dropdownMenu.className = 'dropdown-menu';
                item.subItems.forEach(subItem => {
                    const subLink = document.createElement('a');
                    subLink.href = '#';
                    subLink.id = subItem.id;
                    subLink.className = `menu-button-sidebar ${subItem.className || ''}`;
                    subLink.innerHTML = `<i class="${subItem.icon} icon"></i><span>${subItem.text}</span>`;
                    subLink.addEventListener('click', (e) => {
                        e.preventDefault();
                        hideAllDropdowns();
                        loadFunctionContent(subItem.functionName, subItem.pageTitle);
                        if (!isSidebarPinned) {
                            collapseSidebar(leftSidebarContainer);
                        }
                    });
                    dropdownMenu.appendChild(subLink);
                });
                dropdownDiv.appendChild(dropdownButton);
                dropdownDiv.appendChild(dropdownMenu);
                menuItemsContainer.appendChild(dropdownDiv);
                const showMenu = () => {
                    hideAllDropdowns();
                    const rect = dropdownButton.getBoundingClientRect();
                    dropdownMenu.style.top = rect.top + 'px';
                    dropdownMenu.style.left = (rect.right + 10) + 'px';
                    dropdownMenu.classList.add('show');
                    dropdownButton.classList.add('active');
                };
                if (item.isAdmin) {
                    dropdownButton.style.cursor = 'pointer';
                    dropdownButton.addEventListener('click', () => {
                        if (isAdminAuthenticated) {
                            showMenu();
                        } else {
                            hideAllDropdowns();
                            adminLoginError.textContent = '';
                            adminLoginModal.style.display = 'flex';
                            adminUsername.focus();
                        }
                    });
                    dropdownDiv.onmouseleave = () => { dropdownTimeout = setTimeout(() => { dropdownMenu.classList.remove('show'); dropdownButton.classList.remove('active'); }, 300); };
                    dropdownMenu.onmouseenter = () => clearTimeout(dropdownTimeout);
                } else {
                    const hideMenu = () => { dropdownMenu.classList.remove('show'); dropdownButton.classList.remove('active'); };
                    dropdownButton.onmouseenter = () => { clearTimeout(dropdownTimeout); showMenu(); };
                    dropdownButton.onmouseleave = () => { dropdownTimeout = setTimeout(hideMenu, 300); };
                    dropdownMenu.onmouseenter = () => clearTimeout(dropdownTimeout);
                    dropdownMenu.onmouseleave = () => { dropdownTimeout = setTimeout(hideMenu, 300); };
                }
            } else {
                const a = document.createElement('a');
                a.href = '#';
                a.id = item.id;
                a.className = `menu-button-sidebar ${item.className || ''}`;
                a.innerHTML = `<i class="${item.icon} icon"></i><span>${item.text}</span>`;
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    hideAllDropdowns();
                    loadFunctionContent(item.functionName, item.pageTitle);
                    if (!isSidebarPinned) {
                        collapseSidebar(leftSidebarContainer);
                    }
                });
                menuItemsContainer.appendChild(a);
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

function goToHomePage() {
    loadFunctionContent('getPage_ThongBao', 'TRANG CHỦ');
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
    document.getElementById('clock-time').textContent = now.toLocaleTimeString('vi-VN');
    document.getElementById('clock-date').textContent = now.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long' });
}

function forceLogout(message) {
    alert(message);
    window.location.href = "/";
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
    document.getElementById('closeSupportPopup').addEventListener('click', () => supportPopup.classList.remove('show');
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) hideAllDropdowns();
        if (!supportPopup.contains(e.target) && !supportBtn.contains(e.target)) supportPopup.classList.remove('show');
    });
    
    updateClock();
    setInterval(updateClock, 1000);
    goToHomePage();
    
    ['load', 'mousemove', 'mousedown', 'touchstart', 'click', 'keydown', 'scroll'].forEach(evt => window.addEventListener(evt, startCountdown, true));
    startCountdown();
});
