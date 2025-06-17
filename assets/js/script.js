document.addEventListener('DOMContentLoaded', function() {
        
    // --- DỮ LIỆU MENU (Bạn có thể dễ dàng thêm/sửa ở đây) ---
    const leftMenuData = [
        {
            title: 'ADMIN',
            items: [
              { 
                text: 'QUẢN TRỊ HỆ THỐNG', icon: 'fa-solid fa-sliders', isDropdown: true, isAdmin: true, 
                subItems: [
                    { text: 'DATABASE', pageUrl: '#', icon: 'fa-solid fa-database' },
                    { text: 'QUẢN LÝ USER', pageUrl: '#', icon: 'fa-solid fa-users' },
                    { text: 'TẠO THÔNG BÁO MỚI', pageUrl: '#', icon: 'fa-regular fa-newspaper' },
                ]
              }
            ]
        },
        {
            title: '2025 - IT MTAY2',
            items: [
                { 
                    text: 'TRIỂN KHAI IT MTAY2', icon: 'fas fa-laptop-code', isDropdown: true, 
                    subItems: [ { text: 'TRIỂN KHAI MIỀN TÂY 2', pageUrl: '#', icon: 'fas fa-map-marked-alt' } ] 
                },
                { text: 'LỊCH BẢO TRÌ - KIỂM KÊ', icon: 'fas fa-tools', pageUrl: '#'},
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
    const body = document.body;
    const leftSidebar = document.getElementById('left-sidebar-container');
    const rightSidebar = document.getElementById('right-sidebar-container');
    const leftSidebarContent = leftSidebar.querySelector('.sidebar-content-wrapper');
    const rightSidebarContent = rightSidebar.querySelector('.sidebar-content-wrapper');
    const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
    const mobileOverlay = document.getElementById('overlay');
    const supportBtn = document.getElementById('supportContactButton');
    const supportPopup = document.getElementById('supportContactPopup');
    const closeSupportPopupBtn = document.getElementById('closeSupportPopup');
    
    // --- FUNCTIONS ---
    
    const isMobile = () => window.innerWidth <= 1024;

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
                            if (isMobile()) {
                                leftSidebar.classList.remove('open');
                                mobileOverlay.classList.remove('show');
                            }
                        });
                        menu.appendChild(link);
                    });
                    
                    dropdownDiv.append(button, menu);
                    
                    button.addEventListener('click', (e) => {
                        if (isMobile()) {
                            e.stopPropagation();
                            const isAlreadyOpen = menu.classList.contains('show');
                            hideAllDropdowns();
                            if (!isAlreadyOpen) menu.classList.add('show');
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
    
    // Nút thu gọn/mở rộng menu chính
    sidebarToggleBtn.addEventListener('click', () => {
        if (isMobile()) {
            leftSidebar.classList.toggle('open');
            mobileOverlay.classList.toggle('show');
        } else {
            body.classList.toggle('sidebar-collapsed');
        }
    });

    mobileOverlay.addEventListener('click', () => {
        leftSidebar.classList.remove('open');
        mobileOverlay.classList.remove('show');
        hideAllDropdowns();
    });

    // Popup Hỗ trợ
    supportBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        supportPopup.classList.toggle('show');
    });
    closeSupportPopupBtn.addEventListener('click', () => supportPopup.classList.remove('show'));
    
    // Đóng popup và dropdown khi click ra ngoài
    document.addEventListener('click', (e) => {
        if (!supportPopup.contains(e.target) && !supportBtn.contains(e.target)) {
            supportPopup.classList.remove('show');
        }
        if (!e.target.closest('.dropdown')) {
            hideAllDropdowns();
        }
    });

    // Khởi chạy
    renderLeftMenu();
    renderRightMenu();
    updateClock();
    setInterval(updateClock, 60000); // Cập nhật đồng hồ mỗi phút
});
