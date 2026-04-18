require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const logger = require('./src/utils/logger');
const errorHandler = require('./src/middleware/errorHandler');
const uploadRoutes = require('./src/routes/upload.routes');
const queryRoutes = require('./src/routes/query.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

// Security & Performance Middleware
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api', apiLimiter);

// Routes
app.use('/api', uploadRoutes);
app.use('/api', queryRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error Handling
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
