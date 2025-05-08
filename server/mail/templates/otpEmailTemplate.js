// mail/templates/otpEmailTemplate.js

exports.otpEmailTemplate = (username, otp) => {
    return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Your OTP Code</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f9f9f9;
        margin: 0;
        padding: 20px;
      }
      .container {
        background-color: #ffffff;
        max-width: 600px;
        margin: auto;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }
      h2 {
        color: #333333;
      }
      p {
        font-size: 16px;
        color: #555555;
      }
      .otp {
        font-size: 24px;
        font-weight: bold;
        color: #007bff;
        margin: 20px 0;
      }
      .footer {
        font-size: 12px;
        color: #888;
        text-align: center;
        margin-top: 30px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Hello ${username || 'User'},</h2>
      <p>Use the following OTP to proceed with your request. This code is valid for <strong>10 minutes</strong>.</p>
      <div class="otp">${otp}</div>
      <p>If you did not request this, please ignore this email or contact support.</p>
      <p>Thanks,<br/><strong>SkyReserve Team</strong></p>
      <div class="footer">© 2025 SkyReserve. All rights reserved.</div>
    </div>
  </body>
  </html>`;
  };
  