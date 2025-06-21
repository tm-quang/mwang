// =================================================================================
// PHẦN 0: LOGIC KIỂM TRA ĐĂNG NHẬP (GATEKEEPER)
// =================================================================================
(function() {
    if (window.location.pathname.includes('trang-chu.html')) {
        const isAuthenticated = sessionStorage.getItem('isAuthenticated');
        if (isAuthenticated !== 'true') {
            window.location.href = 'index.html';
            return;
        }
        const userName = sessionStorage.getItem('userName') || 'User';
        const userMode = sessionStorage.getItem('userMode');
        const greetingText = document.querySelector('.greeting-text');
        if (greetingText) {
            greetingText.textContent = `Xin chào, ${userName}`;
        }
        if (userMode === 'guest') {
            document.body.classList.add('guest-mode');
            showGuestPopup();
        }
        document.body.style.visibility = 'visible';
    }
})();

// =================================================================================
// PHẦN 1: CẤU HÌNH & DỮ LIỆU TOÀN CỤC
// =================================================================================
const API_URL = "https://script.google.com/macros/s/AKfycbzly8Pbwvp0N4cWR8sb9MAuWPL32jzY4ZfkSPb-_L4QoFSeBoCEhOUsuf3NULBkV27e_w/exec";
const leftMenuData = [{
    title: 'ADMIN',
    items: [{
        id: 'btnADMIN', text: 'BẢNG ĐIỀU KHIỂN', icon: 'fa-solid fa-gears', isDropdown: true, isAdmin: true,
        subItems: [
            { id: 'btnDatabase', text: 'DATABASE', htmlFile: 'admin-database.html', icon: 'fa-solid fa-database', isAdmin: true },
            { id: 'btnUserInfo', text: 'THÔNG TIN USER', htmlFile: 'admin-user-info.html', icon: 'fa-solid fa-users', isAdmin: true },
            { id: 'btnThongBao', text: 'TẠO THÔNG BÁO MỚI', htmlFile: 'admin-thong-bao.html', icon: 'fa-regular fa-newspaper', isAdmin: true },
        ]
    }]
}, {
    title: '2025 - IT MTAY2',
    items: [{
        id: 'btnWorkLeader', text: '2025 - IT MTAY2', icon: 'fa-solid fa-user-group', isDropdown: true,
        subItems: [
            { id: 'btnWorkMT2', text: 'TRIỂN KHAI MIỀN TÂY 2', htmlFile: 'cv-trien-khai.html', icon: 'fa-solid fa-user-group' },
            { id: 'btnBHXToiUu', text: 'BHX - TỐI ƯU THIẾT BỊ', htmlFile: 'cv-trien-khai-bhx.html', icon: 'fa-solid fa-circle-check' },
        ]
    }, {
        id: 'btnDailyWork', text: 'CÔNG VIỆC HÀNG NGÀY', icon: 'fas fa-calendar-alt', isDropdown: true,
        subItems: [
            { id: 'btnMonitor', text: 'KIỂM TRA LỖI HỆ THỐNG', htmlFile: 'cv-monitor.html', icon: 'fa-solid fa-desktop' },
            { id: 'btnCbs', text: 'BÁO CÁO CHÀO BUỔI SÁNG', htmlFile: 'cv-cbs.html', icon: 'fa-solid fa-circle-check' },
            { id: 'btnTimSheet', text: 'TÌM KIẾM SHEET CÔNG VIỆC', htmlFile: 'tim-kiem-tai-lieu.html', icon: 'fa-solid fa-folder-tree' }
        ]
    }, {
        id: 'btnBTKK', text: 'LỊCH BẢO TRÌ - KIỂM KÊ', htmlFile: 'cv-bao-tri-kiem-ke.html', icon: 'fas fa-tools'
    }, {
        id: 'btnTimKiem', text: 'TÌM THÔNG TIN', icon: 'fas fa-search', isDropdown: true,
        subItems: [
            { id: 'btnTimSieuThi', text: 'TÌM KIẾM SIÊU THỊ', htmlFile: 'tim-kiem-sieu-thi.html', icon: 'fas fa-store-alt' },
            { id: 'btnTimHangBK', text: 'TÌM HÀNG HÓA BACKUP', htmlFile: 'tim-kiem-hang-bk.html', icon: 'fas fa-box-open' },
            { id: 'btnTraCuuFTTH', text: 'TRA CỨU FTTH', htmlFile: 'tra-cuu-ftth.html', icon: 'fa-solid fa-wifi' },
            { id: 'btnTimDuAn', text: 'TÌM KIẾM DỰ ÁN', htmlFile: 'tai-lieu-du-an.html', icon: 'fa-solid fa-diagram-project' },
        ]
    }]
}, {
    title: 'TÀI LIỆU - HƯỚNG DẪN',
    items: [{
        id: 'btnHuongDanIT', text: 'TÀI LIỆU - HƯỚNG DẪN', icon: 'fas fa-book', isDropdown: true,
        subItems: [
            { id: 'btnTGDD', text: 'TGDD & ĐMX', htmlFile: 'tai-lieu-tgdd-dmx.html', icon: 'fas fa-mobile-alt' },
            { id: 'btnBachHoaXanh', text: 'BÁCH HÓA XANH', htmlFile: 'tai-lieu-bhx.html', icon: 'fas fa-store' },
            { id: 'btnAvakid', text: 'AVAKID', htmlFile: 'tai-lieu-avakid.html', icon: 'fas fa-child' },
            { id: 'btnAnKhang', text: 'AN KHANG', htmlFile: 'tai-lieu-an-khang.html', icon: 'fas fa-pills' },
            { id: 'btnKhoVp', text: 'KHO/VP', htmlFile: 'tai-lieu-kho-vp.html', icon: 'fas fa-warehouse' },
        ]
    }, {
        id: 'btnphanmem', text: 'TẢI XUỐNG', icon: 'fa-solid fa-download', isDropdown: true,
        subItems: [
            { id: 'btnVPN', text: 'TẢI VPN', htmlFile: 'download-vpn.html', icon: 'fas fa-shield-alt' },
            { id: 'btnDrive', text: 'DRIVE TÀI LIỆU', htmlFile: 'download-drive.html', icon: 'fab fa-google-drive' },
        ]
    }, {
        id: 'btnDashboard', text: 'DASHBOARD', functionName: 'getPage_TaiLieuDashboard', pageTitle: '', icon: 'fas fa-tachometer-alt'
    }, ]
}];
const rightMenuData = [{
    title: "TRANG CÔNG VIỆC", icon: "fas fa-briefcase",
    items: [
                    { text: "Báo Cáo Nội Bộ", href: "https://baocaonoibo.com", icon: "fas fa-chart-bar", className: "primary" },
                    { text: "Xwork", href: "https://newticket.tgdd.vn/ticket", icon: "fas fa-ticket-alt", className: "primary" },
                    { text: "Pfcontroller", href: "https://pfsense.tgdd.vn/", icon: "fa-solid fa-server", className: "primary" },
                    { text: "IOT", href: "https://iot.tgdd.vn/", icon: "fa-regular fa-lightbulb", className: "primary" },
                    { text: "AWS", href: "https://newticket.tgdd.vn/ticket", icon: "fa-solid fa-ellipsis-vertical", className: "primary" },
                    { text: "Cms App", href: "https://cmsapp.thegioididong.com/", icon: "fa-solid fa-ellipsis-vertical", className: "primary" },
                    { text: "POS BHX", href: "https://pos.bachhoaxanh.com/", icon: "fa-solid fa-ellipsis-vertical", className: "primary" },
                ]
}, {
    title: "CÔNG CỤ", icon: "fas fa-tools",
    items: [
        { text: "Google Drive", href: "https://drive.google.com/", icon: "fab fa-google-drive", className: "info" },
        { text: "Google Sheets", href: "https://sheets.google.com/", icon: "fas fa-file-excel", className: "success" },
        { text: "Google Meet", href: "https://meet.google.com/", icon: "fas fa-video", className: "info" },
    ]
}, {
    title: "GIẢI TRÍ", icon: "fas fa-gamepad",
    items: [
        { text: "YouTube", href: "https://www.youtube.com", icon: "fab fa-youtube", className: "youtube" },
    ]
}];
let searchableMenuItems = [], dropdownTimeout, countdownInterval, isSidebarPinned = false, isMobileView = window.innerWidth <= 1080, errorAlertTimeout, successAlertTimeout;

// =================================================================================
// PHẦN 2: CÁC HÀM XỬ LÝ LOGIC
// =================================================================================

// --- Các hàm cho trang đăng nhập (index.html) ---
function showErrorAlert(message) { const alertBox = document.getElementById('errorAlert-login'), msgSpan = document.getElementById('errorAlertMessage-login'); if (msgSpan && alertBox) { msgSpan.textContent = message; alertBox.classList.add('show'); clearTimeout(errorAlertTimeout); errorAlertTimeout = setTimeout(() => { alertBox.classList.remove('show'); }, 4000); } }
function showSuccessAlert(message) { const alertBox = document.getElementById('successAlert-login'), msgSpan = document.getElementById('successAlertMessage-login'); if (msgSpan && alertBox) { msgSpan.textContent = message; alertBox.classList.add('show'); clearTimeout(successAlertTimeout); successAlertTimeout = setTimeout(() => { alertBox.classList.remove('show'); }, 4000); } }
function showTab(tabName) {
    const tab = document.getElementById(tabName + 'Tab');
    // Thêm dòng lấy phần đăng nhập khách
    const guestLoginSection = document.getElementById('guestLoginSection');

    if (tab) {
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tabName + '-tab-button').classList.add('active');

        // Thêm logic ẩn/hiện nút đăng nhập khách
        if (guestLoginSection) {
            if (tabName === 'login') {
                guestLoginSection.style.display = 'block';
            } else {
                guestLoginSection.style.display = 'none';
            }
        }
    }
}
function showLoadingIndicator() { const indicator = document.getElementById('loadingIndicator-login'); if (indicator) indicator.style.display = 'flex'; }
function hideLoadingIndicator() { const indicator = document.getElementById('loadingIndicator-login'); if (indicator) indicator.style.display = 'none'; }
function clearForm(formId) { const form = document.getElementById(formId); if (form) form.reset(); }
async function handleLogin(event) {
    if (event) event.preventDefault();
    showLoadingIndicator();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    try {
        const ipAddress = await getUserIP();
        const response = await callApi('handleLogin', { username, password, ipAddress });
        hideLoadingIndicator();
        if (response.success) {
            sessionStorage.setItem('isAuthenticated', 'true');
            sessionStorage.setItem('loginUsername', username);
            sessionStorage.setItem('userName', response.fullName);
            sessionStorage.setItem('userMode', 'user');
            sessionStorage.setItem('isAdmin', response.isAdmin || false); 

            showSuccessAlert('Đăng nhập thành công, đang chuyển trang...');
            setTimeout(() => { window.location.href = 'trang-chu.html'; }, 1500);
        } else {
            showErrorAlert(response.message);
        }
    } catch (error) {
        hideLoadingIndicator();
    }
}
async function handleSignup(event) { if (event) event.preventDefault(); const password = document.getElementById('signupPassword').value, confirmPassword = document.getElementById('signupConfirmPassword').value; if (password !== confirmPassword) { showErrorAlert('Mật khẩu xác nhận không khớp!'); return; } showLoadingIndicator(); const username = document.getElementById('signupUsername').value, fullName = document.getElementById('signupFullName').value, phone = document.getElementById('signupPhone').value; try { const response = await callApi('handleRegister', { username, password, fullName, phone }); hideLoadingIndicator(); if (response.success) { document.getElementById('signupForm').reset(); showSuccessAlert(response.message); showTab('login'); } else { showErrorAlert(response.message); } } catch (error) { hideLoadingIndicator(); } }
function handleGuestLogin() { sessionStorage.setItem('isAuthenticated', 'true'); sessionStorage.setItem('userName', 'Khách'); sessionStorage.setItem('userMode', 'guest'); sessionStorage.setItem('loginUsername', 'guest'); sessionStorage.setItem('isAdmin', false); window.location.href = 'trang-chu.html'; }

// --- Các hàm chung và cho trang chính (trang-chu.html) ---
function showGuestPopup() { if (document.getElementById('guest-popup-container')) return; const popupHTML = ` <div class="guest-popup-header"><h4>Thông Báo</h4><button class="guest-popup-close-btn">×</button></div> <div class="guest-popup-body">Bạn đang sử dụng tài khoản khách, đăng nhập hoặc đăng ký để sử dụng đầy đủ chức năng.</div> <div class="guest-popup-timer-bar"></div>`; const popup = document.createElement('div'); popup.id = 'guest-popup-container'; popup.innerHTML = popupHTML; document.body.appendChild(popup); const closePopup = () => { popup.classList.remove('show'); setTimeout(() => popup.remove(), 500); }; setTimeout(() => popup.classList.add('show'), 100); setTimeout(closePopup, 15000); popup.querySelector('.guest-popup-close-btn').addEventListener('click', closePopup); }
async function getUserIP() { try { const response = await fetch('https://api.ipify.org?format=json'); if (!response.ok) return 'N/A'; const data = await response.json(); return data.ip; } catch (error) { console.error('Không thể lấy địa chỉ IP:', error); return 'N/A'; } }
async function callApi(action, payload = {}) { try { if (!API_URL.startsWith("https://script.google.com/macros/s/AKfy")) { throw new Error("API_URL chưa được cấu hình trong file script.js."); } const url = new URL(API_URL); url.searchParams.append('action', action); url.searchParams.append('payload', JSON.stringify(payload)); const response = await fetch(url, { redirect: 'follow' }); if (!response.ok) { throw new Error(`Lỗi mạng: ${response.statusText}`); } return await response.json(); } catch (error) { console.error(`Lỗi khi gọi API cho action "${action}":`, error); if (window.location.pathname.includes('trang-chu.html')) { const functionContent = document.getElementById('functionContent'); const loadingSpinner = document.getElementById('loadingSpinner'); if (functionContent) functionContent.innerHTML = `<p style="color: red; text-align: center;">Lỗi tải dữ liệu: ${error.message}</p>`; if (loadingSpinner) loadingSpinner.style.display = 'none'; } else { showErrorAlert('Lỗi hệ thống: ' + error.message); } throw error; } }
async function handleLogout(message) { const username = sessionStorage.getItem('loginUsername'); if (username && sessionStorage.getItem('userMode') !== 'guest') { try { await callApi('logLogout', { username: username }); } catch (error) { console.error("Không thể ghi log đăng xuất:", error); } } sessionStorage.clear(); alert(message); window.location.href = 'index.html'; }
window.addEventListener('unload', function () { if (sessionStorage.getItem('isAuthenticated') === 'true') { const username = sessionStorage.getItem('loginUsername'); if (username && sessionStorage.getItem('userMode') !== 'guest') { const beaconPayload = JSON.stringify({ username: username }); const beaconURL = new URL(API_URL); beaconURL.searchParams.append('action', 'logLogout'); beaconURL.searchParams.append('payload', beaconPayload); navigator.sendBeacon(beaconURL); } } });
function createSearchableMenu() { searchableMenuItems = []; const ignoredIds = ['btnADMIN', 'btnWorkLeader', 'btnDailyWork', 'btnTimKiem', 'btnHuongDanIT', 'btnphanmem']; function flattenMenu(items, parentIsAdmin = false) { items.forEach(item => { const isAdmin = item.isAdmin || parentIsAdmin; if (item.isDropdown) { if (item.subItems) { flattenMenu(item.subItems, isAdmin); } } else if (!ignoredIds.includes(item.id)) { searchableMenuItems.push({ text: item.text, icon: item.icon, isAdmin: isAdmin, originalItem: item }); } }); } leftMenuData.forEach(section => { flattenMenu(section.items); }); }
function handleHeaderSearch(event) { const input = event.target; const suggestionsContainer = document.getElementById('header-search-suggestions'); const query = input.value.trim().toLowerCase(); suggestionsContainer.innerHTML = ''; if (query.length === 0) { suggestionsContainer.style.display = 'none'; return; } const filteredItems = searchableMenuItems.filter(item => item.text.toLowerCase().includes(query)); if (filteredItems.length > 0) { filteredItems.forEach(item => { const div = document.createElement('div'); div.className = 'suggestion-item-header'; const icon = document.createElement('i'); icon.className = `${item.icon} icon`; const span = document.createElement('span'); span.textContent = item.text; div.appendChild(icon); div.appendChild(span); div.addEventListener('click', () => { checkAdminAccessAndLoad(item); input.value = ''; suggestionsContainer.style.display = 'none'; document.getElementById('header-search-container').classList.remove('mobile-search-active'); }); suggestionsContainer.appendChild(div); }); suggestionsContainer.style.display = 'block'; } else { suggestionsContainer.innerHTML = '<div class="suggestion-item-header"><span>Không tìm thấy kết quả</span></div>'; suggestionsContainer.style.display = 'block'; } }
function updateTimerDisplay(countdownSeconds) { const timerElement = document.getElementById('session-timer'); if (timerElement) { const minutes = Math.floor(countdownSeconds / 60); const seconds = countdownSeconds % 60; timerElement.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}` } }
function startCountdown() { clearInterval(countdownInterval); let countdownSeconds = 3600; updateTimerDisplay(countdownSeconds); countdownInterval = setInterval(() => { countdownSeconds--; updateTimerDisplay(countdownSeconds); if (countdownSeconds <= 0) { clearInterval(countdownInterval); handleLogout('Phiên đã hết hạn. Vui lòng đăng nhập lại.'); } }, 1000); }
function closeMobileSidebar() { const leftSidebarContainer = document.getElementById('left-sidebar-container'); const mobileOverlay = document.getElementById('mobile-overlay'); if (isMobileView) { leftSidebarContainer.classList.remove('open'); mobileOverlay.classList.remove('show'); } }
function hideAllDropdowns() { document.querySelectorAll('.dropdown-menu.show').forEach(menu => { menu.classList.remove('show'); menu.previousElementSibling?.classList.remove('active'); }); }
function collapseSidebar(sidebarElement) { if (!isMobileView) sidebarElement.classList.add('collapsed'); hideAllDropdowns(); }
function expandSidebar(sidebarElement) { if (!isMobileView) sidebarElement.classList.remove('collapsed'); }
function renderLeftMenu() { const leftSidebarContentWrapper = document.querySelector('#left-sidebar-container .sidebar-content-wrapper'); if (!leftSidebarContentWrapper) return; leftSidebarContentWrapper.innerHTML = ''; leftMenuData.forEach((section) => { const sectionDiv = document.createElement('div'); sectionDiv.className = 'menu-section'; sectionDiv.innerHTML = `<h3 class="menu-section-title"><span>${section.title}</span></h3>`; const menuItemsContainer = document.createElement('div'); menuItemsContainer.className = 'menu-items-container'; section.items.forEach(item => { if (item.isDropdown) { const dropdownDiv = document.createElement('div'); dropdownDiv.className = 'dropdown'; const dropdownButton = document.createElement('div'); dropdownButton.className = `dropdown-button ${item.className || ''}`; dropdownButton.innerHTML = `<i class="${item.icon} icon"></i><span>${item.text}</span>`; dropdownButton.id = item.id; const dropdownMenu = document.createElement('div'); dropdownMenu.className = 'dropdown-menu'; item.subItems.forEach(subItem => { const subLink = document.createElement('a'); subLink.href = '#'; subLink.id = subItem.id; subLink.className = `menu-button-sidebar ${subItem.className || ''}`; subLink.innerHTML = `<i class="${subItem.icon} icon"></i><span>${subItem.text}</span>`; subLink.addEventListener('click', (e) => { e.preventDefault(); hideAllDropdowns(); checkAdminAccessAndLoad(subItem); if (!isSidebarPinned || isMobileView) { closeMobileSidebar(); } }); dropdownMenu.appendChild(subLink); }); dropdownDiv.appendChild(dropdownButton); dropdownDiv.appendChild(dropdownMenu); menuItemsContainer.appendChild(dropdownDiv); const showMenu = () => { hideAllDropdowns(); const rect = dropdownButton.getBoundingClientRect(); dropdownMenu.style.top = rect.top + 'px'; dropdownMenu.style.left = (rect.right + 10) + 'px'; dropdownMenu.classList.add('show'); dropdownButton.classList.add('active'); }; if (item.isAdmin) { dropdownButton.style.cursor = 'pointer'; dropdownButton.addEventListener('click', () => { checkAdminAccessAndLoad(item, showMenu); }); dropdownDiv.onmouseleave = () => { dropdownTimeout = setTimeout(() => { dropdownMenu.classList.remove('show'); dropdownButton.classList.remove('active'); }, 300); }; dropdownMenu.onmouseenter = () => clearTimeout(dropdownTimeout); } else { const hideMenu = () => { dropdownMenu.classList.remove('show'); dropdownButton.classList.remove('active'); }; dropdownButton.onmouseenter = () => { if (!isMobileView) { clearTimeout(dropdownTimeout); showMenu(); } }; dropdownButton.onclick = () => { if (isMobileView) { showMenu(); } }; dropdownButton.onmouseleave = () => { if (!isMobileView) { dropdownTimeout = setTimeout(hideMenu, 300); } }; dropdownMenu.onmouseenter = () => clearTimeout(dropdownTimeout); dropdownMenu.onmouseleave = () => { if (!isMobileView) { dropdownTimeout = setTimeout(hideMenu, 300); } }; } } else { const a = document.createElement('a'); a.href = '#'; a.id = item.id; a.className = `menu-button-sidebar ${item.className || ''}`; a.innerHTML = `<i class="${item.icon} icon"></i><span>${item.text}</span>`; a.addEventListener('click', (e) => { e.preventDefault(); hideAllDropdowns(); loadFunctionContent(item); if (!isSidebarPinned || isMobileView) { closeMobileSidebar(); } }); menuItemsContainer.appendChild(a); } }); sectionDiv.appendChild(menuItemsContainer); leftSidebarContentWrapper.appendChild(sectionDiv); }); }
function renderRightMenu() { const rightSidebarContentWrapper = document.querySelector('#right-sidebar-container .sidebar-content-wrapper'); if (!rightSidebarContentWrapper) return; rightSidebarContentWrapper.innerHTML = ''; rightMenuData.forEach(section => { const title = document.createElement('h3'); title.innerHTML = `<i class="${section.icon}"></i><span>${section.title}</span>`; const menuSection = document.createElement('div'); menuSection.className = 'right-menu-section'; section.items.forEach(item => { const link = document.createElement('a'); link.href = item.href; link.target = '_blank'; link.className = `link-button-right ${item.className || ''}`; link.innerHTML = `<i class="${item.icon} icon"></i><span>${item.text}</span>`; menuSection.appendChild(link); }); rightSidebarContentWrapper.appendChild(title); rightSidebarContentWrapper.appendChild(menuSection); }); }
async function loadFunctionContent(item) { if (!item || "object" != typeof item || !("id" in item)) return void console.error("loadFunctionContent được gọi với đối số không hợp lệ:", item); const functionContent = document.getElementById("functionContent"), loadingSpinner = document.getElementById("loadingSpinner"), currentPageTitle = document.getElementById("current-page-title"); functionContent.innerHTML = "", loadingSpinner.style.display = "block", currentPageTitle.textContent = item.pageTitle || item.text || ""; try { let htmlContent = ""; if (item.htmlFile) { const response = await fetch(item.htmlFile); if (!response.ok) throw new Error(`Không thể tải file ${item.htmlFile}: ${response.statusText}`); htmlContent = await response.text() } else { if (!item.functionName) throw new Error("Cấu hình menu không hợp lệ (thiếu htmlFile hoặc functionName)."); { const response = await callApi("getPageContent", { functionName: item.functionName }); if (!response.success || !response.html) throw new Error(response.message || "Không nhận được nội dung hợp lệ từ API."); htmlContent = response.html } } loadingSpinner.style.display = "none", functionContent.innerHTML = htmlContent, "btnTimSieuThi" === item.id ? initSearchStorePage() : "btnTimHangBK" === item.id && initSearchHangBKPage(), Array.from(functionContent.querySelectorAll("script")).forEach(oldScript => { const newScript = document.createElement("script"); Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value)), newScript.appendChild(document.createTextNode(oldScript.innerHTML)), oldScript.parentNode.replaceChild(newScript, oldScript) }), closeMobileSidebar() } catch (error) { loadingSpinner.style.display = "none", functionContent.innerHTML = `<p style="color: red; text-align: center;">Lỗi tải nội dung: ${error.message}</p>` } }
function setupCollapseListeners() { const functionContent = document.getElementById('functionContent'); functionContent.addEventListener('click', function (event) { const header = event.target.closest('.notification-header-pb3'); if (!header) return; const clickedCard = header.closest('.notification-card-pb3'); if (!clickedCard || event.target.closest('a')) return; if (clickedCard.classList.contains('collapsed')) { const allCards = functionContent.querySelectorAll('.notification-card-pb3'); allCards.forEach(card => { if (card !== clickedCard) card.classList.add('collapsed'); }); } clickedCard.classList.toggle('collapsed'); }); }
async function loadNotificationsPage() { const functionContent = document.getElementById('functionContent'), loadingSpinner = document.getElementById('loadingSpinner'), currentPageTitle = document.getElementById('current-page-title'); functionContent.innerHTML = '', loadingSpinner.style.display = 'block', currentPageTitle.textContent = 'Trang Chủ'; try { const response = await callApi('getNotifications'); if (response.success && Array.isArray(response.data)) { renderNotifications(response.data); } else { throw new Error(response.message || 'Dữ liệu trả về không hợp lệ.'); } } catch (error) { functionContent.innerHTML = `<p style="color: red; text-align: center;">Lỗi tải thông báo: ${error.message}</p>`; } finally { loadingSpinner.style.display = 'none'; } }
function renderNotifications(allNotifications) { const functionContent = document.getElementById('functionContent'), marqueeHtml = `<div class="running-text-marquee"><p>Trang đang được hoàn thiện, nếu có lỗi trong quá trình sử dụng | Liên hệ để báo lỗi hoặc góp ý: 112080 - Trần Minh Quang | ĐT: 039 418 1140 | Cảm ơn!</p></div>`; if (allNotifications.length === 1 && allNotifications[0].category === 'Lỗi') { functionContent.innerHTML = `<p style="color: red; text-align: center;">${allNotifications[0].message}</p>`; return; } const trienKhaiData = allNotifications.filter(item => item.category === 'Triển khai'), noiBoData = allNotifications.filter(item => item.category === 'Nội bộ'), createColumnHtml = (title, icon, data) => { let columnHtml = `<div class="content-column"><h2 class="column-title"><i class="fas ${icon}"></i> ${title}</h2><div class="notification-list">`; if (data.length > 0) { data.forEach(item => { const newBadgeHtml = item.isNew ? '<span class="new-badge">MỚI</span>' : "", typeBadgeHtml = item.type ? `<span class="type-badge type-${item.type.toLowerCase().replace(/[\/\\s&]/g, "-")}">${item.type}</span>` : "", linkButtonHtml = item.link ? `<a href="${item.link}" target="_blank" class="notification-link-btn-pb3"><i class="fas fa-link"></i> Link chi tiết</a>` : "", updateDateHtml = item.updateDate ? `<span class="update-date-badge"><i class="fas fa-calendar-check"></i> ${item.updateDate}</span>` : "", deadlineHtml = item.deadline ? `<span class="deadline-badge"><i class="fas fa-hourglass-half"></i> Deadline: ${item.deadline}</span>` : ""; columnHtml += `<div class="notification-card-pb3 collapsed"><div class="notification-header-pb3"><i class="${item.icon} icon"></i><h4>${item.title}</h4>${typeBadgeHtml}${newBadgeHtml}<i class="fas fa-chevron-down expand-icon"></i></div><div class="notification-message-pb3">${item.message}<div class="notification-footer-pb3"><div class="footer-left">${updateDateHtml}</div><div class="footer-center">${deadlineHtml}</div><div class="footer-right">${linkButtonHtml}</div></div></div></div>`; }); } else { columnHtml += '<p>Không có thông báo nào.</p>'; } columnHtml += '</div></div>'; return columnHtml; }; let finalHtml = marqueeHtml + '<div class="columns-container-pb2">' + createColumnHtml('THÔNG BÁO CÔNG VIỆC TRIỂN KHAI', 'fa-bullhorn', trienKhaiData) + createColumnHtml('THÔNG BÁO CÔNG VIỆC MTAY2', 'fa-users', noiBoData) + '</div>'; functionContent.innerHTML = finalHtml; setupCollapseListeners(); }
function goToHomePage() { loadNotificationsPage(); }
function initSearchStorePage() { const maSTInput = document.getElementById('maSTInput'), searchButton = document.getElementById('searchButton'), clearButton = document.getElementById('clearButton'); if (!maSTInput || !searchButton || !clearButton) return; maSTInput.addEventListener('input', handleStoreSuggestionInput); maSTInput.addEventListener('keypress', (event) => { if (event.key === 'Enter') { event.preventDefault(); handleSearchStore(); } }); searchButton.addEventListener('click', handleSearchStore); clearButton.addEventListener('click', clearStoreSearch); }
async function handleStoreSuggestionInput(event) { const maSTInput = event.target, suggestionsBox = document.getElementById('suggestions-box'), inputText = maSTInput.value; if (!suggestionsBox) return; if (inputText.length < 2) { suggestionsBox.style.display = 'none'; suggestionsBox.innerHTML = ''; return; } try { const response = await callApi('getStoreSuggestions', { partialCode: inputText }); if (response && response.length > 0) { suggestionsBox.innerHTML = ''; response.forEach(suggestion => { const item = document.createElement('div'); item.className = 'suggestion-item'; item.innerHTML = `<span class="code">${suggestion.code}</span><span class="name">${suggestion.name}</span>`; item.onclick = () => { maSTInput.value = suggestion.code; suggestionsBox.style.display = 'none'; handleSearchStore(); }; suggestionsBox.appendChild(item); }); suggestionsBox.style.display = 'block'; } else { suggestionsBox.style.display = 'none'; } } catch (error) { console.error('Lỗi khi lấy gợi ý:', error); suggestionsBox.style.display = 'none'; } }
async function handleSearchStore() { const maSTInput = document.getElementById('maSTInput'), resultOutput = document.getElementById('resultOutput'), errorMessage = document.getElementById('errorMessage'), loadingMessage = document.getElementById('loadingMessage'), searchButton = document.getElementById('searchButton'), buttonText = document.getElementById('buttonText'), suggestionsBox = document.getElementById('suggestions-box'), maST = maSTInput.value; suggestionsBox.style.display = 'none', resultOutput.style.display = 'none', errorMessage.textContent = '', maSTInput.classList.remove('error'); if (!maST.trim()) { errorMessage.textContent = 'Vui lòng nhập Mã Siêu Thị để tìm kiếm.'; maSTInput.classList.add('error'); return; } searchButton.disabled = true; buttonText.textContent = 'Đang tìm...'; loadingMessage.style.display = 'block'; try { const response = await callApi('searchStore', { maST: maST }); if (response && response.error) { errorMessage.textContent = response.message; maSTInput.classList.add('error'); } else if (response) { resultOutput.innerHTML = formatStoreSearchResult(response); resultOutput.style.display = 'block'; } else { errorMessage.textContent = `Không tìm thấy thông tin cho Mã Siêu Thị: "${maST}".`; maSTInput.classList.add('error'); } } catch (error) { errorMessage.textContent = 'Lỗi kết nối máy chủ: ' + error.message; maSTInput.classList.add('error'); } finally { searchButton.disabled = false; buttonText.textContent = 'Tìm Kiếm'; loadingMessage.style.display = 'none'; } }
function clearStoreSearch() { const maSTInput = document.getElementById('maSTInput'), resultOutput = document.getElementById('resultOutput'), errorMessage = document.getElementById('errorMessage'), suggestionsBox = document.getElementById('suggestions-box'); maSTInput.value = '', resultOutput.style.display = 'none', errorMessage.textContent = '', maSTInput.classList.remove('error'); if (suggestionsBox) suggestionsBox.style.display = 'none'; }
function formatStoreSearchResult(data) { const createRow = (icon, label, value, delay) => `<div class="result-row" style="animation-delay: ${delay}s;"><i class="fas ${icon} result-icon"></i><span class="result-label">${label}</span><span class="result-value">${value || "N/A"}</span></div>`; return `<div class="result-card"><div class="result-main-title">KẾT QUẢ TÌM KIẾM: ${data.maCN}</div><div class="result-section"><div class="result-section-title"><i class="fas fa-info-circle"></i> THÔNG TIN SIÊU THỊ</div>${createRow("fa-barcode", "Mã CN:", `<strong>${data.maCN}</strong>`, .1)}${createRow("fa-store", "Tên ST:", `<strong>${data.tenST}</strong>`, .2)}${createRow("fa-calendar-alt", "Khai Trương:", data.khaiTruong, .3)}${createRow("fa-map-marker-alt", "Maps:", `<a href="${data.maps}" target="_blank">Xem trên bản đồ</a>`, .4)}${createRow("fa-user-cog", "IT KV:", data.itKV, .5)}${createRow("fa-user-shield", "Admin:", data.admin, .6)}</div><div class="result-section"><div class="result-section-title"><i class="fas fa-tools"></i> BẢO TRÌ - KIỂM KÊ</div>${createRow("fa-calendar-check", "Ngày BT-KK:", data.ngayBTKK, .7)}${createRow("fa-file-alt", "BC Bảo Trì:", data.bcBT, .8)}${createRow("fa-clipboard-check", "BC Kiểm Kê:", data.bcKK, .9)}</div></div>`; }
function initSearchHangBKPage() { const searchButton = document.getElementById('searchButtonHangBK'), clearButton = document.getElementById('clearButtonHangBK'); if (!searchButton || !clearButton) return; searchButton.addEventListener('click', handleSearchHangBK); clearButton.addEventListener('click', clearSearchHangBK); }
async function handleSearchHangBK() { const maKhoSelect = document.getElementById('maKhoSelect'), maUserInput = document.getElementById('maUserInput'), searchButton = document.getElementById('searchButtonHangBK'), buttonText = document.getElementById('buttonTextHangBK'), resultTableContainer = document.getElementById('resultTableContainerHangBK'), resultTableBody = document.getElementById('resultTableBodyHangBK'), errorMessage = document.getElementById('errorMessageHangBK'), noResultsMessage = document.getElementById('noResultsMessageHangBK'), loadingMessage = document.getElementById('loadingMessageHangBK'), maKho = maKhoSelect.value, maUser = maUserInput.value.trim(); resultTableContainer.style.display = 'none', resultTableBody.innerHTML = '', errorMessage.textContent = '', noResultsMessage.style.display = 'none', maKhoSelect.classList.remove('input-error'), maUserInput.classList.remove('input-error'); let hasError = false; if (!maKho) { errorMessage.textContent = 'Vui lòng chọn Mã Kho. '; maKhoSelect.classList.add('input-error'); hasError = true; } if (!maUser) { errorMessage.textContent += 'Vui lòng nhập hoặc chọn Mã Nhân Viên.'; maUserInput.classList.add('input-error'); hasError = true; } if (hasError) return; searchButton.disabled = true; buttonText.textContent = 'Đang tìm...'; loadingMessage.style.display = 'block'; try { const results = await callApi('searchHangBK', { maKho, maUser }); if (results && results.length > 0) { results.forEach(rowData => { const row = resultTableBody.insertRow(); row.insertCell().textContent = rowData.maNV, row.insertCell().textContent = rowData.maTaiSan, row.insertCell().textContent = rowData.tenTaiSan, row.insertCell().textContent = rowData.loaiTaiSan, row.insertCell().textContent = rowData.ngayNhap, row.insertCell().textContent = rowData.trangThai, row.insertCell().textContent = rowData.maKho, row.insertCell().textContent = rowData.tenKho, row.insertCell().textContent = rowData.userVaTenSoHuu; }); resultTableContainer.style.display = 'block'; } else { noResultsMessage.style.display = 'block'; resultTableContainer.style.display = 'block'; } } catch (error) { errorMessage.textContent = 'Đã xảy ra lỗi: ' + error.message; } finally { searchButton.disabled = false; buttonText.textContent = 'Tìm Kiếm'; loadingMessage.style.display = 'none'; } }
function clearSearchHangBK() { document.getElementById('maKhoSelect').value = '', document.getElementById('maUserInput').value = '', document.getElementById('maUserSelect').value = '', document.getElementById('resultTableContainerHangBK').style.display = 'none', document.getElementById('resultTableBodyHangBK').innerHTML = '', document.getElementById('errorMessageHangBK').textContent = '', document.getElementById('noResultsMessageHangBK').style.display = 'none', document.getElementById('maKhoSelect').classList.remove('input-error'), document.getElementById('maUserInput').classList.remove('input-error'); }
function updateClock() { const now = new Date, timeElement = document.getElementById('clock-time'), dateElement = document.getElementById('clock-date'); if (timeElement) timeElement.textContent = now.toLocaleTimeString('vi-VN'); if (dateElement) dateElement.textContent = now.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long' }); }
function handleMobileWelcomePopup() { if (!(('ontouchstart' in window || navigator.maxTouchPoints > 0) && window.innerWidth <= 1080)) return; if (sessionStorage.getItem("popupShown")) return; const popupHTML = `<div class="mobile-popup-content"><button class="mobile-popup-close">×</button><p>Đây là giao diện cho di động, chọn chế độ "xem trang web cho máy tính" trên trình duyệt, hoặc truy cập trang trên máy tính để có trải nghiệm tốt nhất.</p><div class="mobile-popup-timer">Tự động đóng sau <span class="popup-countdown">15</span> giây...</div></div>`, popupElement = document.createElement("div"); popupElement.id = "mobile-welcome-popup", popupElement.className = "mobile-popup", popupElement.innerHTML = popupHTML, document.body.appendChild(popupElement), setTimeout(() => { popupElement && popupElement.classList.add("show") }, 20), sessionStorage.setItem("popupShown", "true"); const closeBtn = popupElement.querySelector(".mobile-popup-close"), countdownSpan = popupElement.querySelector(".popup-countdown"); let countdown = 15; const closePopup = () => { popupElement && (popupElement.classList.remove("show"), setTimeout(() => { popupElement && popupElement.remove() }, 300)), clearInterval(countdownInterval), clearTimeout(autoCloseTimeout) }; var countdownInterval = setInterval(() => { --countdown, countdownSpan && (countdownSpan.textContent = countdown), countdown <= 0 && clearInterval(countdownInterval) }, 1e3); var autoCloseTimeout = setTimeout(closePopup, 15e3); closeBtn.addEventListener("click", closePopup); }
function showAdminLoginModal(onSuccess) { const adminLoginModal = document.getElementById('adminLoginModal'), adminLoginSubmit = document.getElementById('adminLoginSubmit'), adminLoginCancel = document.getElementById('adminLoginCancel'), adminUsername = document.getElementById('adminUsername'), adminPassword = document.getElementById('adminPassword'), adminLoginError = document.getElementById('adminLoginError'); adminLoginError.textContent = '', adminPassword.value = '', adminLoginModal.style.display = 'flex', adminUsername.focus(); const handleSubmit = async () => { const username = adminUsername.value, password = adminPassword.value; if (!username || !password) { adminLoginError.textContent = 'Vui lòng nhập đủ thông tin.'; return; } const response = await callApi('verifyAdminLogin', { username, password }); if (response.success) { adminLoginModal.style.display = 'none'; if (onSuccess) onSuccess(); } else { adminLoginError.textContent = response.message || 'Sai tên đăng nhập hoặc mật khẩu.'; } }; const handleCancel = () => { adminLoginSubmit.removeEventListener('click', handleSubmit); adminLoginCancel.removeEventListener('click', handleCancel); adminLoginModal.style.display = 'none'; }; adminLoginSubmit.addEventListener('click', handleSubmit, { once: true }); adminLoginCancel.addEventListener('click', handleCancel, { once: true }); }
function checkAdminAccessAndLoad(item, callback) { const userIsAdmin = sessionStorage.getItem('isAdmin') === 'true'; const itemToLoad = item.originalItem || item; if (item.isAdmin && !userIsAdmin) { showAdminLoginModal(() => { if (callback) callback(); else loadFunctionContent(itemToLoad); }); } else { if (callback) callback(); else loadFunctionContent(itemToLoad); } }

// =================================================================================
// PHẦN 3: ĐIỂM KHỞI CHẠY CHÍNH CỦA ỨNG DỤNG
// =================================================================================
document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname.includes('trang-chu.html')) {
        const leftSidebarContainer = document.getElementById('left-sidebar-container');
        const rightSidebarContainer = document.getElementById('right-sidebar-container');
        const mobileOverlay = document.getElementById('mobile-overlay');
        const sidebarToggleButton = document.getElementById('sidebar-toggle-btn');
        const headerSearchInput = document.getElementById('header-search-input');
        const headerSearchIconMobile = document.getElementById('header-search-icon-mobile');
        const headerSearchContainer = document.getElementById('header-search-container');
        const suggestionsContainer = document.getElementById('header-search-suggestions');
        const customConfirmModal = document.getElementById('customConfirmModal');
        const supportBtn = document.getElementById('supportContactButton');
        const supportPopup = document.getElementById('supportContactPopup');

        function handleResize() {
            isMobileView = window.innerWidth <= 1080;
            if (!isMobileView) {
                leftSidebarContainer.classList.remove('open');
                mobileOverlay.classList.remove('show');
                if (isSidebarPinned) {
                    expandSidebar(leftSidebarContainer);
                    expandSidebar(rightSidebarContainer);
                } else {
                    collapseSidebar(leftSidebarContainer);
                    collapseSidebar(rightSidebarContainer);
                }
            } else {
                leftSidebarContainer.classList.add('collapsed');
            }
        }
        
        window.addEventListener('resize', handleResize);
        ['load', 'mousemove', 'mousedown', 'touchstart', 'click', 'keydown', 'scroll'].forEach(evt => window.addEventListener(evt, startCountdown, true));
        
        headerSearchInput.addEventListener('input', handleHeaderSearch);
        headerSearchInput.addEventListener('focus', handleHeaderSearch);
        headerSearchIconMobile.addEventListener('click', (e) => {
            e.stopPropagation();
            headerSearchContainer.classList.toggle('mobile-search-active');
            if (headerSearchContainer.classList.contains('mobile-search-active')) {
                headerSearchInput.focus();
            }
        });

        sidebarToggleButton.addEventListener('click', () => {
            if (isMobileView) {
                leftSidebarContainer.classList.toggle('open');
                mobileOverlay.classList.toggle('show');
            } else {
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
        
        mobileOverlay.addEventListener('click', closeMobileSidebar);
        leftSidebarContainer.addEventListener('mouseenter', () => expandSidebar(leftSidebarContainer));
        leftSidebarContainer.addEventListener('mouseleave', () => { if (!isSidebarPinned) collapseSidebar(leftSidebarContainer); });
        rightSidebarContainer.addEventListener('mouseenter', () => expandSidebar(rightSidebarContainer));
        rightSidebarContainer.addEventListener('mouseleave', () => { if (!isSidebarPinned) collapseSidebar(rightSidebarContainer); });
        
        document.getElementById('btnGoHomeHeader').addEventListener('click', goToHomePage);
        document.getElementById('logoutButton').addEventListener('click', () => { customConfirmModal.style.display = 'flex'; });
        document.getElementById('confirmBtnNo').addEventListener('click', () => { customConfirmModal.style.display = 'none'; });
        document.getElementById('confirmBtnYes').addEventListener('click', () => {
            customConfirmModal.style.display = 'none';
            handleLogout('Bạn đã đăng xuất thành công.');
        });
        
        supportBtn.addEventListener('click', () => supportPopup.classList.toggle('show'));
        document.getElementById('closeSupportPopup').addEventListener('click', () => supportPopup.classList.remove('show'));
        
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown')) hideAllDropdowns();
            if (supportPopup && !supportPopup.contains(e.target) && !supportBtn.contains(e.target)) {
                supportPopup.classList.remove('show');
            }
            if (headerSearchContainer && !headerSearchContainer.contains(e.target)) {
                suggestionsContainer.style.display = 'none';
                headerSearchContainer.classList.remove('mobile-search-active');
            }
        }, true);

        handleResize();
        createSearchableMenu();
        renderLeftMenu();
        renderRightMenu();
        goToHomePage();
        updateClock();
        setInterval(updateClock, 1000);
        startCountdown();
        handleMobileWelcomePopup();
    }
    
    else if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
        const supportWidget = document.getElementById('supportWidget');
        const supportBubble = document.getElementById('supportBubble');
        if (supportBubble) {
            supportBubble.addEventListener('click', (event) => {
                event.stopPropagation();
                if (supportWidget) supportWidget.classList.toggle('open');
            });
        }
        const closeSupportBox = document.getElementById('closeSupportBox');
        if (closeSupportBox) {
            closeSupportBox.addEventListener('click', () => {
                if (supportWidget) supportWidget.classList.remove('open');
            });
        }
        window.addEventListener('click', () => {
            if (supportWidget && supportWidget.classList.contains('open')) {
                supportWidget.classList.remove('open');
            }
        });
        document.querySelectorAll('.toggle-password').forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                const parent = e.currentTarget.closest('.form-group');
                if (parent) {
                    const passwordInput = parent.querySelector('input');
                    if (passwordInput) {
                        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                        passwordInput.setAttribute('type', type);
                        this.classList.toggle('fa-eye');
                        this.classList.toggle('fa-eye-slash');
                    }
                }
            });
        });
    }
});