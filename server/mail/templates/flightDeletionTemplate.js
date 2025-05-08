exports.flightDeletionTemplate = ({ adminName, flightNumber, origin, destination, departureTime, totalRefundedUsers }) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <title>Flight Deletion Notification</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            padding: 20px;
          }
          .container {
            background-color: #fff;
            max-width: 600px;
            margin: auto;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
          }
          h2 {
            color: #d9534f;
          }
          p {
            font-size: 16px;
            color: #333;
          }
          .highlight {
            color: #0275d8;
            font-weight: bold;
          }
          .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #aaa;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Flight Deleted</h2>
          <p>Dear ${adminName},</p>
          <p>The flight <span class="highlight">${flightNumber}</span> from <strong>${origin}</strong> to <strong>${destination}</strong> scheduled to depart on <strong>${new Date(departureTime).toLocaleString()}</strong> has been <strong>deleted</strong> from the system.</p>
          <p>A total of <span class="highlight">${totalRefundedUsers}</span> booking(s) were automatically <strong>cancelled</strong> and <strong>refunded</strong> to the respective users.</p>
          <p>If this action was unintentional or needs auditing, please check the admin dashboard.</p>
          <div class="footer">
            © 2025 SkyReserve. All rights reserved.
          </div>
        </div>
      </body>
      </html>
    `;
  };
  