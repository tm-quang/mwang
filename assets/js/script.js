document.addEventListener('DOMContentLoaded', function() {
        
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
                    text: 'TRIỂN KHAI IT MTAY2', icon: 'fas fa-laptop-code', isDropdown: true, 
                    subItems: [ { text: 'TRIỂN KHAI MIỀN TÂY 2', pageUrl: '#', icon: 'fas fa-map-marked-alt' } ] 
                },
                { text: 'LỊCH BẢO TRÌ', icon: 'fas fa-tools', pageUrl: '#'},
            ]
        }
    ];
    
    const rightMenuData = [
        {
            title: "CÔNG VIỆC",
            items: [ { text: "Báo cáo", href: "#", icon: "fas fa-chart-bar" }, { text: "New Ticket", href: "#", icon: "fas fa-ticket-alt" } ]
        },
        {
            title: "GIẢI TRÍ",
            items: [ { text: "YouTube", href: "#", icon: "fab fa-youtube" }, { text: "Facebook", href: "#", icon: "fab fa-facebook" } ]
        }
    ];

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
    
    let dropdownTimeout;
    const HIDE_DELAY = 200;
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
                        menu.appendChild(link);
                    });
                    
                    dropdownDiv.append(button, menu);
                    
                    dropdownDiv.addEventListener('mouseenter', () => {
                        if (isMobile()) return;
                        clearTimeout(dropdownTimeout);
                        hideAllDropdowns();
                        const rect = button.getBoundingClientRect();
                        menu.style.top = `${rect.top}px`;
                        menu.style.left = `${leftSidebar.getBoundingClientRect().right + 5}px`;
                        menu.classList.add('show');
                    });

                    dropdownDiv.addEventListener('mouseleave', () => {
                        if (isMobile()) return;
                        dropdownTimeout = setTimeout(hideAllDropdowns, HIDE_DELAY);
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
                sectionDiv.appendChild(createMenuItem(itemData));
            });
            rightSidebarContent.appendChild(sectionDiv);
        });
    }

    function updateClock() {
        const now = new Date();
        document.getElementById('clock-time').textContent = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
        document.getElementById('clock-date').textContent = now.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'numeric' });
    }

    sidebarToggleBtn.addEventListener('click', () => {
        if (isMobile()) {
            leftSidebar.classList.toggle('open');
            mobileOverlay.classList.toggle('show');
        } else {
            body.classList.toggle('auto-collapse-mode');
        }
    });

    mobileOverlay.addEventListener('click', () => {
        leftSidebar.classList.remove('open');
        mobileOverlay.classList.remove('show');
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

    renderLeftMenu();
    renderRightMenu();
    updateClock();
    setInterval(updateClock, 60000);
});
