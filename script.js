const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggleBtn');
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const navLinks = Array.from(document.querySelectorAll('.nav-links li'));
const mainContent = document.getElementById('mainContent');

// Create a wrapper for mobile toggles
const mobileToggleWrapper = document.createElement('div');
mobileToggleWrapper.className = 'mobile-toggle-wrapper';
document.body.prepend(mobileToggleWrapper);

// Create a mobile sidebar toggle button
const mobileSidebarToggleBtn = document.createElement('button');
mobileSidebarToggleBtn.className = 'mobile-toggle-btn';
mobileSidebarToggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
mobileSidebarToggleBtn.setAttribute('aria-label', 'Toggle sidebar');
mobileToggleWrapper.appendChild(mobileSidebarToggleBtn);

// Create a mobile theme toggle button
const mobileThemeToggleBtn = document.createElement('button');
mobileThemeToggleBtn.className = 'mobile-theme-toggle';
mobileThemeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
mobileThemeToggleBtn.setAttribute('aria-label', 'Toggle theme');
mobileToggleWrapper.appendChild(mobileThemeToggleBtn);

function updateToggleButtonIcon() {
    const isCollapsed = sidebar.classList.contains('collapsed');
    toggleBtn.innerHTML = isCollapsed
        ? '<i class="fas fa-angle-double-right"></i>'
        : '<i class="fas fa-angle-double-left"></i>';
}

function toggleSidebar() {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        sidebar.classList.toggle('open');
    } else {
        sidebar.classList.toggle('collapsed');
        updateToggleButtonIcon();
    }
}

toggleBtn.addEventListener('click', toggleSidebar);
mobileSidebarToggleBtn.addEventListener('click', toggleSidebar);

// Close sidebar on link click on mobile
navLinks.forEach(li => {
    li.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('open');
        }
    });
});

function setTheme(isDark) {
    if (isDark) {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        mobileThemeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        mobileThemeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    }
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    setTheme(true);
} else {
    setTheme(false);
}

themeToggle.addEventListener('click', () => {
    setTheme(!body.classList.contains('dark-mode'));
});

mobileThemeToggleBtn.addEventListener('click', () => {
    setTheme(!body.classList.contains('dark-mode'));
});

function showToast(text, timeout = 2000) {
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerText = text;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), timeout);
}

function renderDashboard() {
    mainContent.innerHTML = `
        <h1>Dashboard</h1>
        <p class="page-fade">Welcome to your administrative dashboard.</p>
        <div class="cards page-fade">
            <div class="card">
                <h3>Users</h3>
                <p><strong>1,248</strong></p>
                <button id="viewUsers">View users</button>
            </div>
            <div class="card">
                <h3>Sales</h3>
                <p><strong>$12,420</strong></p>
                <button id="viewSales">View sales</button>
            </div>
            <div class="card">
                <h3>Tasks</h3>
                <p><strong>23 open</strong></p>
                <button id="viewTasks">View tasks</button>
            </div>
        </div>
    `;
    const btnUsers = document.getElementById('viewUsers');
    if (btnUsers) btnUsers.addEventListener('click', () => showToast('Displaying user data.'));
    const btnSales = document.getElementById('viewSales');
    if (btnSales) btnSales.addEventListener('click', () => showToast('Displaying sales details.'));
    const btnTasks = document.getElementById('viewTasks');
    if (btnTasks) btnTasks.addEventListener('click', () => showToast('Displaying task list.'));
}

function renderAnalytics() {
    mainContent.innerHTML = `
        <h1>Analytics</h1>
        <p class="page-fade">Detailed performance metrics for your business.</p>
        <div class="cards page-fade">
            <div class="card">
                <h3>Traffic</h3>
                <p><strong>9,876</strong></p>
                <button id="viewTraffic">View traffic sources</button>
            </div>
            <div class="card">
                <h3>Revenue</h3>
                <p><strong>$45,123</strong></p>
                <button id="viewRevenue">View revenue reports</button>
            </div>
            <div class="card">
                <h3>Conversions</h3>
                <p><strong>4.2%</strong></p>
                <button id="viewConversions">View conversion data</button>
            </div>
        </div>
    `;
    const btnTraffic = document.getElementById('viewTraffic');
    if (btnTraffic) btnTraffic.addEventListener('click', () => showToast('Showing traffic sources report.'));
    const btnRevenue = document.getElementById('viewRevenue');
    if (btnRevenue) btnRevenue.addEventListener('click', () => showToast('Showing revenue reports.'));
    const btnConversions = document.getElementById('viewConversions');
    if (btnConversions) btnConversions.addEventListener('click', () => showToast('Showing detailed conversion data.'));
}

function renderMessages() {
    mainContent.innerHTML = `
        <h1>Messages</h1>
        <p class="page-fade">Click a message to view details.</p>
        <ul class="message-list page-fade" id="msgList">
            <li data-msg="1"><strong>Alex</strong> — Hey, are we meeting today?</li>
            <li data-msg="2"><strong>Project</strong> — Update: milestone reached.</li>
            <li data-msg="3"><strong>HR</strong> — Reminder: submit timesheet.</li>
        </ul>
        <div id="msgDetail" class="page-fade" style="margin-top:12px;"></div>
    `;
    document.getElementById('msgList').addEventListener('click', (ev) => {
        const li = ev.target.closest('li');
        if (!li) return;
        const id = li.getAttribute('data-msg');
        let content = '';
        if (id === '1') content = '<h3>Alex</h3><p>Hey — yes, meeting at 3pm. See you!</p>';
        if (id === '2') content = '<h3>Project</h3><p>The milestone was completed successfully.</p>';
        if (id === '3') content = '<h3>HR</h3><p>Please upload your timesheet by EOD Friday.</p>';
        document.getElementById('msgDetail').innerHTML = content;
    });
}

function renderSettings() {
    mainContent.innerHTML = `
        <h1>Settings</h1>
        <div class="page-fade">
            <div class="settings-row">
                <div>
                    <div style="font-weight:600;">Enable Notifications</div>
                    <small>Toggle to receive notifications</small>
                </div>
                <div id="notifSwitch" class="switch" role="switch" aria-checked="false">
                    <div class="knob"></div>
                </div>
            </div>

            <div class="settings-row">
                <div>
                    <div style="font-weight:600;">Dark Mode</div>
                    <small>Toggle to switch theme</small>
                </div>
                <div id="darkSwitch" class="switch ${body.classList.contains('dark-mode') ? 'on' : ''}" role="switch" aria-checked="${body.classList.contains('dark-mode') ? 'true' : 'false'}">
                    <div class="knob"></div>
                </div>
            </div>

            <div style="margin-top:16px;">
                <button id="saveSettings">Save settings</button>
            </div>
        </div>
    `;

    const notif = document.getElementById('notifSwitch');
    let notifOn = false;
    notif.addEventListener('click', () => {
        notifOn = !notifOn;
        notif.classList.toggle('on', notifOn);
        notif.setAttribute('aria-checked', notifOn ? 'true' : 'false');
        showToast(notifOn ? 'Notifications enabled' : 'Notifications disabled');
    });

    const darkSwitch = document.getElementById('darkSwitch');
    darkSwitch.addEventListener('click', () => {
        const isOn = !body.classList.contains('dark-mode');
        setTheme(isOn);
        darkSwitch.classList.toggle('on', isOn);
        darkSwitch.setAttribute('aria-checked', isOn ? 'true' : 'false');
    });

    document.getElementById('saveSettings').addEventListener('click', () => {
        showToast('Settings saved');
    });
}

function renderLogout() {
    mainContent.innerHTML = `
        <h1>Logout</h1>
        <p class="page-fade">Are you sure you want to logout?</p>
        <div style="margin-top:12px;">
            <button id="confirmLogout">Yes, logout</button>
            <button id="cancelLogout" style="margin-left:8px;">Cancel</button>
        </div>
    `;
    document.getElementById('confirmLogout').addEventListener('click', () => {
        mainContent.innerHTML = '<h1>Logged out</h1><p>You have been logged out.</p>';
        setTimeout(() => navigateTo('dashboard'), 2000);
        showToast('Logged out successfully.');
    });
    document.getElementById('cancelLogout').addEventListener('click', () => {
        navigateTo('dashboard');
    });
}

function renderPage(key) {
    switch ((key || '').toLowerCase()) {
        case 'dashboard':
            renderDashboard();
            break;
        case 'analytics':
            renderAnalytics();
            break;
        case 'messages':
            renderMessages();
            break;
        case 'settings':
            renderSettings();
            break;
        case 'logout':
            renderLogout();
            break;
        default:
            renderDashboard();
            break;
    }
}

function setActiveLink(selectedLi) {
    navLinks.forEach(li => li.classList.remove('active'));
    if (selectedLi) selectedLi.classList.add('active');
}

function navigateTo(pageKey) {
    const li = navLinks.find(n => n.getAttribute('data-page') === pageKey);
    if (li) {
        setActiveLink(li);
        renderPage(pageKey);
    } else {
        renderDashboard();
    }
}

navLinks.forEach(li => {
    li.addEventListener('click', () => {
        const page = li.getAttribute('data-page');
        setActiveLink(li);
        renderPage(page);
    });
});

navigateTo('dashboard');
updateToggleButtonIcon();

// Handle window resize to adjust sidebar
window.addEventListener('resize', () => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        sidebar.classList.remove('collapsed');
    } else {
        sidebar.classList.remove('open');
        updateToggleButtonIcon();
    }
});