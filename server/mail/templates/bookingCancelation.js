

exports.bookingCancelation = (username, bookingId , refundAmount) => {
return ` <!DOCTYPE html>

<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Booking Cancellation</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    h2 {
      color: #d9534f;
    }
    p {
      font-size: 16px;
      color: #333;
    }
    .highlight {
      font-weight: bold;
      color: #0275d8;
    }
    .footer {
      margin-top: 20px;
      font-size: 12px;
      color: #777;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Booking Cancelled</h2>
    <p>Dear ${username},</p>
    <p>We would like to inform you that your booking with the reference ID <span class="highlight">${bookingId}</span> has been successfully <strong>cancelled</strong>.</p>
    <p>Your refund of <span class="highlight">₹${refundAmount}</span> has been initiated and will be credited to your original payment method within 5–7 business days.</p>
    <p>If you have any questions or need further assistance, feel free to contact our support team.</p>
    <p>Thank you for choosing <strong>SkyReserve</strong>.</p>
    <p>Safe travels!</p>
    <div class="footer">
      © 2025 SkyReserve. All rights reserved.
    </div>
  </div>
</body>
</html>`

};
