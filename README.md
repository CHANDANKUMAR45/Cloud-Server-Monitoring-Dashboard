# Cloud Server Monitoring Dashboard

A professional, real-time cloud server monitoring dashboard with comprehensive analytics, alerting system, and responsive design.

## 🎯 Features

### Core Features
- **Real-time Server Monitoring**: Monitor CPU, memory, disk, and network usage across multiple servers
- **Interactive Dashboard**: Beautiful, intuitive interface with live metrics and charts
- **Alert Management**: Critical, warning, and info alerts with filtering capabilities
- **Server Management**: View, manage, and control servers with detailed statistics
- **Performance Analytics**: Track system performance over time
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### Advanced Features
- Auto-refresh with configurable intervals
- Customizable alert thresholds
- Server status overview and distribution charts
- Performance metrics and historical data
- User profile and settings management
- Notification system (email and desktop)
- Search and filter capabilities

## 📦 Tech Stack

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)**: Dynamic interactivity
- **Font Awesome**: Icon library
- **Responsive Design**: Mobile-first approach

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment configuration

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- A modern web browser

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/cloud-server-monitoring-dashboard.git
cd Cloud-Server-Monitoring-Dashboard
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment** (optional)
```bash
# Create .env file with custom settings
cp .env.example .env
```

### Running the Application

#### Development Mode
```bash
# Start the server with auto-reload
npm run dev
```

#### Production Mode
```bash
# Start the server
npm start
```

The application will be available at:
- Frontend: `http://localhost:3000`
- API: `http://localhost:3000/api`

## 📖 API Documentation

### Servers Endpoints

#### Get all servers
```
GET /api/servers
Response: { success: true, data: [...], count: 12 }
```

#### Get server by ID
```
GET /api/servers/:id
Response: { success: true, data: {...} }
```

#### Create new server
```
POST /api/servers
Body: { name, ip, status, cpu, memory, disk, network }
Response: { success: true, data: {...}, message: "Server created" }
```

#### Update server
```
PUT /api/servers/:id
Body: { name, status, cpu, memory, disk, network }
Response: { success: true, data: {...}, message: "Server updated" }
```

#### Delete server
```
DELETE /api/servers/:id
Response: { success: true, data: [...], message: "Server deleted" }
```

#### Get server metrics
```
GET /api/servers/:id/metrics
Response: { success: true, data: { cpu, memory, disk, network, uptime, responseTime } }
```

### Alerts Endpoints

#### Get all alerts
```
GET /api/alerts?type=all|critical|warning|info
Response: { success: true, data: [...], count: 5 }
```

#### Get alert by ID
```
GET /api/alerts/:id
Response: { success: true, data: {...} }
```

#### Create new alert
```
POST /api/alerts
Body: { type, title, message, server }
Response: { success: true, data: {...}, message: "Alert created" }
```

#### Delete alert
```
DELETE /api/alerts/:id
Response: { success: true, data: [...], message: "Alert deleted" }
```

### Statistics Endpoints

#### Get dashboard stats
```
GET /api/stats
Response: {
  success: true,
  data: {
    totalServers: 12,
    onlineServers: 8,
    offlineServers: 4,
    avgCpu: 45,
    avgMemory: 62,
    criticalAlerts: 1,
    warningAlerts: 2,
    uptime: "99.98%",
    responseTime: "145ms"
  }
}
```

#### Get system overview
```
GET /api/overview
Response: {
  success: true,
  data: {
    systemStatus: "operational",
    totalServers: 12,
    onlineServers: 8,
    avgCpuUsage: 45,
    avgMemoryUsage: 62,
    totalAlerts: 3
  }
}
```

#### Health check
```
GET /api/health
Response: { success: true, status: "online", version: "1.0.0" }
```

## 🎨 UI Components

### Dashboard Section
- Quick stats cards (Total Servers, CPU, Memory, Active Alerts)
- System performance chart (24H, 7D, 30D views)
- Server status distribution
- Real-time server table with detailed metrics

### Servers Section
- Server cards grid with key metrics
- Individual server details
- Restart and management options
- Search and filter functionality

### Alerts Section
- Categorized alerts (Critical, Warning, Info)
- Alert filtering and dismissal
- Real-time alert timeline
- Alert severity indicators

### Analytics Section
- Performance metrics overview
- Historical data visualization
- Uptime and response time tracking
- Error rate monitoring

### Settings Section
- Auto-refresh interval configuration
- Alert threshold customization
- Notification preferences
- Theme settings (Dark/Light mode support)

## 🔧 Configuration

### Environment Variables

```env
NODE_ENV=development          # Environment (development/production)
PORT=3000                     # Server port
DEBUG=false                   # Debug mode
LOG_LEVEL=info               # Logging level
```

### Frontend Settings

User settings are stored in browser localStorage:
```javascript
{
  refreshInterval: 5,        // seconds
  alertThreshold: 80,        // percentage
  emailAlerts: true,
  desktopNotifications: true
}
```

## 📱 Responsive Breakpoints

- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Desktop**: 768px - 1024px
- **Large Desktop**: > 1024px

## 🎨 Color Scheme

- **Primary**: #6366f1 (Indigo)
- **Secondary**: #8b5cf6 (Violet)
- **Success**: #10b981 (Emerald)
- **Warning**: #f59e0b (Amber)
- **Danger**: #ef4444 (Red)
- **Info**: #3b82f6 (Blue)

## 🔐 Security Considerations

1. **Input Validation**: All API endpoints validate input
2. **CORS**: Configured for secure cross-origin requests
3. **Error Handling**: Proper error messages without exposing sensitive data
4. **Environment Variables**: Sensitive data stored in .env
5. **Logging**: Request logging for audit trails

## 📊 Performance Optimization

- CSS Grid and Flexbox for efficient layouts
- Minimal DOM manipulation
- Event delegation for multiple elements
- Auto-refresh optimization
- Responsive image loading
- CSS animations instead of JavaScript

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## 📝 File Structure

```
Cloud-Server-Monitoring-Dashboard/
├── index.html              # Main HTML file
├── styles.css              # CSS styling
├── script.js               # Frontend JavaScript
├── server.js               # Backend Express server
├── package.json            # Project dependencies
├── .env                    # Environment variables
├── .gitignore              # Git ignore rules
├── README.md               # Documentation
├── public/                 # Static files (if needed)
└── data/                   # Sample data files
```

## 🚀 Deployment

### Deploy to Heroku

```bash
# Create Heroku app
heroku create your-app-name

# Set environment variables
heroku config:set NODE_ENV=production

# Push to Heroku
git push heroku main
```

### Deploy to Vercel (Frontend only)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to AWS/Azure/GCP

1. Create virtual machine instance
2. Install Node.js
3. Clone repository
4. Run `npm install`
5. Configure reverse proxy (Nginx/Apache)
6. Set up SSL certificate
7. Use process manager (PM2) for auto-restart

## 📚 Usage Examples

### Fetching Server Data from Frontend

```javascript
// Get all servers
fetch('/api/servers')
  .then(res => res.json())
  .then(data => console.log(data));

// Get specific server metrics
fetch('/api/servers/1/metrics')
  .then(res => res.json())
  .then(data => console.log(data));
```

### Adding a New Server

```javascript
fetch('/api/servers', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'New-Server',
    ip: '192.168.1.113',
    status: 'online'
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change port in .env or specify on startup
PORT=5000 npm start
```

### CORS Errors
- Ensure backend is running on correct port
- Check CORS configuration in server.js

### Data Not Updating
- Check if auto-refresh is enabled
- Verify API endpoints are responding
- Check browser console for errors

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 👥 Authors

- **Your Name** - Initial work

## 🙏 Acknowledgments

- Font Awesome for icons
- Express.js community
- Open source contributors

## 📞 Support

For support, email support@example.com or open an issue on GitHub.

## 🗓️ Changelog

### Version 1.0.0 (Initial Release)
- Complete dashboard implementation
- Server monitoring system
- Alert management
- Analytics dashboard
- Responsive design
- RESTful API backend

---

**Last Updated**: May 26, 2024  
**Status**: Active  
**Version**: 1.0.0
