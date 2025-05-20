const { generateOtp } = require('../utils/otp');
const { sendMail } = require('../utils/mailer');

exports.sendOtp = async (req, res) => {
  console.log('Received send-otp request:', req.body);
  const { email } = req.body;
  const otp = generateOtp();
  const expires = new Date(Date.now() + 5 * 60 * 1000); // 5 min

  try {
    // Store OTP in session
    req.session.otp = {
      code: otp,
      email: email,
      expires: expires
    };
    
    console.log('OTP stored in session, sending email...');
    await sendMail(email, otp);
    console.log('Email sent to', email);
    res.json({ message: 'OTP sent' });
  } catch (err) {
    console.error('Error in sendOtp:', err);
    res.status(500).json({ error: 'Error sending OTP', details: err.message });
  }
};

exports.verifyOtp = async (req, res) => {
  console.log('Received verify-otp request:', req.body);
  const { email, otp } = req.body;
  
  try {
    const sessionOtp = req.session.otp;
    
    if (!sessionOtp || sessionOtp.email !== email) {
      console.log('No OTP found for email:', email);
      return res.status(400).json({ error: 'No OTP found for this email' });
    }

    if (sessionOtp.code !== otp) {
      console.log('Invalid OTP for', email);
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    if (new Date() > sessionOtp.expires) {
      console.log('OTP expired for', email);
      return res.status(400).json({ error: 'OTP expired' });
    }

    // Clear OTP from session after successful verification
    delete req.session.otp;
    
    console.log('OTP verified for', email);
    res.json({ message: 'Email verified' });
  } catch (err) {
    console.error('Error in verifyOtp:', err);
    res.status(500).json({ error: 'Error verifying OTP', details: err.message });
  }
};