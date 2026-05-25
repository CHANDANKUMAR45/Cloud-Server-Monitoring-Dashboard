// ============================================
// SAMPLE DATA
// ============================================
const mockServers = [
    {
        id: 1,
        name: 'Web-Server-01',
        ip: '192.168.1.101',
        status: 'online',
        cpu: 35,
        memory: 56,
        disk: 42,
        network: '125.5 Mbps'
    },
    {
        id: 2,
        name: 'Database-Server-01',
        ip: '192.168.1.102',
        status: 'online',
        cpu: 62,
        memory: 78,
        disk: 68,
        network: '89.2 Mbps'
    },
    {
        id: 3,
        name: 'Cache-Server-01',
        ip: '192.168.1.103',
        status: 'online',
        cpu: 28,
        memory: 45,
        disk: 35,
        network: '156.8 Mbps'
    },
    {
        id: 4,
        name: 'API-Server-01',
        ip: '192.168.1.104',
        status: 'online',
        cpu: 51,
        memory: 64,
        disk: 52,
        network: '98.3 Mbps'
    },
    {
        id: 5,
        name: 'Backup-Server-01',
        ip: '192.168.1.105',
        status: 'offline',
        cpu: 0,
        memory: 0,
        disk: 0,
        network: '0 Mbps'
    },
    {
        id: 6,
        name: 'Load-Balancer-01',
        ip: '192.168.1.106',
        status: 'online',
        cpu: 42,
        memory: 58,
        disk: 38,
        network: '234.5 Mbps'
    },
    {
        id: 7,
        name: 'Monitoring-Server-01',
        ip: '192.168.1.107',
        status: 'online',
        cpu: 25,
        memory: 38,
        disk: 45,
        network: '45.2 Mbps'
    },
    {
        id: 8,
        name: 'Storage-Server-01',
        ip: '192.168.1.108',
        status: 'online',
        cpu: 48,
        memory: 72,
        disk: 85,
        network: '156.0 Mbps'
    },
    {
        id: 9,
        name: 'Dev-Server-01',
        ip: '192.168.1.109',
        status: 'offline',
        cpu: 0,
        memory: 0,
        disk: 0,
        network: '0 Mbps'
    },
    {
        id: 10,
        name: 'Staging-Server-01',
        ip: '192.168.1.110',
        status: 'online',
        cpu: 38,
        memory: 54,
        disk: 41,
        network: '112.6 Mbps'
    },
    {
        id: 11,
        name: 'Build-Server-01',
        ip: '192.168.1.111',
        status: 'online',
        cpu: 71,
        memory: 82,
        disk: 55,
        network: '78.4 Mbps'
    },
    {
        id: 12,
        name: 'Analytics-Server-01',
        ip: '192.168.1.112',
        status: 'offline',
        cpu: 0,
        memory: 0,
        disk: 0,
        network: '0 Mbps'
    }
];

const mockAlerts = [
    {
        id: 1,
        type: 'critical',
        title: 'High CPU Usage Detected',
        message: 'Build-Server-01 CPU usage exceeded 70% threshold',
        time: '2 minutes ago',
        server: 'Build-Server-01'
    },
    {
        id: 2,
        type: 'warning',
        title: 'Disk Usage Warning',
        message: 'Storage-Server-01 disk usage at 85%',
        time: '5 minutes ago',
        server: 'Storage-Server-01'
    },
    {
        id: 3,
        type: 'warning',
        title: 'Memory Alert',
        message: 'Database-Server-01 memory usage at 78%',
        time: '10 minutes ago',
        server: 'Database-Server-01'
    },
    {
        id: 4,
        type: 'info',
        title: 'Server Maintenance Complete',
        message: 'Web-Server-01 maintenance window completed successfully',
        time: '1 hour ago',
        server: 'Web-Server-01'
    },
    {
        id: 5,
        type: 'critical',
        title: 'Server Offline',
        message: 'Backup-Server-01 went offline',
        time: '3 hours ago',
        server: 'Backup-Server-01'
    }
];

// ============================================
// STATE MANAGEMENT
// ============================================
const state = {
    currentSection: 'dashboard',
    servers: mockServers,
    alerts: mockAlerts,
    settings: {
        refreshInterval: 5,
        alertThreshold: 80,
        emailAlerts: true,
        desktopNotifications: true
    },
    autoRefreshInterval: null
};

// ============================================
// DOM ELEMENTS
// ============================================
const sidebar = document.querySelector('.sidebar');
const menuToggle = document.getElementById('menuToggle');
const navItems = document.querySelectorAll('.nav-item');
const pageTitle = document.getElementById('pageTitle');
const sections = document.querySelectorAll('.section');
const logoutBtn = document.getElementById('logoutBtn');
const refreshBtn = document.getElementById('refreshBtn');
const serversTableBody = document.getElementById('serversTableBody');
const serversGrid = document.getElementById('serversGrid');
const alertsList = document.getElementById('alertsList');
const filterBtns = document.querySelectorAll('.filter-btn');
const saveSettingsBtn = document.getElementById('saveSettingsBtn');
const refreshIntervalInput = document.getElementById('refreshInterval');
const alertThresholdInput = document.getElementById('alertThreshold');

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    loadSettings();
    renderDashboard();
    startAutoRefresh();
});

// ============================================
// EVENT LISTENERS
// ============================================
function initializeEventListeners() {
    // Navigation
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.dataset.section;
            navigateTo(section);
        });
    });

    // Menu toggle for mobile
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // Close sidebar when clicking on main content
    document.querySelector('.main-content').addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
        }
    });

    // Refresh button
    refreshBtn.addEventListener('click', refreshData);

    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            const filter = e.target.dataset.filter;
            renderAlerts(filter);
        });
    });

    // Settings
    saveSettingsBtn.addEventListener('click', saveSettings);

    // Logout
    logoutBtn.addEventListener('click', logout);
}

// ============================================
// NAVIGATION
// ============================================
function navigateTo(sectionName) {
    // Update active nav item
    navItems.forEach(item => item.classList.remove('active'));
    document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

    // Update page title
    const titles = {
        dashboard: 'Dashboard',
        servers: 'Servers',
        alerts: 'Alerts',
        analytics: 'Analytics',
        settings: 'Settings'
    };
    pageTitle.textContent = titles[sectionName] || 'Dashboard';

    // Show/hide sections
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(sectionName).classList.add('active');

    // Render content
    switch (sectionName) {
        case 'servers':
            renderServersGrid();
            break;
        case 'alerts':
            renderAlerts('all');
            break;
        case 'analytics':
            renderAnalytics();
            break;
        case 'settings':
            loadSettings();
            break;
    }

    state.currentSection = sectionName;
}

// ============================================
// DASHBOARD RENDERING
// ============================================
function renderDashboard() {
    updateStats();
    renderServersTable();
}

function updateStats() {
    const onlineServers = state.servers.filter(s => s.status === 'online').length;
    const avgCpu = calculateAverage(state.servers, 'cpu', 'online');
    const avgMemory = calculateAverage(state.servers, 'memory', 'online');
    const criticalAlerts = state.alerts.filter(a => a.type === 'critical').length;

    document.getElementById('totalServers').textContent = state.servers.length;
    document.getElementById('cpuPercent').textContent = Math.round(avgCpu);
    document.getElementById('cpuProgress').style.width = avgCpu + '%';
    document.getElementById('memPercent').textContent = Math.round(avgMemory);
    document.getElementById('memProgress').style.width = avgMemory + '%';
    document.getElementById('activeAlerts').textContent = criticalAlerts + state.alerts.filter(a => a.type === 'warning').length;

    // Update status
    const statusDot = document.querySelector('.status-dot');
    const statusText = document.querySelector('.status-text');
    if (onlineServers === state.servers.length) {
        statusDot.classList.remove('offline');
        statusDot.classList.add('online');
        statusText.textContent = 'All Systems Operational';
    } else if (onlineServers > 0) {
        statusDot.classList.remove('offline');
        statusDot.classList.add('online');
        statusText.textContent = `${onlineServers}/${state.servers.length} Systems Online`;
    } else {
        statusDot.classList.remove('online');
        statusDot.classList.add('offline');
        statusText.textContent = 'System Alert';
    }
}

function renderServersTable() {
    serversTableBody.innerHTML = state.servers.map(server => `
        <tr>
            <td>
                <strong>${server.name}</strong>
            </td>
            <td>${server.ip}</td>
            <td>
                <div class="server-status-cell">
                    <span class="status-dot ${server.status}"></span>
                    <span>${server.status.charAt(0).toUpperCase() + server.status.slice(1)}</span>
                </div>
            </td>
            <td>
                <div class="progress-bar" style="width: 80px;">
                    <div class="progress" style="width: ${server.cpu}%"></div>
                </div>
                <small>${server.cpu}%</small>
            </td>
            <td>
                <div class="progress-bar" style="width: 80px;">
                    <div class="progress" style="width: ${server.memory}%"></div>
                </div>
                <small>${server.memory}%</small>
            </td>
            <td>
                <div class="progress-bar" style="width: 80px;">
                    <div class="progress" style="width: ${server.disk}%"></div>
                </div>
                <small>${server.disk}%</small>
            </td>
            <td>${server.network}</td>
            <td>
                <button class="btn-primary" onclick="showServerDetails(${server.id})" style="padding: 6px 10px;">
                    <i class="fas fa-eye"></i> View
                </button>
            </td>
        </tr>
    `).join('');
}

function renderServersGrid() {
    serversGrid.innerHTML = state.servers.map(server => `
        <div class="server-card">
            <div class="server-card-header">
                <div class="server-card-title">
                    <h4>${server.name}</h4>
                    <p>${server.ip}</p>
                </div>
                <span class="server-card-status ${server.status === 'online' ? '' : 'offline'}">
                    ${server.status.toUpperCase()}
                </span>
            </div>
            <div class="server-card-details">
                <div class="detail-item">
                    <span class="detail-label">CPU:</span>
                    <span class="detail-value">${server.cpu}%</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Memory:</span>
                    <span class="detail-value">${server.memory}%</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Disk:</span>
                    <span class="detail-value">${server.disk}%</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Network:</span>
                    <span class="detail-value">${server.network}</span>
                </div>
            </div>
            <div class="server-card-actions">
                <button class="btn-primary" onclick="showServerDetails(${server.id})">Details</button>
                <button class="btn-secondary" onclick="restartServer(${server.id})">Restart</button>
            </div>
        </div>
    `).join('');
}

function renderAlerts(filter = 'all') {
    let filteredAlerts = state.alerts;
    if (filter !== 'all') {
        filteredAlerts = state.alerts.filter(alert => alert.type === filter);
    }

    alertsList.innerHTML = filteredAlerts.map(alert => `
        <div class="alert-item ${alert.type}">
            <div class="alert-icon ${alert.type}">
                ${getAlertIcon(alert.type)}
            </div>
            <div class="alert-content">
                <div class="alert-title">${alert.title}</div>
                <div class="alert-message">${alert.message}</div>
                <div class="alert-time">${alert.time}</div>
            </div>
            <div class="alert-action">
                <button onclick="dismissAlert(${alert.id})">Dismiss</button>
            </div>
        </div>
    `).join('');

    if (filteredAlerts.length === 0) {
        alertsList.innerHTML = '<p style="padding: 20px; text-align: center; color: var(--text-secondary);">No alerts</p>';
    }
}

function renderAnalytics() {
    // Analytics are static in this demo
    console.log('Analytics section displayed');
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function calculateAverage(servers, metric, status = null) {
    const filtered = status ? servers.filter(s => s.status === status) : servers;
    if (filtered.length === 0) return 0;
    const sum = filtered.reduce((acc, server) => acc + (server[metric] || 0), 0);
    return sum / filtered.length;
}

function getAlertIcon(type) {
    const icons = {
        critical: '<i class="fas fa-exclamation-circle"></i>',
        warning: '<i class="fas fa-exclamation-triangle"></i>',
        info: '<i class="fas fa-info-circle"></i>',
        success: '<i class="fas fa-check-circle"></i>'
    };
    return icons[type] || icons.info;
}

function showServerDetails(serverId) {
    const server = state.servers.find(s => s.id === serverId);
    if (server) {
        alert(`
Server: ${server.name}
IP: ${server.ip}
Status: ${server.status}
CPU: ${server.cpu}%
Memory: ${server.memory}%
Disk: ${server.disk}%
Network: ${server.network}
        `);
    }
}

function restartServer(serverId) {
    const server = state.servers.find(s => s.id === serverId);
    if (server) {
        alert(`Restart command sent to ${server.name}`);
    }
}

function dismissAlert(alertId) {
    state.alerts = state.alerts.filter(a => a.id !== alertId);
    renderAlerts(document.querySelector('.filter-btn.active').dataset.filter);
    updateStats();
}

// ============================================
// DATA REFRESH
// ============================================
function refreshData() {
    // Simulate data update with slight variations
    state.servers.forEach(server => {
        if (server.status === 'online') {
            server.cpu = Math.max(0, Math.min(100, server.cpu + (Math.random() - 0.5) * 20));
            server.memory = Math.max(0, Math.min(100, server.memory + (Math.random() - 0.5) * 15));
            server.disk = Math.max(0, Math.min(100, server.disk + (Math.random() - 0.5) * 5));
        }
    });

    if (state.currentSection === 'dashboard') {
        updateStats();
        renderServersTable();
    }

    console.log('Data refreshed');
}

function startAutoRefresh() {
    if (state.autoRefreshInterval) {
        clearInterval(state.autoRefreshInterval);
    }
    state.autoRefreshInterval = setInterval(refreshData, state.settings.refreshInterval * 1000);
}

// ============================================
// SETTINGS
// ============================================
function saveSettings() {
    state.settings.refreshInterval = parseInt(refreshIntervalInput.value);
    state.settings.alertThreshold = parseInt(alertThresholdInput.value);

    localStorage.setItem('dashboardSettings', JSON.stringify(state.settings));
    startAutoRefresh();

    alert('Settings saved successfully!');
}

function loadSettings() {
    const saved = localStorage.getItem('dashboardSettings');
    if (saved) {
        const settings = JSON.parse(saved);
        state.settings = { ...state.settings, ...settings };
    }

    refreshIntervalInput.value = state.settings.refreshInterval;
    alertThresholdInput.value = state.settings.alertThreshold;
}

// ============================================
// AUTHENTICATION
// ============================================
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        alert('You have been logged out successfully!');
        window.location.href = '/';
    }
}

// ============================================
// RESPONSIVE SIDEBAR
// ============================================
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        sidebar.classList.remove('active');
    }
});
