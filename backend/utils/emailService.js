const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


const sendConfirmationEmail = async (eventData) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: eventData.email, 
        subject: 'Event Booking Confirmation',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h2 style="color: #667eea; text-align: center;">Thank You for Your Booking!</h2>
                <p style="text-align: center; color: #666;">We have received your event booking request.</p>
                
                <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="color: #333; margin-bottom: 15px;">Your Event Details:</h3>
                    <p><strong>Event Type:</strong> ${eventData.eventType}</p>
                    <p><strong>Food Type:</strong> ${eventData.foodType}</p>
                    <p><strong>Day of Week:</strong> ${eventData.dayOfWeek}</p>
                    <p><strong>Time:</strong> ${eventData.time}</p>
                    <p><strong>Expected Guests:</strong> ${eventData.expectedGuests}</p>
                    <p><strong>Foods Ordered:</strong></p>
                    <p style="background: white; padding: 10px; border-radius: 5px;">${eventData.foodsOrdered}</p>
                    <p><strong>Booking Date:</strong> ${new Date(eventData.submittedAt).toLocaleString()}</p>
                </div>
                
                <div style="background: #e8f4f8; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <p style="margin: 0; color: #333;"> Your booking has been confirmed!</p>
                    <p style="margin: 10px 0 0 0; color: #666; font-size: 0.9em;">Our team will contact you shortly to finalize the details.</p>
                </div>
                
                <p style="text-align: center; color: #666; margin-top: 20px; font-size: 0.9em;">
                    If you have any questions, please reply to this email.<br>
                    We look forward to making your event special!
                </p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(' Confirmation email sent successfully');
        return true;
    } catch (error) {
        console.error(' Email sending failed:', error);
        return false;
    }
};

module.exports = { sendConfirmationEmail };