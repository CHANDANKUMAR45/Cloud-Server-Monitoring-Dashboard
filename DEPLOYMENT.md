# Deployment Guide

## Local Development

### Prerequisites
- Node.js v14+
- npm or yarn
- Git

### Setup

1. **Clone Repository**
```bash
git clone https://github.com/yourusername/cloud-server-monitoring-dashboard.git
cd Cloud-Server-Monitoring-Dashboard
```

2. **Install Dependencies**
```bash
npm install
```

3. **Configure Environment**
```bash
cp .env.example .env
# Edit .env with your settings
```

4. **Start Development Server**
```bash
npm run dev
```

Access at: `http://localhost:3000`

---

## Docker Deployment

### Build Docker Image
```bash
docker build -t cloud-monitoring-dashboard .
```

### Run Docker Container
```bash
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e PORT=3000 \
  cloud-monitoring-dashboard
```

### Using Docker Compose
```bash
docker-compose up -d
```

---

## Heroku Deployment

### Prerequisites
- Heroku CLI installed
- GitHub account

### Steps

1. **Create Heroku App**
```bash
heroku create your-app-name
```

2. **Set Environment Variables**
```bash
heroku config:set NODE_ENV=production
heroku config:set PORT=3000
```

3. **Deploy**
```bash
git push heroku main
```

4. **View Logs**
```bash
heroku logs --tail
```

Access at: `https://your-app-name.herokuapp.com`

---

## AWS EC2 Deployment

### Prerequisites
- AWS account
- EC2 instance (Ubuntu 20.04 or similar)
- Security group configured for ports 80, 443, 3000

### Steps

1. **Connect to Instance**
```bash
ssh -i your-key.pem ubuntu@your-instance-ip
```

2. **Install Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. **Install PM2 (Process Manager)**
```bash
npm install -g pm2
```

4. **Clone Repository**
```bash
git clone https://github.com/yourusername/cloud-server-monitoring-dashboard.git
cd Cloud-Server-Monitoring-Dashboard
```

5. **Install Dependencies**
```bash
npm install --production
```

6. **Start Application**
```bash
pm2 start server.js --name "dashboard"
pm2 save
pm2 startup
```

7. **Configure Nginx (Reverse Proxy)**
```bash
sudo apt-get install -y nginx

# Create nginx config
sudo nano /etc/nginx/sites-available/default
```

Add this configuration:
```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    server_name _;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

8. **Start Nginx**
```bash
sudo service nginx restart
```

---

## Azure App Service Deployment

### Prerequisites
- Azure account
- Azure CLI installed

### Steps

1. **Login to Azure**
```bash
az login
```

2. **Create Resource Group**
```bash
az group create --name myResourceGroup --location eastus
```

3. **Create App Service Plan**
```bash
az appservice plan create --name myPlan --resource-group myResourceGroup --sku F1 --is-linux
```

4. **Create Web App**
```bash
az webapp create --resource-group myResourceGroup --plan myPlan \
  --name dashboardapp --runtime "node|16-lts"
```

5. **Deploy**
```bash
az webapp deployment source config-zip --resource-group myResourceGroup \
  --name dashboardapp --src deploy.zip
```

---

## DigitalOcean App Platform Deployment

### Prerequisites
- DigitalOcean account
- GitHub repository connected

### Steps

1. **Navigate to App Platform**
   - Go to DigitalOcean Dashboard
   - Click "Create" → "Apps"

2. **Connect Repository**
   - Select your GitHub repository
   - Choose branch to deploy

3. **Configure**
   - Set build command: `npm ci`
   - Set run command: `npm start`
   - Add environment variables

4. **Deploy**
   - Click "Deploy App"
   - Monitor deployment progress

---

## Production Checklist

- [ ] Use environment variables for all configuration
- [ ] Set NODE_ENV to production
- [ ] Enable HTTPS/SSL certificate
- [ ] Setup database backups
- [ ] Configure monitoring and logging
- [ ] Setup auto-scaling if needed
- [ ] Configure CDN for static assets
- [ ] Setup firewall rules
- [ ] Enable rate limiting
- [ ] Setup error monitoring (Sentry)
- [ ] Configure log aggregation (ELK Stack)
- [ ] Setup health checks
- [ ] Enable security headers
- [ ] Setup automated backups
- [ ] Configure uptime monitoring

---

## SSL/TLS Configuration

### Using Let's Encrypt (Free)

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Generate certificate
sudo certbot certonly --nginx -d yourdomain.com

# Configure renewal
sudo systemctl enable certbot.timer
```

### Using Self-Signed Certificate

```bash
# Generate certificate (valid for 365 days)
openssl req -x509 -newkey rsa:4096 -nodes -out cert.pem -keyout key.pem -days 365
```

---

## Performance Optimization

### Enable Gzip Compression
```javascript
const compression = require('compression');
app.use(compression());
```

### Setup CDN
- Use CloudFlare or similar
- Cache static assets
- Minify CSS/JS

### Database Optimization
- Add indexes
- Optimize queries
- Use connection pooling

---

## Monitoring & Logging

### Setup PM2 Monitoring
```bash
pm2 install pm2-logrotate
pm2 install pm2-auto-pull
pm2 web
```

### Application Logging
```javascript
const winston = require('winston');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

---

## Troubleshooting

### Port Already in Use
```bash
lsof -i :3000
kill -9 <PID>
```

### Node Version Issues
```bash
nvm install 16
nvm use 16
```

### Memory Issues
```bash
# Increase Node.js heap size
node --max-old-space-size=4096 server.js
```

### PM2 Restart
```bash
pm2 restart dashboard
pm2 logs dashboard
```

---

## Backup & Recovery

### Regular Backups
```bash
# Backup database and configs
tar -czf backup-$(date +%Y%m%d).tar.gz ./data ./config

# Upload to S3
aws s3 cp backup-*.tar.gz s3://your-bucket/backups/
```

### Recovery
```bash
# Download from S3
aws s3 cp s3://your-bucket/backups/backup-latest.tar.gz .

# Extract
tar -xzf backup-latest.tar.gz
```

---

## Support & Maintenance

For issues or questions:
- Check logs: `pm2 logs`
- Review error messages
- Check system resources
- Consult documentation
- Contact support team

---

**Last Updated**: May 26, 2024  
**Deployment Version**: 1.0.0
