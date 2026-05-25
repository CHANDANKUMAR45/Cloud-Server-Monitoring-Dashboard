# Quick Start Guide

Get the Cloud Server Monitoring Dashboard up and running in minutes!

## ⚡ 5-Minute Setup

### Prerequisites
- Node.js v14+ installed
- npm (comes with Node.js)

### Step 1: Clone or Navigate to Project
```bash
cd Cloud-Server-Monitoring-Dashboard
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start the Application
```bash
npm start
```

### Step 4: Open in Browser
```
http://localhost:3000
```

**That's it!** 🎉 Your dashboard is now running.

---

## 🔧 Development Mode

For active development with auto-reload:

```bash
npm run dev
```

This uses nodemon to automatically restart the server when files change.

---

## 📚 Quick Navigation

Once the dashboard is open, explore these sections:

### Dashboard
- **Location**: Main section (default)
- **View**: Real-time metrics, charts, and server table
- **Features**: Auto-refresh, quick stats, performance overview

### Servers
- **Location**: Sidebar > Servers
- **View**: All servers in card grid
- **Features**: Individual metrics, details, restart options

### Alerts
- **Location**: Sidebar > Alerts
- **View**: All system alerts
- **Features**: Filter by severity, dismiss alerts

### Analytics
- **Location**: Sidebar > Analytics
- **View**: Performance metrics
- **Features**: Uptime, response time, error rates

### Settings
- **Location**: Sidebar > Settings
- **View**: User preferences
- **Features**: Auto-refresh interval, alert thresholds, notifications

---

## 🌐 API Quick Reference

### Get All Servers
```bash
curl http://localhost:3000/api/servers
```

### Get Dashboard Stats
```bash
curl http://localhost:3000/api/stats
```

### Get All Alerts
```bash
curl http://localhost:3000/api/alerts
```

### Health Check
```bash
curl http://localhost:3000/api/health
```

See [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for complete API reference.

---

## ⚙️ Configuration

### Change Default Port
Edit `.env` file:
```env
PORT=8080
```

Then restart the server.

### Configure Auto-Refresh
In the Settings section:
1. Go to Settings from sidebar
2. Set "Auto-Refresh Interval" (in seconds)
3. Click "Save Settings"

### Set Alert Threshold
In the Settings section:
1. Go to Settings from sidebar
2. Set "CPU Alert Threshold" (in percentage)
3. Click "Save Settings"

---

## 🐳 Docker Quick Start

### Build Docker Image
```bash
docker build -t monitoring-dashboard .
```

### Run Docker Container
```bash
docker run -p 3000:3000 monitoring-dashboard
```

### Using Docker Compose
```bash
docker-compose up
```

Access at: http://localhost:3000

---

## 📱 Mobile Access

The dashboard is fully responsive. Open it on any device:

- **Smartphone**: http://localhost:3000
- **Tablet**: http://localhost:3000
- **Desktop**: http://localhost:3000

The sidebar automatically collapses on mobile devices.

---

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -i :3000
kill -9 <PID>

# Or use a different port
PORT=8000 npm start
```

### Dependencies Not Installed
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

### Changes Not Reflecting
```bash
# Clear browser cache
# Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)

# Or use development mode
npm run dev
```

### Server Won't Start
```bash
# Check if Node.js is installed
node --version

# Check if npm packages are installed
npm list

# Reinstall if needed
npm install
```

---

## 📊 Sample Data

The dashboard comes with 12 sample servers:

- 8 Online servers with realistic metrics
- 4 Offline servers
- 5 Pre-loaded system alerts
- Dynamic metric simulation

Click "Refresh" in the Dashboard to update metrics.

---

## 🎨 Customization

### Change Dashboard Title
Edit `public/index.html` line ~40:
```html
<h1>Your Custom Title</h1>
```

### Change Colors
Edit `public/styles.css` CSS variables (lines 15-25):
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    /* ... */
}
```

### Change Logo
Edit `public/index.html` line ~30:
```html
<i class="fas fa-cloud"></i>
```

---

## 📝 Sample API Requests

### Create a New Server
```bash
curl -X POST http://localhost:3000/api/servers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New-Server",
    "ip": "192.168.1.113",
    "status": "online",
    "cpu": 0,
    "memory": 0,
    "disk": 0,
    "network": "0 Mbps"
  }'
```

### Create an Alert
```bash
curl -X POST http://localhost:3000/api/alerts \
  -H "Content-Type: application/json" \
  -d '{
    "type": "warning",
    "title": "High Memory",
    "message": "Server memory usage high",
    "server": "Web-Server-01"
  }'
```

---

## 🚀 Next Steps

1. **Explore Features**: Click around to understand the dashboard
2. **Read Documentation**: Check [README.md](README.md) for details
3. **Try API**: Use curl or Postman to test API endpoints
4. **Customize**: Modify colors, text, and settings
5. **Deploy**: Follow [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment

---

## 📞 Need Help?

- Check [README.md](README.md) for comprehensive documentation
- See [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for API details
- Read [DEPLOYMENT.md](DEPLOYMENT.md) for deployment options
- Review [FEATURES.md](FEATURES.md) for feature list

---

## 📄 License

MIT License - Feel free to use for personal and commercial projects.

---

**Ready to monitor?** Open http://localhost:3000 now! 🚀
