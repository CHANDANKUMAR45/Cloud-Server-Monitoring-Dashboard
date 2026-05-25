// Cloud Server Monitoring Dashboard - Backend Server
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Serve index.html for root path
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// ============================================
// MOCK DATABASE
// ============================================
const servers = [
    { id: 1, name: 'Web-Server-01', ip: '192.168.1.101', status: 'online', cpu: 35, memory: 56, disk: 42, network: '125.5 Mbps' },
    { id: 2, name: 'Database-Server-01', ip: '192.168.1.102', status: 'online', cpu: 62, memory: 78, disk: 68, network: '89.2 Mbps' },
    { id: 3, name: 'Cache-Server-01', ip: '192.168.1.103', status: 'online', cpu: 28, memory: 45, disk: 35, network: '156.8 Mbps' },
    { id: 4, name: 'API-Server-01', ip: '192.168.1.104', status: 'online', cpu: 51, memory: 64, disk: 52, network: '98.3 Mbps' },
    { id: 5, name: 'Backup-Server-01', ip: '192.168.1.105', status: 'offline', cpu: 0, memory: 0, disk: 0, network: '0 Mbps' },
    { id: 6, name: 'Load-Balancer-01', ip: '192.168.1.106', status: 'online', cpu: 42, memory: 58, disk: 38, network: '234.5 Mbps' },
    { id: 7, name: 'Monitoring-Server-01', ip: '192.168.1.107', status: 'online', cpu: 25, memory: 38, disk: 45, network: '45.2 Mbps' },
    { id: 8, name: 'Storage-Server-01', ip: '192.168.1.108', status: 'online', cpu: 48, memory: 72, disk: 85, network: '156.0 Mbps' },
    { id: 9, name: 'Dev-Server-01', ip: '192.168.1.109', status: 'offline', cpu: 0, memory: 0, disk: 0, network: '0 Mbps' },
    { id: 10, name: 'Staging-Server-01', ip: '192.168.1.110', status: 'online', cpu: 38, memory: 54, disk: 41, network: '112.6 Mbps' },
    { id: 11, name: 'Build-Server-01', ip: '192.168.1.111', status: 'online', cpu: 71, memory: 82, disk: 55, network: '78.4 Mbps' },
    { id: 12, name: 'Analytics-Server-01', ip: '192.168.1.112', status: 'offline', cpu: 0, memory: 0, disk: 0, network: '0 Mbps' }
];

const alerts = [
    { id: 1, type: 'critical', title: 'High CPU Usage Detected', message: 'Build-Server-01 CPU usage exceeded 70% threshold', time: '2 minutes ago', server: 'Build-Server-01' },
    { id: 2, type: 'warning', title: 'Disk Usage Warning', message: 'Storage-Server-01 disk usage at 85%', time: '5 minutes ago', server: 'Storage-Server-01' },
    { id: 3, type: 'warning', title: 'Memory Alert', message: 'Database-Server-01 memory usage at 78%', time: '10 minutes ago', server: 'Database-Server-01' },
    { id: 4, type: 'info', title: 'Server Maintenance Complete', message: 'Web-Server-01 maintenance window completed successfully', time: '1 hour ago', server: 'Web-Server-01' },
    { id: 5, type: 'critical', title: 'Server Offline', message: 'Backup-Server-01 went offline', time: '3 hours ago', server: 'Backup-Server-01' }
];

// ============================================
// ROUTES - SERVERS
// ============================================

// Get all servers
app.get('/api/servers', (req, res) => {
    res.json({
        success: true,
        data: servers,
        count: servers.length
    });
});

// Get server by ID
app.get('/api/servers/:id', (req, res) => {
    const server = servers.find(s => s.id === parseInt(req.params.id));
    if (server) {
        res.json({ success: true, data: server });
    } else {
        res.status(404).json({ success: false, error: 'Server not found' });
    }
});

// Update server
app.put('/api/servers/:id', (req, res) => {
    const server = servers.find(s => s.id === parseInt(req.params.id));
    if (server) {
        Object.assign(server, req.body);
        res.json({ success: true, data: server, message: 'Server updated successfully' });
    } else {
        res.status(404).json({ success: false, error: 'Server not found' });
    }
});

// Create new server
app.post('/api/servers', (req, res) => {
    const newServer = {
        id: Math.max(...servers.map(s => s.id), 0) + 1,
        ...req.body,
        status: 'online',
        cpu: 0,
        memory: 0,
        disk: 0
    };
    servers.push(newServer);
    res.status(201).json({ success: true, data: newServer, message: 'Server created successfully' });
});

// Delete server
app.delete('/api/servers/:id', (req, res) => {
    const index = servers.findIndex(s => s.id === parseInt(req.params.id));
    if (index !== -1) {
        const deletedServer = servers.splice(index, 1);
        res.json({ success: true, data: deletedServer, message: 'Server deleted successfully' });
    } else {
        res.status(404).json({ success: false, error: 'Server not found' });
    }
});

// Get server metrics (performance data)
app.get('/api/servers/:id/metrics', (req, res) => {
    const server = servers.find(s => s.id === parseInt(req.params.id));
    if (server) {
        const metrics = {
            serverId: server.id,
            serverName: server.name,
            timestamp: new Date().toISOString(),
            cpu: server.cpu,
            memory: server.memory,
            disk: server.disk,
            network: server.network,
            uptime: '99.98%',
            responseTime: Math.random() * 200 + 50
        };
        res.json({ success: true, data: metrics });
    } else {
        res.status(404).json({ success: false, error: 'Server not found' });
    }
});

// ============================================
// ROUTES - ALERTS
// ============================================

// Get all alerts
app.get('/api/alerts', (req, res) => {
    const type = req.query.type;
    let filteredAlerts = alerts;
    
    if (type && type !== 'all') {
        filteredAlerts = alerts.filter(a => a.type === type);
    }
    
    res.json({
        success: true,
        data: filteredAlerts,
        count: filteredAlerts.length
    });
});

// Get alert by ID
app.get('/api/alerts/:id', (req, res) => {
    const alert = alerts.find(a => a.id === parseInt(req.params.id));
    if (alert) {
        res.json({ success: true, data: alert });
    } else {
        res.status(404).json({ success: false, error: 'Alert not found' });
    }
});

// Create new alert
app.post('/api/alerts', (req, res) => {
    const newAlert = {
        id: Math.max(...alerts.map(a => a.id), 0) + 1,
        ...req.body,
        time: 'just now'
    };
    alerts.push(newAlert);
    res.status(201).json({ success: true, data: newAlert, message: 'Alert created successfully' });
});

// Delete alert
app.delete('/api/alerts/:id', (req, res) => {
    const index = alerts.findIndex(a => a.id === parseInt(req.params.id));
    if (index !== -1) {
        const deletedAlert = alerts.splice(index, 1);
        res.json({ success: true, data: deletedAlert, message: 'Alert deleted successfully' });
    } else {
        res.status(404).json({ success: false, error: 'Alert not found' });
    }
});

// ============================================
// ROUTES - STATISTICS
// ============================================

// Get dashboard statistics
app.get('/api/stats', (req, res) => {
    const onlineServers = servers.filter(s => s.status === 'online').length;
    const avgCpu = servers.filter(s => s.status === 'online').reduce((sum, s) => sum + s.cpu, 0) / Math.max(onlineServers, 1);
    const avgMemory = servers.filter(s => s.status === 'online').reduce((sum, s) => sum + s.memory, 0) / Math.max(onlineServers, 1);
    const criticalAlerts = alerts.filter(a => a.type === 'critical').length;
    const warningAlerts = alerts.filter(a => a.type === 'warning').length;

    res.json({
        success: true,
        data: {
            totalServers: servers.length,
            onlineServers,
            offlineServers: servers.length - onlineServers,
            avgCpu: Math.round(avgCpu),
            avgMemory: Math.round(avgMemory),
            criticalAlerts,
            warningAlerts,
            totalAlerts: alerts.length,
            uptime: '99.98%',
            responseTime: '145ms'
        }
    });
});

// ============================================
// ROUTES - SYSTEM
// ============================================

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        status: 'online',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// Get system overview
app.get('/api/overview', (req, res) => {
    const onlineServers = servers.filter(s => s.status === 'online');
    const avgCpu = onlineServers.length > 0 
        ? onlineServers.reduce((sum, s) => sum + s.cpu, 0) / onlineServers.length 
        : 0;
    const avgMemory = onlineServers.length > 0 
        ? onlineServers.reduce((sum, s) => sum + s.memory, 0) / onlineServers.length 
        : 0;

    res.json({
        success: true,
        data: {
            systemStatus: 'operational',
            totalServers: servers.length,
            onlineServers: onlineServers.length,
            offlineServers: servers.length - onlineServers.length,
            avgCpuUsage: Math.round(avgCpu),
            avgMemoryUsage: Math.round(avgMemory),
            totalAlerts: alerts.length,
            criticalAlerts: alerts.filter(a => a.type === 'critical').length,
            timestamp: new Date().toISOString()
        }
    });
});

// ============================================
// ERROR HANDLING
// ============================================

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found',
        path: req.path
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: err.message
    });
});

// ============================================
// START SERVER
// ============================================
app.listen(PORT, () => {
    console.log(`
╔══════════════════════════════════════════════════╗
║  Cloud Server Monitoring Dashboard Backend       ║
║  Running on http://localhost:${PORT}              ║
║  Environment: ${process.env.NODE_ENV || 'development'}              ║
╚══════════════════════════════════════════════════╝
    `);
});

module.exports = app;
