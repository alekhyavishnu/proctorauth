import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function OtpPage() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const handleVerifyOtp = async () => {
    setError('');
    if (!otp) {
      setError('Please enter the OTP');
      return;
    }
    try {
      await axios.post('http://localhost:4000/api/auth/verify-otp', { email, otp }, { withCredentials: true });
      navigate('/aws');
    } catch (err) {
      setError('Invalid or Expired OTP');
    }
  };

  return (
    <div style={{ margin: '2rem' }}>
      <h2>Enter OTP sent to {email}</h2>
      <input
        type="text"
        value={otp}
        onChange={e => setOtp(e.target.value)}
        placeholder="OTP"
        style={{ padding: '0.5rem', width: '150px' }}
      />
      <br /><br />
      <button onClick={handleVerifyOtp} style={{ padding: '0.5rem 1rem' }}>Verify OTP</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default OtpPage;