// =================================================================================
// PHẦN 1: CẤU HÌNH & API
// =================================================================================

const API_URL = "https://script.google.com/macros/s/AKfycbwYngixrO7jMyLyvYtTgAieHeppH3kL4brU3Oh4VfGYY3jY9bcBqsZo2dUhpxTRsybV0g/exec";

const leftMenuData = [
    {
        title: 'ADMIN',
        items: [
          {
            id: 'btnADMIN', text: 'QUẢN TRỊ HỆ THỐNG', icon: 'fa-solid fa-sliders', isDropdown: true, 
            //isAdmin: true,
            subItems: [
                { id: 'btnDatabase', text: 'DATABASE', functionName: 'getPage_AdminDatabase', pageTitle: '', icon: 'fa-solid fa-database' },
                { id: 'btnUserInfo', text: 'QUẢN LÝ USER', functionName: 'getPage_AdminThongTinThanhVien', pageTitle: '', icon: 'fa-solid fa-users' },
                { id: 'btnThongBao', text: 'TẠO THÔNG BÁO MỚI', functionName: 'getPage_ThongBao', pageTitle: '', icon: 'fa-regular fa-newspaper' },
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
                    { id: 'btnDeployMTay2', text: 'TRIỂN KHAI MIỀN TÂY 2', functionName: 'getPage_CvTrienKhaiMtay2', pageTitle: '', icon: 'fas fa-map-marked-alt' },
                    { id: 'btnBHXToiUu', text: 'TỐI ƯU BHX 2025', functionName: 'getPage_TkBhxToiUu', pageTitle: '', icon: 'fas fa-cogs' },
                 ] 
            },
            { 
                id: 'btnDailyWork', text: 'CÔNG VIỆC HÀNG NGÀY', icon: 'fas fa-calendar-alt', isDropdown: true, 
                 subItems: [
                    { id: 'btnMonitor', text: 'KIỂM TRA LỖI HỆ THỐNG', functionName: 'getPage_CvMonitor', pageTitle: '', icon: 'fas fa-eye' },
                    { id: 'btnCbs', text: 'BÁO CÁO CHÀO BUỔI SÁNG', functionName: 'getPage_Cvcbs', pageTitle: '', icon: 'fas fa-eye' },
                     { id: 'btnTEST1', text: 'MENU 1', functionName: 'getPage_TEST1', pageTitle: '', icon: 'fas fa-eye' },
                    { id: 'btnTEST2', text: 'MENU 2', functionName: 'getPage_TEST2', pageTitle: '', icon: 'fas fa-eye' },
                    { id: 'btnTEST3', text: 'MENU 3', functionName: 'getPage_TEST3', pageTitle: '', icon: 'fas fa-eye' },
                    { id: 'btnTimSheet', text: 'TÌM SHEET CÔNG VIỆC', functionName: 'getTimSheetHtml', pageTitle: '', icon: 'fa-solid fa-folder-tree' }
                ] 
            },
             { id: 'btnBTKK', text: 'LỊCH BẢO TRÌ - KIỂM KÊ', functionName: 'getPage_CvBaotriKiemke', pageTitle: '', icon: 'fas fa-tools' },
            { 
                id: 'btnTimKiem', text: 'TÌM THÔNG TIN', icon: 'fas fa-search', isDropdown: true, 
                subItems: [
                    { id: 'btnTimSieuThi', text: 'TÌM KIẾM SIÊU THỊ', htmlFile: 'tim-kiem-sieu-thi.html', pageTitle: '', icon: 'fas fa-store-alt' },
                    { id: 'btnTimHangBK', text: 'TÌM HÀNG HÓA BACKUP', htmlFile: 'tim-kiem-hang-bk.html', pageTitle: '', icon: 'fas fa-box-open' },
                    { id: 'btnTimDuAn', text: 'TÌM KIẾM DỰ ÁN', functionName: 'getPage_tim-kiem-du-an', pageTitle: '', icon: 'fas fa-eye' },
                    { id: 'btnTEST2', text: 'MENU 2', functionName: 'getPage_TEST2', pageTitle: '', icon: 'fas fa-eye' },
                    { id: 'btnTEST3', text: 'MENU 3', functionName: 'getPage_TEST3', pageTitle: '', icon: 'fas fa-eye' },
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
const adminLoginModal = document.getElementById('adminLoginModal');
const adminUsername = document.getElementById('adminUsername');
const adminPassword = document.getElementById('adminPassword');
const adminLoginError = document.getElementById('adminLoginError');
const adminLoginSubmit = document.getElementById('adminLoginSubmit');
const adminLoginCancel = document.getElementById('adminLoginCancel');
const sidebarToggleButton = document.getElementById('sidebar-toggle-btn');
const customConfirmModal = document.getElementById('customConfirmModal');
const mobileOverlay = document.getElementById('mobile-overlay');


// State & Timers
let dropdownTimeout;
const HIDE_DELAY = 300;
let isAdminAuthenticated = false; 
let countdownInterval; 
let countdownSeconds = 3600; 
let isSidebarPinned = false;
let isMobileView = window.innerWidth <= 1080;

async function callApi(action, payload = {}) {
    try {
        if (API_URL === "DÁN_URL_WEB_APP_CỦA_BẠN_VÀO_ĐÂY") {
            throw new Error("API_URL chưa được cấu hình trong file script.js.");
        }
        
        const url = new URL(API_URL);
        url.searchParams.append('action', action);
        url.searchParams.append('payload', JSON.stringify(payload));

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

function closeMobileSidebar() {
    if (isMobileView) {
        leftSidebarContainer.classList.remove('open');
        mobileOverlay.classList.remove('show');
    }
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
                        if (!subItem) { console.error("Lỗi dữ liệu: subItem không tồn tại.", e.target); return; }
                        hideAllDropdowns();
                        loadFunctionContent(subItem);
                        if (!isSidebarPinned || isMobileView) {
                           closeMobileSidebar();
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
                    dropdownButton.onmouseenter = () => { if(!isMobileView) { clearTimeout(dropdownTimeout); showMenu(); } };
                    dropdownButton.onclick = () => { if(isMobileView) { showMenu(); } }; // For touch devices
                    dropdownButton.onmouseleave = () => { if(!isMobileView) { dropdownTimeout = setTimeout(hideMenu, 300); } };
                    dropdownMenu.onmouseenter = () => clearTimeout(dropdownTimeout);
                    dropdownMenu.onmouseleave = () => { if(!isMobileView) { dropdownTimeout = setTimeout(hideMenu, 300); } };
                }
            } else {
                const a = document.createElement('a');
                a.href = '#';
                a.id = item.id;
                a.className = `menu-button-sidebar ${item.className || ''}`;
                a.innerHTML = `<i class="${item.icon} icon"></i><span>${item.text}</span>`;
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (!item) { console.error("Lỗi dữ liệu: item không tồn tại.", e.target); return; }
                    hideAllDropdowns();
                    loadFunctionContent(item);
                    if (!isSidebarPinned || isMobileView) {
                        closeMobileSidebar();
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

async function loadFunctionContent(item) {
    if (!item || typeof item !== 'object' || !('id' in item)) {
        console.error("loadFunctionContent được gọi với đối số không hợp lệ:", item);
        loadingSpinner.style.display = 'none';
        return; 
    }

    functionContent.innerHTML = '';
    loadingSpinner.style.display = 'block';
    currentPageTitle.textContent = item.pageTitle || '';

    try {
        let htmlContent = '';
        if (item.htmlFile) {
            const response = await fetch(item.htmlFile);
            if (!response.ok) throw new Error(`Không thể tải file ${item.htmlFile}: ${response.statusText}`);
            htmlContent = await response.text();
        } 
        else if (item.functionName) {
            const response = await callApi('getPageContent', { functionName: item.functionName });
            if (response.success && response.html) htmlContent = response.html;
            else throw new Error(response.message || 'Không nhận được nội dung hợp lệ từ API.');
        } else {
            throw new Error('Cấu hình menu không hợp lệ (thiếu htmlFile hoặc functionName).');
        }

        loadingSpinner.style.display = 'none';
        functionContent.innerHTML = htmlContent;

        // === THÊM KHỞI TẠO CHO TRANG MỚI Ở ĐÂY ===
        if (item.id === 'btnTimSieuThi') {
            initSearchStorePage();
        } else if (item.id === 'btnTimHangBK') {
            initSearchHangBKPage();
        }
        
        Array.from(functionContent.querySelectorAll('script')).forEach(oldScript => {
            const newScript = document.createElement('script');
            Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
            newScript.appendChild(document.createTextNode(oldScript.innerHTML));
            oldScript.parentNode.replaceChild(newScript, oldScript);
        });

        // Đóng sidebar trên mobile sau khi tải nội dung
        closeMobileSidebar();

    } catch (error) {
        loadingSpinner.style.display = 'none';
        functionContent.innerHTML = `<p style="color: red; text-align: center;">Lỗi tải nội dung: ${error.message}</p>`;
    }
}

function renderNotifications(allNotifications) {
    if (!functionContent) return;
    if (allNotifications.length === 1 && allNotifications[0].category === 'Lỗi') {
        functionContent.innerHTML = `<p style="color: red; text-align: center;">${allNotifications[0].message}</p>`;
        return;
    }

    const trienKhaiData = allNotifications.filter(item => item.category === 'Triển khai');
    const noiBoData = allNotifications.filter(item => item.category === 'Nội bộ');

    const createColumnHtml = (title, icon, data) => {
        let columnHtml = `<div class="content-column"><h2 class="column-title"><i class="fas ${icon}"></i> ${title}</h2><div class="notification-list">`;
        if (data.length > 0) {
            data.forEach(item => {
                const newBadgeHtml = item.isNew ? '<span class="new-badge">NEW</span>' : '';
                const typeBadgeHtml = item.type ? `<span class="type-badge type-${item.type.toLowerCase().replace(/[\/\\s&]/g, '-')}">${item.type}</span>` : '';
                const linkButtonHtml = item.link ? `<a href="${item.link}" target="_blank" class="notification-link-btn-pb3"><i class="fas fa-link"></i> Link chi tiết</a>` : '';
                const updateDateHtml = item.updateDate ? `<span class="update-date-badge"><i class="fas fa-calendar-check"></i> ${item.updateDate}</span>` : '';
                const deadlineHtml = item.deadline ? `<span class="deadline-badge"><i class="fas fa-hourglass-half"></i> Deadline: ${item.deadline}</span>` : '';
                
                columnHtml += `<div class="notification-card-pb3 collapsed"><div class="notification-header-pb3"><i class="${item.icon} icon"></i><h4>${item.title}</h4>${typeBadgeHtml}${newBadgeHtml}<i class="fas fa-chevron-down expand-icon"></i></div><div class="notification-message-pb3">${item.message}<div class="notification-footer-pb3"><div class="footer-left">${updateDateHtml}</div><div class="footer-center">${deadlineHtml}</div><div class="footer-right">${linkButtonHtml}</div></div></div></div>`;
            });
        } else {
            columnHtml += '<p>Không có thông báo nào.</p>';
        }
        columnHtml += '</div></div>';
        return columnHtml;
    };
    
    let finalHtml = '<div class="columns-container-pb2">' + createColumnHtml('THÔNG BÁO CÔNG VIỆC TRIỂN KHAI', 'fa-bullhorn', trienKhaiData) + createColumnHtml('THÔNG BÁO CÔNG VIỆC MTAY2', 'fa-users', noiBoData) + '</div>';
    functionContent.innerHTML = finalHtml;
    setupCollapseListeners();
}

function setupCollapseListeners() {
    functionContent.addEventListener('click', function(event) {
        const header = event.target.closest('.notification-header-pb3');
        if (!header) return;
        const clickedCard = header.closest('.notification-card-pb3');
        if (!clickedCard || event.target.closest('a')) return;
        
        // Chỉ đóng các card khác nếu card được click đang bị đóng
        if (clickedCard.classList.contains('collapsed')) {
             const allCards = functionContent.querySelectorAll('.notification-card-pb3');
             allCards.forEach(card => { if (card !== clickedCard) card.classList.add('collapsed'); });
        }
       
        clickedCard.classList.toggle('collapsed');
    });
}

async function loadNotificationsPage() {
    functionContent.innerHTML = '';
    loadingSpinner.style.display = 'block';
    currentPageTitle.textContent = '';
    try {
        const response = await callApi('getNotifications');
        if (response.success && Array.isArray(response.data)) {
            renderNotifications(response.data);
        } else {
            throw new Error(response.message || 'Dữ liệu trả về không hợp lệ.');
        }
    } catch (error) {
        functionContent.innerHTML = `<p style="color: red; text-align: center;">Lỗi tải thông báo: ${error.message}</p>`;
    } finally {
        loadingSpinner.style.display = 'none';
    }
}

function goToHomePage() {
    loadNotificationsPage();
}

// === LOGIC CHO TRANG TÌM KIẾM SIÊU THỊ ===
function initSearchStorePage() {
    const maSTInput = document.getElementById('maSTInput');
    const searchButton = document.getElementById('searchButton');
    const clearButton = document.getElementById('clearButton');
    if (!maSTInput || !searchButton || !clearButton) return;
    maSTInput.addEventListener('input', handleStoreSuggestionInput);
    maSTInput.addEventListener('keypress', (event) => { if (event.key === 'Enter') { event.preventDefault(); handleSearchStore(); } });
    searchButton.addEventListener('click', handleSearchStore);
    clearButton.addEventListener('click', clearStoreSearch);
}
async function handleStoreSuggestionInput(event) {
    const maSTInput = event.target;
    const suggestionsBox = document.getElementById('suggestions-box');
    const inputText = maSTInput.value;
    if (!suggestionsBox) return;
    if (inputText.length < 2) { suggestionsBox.style.display = 'none'; suggestionsBox.innerHTML = ''; return; }
    try {
        const response = await callApi('getStoreSuggestions', { partialCode: inputText });
        if (response && response.length > 0) {
            suggestionsBox.innerHTML = '';
            response.forEach(suggestion => {
                const item = document.createElement('div');
                item.className = 'suggestion-item';
                item.innerHTML = `<span class="code">${suggestion.code}</span><span class="name">${suggestion.name}</span>`;
                item.onclick = () => { maSTInput.value = suggestion.code; suggestionsBox.style.display = 'none'; handleSearchStore(); };
                suggestionsBox.appendChild(item);
            });
            suggestionsBox.style.display = 'block';
        } else { suggestionsBox.style.display = 'none'; }
    } catch (error) { console.error('Lỗi khi lấy gợi ý:', error); suggestionsBox.style.display = 'none'; }
}
async function handleSearchStore() {
    const maSTInput = document.getElementById('maSTInput');
    const resultOutput = document.getElementById('resultOutput');
    const errorMessage = document.getElementById('errorMessage');
    const loadingMessage = document.getElementById('loadingMessage');
    const searchButton = document.getElementById('searchButton');
    const buttonText = document.getElementById('buttonText');
    const suggestionsBox = document.getElementById('suggestions-box');
    const maST = maSTInput.value;
    suggestionsBox.style.display = 'none';
    resultOutput.style.display = 'none';
    errorMessage.textContent = '';
    maSTInput.classList.remove('error');
    if (!maST.trim()) { errorMessage.textContent = 'Vui lòng nhập Mã Siêu Thị để tìm kiếm.'; maSTInput.classList.add('error'); return; }
    searchButton.disabled = true;
    buttonText.textContent = 'Đang tìm...';
    loadingMessage.style.display = 'block';
    try {
        const response = await callApi('searchStore', { maST: maST });
        if (response && response.error) { errorMessage.textContent = response.message; maSTInput.classList.add('error'); } 
        else if (response) { resultOutput.innerHTML = formatStoreSearchResult(response); resultOutput.style.display = 'block'; } 
        else { errorMessage.textContent = `Không tìm thấy thông tin cho Mã Siêu Thị: "${maST}".`; maSTInput.classList.add('error'); }
    } catch (error) { errorMessage.textContent = 'Lỗi kết nối máy chủ: ' + error.message; maSTInput.classList.add('error'); } 
    finally { searchButton.disabled = false; buttonText.textContent = 'Tìm Kiếm'; loadingMessage.style.display = 'none'; }
}
function clearStoreSearch() {
    const maSTInput = document.getElementById('maSTInput');
    const resultOutput = document.getElementById('resultOutput');
    const errorMessage = document.getElementById('errorMessage');
    const suggestionsBox = document.getElementById('suggestions-box');
    maSTInput.value = '';
    resultOutput.style.display = 'none';
    errorMessage.textContent = '';
    maSTInput.classList.remove('error');
    if (suggestionsBox) suggestionsBox.style.display = 'none';
}
function formatStoreSearchResult(data) {
    const createRow = (icon, label, value, delay) => `<div class="result-row" style="animation-delay: ${delay}s;"><i class="fas ${icon} result-icon"></i><span class="result-label">${label}</span><span class="result-value">${value || 'N/A'}</span></div>`;
    return `<div class="result-card"><div class="result-main-title">KẾT QUẢ TÌM KIẾM: ${data.maCN}</div><div class="result-section"><div class="result-section-title"><i class="fas fa-info-circle"></i> THÔNG TIN SIÊU THỊ</div>${createRow('fa-barcode', 'Mã CN:', `<strong>${data.maCN}</strong>`, 0.1)}${createRow('fa-store', 'Tên ST:', `<strong>${data.tenST}</strong>`, 0.2)}${createRow('fa-calendar-alt', 'Khai Trương:', data.khaiTruong, 0.3)}${createRow('fa-map-marker-alt', 'Maps:', `<a href="${data.maps}" target="_blank">Xem trên bản đồ</a>`, 0.4)}${createRow('fa-user-cog', 'IT KV:', data.itKV, 0.5)}${createRow('fa-user-shield', 'Admin:', data.admin, 0.6)}</div><div class="result-section"><div class="result-section-title"><i class="fas fa-tools"></i> BẢO TRÌ - KIỂM KÊ</div>${createRow('fa-calendar-check', 'Ngày BT-KK:', data.ngayBTKK, 0.7)}${createRow('fa-file-alt', 'BC Bảo Trì:', data.bcBT, 0.8)}${createRow('fa-clipboard-check', 'BC Kiểm Kê:', data.bcKK, 0.9)}</div></div>`;
}

// === BẮT ĐẦU LOGIC CHO TRANG TÌM HÀNG HÓA BACKUP ===
function initSearchHangBKPage() {
    const searchButton = document.getElementById('searchButtonHangBK');
    const clearButton = document.getElementById('clearButtonHangBK');
    if (!searchButton || !clearButton) return;
    searchButton.addEventListener('click', handleSearchHangBK);
    clearButton.addEventListener('click', clearSearchHangBK);
}

async function handleSearchHangBK() {
    // Lấy các element
    const maKhoSelect = document.getElementById('maKhoSelect');
    const maUserInput = document.getElementById('maUserInput');
    const searchButton = document.getElementById('searchButtonHangBK');
    const buttonText = document.getElementById('buttonTextHangBK');
    const resultTableContainer = document.getElementById('resultTableContainerHangBK');
    const resultTableBody = document.getElementById('resultTableBodyHangBK');
    const errorMessage = document.getElementById('errorMessageHangBK');
    const noResultsMessage = document.getElementById('noResultsMessageHangBK');
    const loadingMessage = document.getElementById('loadingMessageHangBK');
    
    // Lấy giá trị
    const maKho = maKhoSelect.value;
    const maUser = maUserInput.value.trim();

    // Reset giao diện
    resultTableContainer.style.display = 'none';
    resultTableBody.innerHTML = '';
    errorMessage.textContent = '';
    noResultsMessage.style.display = 'none';
    maKhoSelect.classList.remove('input-error');
    maUserInput.classList.remove('input-error');

    // Kiểm tra điều kiện
    let hasError = false;
    if (!maKho) {
        errorMessage.textContent = 'Vui lòng chọn Mã Kho. ';
        maKhoSelect.classList.add('input-error');
        hasError = true;
    }
    if (!maUser) {
        errorMessage.textContent += 'Vui lòng nhập hoặc chọn Mã Nhân Viên.';
        maUserInput.classList.add('input-error');
        hasError = true;
    }
    if (hasError) {
        return;
    }

    // Hiển thị trạng thái loading
    searchButton.disabled = true;
    buttonText.textContent = 'Đang tìm...';
    loadingMessage.style.display = 'block';

    try {
        const results = await callApi('searchHangBK', { maKho, maUser });
        if (results && results.length > 0) {
            results.forEach(rowData => {
                const row = resultTableBody.insertRow();
                row.insertCell().textContent = rowData.maNV;
                row.insertCell().textContent = rowData.maTaiSan;
                row.insertCell().textContent = rowData.tenTaiSan;
                row.insertCell().textContent = rowData.loaiTaiSan;
                row.insertCell().textContent = rowData.ngayNhap;
                row.insertCell().textContent = rowData.trangThai;
                row.insertCell().textContent = rowData.maKho;
                row.insertCell().textContent = rowData.tenKho;
                row.insertCell().textContent = rowData.userVaTenSoHuu;
            });
            resultTableContainer.style.display = 'block';
        } else {
            noResultsMessage.style.display = 'block';
            resultTableContainer.style.display = 'block';
        }
    } catch (error) {
        errorMessage.textContent = 'Đã xảy ra lỗi: ' + error.message;
        console.error("Lỗi gọi API tìm hàng BK:", error);
    } finally {
        searchButton.disabled = false;
        buttonText.textContent = 'Tìm Kiếm';
        loadingMessage.style.display = 'none';
    }
}

function clearSearchHangBK() {
    document.getElementById('maKhoSelect').value = '';
    document.getElementById('maUserInput').value = '';
    document.getElementById('maUserSelect').value = '';
    document.getElementById('resultTableContainerHangBK').style.display = 'none';
    document.getElementById('resultTableBodyHangBK').innerHTML = '';
    document.getElementById('errorMessageHangBK').textContent = '';
    document.getElementById('noResultsMessageHangBK').style.display = 'none';
    document.getElementById('maKhoSelect').classList.remove('input-error');
    document.getElementById('maUserInput').classList.remove('input-error');
}
// === KẾT THÚC LOGIC CHO TRANG TÌM HÀNG HÓA BACKUP ===


// --- CÁC HÀM TIỆN ÍCH KHÁC ---
function collapseSidebar(sidebarElement) { if(!isMobileView) sidebarElement.classList.add('collapsed'); hideAllDropdowns(); }
function expandSidebar(sidebarElement) { if(!isMobileView) sidebarElement.classList.remove('collapsed'); }
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
    if (timeElement) timeElement.textContent = now.toLocaleTimeString('vi-VN');
    if (dateElement) dateElement.textContent = now.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long' });
}

function forceLogout(message) {
    alert(message);
    window.location.reload();
}

async function handleAdminLogin() {
    const username = adminUsername.value.trim();
    const password = adminPassword.value;
    if (!username || !password) { adminLoginError.textContent = 'Vui lòng nhập đủ thông tin.'; return; }
    adminLoginSubmit.disabled = true;
    adminLoginSubmit.textContent = 'Đang kiểm tra...';
    adminLoginError.textContent = '';
    try {
        const response = await callApi('verifyAdminLogin', { username, password });
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
        isAdminAuthenticated = false;
        adminLoginError.textContent = 'Lỗi kết nối: ' + error.message;
    } finally {
        adminLoginSubmit.disabled = false;
        adminLoginSubmit.textContent = 'Đăng nhập';
    }
}

// === LOGIC CHO POPUP THÔNG BÁO DI ĐỘNG (MỚI THÊM) ===
function handleMobileWelcomePopup() {
    // --- Cấu hình ---
    const alwaysShowPopup = false; // Đặt là true để luôn hiện popup khi tải lại trang
    // ----------------

    const isMobileDevice = window.innerWidth <= 768; // Chỉ áp dụng cho màn hình điện thoại
    if (!isMobileDevice) return;

    const popup = document.getElementById('mobile-welcome-popup');
    const closeBtn = document.getElementById('close-mobile-popup');
    const countdownSpan = document.getElementById('popup-countdown');
    if (!popup || !closeBtn || !countdownSpan) return;

    let countdown = 5;
    let countdownInterval;
    let autoCloseTimeout;

    const closePopup = () => {
        popup.classList.remove('show');
        clearInterval(countdownInterval);
        clearTimeout(autoCloseTimeout);
    };

    const showPopup = () => {
        popup.classList.add('show');
        sessionStorage.setItem('popupShown', 'true');

        countdownInterval = setInterval(() => {
            countdown--;
            countdownSpan.textContent = countdown;
            if (countdown <= 0) {
                clearInterval(countdownInterval);
            }
        }, 1000);

        autoCloseTimeout = setTimeout(closePopup, 5000);
    };

    closeBtn.addEventListener('click', closePopup);

    const popupHasBeenShown = sessionStorage.getItem('popupShown');

    if (alwaysShowPopup || !popupHasBeenShown) {
        showPopup();
    }
}


// === MAIN EXECUTION ===
document.addEventListener('DOMContentLoaded', function() {
    renderLeftMenu();
    renderRightMenu();
    
    // === LOGIC MỚI CHO RESPONSIVE & SIDEBAR ===
    function handleResize() {
        isMobileView = window.innerWidth <= 1080;
        if (!isMobileView) {
            // Nếu chuyển sang view desktop, đóng menu mobile và loại bỏ class open
            leftSidebarContainer.classList.remove('open');
            mobileOverlay.classList.remove('show');
            // Phục hồi trạng thái ghim nếu có
            if (isSidebarPinned) {
                 expandSidebar(leftSidebarContainer);
                 expandSidebar(rightSidebarContainer);
            } else {
                 collapseSidebar(leftSidebarContainer);
                 collapseSidebar(rightSidebarContainer);
            }
        } else {
             // Trên mobile, sidebar luôn ở trạng thái "collapsed" về mặt logic desktop
             leftSidebarContainer.classList.add('collapsed');
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Chạy lần đầu khi tải trang

    sidebarToggleButton.addEventListener('click', () => {
        if (isMobileView) {
            // Chức năng cho mobile: Mở/đóng off-canvas menu
            leftSidebarContainer.classList.toggle('open');
            mobileOverlay.classList.toggle('show');
        } else {
            // Chức năng cho desktop: Ghim/bỏ ghim
            isSidebarPinned = !isSidebarPinned;
            const icon = sidebarToggleButton.querySelector('i');
            if (isSidebarPinned) {
                expandSidebar(leftSidebarContainer); expandSidebar(rightSidebarContainer);
                icon.classList.remove('fa-bars'); icon.classList.add('fa-thumbtack');
                sidebarToggleButton.title = "Bỏ ghim thanh công cụ";
            } else {
                collapseSidebar(leftSidebarContainer); collapseSidebar(rightSidebarContainer);
                icon.classList.remove('fa-thumbtack'); icon.classList.add('fa-bars');
                sidebarToggleButton.title = "Ghim thanh công cụ";
            }
        }
    });

    // Đóng sidebar khi click vào overlay
    mobileOverlay.addEventListener('click', closeMobileSidebar);
  
    // Logic cũ cho hover trên desktop
    leftSidebarContainer.addEventListener('mouseenter', () => expandSidebar(leftSidebarContainer));
    leftSidebarContainer.addEventListener('mouseleave', () => { if (!isSidebarPinned) collapseSidebar(leftSidebarContainer); });
    rightSidebarContainer.addEventListener('mouseenter', () => expandSidebar(rightSidebarContainer));
    rightSidebarContainer.addEventListener('mouseleave', () => { if (!isSidebarPinned) collapseSidebar(rightSidebarContainer); });
  
    // === CÁC EVENT LISTENER KHÁC ===
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
    document.getElementById('closeSupportPopup').addEventListener('click', () => supportPopup.classList.remove('show'));
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) hideAllDropdowns();
        if (supportPopup && !supportPopup.contains(e.target) && !supportBtn.contains(e.target)) {
            supportPopup.classList.remove('show');
        }
    }, true);
    
    updateClock();
    setInterval(updateClock, 1000);
    goToHomePage();
    
    // === KHỞI CHẠY POPUP CHO DI ĐỘNG ===
    handleMobileWelcomePopup();

    ['load', 'mousemove', 'mousedown', 'touchstart', 'click', 'keydown', 'scroll'].forEach(evt => window.addEventListener(evt, startCountdown, true));
    startCountdown();
});