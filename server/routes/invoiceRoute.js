const express = require('express');
const router = express.Router();
const { generateInvoice  , downloadInvoice} = require('../controllers/invoiceController');
const {protect , isUser } = require('../middlewares/authMiddleware');

// Generate invoice for a specific booking
router.get('/generate-invoice/:bookingId', protect , generateInvoice);

// Route for downloading invoice
router.get('/download-invoice/:bookingId', protect, downloadInvoice);

module.exports = router;


