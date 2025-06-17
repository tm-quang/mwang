document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================================================
    // DỮ LIỆU MENU
    // ========================================================================

    const leftMenuData = [
        {
            title: 'ADMIN',
            items: [
              { 
                text: 'QUẢN TRỊ HỆ THỐNG', icon: 'fa-solid fa-sliders', isDropdown: true, 
                subItems: [
                    { text: 'DATABASE', pageUrl: '#', icon: 'fa-solid fa-database' },
                    { text: 'QUẢN LÝ USER', pageUrl: '#', icon: 'fa-solid fa-users' },
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
                        { text: 'BÁO CÁO SÁNG', pageUrl: '#', icon: 'fas fa-sun' },
                        { text: 'BÁO CÁO SÁNG', pageUrl: '#', icon: 'fas fa-sun' },
                    ] 
                },
                { text: 'LỊCH BẢO TRÌ - KIỂM KÊ', pageUrl: '#', icon: 'fas fa-tools' },
            ]
        }
    ];

    const rightMenuData = [
        {
            title: "TRANG CÔNG VIỆC",
            icon: "fas fa-briefcase",
            items: [
                { text: "Báo cáo nội bộ", href: "https://baocaonoibo.com", icon: "fas fa-chart-bar", type: "primary" },
                { text: "New Ticket", href: "https://newticket.tgdd.vn/ticket", icon: "fas fa-ticket-alt", type: "success" },
            ]
        },
        {
            title: "GIẢI TRÍ",
            icon: "fas fa-gamepad",
            items: [
                { text: "YouTube", href: "https://youtube.com", icon: "fab fa-youtube", type: "info" },
                { text: "Facebook", href: "https://facebook.com", icon: "fab fa-facebook" },
            ]
        }
    ];

    // --- DOM ELEMENTS ---
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
        document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
            menu.classList.remove('show');
        });
        document.querySelectorAll('.dropdown-button.active').forEach(btn => {
            btn.classList.remove('active');
        });
    }
    
    function renderLeftMenu() {
        leftSidebarContent.innerHTML = '';
        leftMenuData.forEach(sectionData => {
            const sectionDiv = document.createElement('div');
            sectionDiv.className = 'menu-section';
            
            if (sectionData.title) {
                const titleEl = document.createElement('h3');
                titleEl.className = 'menu-section-title';
                titleEl.innerHTML = `<span>${sectionData.title}</span>`;
                sectionDiv.appendChild(titleEl);
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

                    button.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const isAlreadyOpen = menu.classList.contains('show');
                        
                        hideAllDropdowns();

                        if (!isAlreadyOpen) {
                            menu.classList.add('show');
                            button.classList.add('active');
                            
                            // Position the dropdown menu relative to the button
                            const rect = button.getBoundingClientRect();
                            menu.style.left = `${rect.right + 8}px`;
                            menu.style.top = `${rect.top}px`;
                        }
                    });

                    dropdownDiv.appendChild(button);
                    dropdownDiv.appendChild(menu); // Menu is a sibling of the button now
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
            leftSidebarContent.appendChild(sectionDiv);
        });
    }

    function renderRightMenu() {
        rightSidebarContent.innerHTML = '';
        rightMenuData.forEach(sectionData => {
            const sectionDiv = document.createElement('div');
            sectionDiv.className = 'right-menu-section';

            if (sectionData.title) {
                const titleEl = document.createElement('h3');
                titleEl.innerHTML = `<i class="icon ${sectionData.icon}"></i><span>${sectionData.title}</span>`;
                sectionDiv.appendChild(titleEl);
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
        } else {
            // New logic: toggle 'collapsed' class on sidebars directly
            leftSidebar.classList.toggle('collapsed');
            rightSidebar.classList.toggle('collapsed');
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
    
    // Global click listener to close popups
    document.addEventListener('click', (e) => {
        if (!supportPopup.contains(e.target) && !supportBtn.contains(e.target)) {
            supportPopup.classList.remove('show');
        }
        // Close dropdown if clicked outside
        if (!e.target.closest('.dropdown')) {
            hideAllDropdowns();
        }
    });

    // --- INITIALIZE ---
    renderLeftMenu();
    renderRightMenu();
    updateClock();
    setInterval(updateClock, 60000);
});
