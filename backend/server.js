const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

// Sanitize CLIENT_URL (remove trailing slash) to prevent CORS mismatches
const rawClientUrl = process.env.CLIENT_URL || "http://localhost:5173";
const clientOrigin = rawClientUrl.endsWith('/') ? rawClientUrl.slice(0, -1) : rawClientUrl;

// Configure Socket.io
const io = socketIo(server, {
  cors: {
    origin: clientOrigin,
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Socket.io connection handler
io.on('connection', (socket) => {
  console.log('client connected');

  socket.on('disconnect', () => {
    console.log('client disconnected');
  });
});

// Export the io instance so controllers can import it
module.exports = { io };

// Middleware
app.use(cors({
  origin: clientOrigin,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Basic health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Dish Management Dashboard API is running' });
});

// Mount Routes
const authRoutes = require('./routes/authRoutes');
const dishRoutes = require('./routes/dishRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/dishes', dishRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
