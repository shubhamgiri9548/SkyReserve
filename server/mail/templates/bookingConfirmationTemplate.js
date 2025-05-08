exports.bookingConfirmationTemplate = ({
    userName,
    flightNumber,
    origin,
    destination,
    departureTime,
    arrivalTime,
    seatsBooked,
    amountPaid,
    bookingId
  }) => {
    return `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #007bff;">✈️ Booking Confirmed – SkyReserve</h2>
        <p>Hi <strong>${userName}</strong>,</p>
        <p>Your flight booking has been successfully confirmed. Below are your booking details:</p>
        
        <table style="border-collapse: collapse; width: 100%; margin-top: 15px;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Booking ID</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${bookingId}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Flight Number</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${flightNumber}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>From</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${origin}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>To</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${destination}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Departure</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${new Date(departureTime).toLocaleString()}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Arrival</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${new Date(arrivalTime).toLocaleString()}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Seats Booked</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${seatsBooked}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Amount Paid</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">₹${amountPaid}</td>
          </tr>
        </table>
  
        <p style="margin-top: 20px;">Thank you for booking with SkyReserve. We wish you a pleasant journey!</p>
        
        <p>Best regards,<br/>SkyReserve Team</p>
      </div>
    `;
  };
  