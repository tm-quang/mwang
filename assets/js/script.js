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
            items: [
                { text: "Báo cáo nội bộ", href: "https://baocaonoibo.com", icon: "fas fa-chart-bar" },
                { text: "New Ticket", href: "https://newticket.tgdd.vn/ticket", icon: "fas fa-ticket-alt" },
            ]
        },
        {
            title: "GIẢI TRÍ",
            items: [
                { text: "YouTube", href: "https://youtube.com", icon: "fab fa-youtube" },
                { text: "Facebook", href: "https://facebook.com", icon: "fab fa-facebook" },
            ]
        }
    ];

    // --- DOM ELEMENTS ---
    const leftSidebar = document.getElementById('left-sidebar-container');
    const rightSidebar = document.getElementById('right-sidebar-container');
    const leftSidebarContent = leftSidebar.querySelector('.sidebar-content-wrapper');
    const rightSidebarContent = rightSidebar.querySelector('.sidebar-content-wrapper');
    const hamburgerBtn = document.getElementById('hamburger-menu');
    const mobileOverlay = document.getElementById('overlay');
    const supportBtn = document.getElementById('supportContactButton');
    const supportPopup = document.getElementById('supportContactPopup');
    const closeSupportPopupBtn = document.getElementById('closeSupportPopup');
    
    // --- STATE & TIMERS ---
    let leftSidebarTimeout, rightSidebarTimeout, dropdownTimeout;
    const HIDE_DELAY = 200;

    // --- FUNCTIONS ---
    
    const isDesktop = () => window.innerWidth > 1024;

    const collapseSidebar = (sidebar) => {
        if (sidebar) sidebar.classList.add('collapsed');
    };
    const expandSidebar = (sidebar) => {
        if (sidebar) sidebar.classList.remove('collapsed');
    };

    function hideAllDropdowns() {
        document.querySelectorAll('.dropdown-menu.show').forEach(menu => menu.classList.remove('show'));
    }

    function renderLeftMenu() {
        leftSidebarContent.innerHTML = '';
        leftMenuData.forEach(section => {
            const sectionDiv = document.createElement('div');
            sectionDiv.className = 'menu-section';
            sectionDiv.innerHTML = `<h3 class="menu-section-title"><span>${section.title}</span></h3>`;
            
            section.items.forEach(item => {
                if (item.isDropdown) {
                    const dropdownDiv = document.createElement('div');
                    dropdownDiv.className = 'dropdown';

                    const button = document.createElement('div');
                    button.className = 'dropdown-button';
                    button.innerHTML = `<i class="${item.icon} icon"></i><span>${item.text}</span>`;
                    
                    const menu = document.createElement('div');
                    menu.className = 'dropdown-menu';
                    item.subItems.forEach(subItem => {
                        const link = document.createElement('a');
                        link.href = subItem.pageUrl;
                        link.className = 'menu-button-sidebar';
                        link.innerHTML = `<i class="${subItem.icon} icon"></i><span>${subItem.text}</span>`;
                        link.addEventListener('click', (e) => {
                            e.preventDefault();
                            if (!isDesktop()) {
                                leftSidebar.classList.remove('open');
                                mobileOverlay.classList.remove('show');
                            }
                        });
                        menu.appendChild(link);
                    });
                    
                    dropdownDiv.append(button, menu);
                    
                    dropdownDiv.addEventListener('mouseenter', () => {
                        if (isDesktop() && !leftSidebar.classList.contains('collapsed')) {
                            clearTimeout(dropdownTimeout);
                            hideAllDropdowns();
                            const rect = button.getBoundingClientRect();
                            menu.style.top = `${rect.top}px`;
                            menu.style.left = `${leftSidebar.getBoundingClientRect().right + 5}px`;
                            menu.classList.add('show');
                        }
                    });
                    dropdownDiv.addEventListener('mouseleave', () => {
                        if (isDesktop()) {
                            dropdownTimeout = setTimeout(hideAllDropdowns, HIDE_DELAY);
                        }
                    });
                    sectionDiv.appendChild(dropdownDiv);
                } else {
                    const link = document.createElement('a');
                    link.href = item.pageUrl;
                    link.className = 'menu-button-sidebar';
                    link.innerHTML = `<i class="${item.icon} icon"></i><span>${item.text}</span>`;
                    sectionDiv.appendChild(link);
                }
            });
            leftSidebarContent.appendChild(sectionDiv);
        });
    }

    function renderRightMenu() {
        rightSidebarContent.innerHTML = '';
        rightMenuData.forEach(section => {
            const sectionDiv = document.createElement('div');
            sectionDiv.className = 'menu-section';
            sectionDiv.innerHTML = `<h3 class="menu-section-title"><span>${section.title}</span></h3>`;
            section.items.forEach(item => {
                const link = document.createElement('a');
                link.href = item.href;
                link.target = '_blank';
                link.className = 'right-sidebar-item';
                link.innerHTML = `<i class="${item.icon} icon"></i><span class="right-sidebar-item-text">${item.text}</span>`;
                sectionDiv.appendChild(link);
            });
            rightSidebarContent.appendChild(sectionDiv);
        });
    }

    function updateClock() {
        const now = new Date();
        const timeEl = document.getElementById('clock-time');
        const dateEl = document.getElementById('clock-date');
        if (timeEl) timeEl.textContent = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
        if (dateEl) dateEl.textContent = now.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'numeric' });
    }

    // --- EVENT LISTENERS ---
    
    // Sidebar hover for Desktop
    [leftSidebar, rightSidebar].forEach(sidebar => {
        if (!sidebar) return;
        sidebar.addEventListener('mouseenter', () => {
            if (isDesktop()) {
                clearTimeout(sidebar === leftSidebar ? leftSidebarTimeout : rightSidebarTimeout);
                expandSidebar(sidebar);
            }
        });
        sidebar.addEventListener('mouseleave', () => {
            if (isDesktop()) {
                const timeout = setTimeout(() => collapseSidebar(sidebar), HIDE_DELAY);
                if (sidebar === leftSidebar) leftSidebarTimeout = timeout;
                else rightSidebarTimeout = timeout;
            }
        });
    });

    // Hamburger menu for Mobile/Tablet
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', () => {
            leftSidebar.classList.toggle('open');
            mobileOverlay.classList.toggle('show');
        });
    }
    if(mobileOverlay) {
        mobileOverlay.addEventListener('click', () => {
            leftSidebar.classList.remove('open');
            mobileOverlay.classList.remove('show');
        });
    }

    // Support Popup
    if (supportBtn) {
        supportBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            supportPopup.classList.toggle('show');
        });
    }
    if (closeSupportPopupBtn) {
        closeSupportPopupBtn.addEventListener('click', () => supportPopup.classList.remove('show'));
    }
    document.addEventListener('click', (e) => {
        if (supportPopup && !supportPopup.contains(e.target) && supportBtn && !supportBtn.contains(e.target)) {
            supportPopup.classList.remove('show');
        }
    });

    // --- INITIALIZATION ---
    renderLeftMenu();
    renderRightMenu();
    if(isDesktop()){
        collapseSidebar(leftSidebar);
        collapseSidebar(rightSidebar);
    }
    updateClock();
    setInterval(updateClock, 60000); // Update clock every minute
});
