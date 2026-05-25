# API Reference

## Base URL
```
http://localhost:3000/api
```

## Authentication
Currently, the API is open without authentication. For production, implement JWT or OAuth.

## Response Format
All responses follow this format:
```json
{
  "success": true/false,
  "data": {},
  "error": "error message if failed",
  "message": "success message if applicable"
}
```

---

## Servers API

### List All Servers
**GET** `/servers`

```bash
curl -X GET http://localhost:3000/api/servers
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Web-Server-01",
      "ip": "192.168.1.101",
      "status": "online",
      "cpu": 35,
      "memory": 56,
      "disk": 42,
      "network": "125.5 Mbps"
    }
  ],
  "count": 12
}
```

### Get Single Server
**GET** `/servers/:id`

```bash
curl -X GET http://localhost:3000/api/servers/1
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Web-Server-01",
    "ip": "192.168.1.101",
    "status": "online",
    "cpu": 35,
    "memory": 56,
    "disk": 42,
    "network": "125.5 Mbps"
  }
}
```

### Create New Server
**POST** `/servers`

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

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 13,
    "name": "New-Server",
    "ip": "192.168.1.113",
    "status": "online",
    "cpu": 0,
    "memory": 0,
    "disk": 0,
    "network": "0 Mbps"
  },
  "message": "Server created successfully"
}
```

### Update Server
**PUT** `/servers/:id`

```bash
curl -X PUT http://localhost:3000/api/servers/1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "offline",
    "cpu": 45
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Web-Server-01",
    "ip": "192.168.1.101",
    "status": "offline",
    "cpu": 45,
    "memory": 56,
    "disk": 42,
    "network": "125.5 Mbps"
  },
  "message": "Server updated successfully"
}
```

### Delete Server
**DELETE** `/servers/:id`

```bash
curl -X DELETE http://localhost:3000/api/servers/1
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Web-Server-01",
      "ip": "192.168.1.101",
      "status": "online",
      "cpu": 35,
      "memory": 56,
      "disk": 42,
      "network": "125.5 Mbps"
    }
  ],
  "message": "Server deleted successfully"
}
```

### Get Server Metrics
**GET** `/servers/:id/metrics`

```bash
curl -X GET http://localhost:3000/api/servers/1/metrics
```

**Response:**
```json
{
  "success": true,
  "data": {
    "serverId": 1,
    "serverName": "Web-Server-01",
    "timestamp": "2024-05-26T10:30:00.000Z",
    "cpu": 35,
    "memory": 56,
    "disk": 42,
    "network": "125.5 Mbps",
    "uptime": "99.98%",
    "responseTime": 145.23
  }
}
```

---

## Alerts API

### List All Alerts
**GET** `/alerts`

Query Parameters:
- `type` (optional): Filter by type - `all`, `critical`, `warning`, `info`

```bash
# Get all alerts
curl -X GET http://localhost:3000/api/alerts

# Get critical alerts only
curl -X GET http://localhost:3000/api/alerts?type=critical
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "type": "critical",
      "title": "High CPU Usage Detected",
      "message": "Build-Server-01 CPU usage exceeded 70% threshold",
      "time": "2 minutes ago",
      "server": "Build-Server-01"
    }
  ],
  "count": 1
}
```

### Get Single Alert
**GET** `/alerts/:id`

```bash
curl -X GET http://localhost:3000/api/alerts/1
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "type": "critical",
    "title": "High CPU Usage Detected",
    "message": "Build-Server-01 CPU usage exceeded 70% threshold",
    "time": "2 minutes ago",
    "server": "Build-Server-01"
  }
}
```

### Create New Alert
**POST** `/alerts`

```bash
curl -X POST http://localhost:3000/api/alerts \
  -H "Content-Type: application/json" \
  -d '{
    "type": "warning",
    "title": "Memory Usage High",
    "message": "API-Server-01 memory usage at 85%",
    "server": "API-Server-01"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 6,
    "type": "warning",
    "title": "Memory Usage High",
    "message": "API-Server-01 memory usage at 85%",
    "server": "API-Server-01",
    "time": "just now"
  },
  "message": "Alert created successfully"
}
```

### Delete Alert
**DELETE** `/alerts/:id`

```bash
curl -X DELETE http://localhost:3000/api/alerts/1
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "type": "critical",
      "title": "High CPU Usage Detected",
      "message": "Build-Server-01 CPU usage exceeded 70% threshold",
      "time": "2 minutes ago",
      "server": "Build-Server-01"
    }
  ],
  "message": "Alert deleted successfully"
}
```

---

## Statistics API

### Get Dashboard Statistics
**GET** `/stats`

```bash
curl -X GET http://localhost:3000/api/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalServers": 12,
    "onlineServers": 8,
    "offlineServers": 4,
    "avgCpu": 45,
    "avgMemory": 62,
    "criticalAlerts": 1,
    "warningAlerts": 2,
    "totalAlerts": 3,
    "uptime": "99.98%",
    "responseTime": "145ms"
  }
}
```

### Get System Overview
**GET** `/overview`

```bash
curl -X GET http://localhost:3000/api/overview
```

**Response:**
```json
{
  "success": true,
  "data": {
    "systemStatus": "operational",
    "totalServers": 12,
    "onlineServers": 8,
    "offlineServers": 4,
    "avgCpuUsage": 45,
    "avgMemoryUsage": 62,
    "totalAlerts": 3,
    "criticalAlerts": 1,
    "timestamp": "2024-05-26T10:30:00.000Z"
  }
}
```

---

## System API

### Health Check
**GET** `/health`

```bash
curl -X GET http://localhost:3000/api/health
```

**Response:**
```json
{
  "success": true,
  "status": "online",
  "timestamp": "2024-05-26T10:30:00.000Z",
  "version": "1.0.0"
}
```

---

## Error Responses

### 404 Not Found
```json
{
  "success": false,
  "error": "Server not found"
}
```

### 400 Bad Request
```json
{
  "success": false,
  "error": "Invalid request parameters"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Internal server error",
  "message": "Error description"
}
```

---

## Testing Endpoints

You can test the API using:

### cURL
```bash
curl -X GET http://localhost:3000/api/servers
```

### Postman
1. Import the collection into Postman
2. Set environment variables
3. Run requests

### Insomnia
Import the collection and test endpoints directly

### JavaScript/Node.js
```javascript
const response = await fetch('http://localhost:3000/api/servers');
const data = await response.json();
console.log(data);
```

### Python
```python
import requests
response = requests.get('http://localhost:3000/api/servers')
data = response.json()
print(data)
```

---

## Rate Limiting
Currently, no rate limiting is implemented. For production, consider implementing:
- Request throttling
- IP-based limiting
- Per-user limiting

## Version
API Version: 1.0.0  
Last Updated: May 26, 2024
