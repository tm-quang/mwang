// =================================================================================
// PHẦN 0: LOGIC KIỂM TRA ĐĂNG NHẬP (GATEKEEPER)
// =================================================================================

// IIFE này sẽ chạy ngay khi script được tải để kiểm tra quyền truy cập
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

const API_URL = "https://script.google.com/macros/s/AKfycbx1k952F1I_sOdB_FNItbLLSW6o5NAiFSANIDQ2MyD9wb0itJ6TVG4Lg6urSL3hUEbcsw/exec";

// --- Dữ liệu Menu ---
const leftMenuData = [{
    title: 'ADMIN',
    items: [{
        id: 'btnADMIN', text: 'QUẢN TRỊ HỆ THỐNG', icon: 'fa-solid fa-sliders', isDropdown: true, isAdmin: true,
        subItems: [
            { id: 'btnDatabase', text: 'DATABASE', htmlFile: 'admin-database.html', icon: 'fa-solid fa-database' },
            { id: 'btnUserInfo', text: 'THÔNG TIN USER', htmlFile: 'admin-user-info.html', icon: 'fa-solid fa-users' },
            { id: 'btnThongBao', text: 'TẠO THÔNG BÁO MỚI', htmlFile: 'admin-thong-bao.html', icon: 'fa-regular fa-newspaper' },
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
            { id: 'btnTimSheet', text: 'TÌM KIẾM SHEET CÔNG VIỆC', htmlFile: 'tim-kiem-tai-lieu.html', pageTitle: 'TÌM KIẾM SHEET CÔNG VIỆC', icon: 'fa-solid fa-folder-tree' }
        ]
    }, {
        id: 'btnBTKK', text: 'LỊCH BẢO TRÌ - KIỂM KÊ', htmlFile: 'cv-bao-tri-kiem-ke.html', icon: 'fas fa-tools'
    }, {
        id: 'btnTimKiem', text: 'TÌM THÔNG TIN', icon: 'fas fa-search', isDropdown: true,
        subItems: [
            { id: 'btnTimSieuThi', text: 'TÌM KIẾM SIÊU THỊ', htmlFile: 'tim-kiem-sieu-thi.html', icon: 'fas fa-store-alt' },
            { id: 'btnTimHangBK', text: 'TÌM HÀNG HÓA BACKUP', htmlFile: 'tim-kiem-hang-bk.html', icon: 'fas fa-box-open' },
            { id: 'btnTraCuuFTTH', text: 'TRA CỨU FTTH', htmlFile: 'tra-cuu-ftth.html', icon: 'fa-solid fa-wifi' },
            { id: 'btnTimDuAn', text: 'TÌM KIẾM DỰ ÁN', htmlFile: 'tai-lieu-du-an.html', pageTitle: 'ĐANG PHÁT TRIỂN', icon: 'fa-solid fa-diagram-project' },
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
        id: 'btnDashboard', text: 'BẢNG ĐIỀU KHIỂN', functionName: 'getPage_TaiLieuDashboard', pageTitle: 'BẢNG ĐIỀU KHIỂN CHÍNH - TEST', icon: 'fas fa-tachometer-alt'
    }, ]
}];

        const rightMenuData = [
            {
                title: "TRANG CÔNG VIỆC",
                icon: "fas fa-briefcase",
                items: [
                    { text: "Báo Cáo Nội Bộ", href: "https://baocaonoibo.com", icon: "fas fa-chart-bar", className: "primary" },
                    { text: "Xwork", href: "https://newticket.tgdd.vn/ticket", icon: "fas fa-ticket-alt", className: "primary" },
                    { text: "Pfcontroller", href: "https://pfsense.tgdd.vn/", icon: "fa-solid fa-server", className: "primary" },
                    { text: "IOT", href: "https://iot.tgdd.vn/", icon: "fa-regular fa-lightbulb", className: "primary" },
                    { text: "AWS", href: "https://newticket.tgdd.vn/ticket", icon: "fa-solid fa-ellipsis-vertical", className: "primary" },
                    { text: "Cms App", href: "https://cmsapp.thegioididong.com/", icon: "fa-solid fa-ellipsis-vertical", className: "primary" },
                    { text: "POS BHX", href: "https://pos.bachhoaxanh.com/", icon: "fa-solid fa-ellipsis-vertical", className: "primary" },
                ]
            },
            {
                title: "CÔNG CỤ",
                icon: "fas fa-tools",
                items: [
                    { text: "Google Drive", href: "https://drive.google.com/", icon: "fa-solid fa-cloud" , className: "info" },
                    { text: "Google Sheets", href: "https://sheets.google.com/", icon: "fa-solid fa-file" , className: "info" },
                    { text: "Google Meet", href: "https://meet.google.com/", icon: "fa-solid fa-video" , className: "info" },
                ]
            },
            {
                title: "GIẢI TRÍ",
                icon: "fas fa-gamepad",
                 items: [
                    { text: "YouTube", href: "https://youtube.com", icon: "fab fa-youtube" , className: "youtube" },
                ]
            }
        ];

// --- Biến trạng thái toàn cục ---
let searchableMenuItems = [];
let dropdownTimeout;
let isAdminAuthenticated = false;
let countdownInterval;
let isSidebarPinned = false;
let isMobileView = window.innerWidth <= 1080;   
let errorAlertTimeout;
let successAlertTimeout;


// =================================================================================
// PHẦN 2: CÁC HÀM XỬ LÝ LOGIC
// =================================================================================

function showErrorAlert(e) {
    const t = document.getElementById("errorAlert-login"),
        o = document.getElementById("errorAlertMessage-login");
    o && t && (o.textContent = e, t.classList.add("show"), clearTimeout(errorAlertTimeout), errorAlertTimeout = setTimeout(() => {
        t.classList.remove("show")
    }, 4e3))
}
function showSuccessAlert(e) {
    const t = document.getElementById("successAlert-login"),
        o = document.getElementById("successAlertMessage-login");
    o && t && (o.textContent = e, t.classList.add("show"), clearTimeout(successAlertTimeout), successAlertTimeout = setTimeout(() => {
        t.classList.remove("show")
    }, 4e3))
}
function showTab(e) {
    const t = document.getElementById(e + "Tab");
    t && (document.querySelectorAll(".tab-content").forEach(e => e.classList.remove("active")), document.querySelectorAll(".tab-button").forEach(e => e.classList.remove("active")), t.classList.add("active"), document.getElementById(e + "-tab-button").classList.add("active"))
}
function showLoadingIndicator() {
    const e = document.getElementById("loadingIndicator-login");
    e && (e.style.display = "flex")
}
function hideLoadingIndicator() {
    const e = document.getElementById("loadingIndicator-login");
    e && (e.style.display = "none")
}
function clearForm(e) {
    const t = document.getElementById(e);
    t && t.reset()
}
async function handleLogin(e) {
    e && e.preventDefault(), showLoadingIndicator();
    const t = document.getElementById("loginUsername").value,
        o = document.getElementById("loginPassword").value;
    try {
        const e = await getUserIP(),
            n = await callApi("handleLogin", {
                username: t,
                password: o,
                ipAddress: e
            });
        hideLoadingIndicator(), n.success ? (sessionStorage.setItem("isAuthenticated", "true"), sessionStorage.setItem("loginUsername", t), sessionStorage.setItem("userName", n.fullName), sessionStorage.setItem("userMode", "user"), showSuccessAlert("Đăng nhập thành công, đang chuyển trang..."), setTimeout(() => {
            window.location.href = "trang-chu.html"
        }, 1500)) : showErrorAlert(n.message)
    } catch (e) {
        hideLoadingIndicator()
    }
}
async function handleSignup(e) {
    e && e.preventDefault();
    const t = document.getElementById("signupPassword").value,
        o = document.getElementById("signupConfirmPassword").value;
    if (t !== o) return void showErrorAlert("Mật khẩu xác nhận không khớp!");
    showLoadingIndicator();
    const n = document.getElementById("signupUsername").value,
        i = document.getElementById("signupFullName").value,
        s = document.getElementById("signupPhone").value;
    try {
        const e = await callApi("handleRegister", {
            username: n,
            password: t,
            fullName: i,
            phone: s
        });
        hideLoadingIndicator(), e.success ? (document.getElementById("signupForm").reset(), showSuccessAlert(e.message), showTab("login")) : showErrorAlert(e.message)
    } catch (e) {
        hideLoadingIndicator()
    }
}
function handleGuestLogin() {
    sessionStorage.setItem("isAuthenticated", "true"), sessionStorage.setItem("userName", "Khách"), sessionStorage.setItem("userMode", "guest"), sessionStorage.setItem("loginUsername", "guest"), window.location.href = "trang-chu.html"
}
async function getUserIP() {
    try {
        const e = await fetch("https://api.ipify.org?format=json");
        if (!e.ok) return "N/A";
        return (await e.json()).ip
    } catch (e) {
        return console.error("Không thể lấy địa chỉ IP:", e), "N/A"
    }
}
async function callApi(e, t = {}) {
    try {
        if (!API_URL.startsWith("https://script.google.com/macros/s/AKfy")) throw new Error("API_URL chưa được cấu hình trong file script.js.");
        const o = new URL(API_URL);
        o.searchParams.append("action", e), o.searchParams.append("payload", JSON.stringify(t));
        const n = await fetch(o, {
            redirect: "follow"
        });
        if (!n.ok) throw new Error(`Lỗi mạng: ${n.statusText}`);
        return await n.json()
    } catch (t) {
        if (console.error(`Lỗi khi gọi API cho action "${e}":`, t), window.location.pathname.includes("trang-chu.html")) {
            const e = document.getElementById("functionContent"),
                o = document.getElementById("loadingSpinner");
            e && (e.innerHTML = `<p style="color: red; text-align: center;">Lỗi tải dữ liệu: ${t.message}</p>`), o && (o.style.display = "none")
        } else showErrorAlert("Lỗi hệ thống: " + t.message);
        throw t
    }
}
async function handleLogout(e) {
    const t = sessionStorage.getItem("loginUsername");
    if (t && "guest" !== sessionStorage.getItem("userMode")) try {
        await callApi("logLogout", {
            username: t
        })
    } catch (e) {
        console.error("Không thể ghi log đăng xuất:", e)
    }
    sessionStorage.clear(), alert(e), window.location.href = "index.html"
}
function createSearchableMenu() {
    searchableMenuItems = [];
    const e = ["btnADMIN", "btnWorkLeader", "btnDailyWork", "btnTimKiem", "btnHuongDanIT", "btnphanmem"];

    function t(o) {
        o.forEach(o => {
            o.isDropdown ? o.subItems && t(o.subItems) : e.includes(o.id) || searchableMenuItems.push({
                text: o.text,
                icon: o.icon,
                originalItem: o
            })
        })
    }
    leftMenuData.forEach(e => {
        t(e.items)
    })
}
function handleHeaderSearch(e) {
    const t = e.target,
        o = document.getElementById("header-search-suggestions"),
        n = t.value.trim().toLowerCase();
    if (0 === n.length) return void(o.style.display = "none");
    const i = searchableMenuItems.filter(e => e.text.toLowerCase().includes(n));
    o.innerHTML = "", i.length > 0 ? (i.forEach(e => {
        const n = document.createElement("div");
        n.className = "suggestion-item-header", n.innerHTML = `<i class="${e.icon} icon"></i><span>${e.text}</span>`, n.addEventListener("click", () => {
            loadFunctionContent(e.originalItem), t.value = "", o.style.display = "none", document.getElementById("header-search-container").classList.remove("mobile-search-active")
        }), o.appendChild(n)
    }), o.style.display = "block") : (o.innerHTML = '<div class="suggestion-item-header"><span>Không tìm thấy kết quả</span></div>', o.style.display = "block")
}
function updateTimerDisplay(e) {
    const t = document.getElementById("session-timer");
    if (t) {
        const o = Math.floor(e / 60);
        e %= 60, t.textContent = `${String(o).padStart(2,"0")}:${String(e).padStart(2,"0")}`
    }
}
function startCountdown() {
    clearInterval(countdownInterval);
    let e = 3600;
    updateTimerDisplay(e), countdownInterval = setInterval(() => {
        --e, updateTimerDisplay(e), e <= 0 && (clearInterval(countdownInterval), handleLogout("Phiên đã hết hạn. Vui lòng đăng nhập lại."))
    }, 1e3)
}
function closeMobileSidebar() {
    const e = document.getElementById("left-sidebar-container"),
        t = document.getElementById("mobile-overlay");
    isMobileView && (e.classList.remove("open"), t.classList.remove("show"))
}
function hideAllDropdowns() {
    document.querySelectorAll(".dropdown-menu.show").forEach(e => {
        e.classList.remove("show"), e.previousElementSibling?.classList.remove("active")
    })
}
function collapseSidebar(e) {
    isMobileView || e.classList.add("collapsed"), hideAllDropdowns()
}
function expandSidebar(e) {
    isMobileView || e.classList.remove("collapsed")
}
function renderLeftMenu() {
    const e = document.querySelector("#left-sidebar-container .sidebar-content-wrapper");
    if (!e) return;
    e.innerHTML = "", leftMenuData.forEach(t => {
        const o = document.createElement("div");
        o.className = "menu-section", o.innerHTML = `<h3 class="menu-section-title"><span>${t.title}</span></h3>`;
        const n = document.createElement("div");
        n.className = "menu-items-container", t.items.forEach(t => {
            if (t.isDropdown) {
                const i = document.createElement("div");
                i.className = "dropdown";
                const s = document.createElement("div");
                s.className = `dropdown-button ${t.className||""}`, s.innerHTML = `<i class="${t.icon} icon"></i><span>${t.text}</span>`, s.id = t.id;
                const a = document.createElement("div");
                a.className = "dropdown-menu", t.subItems.forEach(e => {
                    const t = document.createElement("a");
                    t.href = "#", t.id = e.id, t.className = `menu-button-sidebar ${e.className||""}`, t.innerHTML = `<i class="${e.icon} icon"></i><span>${e.text}</span>`, t.addEventListener("click", t => {
                        t.preventDefault(), hideAllDropdowns(), loadFunctionContent(e), isSidebarPinned || !isMobileView || closeMobileSidebar()
                    }), a.appendChild(t)
                }), i.appendChild(s), i.appendChild(a), n.appendChild(i);
                const d = () => {
                    hideAllDropdowns();
                    const e = s.getBoundingClientRect();
                    a.style.top = e.top + "px", a.style.left = e.right + 10 + "px", a.classList.add("show"), s.classList.add("active")
                };
                t.isAdmin ? (s.style.cursor = "pointer", s.addEventListener("click", () => {
                    "guest" !== sessionStorage.getItem("userMode") && (isAdminAuthenticated ? d() : (hideAllDropdowns(), document.getElementById("adminLoginError").textContent = "", document.getElementById("adminLoginModal").style.display = "flex", document.getElementById("adminUsername").focus()))
                }), i.onmouseleave = () => {
                    dropdownTimeout = setTimeout(() => {
                        a.classList.remove("show"), s.classList.remove("active")
                    }, 300)
                }, a.onmouseenter = () => clearTimeout(dropdownTimeout)) : (() => {
                    a.classList.remove("show"), s.classList.remove("active")
                }, s.onmouseenter = () => {
                    isMobileView || (clearTimeout(dropdownTimeout), d())
                }, s.onclick = () => {
                    isMobileView && d()
                }, s.onmouseleave = () => {
                    isMobileView || (dropdownTimeout = setTimeout(hideMenu, 300))
                }, a.onmouseenter = () => clearTimeout(dropdownTimeout), a.onmouseleave = () => {
                    isMobileView || (dropdownTimeout = setTimeout(hideMenu, 300))
                })
            } else {
                const e = document.createElement("a");
                e.href = "#", e.id = t.id, e.className = `menu-button-sidebar ${t.className||""}`, e.innerHTML = `<i class="${t.icon} icon"></i><span>${t.text}</span>`, e.addEventListener("click", e => {
                    e.preventDefault(), hideAllDropdowns(), loadFunctionContent(t), isSidebarPinned || !isMobileView || closeMobileSidebar()
                }), n.appendChild(e)
            }
        }), o.appendChild(n), e.appendChild(o)
    })
}
function renderRightMenu() {
    const e = document.querySelector("#right-sidebar-container .sidebar-content-wrapper");
    if (!e) return;
    e.innerHTML = "", rightMenuData.forEach(t => {
        const o = document.createElement("h3");
        o.innerHTML = `<i class="${t.icon}"></i><span>${t.title}</span>`;
        const n = document.createElement("div");
        n.className = "right-menu-section", t.items.forEach(e => {
            const t = document.createElement("a");
            t.href = e.href, t.target = "_blank", t.className = `link-button-right ${e.className||""}`, t.innerHTML = `<i class="${e.icon} icon"></i><span>${e.text}</span>`, n.appendChild(t)
        }), e.appendChild(o), e.appendChild(n)
    })
}
async function loadFunctionContent(e) {
    if (!e || "object" != typeof e || !("id" in e)) return void console.error("loadFunctionContent được gọi với đối số không hợp lệ:", e);
    const t = document.getElementById("functionContent"),
        o = document.getElementById("loadingSpinner"),
        n = document.getElementById("current-page-title");
    t.innerHTML = "", o.style.display = "block", n.textContent = e.pageTitle || e.text || "";
    try {
        let n = "";
        if (e.htmlFile) {
            const t = await fetch(e.htmlFile);
            if (!t.ok) throw new Error(`Không thể tải file ${e.htmlFile}: ${t.statusText}`);
            n = await t.text()
        } else {
            if (!e.functionName) throw new Error("Cấu hình menu không hợp lệ (thiếu htmlFile hoặc functionName)."); {
                const t = await callApi("getPageContent", {
                    functionName: e.functionName
                });
                if (!t.success || !t.html) throw new Error(t.message || "Không nhận được nội dung hợp lệ từ API.");
                n = t.html
            }
        }
        o.style.display = "none", t.innerHTML = n, "btnTimSieuThi" === e.id ? initSearchStorePage() : "btnTimHangBK" === e.id && initSearchHangBKPage(), Array.from(t.querySelectorAll("script")).forEach(e => {
            const t = document.createElement("script");
            Array.from(e.attributes).forEach(e => t.setAttribute(e.name, e.value)), t.appendChild(document.createTextNode(e.innerHTML)), e.parentNode.replaceChild(t, e)
        }), closeMobileSidebar()
    } catch (e) {
        o.style.display = "none", t.innerHTML = `<p style="color: red; text-align: center;">Lỗi tải nội dung: ${e.message}</p>`
    }
}
function setupCollapseListeners() {
    document.getElementById("functionContent").addEventListener("click", function(e) {
        const t = e.target.closest(".notification-header-pb3");
        if (!t) return;
        const o = t.closest(".notification-card-pb3");
        !o || e.target.closest("a") || (o.classList.contains("collapsed") && document.querySelectorAll(".notification-card-pb3").forEach(e => {
            e !== o && e.classList.add("collapsed")
        }), o.classList.toggle("collapsed"))
    })
}
async function loadNotificationsPage() {
    const e = document.getElementById("functionContent"),
        t = document.getElementById("loadingSpinner"),
        o = document.getElementById("current-page-title");
    e.innerHTML = "", t.style.display = "block", o.textContent = "Trang Chủ";
    try {
        const t = await callApi("getNotifications");
        if (!t.success || !Array.isArray(t.data)) throw new Error(t.message || "Dữ liệu trả về không hợp lệ.");
        renderNotifications(t.data)
    } catch (t) {
        e.innerHTML = `<p style="color: red; text-align: center;">Lỗi tải thông báo: ${t.message}</p>`
    } finally {
        t.style.display = "none"
    }
}
function renderNotifications(e) {
    const t = document.getElementById("functionContent"),
        o = '<div class="running-text-marquee"><p>Trang đang được hoàn thiện, nếu có lỗi trong quá trình sử dụng | Liên hệ để báo lỗi hoặc góp ý: 112080 - Trần Minh Quang | ĐT: 039 418 1140 | Cảm ơn!</p></div>';
    if (1 === e.length && "Lỗi" === e[0].category) return void(t.innerHTML = `<p style="color: red; text-align: center;">${e[0].message}</p>`);
    const n = e.filter(e => "Triển khai" === e.category),
        i = e.filter(e => "Nội bộ" === e.category),
        s = (e, t, o) => {
            let n = `<div class="content-column"><h2 class="column-title"><i class="fas ${t}"></i> ${e}</h2><div class="notification-list">`;
            if (o.length > 0) o.forEach(e => {
                const t = e.isNew ? '<span class="new-badge">MỚI</span>' : "",
                    o = e.type ? `<span class="type-badge type-${e.type.toLowerCase().replace(/[\/\\s&]/g,"-")}">${e.type}</span>` : "",
                    i = e.link ? `<a href="${e.link}" target="_blank" class="notification-link-btn-pb3"><i class="fas fa-link"></i> Link chi tiết</a>` : "",
                    s = e.updateDate ? `<span class="update-date-badge"><i class="fas fa-calendar-check"></i> ${e.updateDate}</span>` : "",
                    a = e.deadline ? `<span class="deadline-badge"><i class="fas fa-hourglass-half"></i> Deadline: ${e.deadline}</span>` : "";
                n += `<div class="notification-card-pb3 collapsed"><div class="notification-header-pb3"><i class="${e.icon} icon"></i><h4>${e.title}</h4>${o}${t}<i class="fas fa-chevron-down expand-icon"></i></div><div class="notification-message-pb3">${e.message}<div class="notification-footer-pb3"><div class="footer-left">${s}</div><div class="footer-center">${a}</div><div class="footer-right">${i}</div></div></div></div>`
            });
            else n += "<p>Không có thông báo nào.</p>";
            return n += "</div></div>"
        };
    t.innerHTML = o + '<div class="columns-container-pb2">' + s("THÔNG BÁO CÔNG VIỆC TRIỂN KHAI", "fa-bullhorn", n) + s("THÔNG BÁO CÔNG VIỆC MTAY2", "fa-users", i) + "</div>", setupCollapseListeners()
}
function goToHomePage() {
    loadNotificationsPage()
}
function initSearchStorePage() {
    const e = document.getElementById("maSTInput"),
        t = document.getElementById("searchButton"),
        o = document.getElementById("clearButton");
    e && t && o && (e.addEventListener("input", handleStoreSuggestionInput), e.addEventListener("keypress", e => {
        "Enter" === e.key && (e.preventDefault(), handleSearchStore())
    }), t.addEventListener("click", handleSearchStore), o.addEventListener("click", clearStoreSearch))
}
async function handleStoreSuggestionInput(e) {
    const t = e.target,
        o = document.getElementById("suggestions-box"),
        n = t.value;
    if (!o) return;
    if (n.length < 2) return o.style.display = "none", void(o.innerHTML = "");
    try {
        const e = await callApi("getStoreSuggestions", {
            partialCode: n
        });
        e && e.length > 0 ? (o.innerHTML = "", e.forEach(e => {
            const n = document.createElement("div");
            n.className = "suggestion-item", n.innerHTML = `<span class="code">${e.code}</span><span class="name">${e.name}</span>`, n.onclick = () => {
                t.value = e.code, o.style.display = "none", handleSearchStore()
            }, o.appendChild(n)
        }), o.style.display = "block") : o.style.display = "none"
    } catch (e) {
        console.error("Lỗi khi lấy gợi ý:", e), o.style.display = "none"
    }
}
async function handleSearchStore() {
    const e = document.getElementById("maSTInput"),
        t = document.getElementById("resultOutput"),
        o = document.getElementById("errorMessage"),
        n = document.getElementById("loadingMessage"),
        i = document.getElementById("searchButton"),
        s = document.getElementById("buttonText"),
        a = document.getElementById("suggestions-box"),
        d = e.value;
    a.style.display = "none", t.style.display = "none", o.textContent = "", e.classList.remove("error");
    if (!d.trim()) return o.textContent = "Vui lòng nhập Mã Siêu Thị để tìm kiếm.", void e.classList.add("error");
    i.disabled = !0, s.textContent = "Đang tìm...", n.style.display = "block";
    try {
        const n = await callApi("searchStore", {
            maST: d
        });
        n && n.error ? (o.textContent = n.message, e.classList.add("error")) : n ? (t.innerHTML = formatStoreSearchResult(n), t.style.display = "block") : (o.textContent = `Không tìm thấy thông tin cho Mã Siêu Thị: "${d}".`, e.classList.add("error"))
    } catch (t) {
        o.textContent = "Lỗi kết nối máy chủ: " + t.message, e.classList.add("error")
    } finally {
        i.disabled = !1, s.textContent = "Tìm Kiếm", n.style.display = "none"
    }
}
function clearStoreSearch() {
    const e = document.getElementById("maSTInput"),
        t = document.getElementById("resultOutput"),
        o = document.getElementById("errorMessage"),
        n = document.getElementById("suggestions-box");
    e.value = "", t.style.display = "none", o.textContent = "", e.classList.remove("error"), n && (n.style.display = "none")
}
function formatStoreSearchResult(e) {
    const t = (e, t, o, n) => `<div class="result-row" style="animation-delay: ${n}s;"><i class="fas ${e} result-icon"></i><span class="result-label">${t}</span><span class="result-value">${o||"N/A"}</span></div>`;
    return `<div class="result-card"><div class="result-main-title">KẾT QUẢ TÌM KIẾM: ${e.maCN}</div><div class="result-section"><div class="result-section-title"><i class="fas fa-info-circle"></i> THÔNG TIN SIÊU THỊ</div>${t("fa-barcode","Mã CN:",`<strong>${e.maCN}</strong>`,.1)}${t("fa-store","Tên ST:",`<strong>${e.tenST}</strong>`,.2)}${t("fa-calendar-alt","Khai Trương:",e.khaiTruong,.3)}${t("fa-map-marker-alt","Maps:",`<a href="${e.maps}" target="_blank">Xem trên bản đồ</a>`,.4)}${t("fa-user-cog","IT KV:",e.itKV,.5)}${t("fa-user-shield","Admin:",e.admin,.6)}</div><div class="result-section"><div class="result-section-title"><i class="fas fa-tools"></i> BẢO TRÌ - KIỂM KÊ</div>${t("fa-calendar-check","Ngày BT-KK:",e.ngayBTKK,.7)}${t("fa-file-alt","BC Bảo Trì:",e.bcBT,.8)}${t("fa-clipboard-check","BC Kiểm Kê:",e.bcKK,.9)}</div></div>`
}
function initSearchHangBKPage() {
    const e = document.getElementById("searchButtonHangBK"),
        t = document.getElementById("clearButtonHangBK");
    e && t && (e.addEventListener("click", handleSearchHangBK), t.addEventListener("click", clearSearchHangBK))
}
async function handleSearchHangBK() {
    const e = document.getElementById("maKhoSelect"),
        t = document.getElementById("maUserInput"),
        o = document.getElementById("searchButtonHangBK"),
        n = document.getElementById("buttonTextHangBK"),
        i = document.getElementById("resultTableContainerHangBK"),
        s = document.getElementById("resultTableBodyHangBK"),
        a = document.getElementById("errorMessageHangBK"),
        d = document.getElementById("noResultsMessageHangBK"),
        r = document.getElementById("loadingMessageHangBK"),
        l = e.value,
        c = t.value.trim();
    i.style.display = "none", s.innerHTML = "", a.textContent = "", d.style.display = "none", e.classList.remove("input-error"), t.classList.remove("input-error");
    let u = !1;
    l || (a.textContent = "Vui lòng chọn Mã Kho. ", e.classList.add("input-error"), u = !0), c || (a.textContent += "Vui lòng nhập hoặc chọn Mã Nhân Viên.", t.classList.add("input-error"), u = !0);
    if (u) return;
    o.disabled = !0, n.textContent = "Đang tìm...", r.style.display = "block";
    try {
        const e = await callApi("searchHangBK", {
            maKho: l,
            maUser: c
        });
        e && e.length > 0 ? (e.forEach(e => {
            const t = s.insertRow();
            t.insertCell().textContent = e.maNV, t.insertCell().textContent = e.maTaiSan, t.insertCell().textContent = e.tenTaiSan, t.insertCell().textContent = e.loaiTaiSan, t.insertCell().textContent = e.ngayNhap, t.insertCell().textContent = e.trangThai, t.insertCell().textContent = e.maKho, t.insertCell().textContent = e.tenKho, t.insertCell().textContent = e.userVaTenSoHuu
        }), i.style.display = "block") : (d.style.display = "block", i.style.display = "block")
    } catch (e) {
        a.textContent = "Đã xảy ra lỗi: " + e.message
    } finally {
        o.disabled = !1, n.textContent = "Tìm Kiếm", r.style.display = "none"
    }
}
function clearSearchHangBK() {
    document.getElementById("maKhoSelect").value = "", document.getElementById("maUserInput").value = "", document.getElementById("maUserSelect").value = "", document.getElementById("resultTableContainerHangBK").style.display = "none", document.getElementById("resultTableBodyHangBK").innerHTML = "", document.getElementById("errorMessageHangBK").textContent = "", document.getElementById("noResultsMessageHangBK").style.display = "none", document.getElementById("maKhoSelect").classList.remove("input-error"), document.getElementById("maUserInput").classList.remove("input-error")
}
function updateClock() {
    const e = new Date,
        t = document.getElementById("clock-time"),
        o = document.getElementById("clock-date");
    t && (t.textContent = e.toLocaleTimeString("vi-VN")), o && (o.textContent = e.toLocaleDateString("vi-VN", {
        weekday: "long",
        day: "numeric",
        month: "long"
    }))
}
function handleAdminLogin() {
    const e = document.getElementById("adminUsername"),
        t = document.getElementById("adminPassword"),
        o = document.getElementById("adminLoginError"),
        n = document.getElementById("adminLoginSubmit"),
        i = document.getElementById("adminLoginModal"),
        s = e.value.trim(),
        a = t.value;
    if (!s || !a) return void(o.textContent = "Vui lòng nhập đủ thông tin.");
    n.disabled = !0, n.textContent = "Đang kiểm tra...", o.textContent = "", setTimeout(() => {
        "admin" === s && "dictionary" === a || "mwang" === s && "1412" === a ? (isAdminAuthenticated = !0, i.style.display = "none", e.value = "", t.value = "", document.getElementById("btnADMIN").click()) : (isAdminAuthenticated = !1, o.textContent = "Sai tên đăng nhập hoặc mật khẩu.", t.value = "", e.focus()), n.disabled = !1, n.textContent = "Đăng nhập"
    }, 500)
}
function handleMobileWelcomePopup() {
    if (!("ontouchstart" in window || navigator.maxTouchPoints > 0) || !window.innerWidth <= 1080) return;
    if (sessionStorage.getItem("popupShown")) return;
    const e = '<div class="mobile-popup-content"><button class="mobile-popup-close">×</button><p>Đây là giao diện cho di động, chọn chế độ "xem trang web cho máy tính" trên trình duyệt, hoặc truy cập trang trên máy tính để có trải nghiệm tốt nhất.</p><div class="mobile-popup-timer">Tự động đóng sau <span class="popup-countdown">15</span> giây...</div></div>',
        t = document.createElement("div");
    t.id = "mobile-welcome-popup", t.className = "mobile-popup", t.innerHTML = e, document.body.appendChild(t), setTimeout(() => {
        t && t.classList.add("show")
    }, 20), sessionStorage.setItem("popupShown", "true");
    const o = t.querySelector(".mobile-popup-close"),
        n = t.querySelector(".popup-countdown");
    let i = 15;
    const s = () => {
        t && (t.classList.remove("show"), setTimeout(() => {
            t && t.remove()
        }, 300)), clearInterval(a), clearTimeout(d)
    };
    var a = setInterval(() => {
        --i, n && (n.textContent = i), i <= 0 && clearInterval(a)
    }, 1e3);
    var d = setTimeout(s, 15e3);
    o.addEventListener("click", s)
}


// =================================================================================
// PHẦN 3: ĐIỂM KHỞI CHẠY CHÍNH CỦA ỨNG DỤNG
// =================================================================================
document.addEventListener('DOMContentLoaded', function() {

    // --- LOGIC CHO TRANG CHÍNH ---
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
        const adminLoginModal = document.getElementById('adminLoginModal');
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
        document.getElementById('adminLoginSubmit').addEventListener('click', handleAdminLogin);
        document.getElementById('adminLoginCancel').addEventListener('click', () => { adminLoginModal.style.display = 'none'; });
        document.getElementById('adminPassword').addEventListener('keypress', (e) => { if (e.key === 'Enter') handleAdminLogin(); });
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

        // --- Khởi tạo ứng dụng ---
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
    
    // --- LOGIC CHO TRANG ĐĂNG NHẬP ---
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