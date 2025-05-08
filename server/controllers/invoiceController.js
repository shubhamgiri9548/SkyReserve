const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const Booking = require('../models/Booking');
const Flight = require('../models/Flight');
const User = require('../models/User');



exports.generateInvoice = async (req, res) => {
  try {
    const { bookingId } = req.params;

    // Fetch booking with flight and user data
    const booking = await Booking.findById(bookingId)
      .populate('user')
      .populate('flight');

    if (!booking) {
      return res.status(404).json({ 
        success: false,
        message: 'Booking not found'
      });
    }

    const invoiceFolderPath = path.join(__dirname, '../invoices');
    const pdfPath = path.join(invoiceFolderPath, `invoice-${bookingId}.pdf`);

    // Ensure invoice folder exists
    if (!fs.existsSync(invoiceFolderPath)) {
      fs.mkdirSync(invoiceFolderPath, { recursive: true });
    }

    // Generate PDF and wait for it to finish
    await new Promise((resolve, reject) => {
      const doc = new PDFDocument();
      const stream = fs.createWriteStream(pdfPath);

      doc.pipe(stream);

      doc.fontSize(20).text('Flight Booking Ticket', { align: 'center' });
      doc.moveDown();

      doc.fontSize(14).text(`Booking ID: ${booking._id}`);
      doc.text(`User: ${booking.user.name} (${booking.user.email})`);
      doc.text(`Flight: ${booking.flight.flightNumber} (${booking.flight.source} -> ${booking.flight.destination})`);
      doc.text(`Seats Booked: ${booking.seatsBooked}`);
      doc.text(`Status: ${booking.status}`);
      doc.text(`Date: ${booking.bookingDate.toLocaleDateString()}`);
      doc.moveDown();
      doc.text('Thank you for booking with us!', { align: 'center' });

      doc.end();

      stream.on('finish', resolve);
      stream.on('error', reject);
    });

    // Update invoice URL and save to DB
    booking.invoiceUrl = `/invoices/invoice-${bookingId}.pdf`;
    booking.totalAmount = booking.flight.price * booking.seatsBooked;  // ✅ Fix
    await booking.save();

    // Return response to frontend
    return res.status(200).json({
      success: true,
      message: 'Invoice generated successfully',
      invoiceUrl: booking.invoiceUrl,
    });

  } catch (error) {
    console.error('PDF generation failed:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to generate invoice'
    });
  }
};



// download the invoice 
exports.downloadInvoice = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId)
      .populate('user')
      .populate('flight');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    // Set PDF headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=invoice-${bookingId}.pdf`);

    const doc = new PDFDocument();
    doc.pipe(res); // Pipe directly to response

    doc.fontSize(20).text('Flight Booking Ticket', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Booking ID: ${booking._id}`);
    doc.text(`User: ${booking.user.name} (${booking.user.email})`);
    doc.text(`Flight: ${booking.flight.flightNumber} (${booking.flight.origin} -> ${booking.flight.destination})`);
    doc.text(`Seats Booked: ${booking.seatsBooked}`);
    doc.text(`Status: ${booking.status}`);
    doc.text(`Date: ${booking.bookingDate.toLocaleDateString()}`);
    doc.moveDown();
    doc.text('Thank you for booking with us!', { align: 'center' });

    doc.end(); // End the stream (automatically finishes the response)
    
  } catch (error) {
    console.error('Invoice download failed:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to generate invoice',
    });
  }
};
