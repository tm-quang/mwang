document.addEventListener('DOMContentLoaded', function() {

    // ===================================================================
    // A. CONFIG & DATA
    // ===================================================================

    const leftMenuData = [
        {
            title: 'ADMIN',
            items: [
              { text: 'QUẢN TRỊ HỆ THỐNG', icon: 'fa-solid fa-sliders', isDropdown: true, 
                subItems: [
                    { text: 'DATABASE', pageUrl: '#', icon: 'fa-solid fa-database' },
                    { text: 'QUẢN LÝ USER', pageUrl: '#', icon: 'fa-solid fa-users' },
                ]
              }
            ]
        },
        {
            title: '2025 - IT MTAY2',
            items: [
                { text: 'CÔNG VIỆC HÀNG NGÀY', icon: 'fas fa-calendar-alt', isDropdown: true, 
                    subItems: [ 
                        { text: 'KIỂM TRA LỖI', pageUrl: '#', icon: 'fas fa-eye' },
                        { text: 'BÁO CÁO SÁNG', pageUrl: '#', icon: 'fas fa-sun' },
                    ] 
                },
                { text: 'LỊCH BẢO TRÌ - KIỂM KÊ', pageUrl: '#', icon: 'fas fa-tools', type: 'orange' },
            ]
        }
    ];

    const rightMenuData = [
        { title: "TRANG CÔNG VIỆC", icon: "fas fa-briefcase",
            items: [
                { text: "Báo cáo nội bộ", href: "https://baocaonoibo.com", icon: "fas fa-chart-bar", type: "primary" },
                { text: "New Ticket", href: "https://newticket.tgdd.vn/ticket", icon: "fas fa-ticket-alt", type: "success" },
            ]
        },
        { title: "GIẢI TRÍ", icon: "fas fa-gamepad",
            items: [
                { text: "YouTube", href: "https://youtube.com", icon: "fab fa-youtube", type: "info" },
                { text: "Facebook", href: "https://facebook.com", icon: "fab fa-facebook" },
            ]
        }
    ];
    
    const notificationData = {
        col1: [
            {
                icon: 'fa-wrench', title: 'TRIỂN KHAI TỐI ƯU THIẾT BỊ BHX', type: 'type-báchhóaxanh', isNew: true,
                message: 'Đã có layout và lịch triển khai mới cho các siêu thị Bách Hóa Xanh trong khu vực. Vui lòng xem chi tiết.',
                updateDate: '17-06-2025', deadline: '25-06-2025', link: '#'
            }
        ],
        col2: [
             {
                icon: 'fa-file-alt', title: 'FORM CẬP NHẬT TIẾN ĐỘ', type: 'type-tgdđ-đmx', isNew: true,
                message: 'Form báo cáo tiến độ công việc hàng ngày đã được cập nhật phiên bản mới. Áp dụng từ hôm nay.',
                updateDate: '17-06-2025', deadline: '18-06-2025', link: '#'
            }
        ]
    };


    // ===================================================================
    // B. DOM ELEMENT SELECTORS
    // ===================================================================

    const DOM = {
        leftSidebar: document.getElementById('left-sidebar-container'),
        rightSidebar: document.getElementById('right-sidebar-container'),
        leftSidebarContent: document.querySelector('#left-sidebar-container .sidebar-content-wrapper'),
        rightSidebarContent: document.querySelector('#right-sidebar-container .sidebar-content-wrapper'),
        sidebarToggleBtn: document.getElementById('sidebar-toggle-btn'),
        mobileOverlay: document.getElementById('mobile-overlay'),
        supportBtn: document.getElementById('supportContactButton'),
        supportPopup: document.getElementById('supportContactPopup'),
        closeSupportPopupBtn: document.getElementById('closeSupportPopup'),
        logoutBtn: document.getElementById('logoutButton'),
        confirmLogoutModal: document.getElementById('confirmLogoutModal'),
        confirmBtnYes: document.getElementById('confirmBtnYes'),
        confirmBtnNo: document.getElementById('confirmBtnNo'),
        clock: {
            time: document.getElementById('clock-time'),
            date: document.getElementById('clock-date')
        },
        notificationLists: {
            col1: document.getElementById('notification-list-1'),
            col2: document.getElementById('notification-list-2')
        }
    };


    // ===================================================================
    // C. CORE & HELPER FUNCTIONS
    // ===================================================================

    const isMobile = () => window.innerWidth <= 1024;

    function hideAllDropdowns() {
        document.querySelectorAll('.dropdown-menu.show').forEach(menu => menu.classList.remove('show'));
        document.querySelectorAll('.dropdown-button.active').forEach(btn => btn.classList.remove('active'));
    }

    function showModal(modalElement) {
        if (modalElement) modalElement.classList.add('show');
    }

    function hideModal(modalElement) {
        if (modalElement) modalElement.classList.remove('show');
    }


    // ===================================================================
    // D. UI RENDERING & UPDATES
    // ===================================================================

    function renderLeftMenu() {
        DOM.leftSidebarContent.innerHTML = '';
        leftMenuData.forEach(sectionData => {
            const sectionDiv = document.createElement('div');
            sectionDiv.className = 'menu-section';
            
            if (sectionData.title) {
                sectionDiv.innerHTML = `<h3 class="menu-section-title"><span>${sectionData.title}</span></h3>`;
            }
            
            sectionData.items.forEach(itemData => {
                if (itemData.isDropdown) {
                    const dropdownDiv = document.createElement('div');
                    dropdownDiv.className = 'dropdown';
                    const button = document.createElement('button');
                    button.className = 'dropdown-button';
                    button.innerHTML = `<i class="icon ${itemData.icon}"></i><span>${itemData.text}</span>`;
                    const menu = document.createElement('div');
                    menu.className = 'dropdown-menu';
                    itemData.subItems.forEach(subItemData => {
                        const link = document.createElement('a');
                        link.href = subItemData.pageUrl || '#';
                        link.className = 'menu-button-sidebar';
                        link.innerHTML = `<i class="icon ${subItemData.icon}"></i><span>${subItemData.text}</span>`;
                        menu.appendChild(link);
                    });

                    // === [CẬP NHẬT] SỰ KIỆN MỞ MENU CON BẰNG HOVER ===
                    dropdownDiv.addEventListener('mouseenter', () => {
                        const isAlreadyOpen = menu.classList.contains('show');
                        if (isAlreadyOpen) return;

                        hideAllDropdowns();
                        menu.classList.add('show');
                        button.classList.add('active');
                        
                        const rect = button.getBoundingClientRect();
                        menu.style.left = `${rect.right + 8}px`;
                        menu.style.top = `${rect.top}px`;
                    });

                    dropdownDiv.addEventListener('mouseleave', () => {
                        menu.classList.remove('show');
                        button.classList.remove('active');
                    });
                    // === [KẾT THÚC] CẬP NHẬT SỰ KIỆN HOVER ===

                    dropdownDiv.append(button, menu);
                    sectionDiv.appendChild(dropdownDiv);
                } else {
                    const link = document.createElement('a');
                    link.href = itemData.pageUrl || '#';
                    link.className = 'menu-button-sidebar';
                    if (itemData.type) link.classList.add(itemData.type);
                    link.innerHTML = `<i class="icon ${itemData.icon}"></i><span>${itemData.text}</span>`;
                    sectionDiv.appendChild(link);
                }
            });
            DOM.leftSidebarContent.appendChild(sectionDiv);
        });
    }

    function renderRightMenu() {
        DOM.rightSidebarContent.innerHTML = '';
        rightMenuData.forEach(sectionData => {
            const sectionDiv = document.createElement('div');
            sectionDiv.className = 'right-menu-section';
            if (sectionData.title) {
                sectionDiv.innerHTML = `<h3><i class="icon ${sectionData.icon}"></i><span>${sectionData.title}</span></h3>`;
            }
            sectionData.items.forEach(itemData => {
                const link = document.createElement('a');
                link.href = itemData.href || '#';
                link.target = '_blank';
                link.className = 'link-button-right';
                if(itemData.type) link.classList.add(itemData.type);
                link.innerHTML = `<i class="icon ${itemData.icon}"></i><span>${itemData.text}</span>`;
                sectionDiv.appendChild(link);
            });
            DOM.rightSidebarContent.appendChild(sectionDiv);
        });
    }
    
    function renderNotifications() {
        const createNotificationHTML = (n) => `
            <div class="notification-card-pb3">
                <div class="notification-header-pb3">
                    <i class="icon ${n.icon}"></i>
                    <h4>${n.title}</h4>
                    <span class="type-badge ${n.type}">${n.type.replace('type-', '').replace('báchhóaxanh', 'BHX').replace('tgdđ-đmx','TGDD/DMX')}</span>
                    ${n.isNew ? '<span class="new-badge">NEW</span>' : ''}
                </div>
                <p class="notification-message-pb3">${n.message}</p>
                <div class="notification-footer-pb3">
                    <div class="footer-left">
                        <span class="update-date-badge"><i class="fas fa-calendar-check"></i>${n.updateDate}</span>
                    </div>
                    <div class="footer-center">
                        <span class="deadline-badge"><i class="fas fa-hourglass-half"></i>${n.deadline}</span>
                    </div>
                    <div class="footer-right">
                        <a href="${n.link}" class="notification-link-btn-pb3">Xem ngay <i class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
            </div>`;

        DOM.notificationLists.col1.innerHTML = notificationData.col1.map(createNotificationHTML).join('');
        DOM.notificationLists.col2.innerHTML = notificationData.col2.map(createNotificationHTML).join('');
    }

    function updateClock() {
        const now = new Date();
        if (DOM.clock.time) DOM.clock.time.textContent = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second:'2-digit' });
        if (DOM.clock.date) DOM.clock.date.textContent = now.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'numeric' });
    }

    // ===================================================================
    // E. EVENT LISTENERS & INITIALIZATION
    // ===================================================================

    function setupEventListeners() {
        DOM.sidebarToggleBtn.addEventListener('click', () => {
            if (isMobile()) {
                DOM.leftSidebar.classList.toggle('open');
                DOM.mobileOverlay.classList.toggle('show');
            } else {
                DOM.leftSidebar.classList.toggle('collapsed');
                DOM.rightSidebar.classList.toggle('collapsed');
            }
        });

        DOM.mobileOverlay.addEventListener('click', () => {
            DOM.leftSidebar.classList.remove('open');
            DOM.mobileOverlay.classList.remove('show');
            hideAllDropdowns();
        });

        DOM.supportBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            DOM.supportPopup.classList.toggle('show');
        });

        DOM.closeSupportPopupBtn.addEventListener('click', () => DOM.supportPopup.classList.remove('show'));

        DOM.logoutBtn.addEventListener('click', () => showModal(DOM.confirmLogoutModal));
        DOM.confirmBtnNo.addEventListener('click', () => hideModal(DOM.confirmLogoutModal));
        DOM.confirmBtnYes.addEventListener('click', () => {
            console.log("User logged out.");
            hideModal(DOM.confirmLogoutModal);
        });
        
        document.addEventListener('click', (e) => {
            if (!DOM.supportPopup.contains(e.target) && !DOM.supportBtn.contains(e.target)) {
                DOM.supportPopup.classList.remove('show');
            }
            // Logic đóng dropdown khi click ra ngoài đã được xử lý bằng mouseleave,
            // nhưng vẫn giữ lại để phòng trường hợp menu bị kẹt mở.
            if (!e.target.closest('.dropdown')) {
                hideAllDropdowns();
            }
            if (e.target === DOM.confirmLogoutModal) {
                 hideModal(DOM.confirmLogoutModal);
            }
        });
    }
    
    function init() {
        renderLeftMenu();
        renderRightMenu();
        renderNotifications();
        updateClock();
        setInterval(updateClock, 1000);
        setupEventListeners();
        console.log("Application Initialized.");
    }

    init();

});
