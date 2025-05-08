
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const flightRoutes = require('./routes/flightRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const invoiceRoutes  = require('./routes/invoiceRoute');
const adminRoutes  = require('./routes/adminRoutes');

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/flights', flightRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/payments' , paymentRoutes);
app.use('/api/v1/invoice' , invoiceRoutes);
app.use('/api/v1/admin', adminRoutes);



const db = require('./config/db');
db.connect();


app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
