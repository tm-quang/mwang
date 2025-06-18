document.addEventListener('DOMContentLoaded', function() {
        
    // Dữ liệu menu từ file bạn gửi được giữ nguyên
    const leftMenuData = [
        {
            title: 'ADMIN',
            items: [
              { 
                text: 'QUẢN TRỊ HỆ THỐNG', icon: 'fa-solid fa-sliders', isDropdown: true, 
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
                { 
                    text: 'CÔNG VIỆC HÀNG NGÀY', icon: 'fas fa-calendar-alt', isDropdown: true, 
                    subItems: [ 
                        { text: 'KIỂM TRA LỖI', pageUrl: '#', icon: 'fas fa-eye' },
                        { text: 'BÁO CÁO SÁNG', pageUrl: '#', icon: 'fas fa-sun' },
                    ] 
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

    function createMenuItem(itemData) {
        const link = document.createElement('a');
        link.href = itemData.pageUrl || itemData.href || '#';
        if (itemData.href) link.target = '_blank';
        link.className = 'menu-item';
        link.innerHTML = `<i class="${itemData.icon} icon"></i><span class="menu-item-text">${itemData.text}</span>`;
        return link;
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
                    button.className = 'dropdown-header';
                    button.innerHTML = `<i class="${itemData.icon} icon"></i><span class="menu-item-text">${itemData.text}</span>`;
                    
                    const menu = document.createElement('div');
                    menu.className = 'dropdown-menu';
                    itemData.subItems.forEach(subItemData => {
                        const link = createMenuItem(subItemData);
                        link.addEventListener('click', (e) => {
                            if (isMobile()) {
                                leftSidebar.classList.remove('open');
                                mobileOverlay.classList.remove('show');
                                sidebarToggleBtn.classList.remove('open');
                            }
                        });
                        menu.appendChild(link);
                    });
                    
                    dropdownDiv.append(button, menu);
                    
                    button.addEventListener('click', (e) => {
                        e.stopPropagation();
                        // Đóng các dropdown khác trước khi mở cái này
                        const currentlyOpen = dropdownDiv.classList.contains('open');
                        document.querySelectorAll('#left-sidebar-container .dropdown.open').forEach(d => d.classList.remove('open'));
                        if (!currentlyOpen) {
                            dropdownDiv.classList.add('open');
                        }
                    });
                    sectionDiv.appendChild(dropdownDiv);
                } else {
                    const link = createMenuItem(itemData);
                     link.addEventListener('click', () => {
                        if (isMobile()) {
                            leftSidebar.classList.remove('open');
                            mobileOverlay.classList.remove('show');
                            sidebarToggleBtn.classList.remove('open');
                        }
                    });
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
                const link = createMenuItem(itemData);
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

    // --- EVENT LISTENERS & INITIALIZATION ---
    
    sidebarToggleBtn.addEventListener('click', () => {
        if (isMobile()) {
            leftSidebar.classList.toggle('open');
            mobileOverlay.classList.toggle('show');
            sidebarToggleBtn.classList.toggle('open');
        } else {
            body.classList.toggle('sidebar-collapsed');
        }
    });

    mobileOverlay.addEventListener('click', () => {
        leftSidebar.classList.remove('open');
        mobileOverlay.classList.remove('show');
        sidebarToggleBtn.classList.remove('open');
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
    });

    // --- INITIALIZE ---
    renderLeftMenu();
    renderRightMenu();
    updateClock();
    setInterval(updateClock, 60000);
});
