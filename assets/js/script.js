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
                { text: 'LỊCH BẢO TRÌ - KIỂM KÊ', pageUrl: '#', icon: 'fas fa-tools' },
            ]
        }
    ];

    const rightMenuData = [
        { title: "TRANG CÔNG VIỆC",
            items: [
                { text: "Báo cáo nội bộ", href: "#", icon: "fas fa-chart-bar" },
                { text: "New Ticket", href: "#", icon: "fas fa-ticket-alt" },
            ]
        },
        { title: "GIẢI TRÍ",
            items: [
                { text: "YouTube", href: "#", icon: "fab fa-youtube" },
                { text: "Facebook", href: "#", icon: "fab fa-facebook" },
            ]
        }
    ];

    // ===================================================================
    // B. DOM ELEMENT SELECTORS
    // ===================================================================

    const DOM = {
        leftSidebar: document.getElementById('left-sidebar-container'),
        rightSidebar: document.getElementById('right-sidebar-container'),
        sidebarToggleBtn: document.getElementById('sidebar-toggle-btn'),
        mobileOverlay: document.getElementById('mobile-overlay'),
        // ... (các element khác)
    };

    // ===================================================================
    // C. FUNCTIONS
    // ===================================================================

    const isMobile = () => window.innerWidth <= 1024;

    /** Đóng tất cả các menu con đang mở */
    function hideAllDropdowns() {
        document.querySelectorAll('.dropdown-menu.show').forEach(menu => menu.classList.remove('show'));
        document.querySelectorAll('.dropdown-button.active').forEach(btn => btn.classList.remove('active'));
    }
    
    /** Dựng menu bên trái từ dữ liệu */
    function renderLeftMenu() {
        const container = DOM.leftSidebar.querySelector('.sidebar-content-wrapper');
        container.innerHTML = '';
        leftMenuData.forEach(sectionData => {
            const sectionDiv = document.createElement('div');
            sectionDiv.className = 'menu-section';
            sectionDiv.innerHTML = `<h3 class="menu-section-title"><span>${sectionData.title}</span></h3>`;

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
                        link.className = 'menu-button';
                        link.innerHTML = `<i class="icon ${subItemData.icon}"></i><span>${subItemData.text}</span>`;
                        menu.appendChild(link);
                    });

                    // [FIX #1, #2, #5] Dùng CLICK để mở/đóng menu cho ổn định
                    button.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const isAlreadyOpen = menu.classList.contains('show');
                        hideAllDropdowns(); // Luôn đóng cái khác trước
                        if (!isAlreadyOpen) {
                            menu.classList.add('show');
                            button.classList.add('active');
                        }
                    });

                    dropdownDiv.appendChild(button);
                    dropdownDiv.appendChild(menu);
                    sectionDiv.appendChild(dropdownDiv);
                } else {
                    const link = document.createElement('a');
                    link.href = itemData.pageUrl || '#';
                    link.className = 'menu-button';
                    link.innerHTML = `<i class="icon ${itemData.icon}"></i><span>${itemData.text}</span>`;
                    sectionDiv.appendChild(link);
                }
            });
            container.appendChild(sectionDiv);
        });
    }

    /** Dựng menu bên phải */
    function renderRightMenu() {
        const container = DOM.rightSidebar.querySelector('.sidebar-content-wrapper');
        container.innerHTML = '';
        rightMenuData.forEach(sectionData => {
            const sectionDiv = document.createElement('div');
            sectionDiv.className = 'right-menu-section';
            sectionDiv.innerHTML = `<h3 class="menu-section-title"><span>${sectionData.title}</span></h3>`;

            const list = document.createElement('div');
            list.style.width = '100%';
            list.style.padding = '0 8px';

            sectionData.items.forEach(itemData => {
                const link = document.createElement('a');
                link.href = itemData.href || '#';
                link.target = '_blank';
                link.className = 'link-button';
                link.innerHTML = `<i class="icon ${itemData.icon}"></i><span>${itemData.text}</span>`;
                list.appendChild(link);
            });
            sectionDiv.appendChild(list);
            container.appendChild(sectionDiv);
        });
    }

    // ===================================================================
    // D. EVENT LISTENERS & INITIALIZATION
    // ===================================================================

    function setupEventListeners() {
        // Nút chính để đóng/mở sidebar
        DOM.sidebarToggleBtn.addEventListener('click', () => {
            if (isMobile()) {
                DOM.leftSidebar.classList.toggle('open');
                DOM.mobileOverlay.classList.toggle('show');
            } else {
                DOM.leftSidebar.classList.toggle('collapsed');
                DOM.rightSidebar.classList.toggle('collapsed');
            }
        });

        // Overlay cho mobile
        DOM.mobileOverlay.addEventListener('click', () => {
            DOM.leftSidebar.classList.remove('open');
            DOM.mobileOverlay.classList.remove('show');
        });

        // Đóng menu khi click ra ngoài
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown')) {
                hideAllDropdowns();
            }
            // ... (các event listener cho popup khác)
        });
    }

    function init() {
        renderLeftMenu();
        renderRightMenu();
        setupEventListeners();
        // ... (các hàm khởi tạo khác như đồng hồ)
    }

    init();

});
