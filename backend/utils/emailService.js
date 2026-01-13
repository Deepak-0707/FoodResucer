const nodemailer = require('nodemailer');
require('dotenv').config();

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Send booking confirmation email
exports.sendBookingConfirmationEmail = async ({ to, name, eventType, foodsOrdered, expectedLeftover }) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: 'Food Rescue - Booking Confirmation',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .detail { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #667eea; }
          .detail strong { color: #667eea; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🍽️ Booking Confirmed!</h1>
          </div>
          <div class="content">
            <p>Dear <strong>${name}</strong>,</p>
            <p>Thank you for booking with Food Rescue! Your reservation has been confirmed.</p>
            
            <div class="detail">
              <strong>Event Type:</strong> ${eventType}
            </div>
            
            <div class="detail">
              <strong>Food Items:</strong> ${foodsOrdered}
            </div>
            
            <div class="detail">
              <strong>Expected Leftover Portions:</strong> ${expectedLeftover}
            </div>
            
            <p>We'll contact you shortly with pickup details.</p>
            <p>Thank you for helping us reduce food waste! 🌱</p>
            
            <div class="footer">
              <p>Food Rescue - Together Against Food Waste</p>
              <p>This is an automated email. Please do not reply.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
