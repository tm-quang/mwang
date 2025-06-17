document.addEventListener('DOMContentLoaded', function() {
        
    const leftMenuData = [
        {
            title: 'ADMIN',
            items: [
              { id: 'btnADMIN', text: 'QUẢN TRỊ HỆ THỐNG', icon: 'fa-solid fa-sliders', isDropdown: true, isAdmin: true, 
                subItems: [
                    { id: 'btnDatabase', text: 'DATABASE', pageUrl: '#'},
                    { id: 'btnUserInfo', text: 'QUẢN LÝ USER', pageUrl: '#'},
                    { id: 'btnThongBao', text: 'TẠO THÔNG BÁO MỚI', pageUrl: '#'},
                ]
              }
            ]
        },
        {
            title: '2025 - IT MTAY2',
            items: [
                { id: 'btnWorkLeader', text: 'TRIỂN KHAI IT MTAY2', icon: 'fas fa-laptop-code', isDropdown: true, 
                  subItems: [ { id: 'btnDeployMTay2', text: 'TRIỂN KHAI MIỀN TÂY 2', pageUrl: '#'} ] 
                },
                { id: 'btnDailyWork', text: 'CÔNG VIỆC HÀNG NGÀY', icon: 'fas fa-calendar-alt', isDropdown: true,
                        { id: 'btnMonitor', text: 'KIỂM TRA LỖI HỆ THỐNG', pageTitle: 'KIỂM TRA LỖI HỆ THỐNG', icon: 'fas fa-eye' },
                        { id: 'btnCbs', text: 'BÁO CÁO CHÀO BUỔI SÁNG', icon: 'fas fa-eye' },
                        { id: 'btnTEST1', text: 'MENU 1', pageTitle: 'TEST', icon: 'fas fa-eye' },
                        { id: 'btnTEST2', text: 'MENU 2', pageTitle: 'TEST', icon: 'fas fa-eye' },
                        { id: 'btnTEST3', text: 'MENU 3', pageTitle: 'TEST', icon: 'fas fa-eye' },
                        { id: 'btnTimSheet', text: 'TÌM SHEET CÔNG VIỆC', pageTitle: 'TRA CỨU DỮ LIỆU TỪ GOOGLE SHEET', icon: 'fa-solid fa-folder-tree' }
                { id: 'btnBTKK', text: 'LỊCH BẢO TRÌ - KIỂM KÊ', icon: 'fas fa-tools', pageUrl: '#'},
                { id: 'btnTimKiem', text: 'TÌM THÔNG TIN', icon: 'fas fa-search', isDropdown: true, 
                        subItems: [
                        { id: 'btnTimSieuThi', text: 'TÌM KIẾM SIÊU THỊ', icon: 'fas fa-store-alt' },
                        { id: 'btnTimHangBK', text: 'TÌM HÀNG HÓA BACKUP', icon: 'fas fa-box-open' },
                        { id: 'btnTEST1', text: 'MENU 1', icon: 'fas fa-eye' },
                        { id: 'btnTEST2', text: 'MENU 2', icon: 'fas fa-eye' },
                        { id: 'btnTEST3', text: 'MENU 3', icon: 'fas fa-eye' },
                    ] 
                }
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

    const leftSidebar = document.getElementById('left-sidebar-container');
    const rightSidebar = document.getElementById('right-sidebar-container');
    const leftSidebarContent = leftSidebar.querySelector('.sidebar-content-wrapper');
    const rightSidebarContent = rightSidebar.querySelector('.sidebar-content-wrapper');
    const hamburgerBtn = document.getElementById('hamburger-menu');
    const mobileOverlay = document.getElementById('overlay');
    const supportBtn = document.getElementById('supportContactButton');
    const supportPopup = document.getElementById('supportContactPopup');
    const closeSupportPopupBtn = document.getElementById('closeSupportPopup');
    
    let leftSidebarTimeout, rightSidebarTimeout, dropdownTimeout;
    const HIDE_DELAY = 200;
    const isDesktop = () => window.innerWidth > 1024;

    function hideAllDropdowns() {
        document.querySelectorAll('.dropdown-menu.show').forEach(menu => menu.classList.remove('show'));
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
                    button.className = 'dropdown-button';
                    button.innerHTML = `<i class="${itemData.icon} icon"></i><span>${itemData.text}</span>`;
                    
                    const menu = document.createElement('div');
                    menu.className = 'dropdown-menu';
                    itemData.subItems.forEach(subItemData => {
                        const link = document.createElement('a');
                        link.href = subItemData.pageUrl;
                        link.className = 'menu-button-sidebar';
                        link.innerHTML = `<i class="${subItemData.icon || 'fa-solid fa-chevron-right'} icon"></i><span>${subItemData.text}</span>`;
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
                    
                    button.addEventListener('click', (e) => {
                        if (!isDesktop()) {
                            e.stopPropagation();
                            const isAlreadyOpen = menu.classList.contains('show');
                            hideAllDropdowns();
                            if (!isAlreadyOpen) {
                                menu.style.position = 'relative';
                                menu.style.left = '0';
                                menu.style.top = '0';
                                menu.classList.add('show');
                            }
                        }
                    });

                    dropdownDiv.addEventListener('mouseenter', () => {
                        if (isDesktop() && !leftSidebar.classList.contains('collapsed')) {
                            clearTimeout(dropdownTimeout);
                            hideAllDropdowns();
                            const rect = button.getBoundingClientRect();
                            menu.style.position = 'fixed';
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
                    link.href = itemData.pageUrl;
                    link.className = 'menu-button-sidebar';
                    link.innerHTML = `<i class="${itemData.icon} icon"></i><span>${itemData.text}</span>`;
                    sectionDiv.appendChild(link);
                }
            });
            leftSidebarContent.appendChild(sectionDiv);
        });
    }

    function renderRightMenu() {
        rightSidebarContent.innerHTML = '';
        rightMenuData.forEach(sectionData => {
            const sectionDiv = document.createElement('div');
            sectionDiv.className = 'menu-section';
            sectionDiv.innerHTML = `<h3 class="menu-section-title"><span>${sectionData.title}</span></h3>`;
            sectionData.items.forEach(itemData => {
                const link = document.createElement('a');
                link.href = itemData.href;
                link.target = '_blank';
                link.className = 'right-sidebar-item';
                link.innerHTML = `<i class="${itemData.icon} icon"></i><span class="right-sidebar-item-text">${itemData.text}</span>`;
                sectionDiv.appendChild(link);
            });
            rightSidebarContent.appendChild(sectionDiv);
        });
    }

    function updateClock() {
        const now = new Date();
        document.getElementById('clock-time').textContent = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
        document.getElementById('clock-date').textContent = now.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'numeric' });
    }

    // --- EVENT LISTENERS & INITIALIZATION ---
    
    [leftSidebar, rightSidebar].forEach(sidebar => {
        if (!sidebar) return;
        sidebar.addEventListener('mouseenter', () => {
            if (isDesktop()) {
                clearTimeout(sidebar === leftSidebar ? leftSidebarTimeout : rightSidebarTimeout);
                sidebar.classList.remove('collapsed');
            }
        });
        sidebar.addEventListener('mouseleave', () => {
            if (isDesktop()) {
                const timeout = setTimeout(() => sidebar.classList.add('collapsed'), HIDE_DELAY);
                if (sidebar === leftSidebar) leftSidebarTimeout = timeout;
                else rightSidebarTimeout = timeout;
            }
        });
    });

    hamburgerBtn.addEventListener('click', () => {
        leftSidebar.classList.toggle('open');
        mobileOverlay.classList.toggle('show');
    });

    mobileOverlay.addEventListener('click', () => {
        leftSidebar.classList.remove('open');
        mobileOverlay.classList.remove('show');
        hideAllDropdowns();
    });

    supportBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        supportPopup.classList.toggle('show');
    });

    closeSupportPopupBtn.addEventListener('click', () => supportPopup.classList.remove('show'));
    
    document.addEventListener('click', (e) => {
        if (!supportPopup.contains(e.target) && !supportBtn.contains(e.target)) {
            supportPopup.classList.remove('show');
        }
        if (!e.target.closest('.dropdown')) {
            hideAllDropdowns();
        }
    });

    renderLeftMenu();
    renderRightMenu();
    updateClock();
    setInterval(updateClock, 60000);
});
