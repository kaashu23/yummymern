require('dotenv').config();
const initSentry = require('./config/sentry');
// Init Sentry before express is imported
initSentry();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const connectDB = require('./config/db');
const Sentry = require('@sentry/node');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Connect Database
connectDB();

const app = express();

// Set security HTTP headers
app.use(helmet());

// Webhook route needs to be mounted before express.json() to get raw body
app.use('/api/auth', require('./routes/authRoutes'));

// CORS Configuration
const allowedOrigins = [
  /^http:\/\/localhost:\d+$/,
  /^http:\/\/127\.0\.0\.1:\d+$/,
  process.env.CLIENT_URL,
  /\.netlify\.app$/,
  /\.onrender\.com$/
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    // Always allow the requesting origin in development to prevent CORS issues
    callback(null, true);
  },
  credentials: true
};

app.use(cors(corsOptions));

// Rate limiting: 100 requests per 15 minutes per IP for API routes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: 'Too many requests from this IP, please try again in 15 minutes!' }
});
app.use('/api/', apiLimiter);

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

const { clerkMiddleware } = require('@clerk/express');
app.use(clerkMiddleware()); // Global Clerk middleware is required before requireAuth()

// Routes
app.use('/api/menu', require('./routes/menuRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/tables', require('./routes/tableRoutes'));
app.use('/api/reservations', require('./routes/reservationRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/chefs', require('./routes/chefRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));
app.use('/api/testimonials', require('./routes/testimonialRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));

app.get('/', (req, res) => {
  res.send('Yummy API is running...');
});

// The error handler must be before any other error middleware and after all controllers
Sentry.setupExpressErrorHandler(app);

// Custom error handler
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: corsOptions.origin,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }
});

// Make io accessible to routes
app.set('io', io);

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  
  // Join a room for admin notifications
  socket.on('join_admin', () => {
    socket.join('admin_room');
  });

  // Join a personal room for order tracking
  socket.on('join_user', (userId) => {
    socket.join(`user_${userId}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });
}

module.exports = { app, server, io };
