// mail/templates/flightCreationTemplate.js

exports.flightCreationTemplate = ({
    adminName = "Admin",
    flightNumber,
    origin,
    destination,
    departureTime,
    arrivalTime,
    price,
    seatsAvailable,
  }) => {
    return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>New Flight Created</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f6f9fc;
        padding: 20px;
        margin: 0;
      }
      .container {
        max-width: 600px;
        background-color: #fff;
        padding: 20px;
        margin: auto;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
      h2 {
        color: #2e86de;
      }
      p {
        font-size: 15px;
        color: #333;
        margin: 8px 0;
      }
      .highlight {
        font-weight: bold;
        color: #000;
      }
      .footer {
        margin-top: 30px;
        font-size: 12px;
        text-align: center;
        color: #888;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Flight Created Successfully</h2>
      <p>Dear ${adminName},</p>
      <p>A new flight has been successfully added to the system with the following details:</p>
      <p><span class="highlight">Flight Number:</span> ${flightNumber}</p>
      <p><span class="highlight">From:</span> ${origin}</p>
      <p><span class="highlight">To:</span> ${destination}</p>
      <p><span class="highlight">Departure:</span> ${new Date(departureTime).toLocaleString()}</p>
      <p><span class="highlight">Arrival:</span> ${new Date(arrivalTime).toLocaleString()}</p>
      <p><span class="highlight">Price:</span> ₹${price}</p>
      <p><span class="highlight">Seats Available:</span> ${seatsAvailable}</p>
  
      <p>Thank you for keeping the system up to date.</p>
      <p>— SkyReserve System</p>
  
      <div class="footer">© 2025 SkyReserve. All rights reserved.</div>
    </div>
  </body>
  </html>`;
  };
  