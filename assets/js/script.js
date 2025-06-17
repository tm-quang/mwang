document.addEventListener('DOMContentLoaded', function() {
        
    // ========================================================================
    // HƯỚNG DẪN THÊM MENU
    // Để thêm menu, bạn chỉ cần chỉnh sửa 2 mảng dữ liệu dưới đây.
    // ========================================================================

    const leftMenuData = [
        // Đây là một Nhóm Menu (ví dụ: ADMIN)
        {
            title: 'ADMIN',
            items: [
              // Đây là một Menu Dropdown (có isDropdown: true)
              { 
                text: 'QUẢN TRỊ HỆ THỐNG', icon: 'fa-solid fa-sliders', isDropdown: true, 
                // subItems chứa các menu con
                subItems: [
                    { text: 'DATABASE', pageUrl: '#', icon: 'fa-solid fa-database' },
                    { text: 'QUẢN LÝ USER', pageUrl: '#', icon: 'fa-solid fa-users' },
                ]
              }
            ]
        },
        // Đây là một Nhóm Menu khác (ví dụ: 2025 - IT MTAY2)
        {
            title: '2025 - IT MTAY2',
            items: [
                // Thêm một dropdown mới
                { 
                    text: 'CÔNG VIỆC HÀNG NGÀY', icon: 'fas fa-calendar-alt', isDropdown: true, 
                    subItems: [ 
                        { text: 'KIỂM TRA LỖI', pageUrl: '#', icon: 'fas fa-eye' },
                        { text: 'BÁO CÁO SÁNG', pageUrl: '#', icon: 'fas fa-sun' },
                    ] 
                },
                // Đây là một Menu đơn (không có isDropdown)
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

    function createMenuItem(itemData) {
        const link = document.createElement('a');
        link.href = itemData.pageUrl || itemData.href || '#';
        if (itemData.href) link.target = '_blank';
        link.className = 'menu-item';
        link.innerHTML = `<i class="${itemData.icon} icon"></i><span class="menu-item-text">${itemData.text}</span>`;
        return link;
    }

    // === HÀM renderLeftMenu ĐÃ ĐƯỢC CẬP NHẬT ===
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
                        link.classList.add('menu-button-sidebar');
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
                    
                    // --- LOGIC MỚI CHO DROPDOWN ---
                    // Luôn cho phép mở/đóng menu con bằng cách click, bất kể trạng thái sidebar
                    button.addEventListener('click', (e) => {
                        e.stopPropagation(); // Ngăn sự kiện click lan ra ngoài, tránh việc menu bị đóng ngay lập tức
                        const isAlreadyOpen = menu.classList.contains('show');
                        
                        // Luôn ẩn tất cả các dropdown khác trước khi mở cái mới
                        hideAllDropdowns();

                        // Nếu menu chưa mở, thì mở nó ra
                        if (!isAlreadyOpen) {
                            menu.classList.add('show');
                        }
                    });
                    sectionDiv.appendChild(dropdownDiv);
                } else {
                    sectionDiv.appendChild(createMenuItem(itemData));
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
                const link = createMenuItem(itemData);
                link.classList.add('right-sidebar-item');
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

    supportBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        supportPopup.classList.toggle('show');
    });

    closeSupportPopupBtn.addEventListener('click', () => supportPopup.classList.remove('show'));
    
    document.addEventListener('click', (e) => {
        if (!supportPopup.contains(e.target) && !supportBtn.contains(e.target)) {
            supportPopup.classList.remove('show');
        }
        if (!e.target.closest('.dropdown')) { // Thay đổi điều kiện để không đóng dropdown khi click vào header
            hideAllDropdowns();
        }
    });

    // --- INITIALIZE ---
    renderLeftMenu();
    renderRightMenu();
    updateClock();
    setInterval(updateClock, 60000);
});
