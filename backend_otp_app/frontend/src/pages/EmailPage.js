import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EmailPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    setError('');
    if (!email) {
      setError('Please enter your email');
      return;
    }
    try {
      await axios.post('http://localhost:4000/api/auth/send-otp', { email }, { withCredentials: true });
      navigate('/otp', { state: { email } });
    } catch (err) {
      setError('Failed to send OTP');
    }
  };

  return (
    <div style={{ margin: '2rem' }}>
      <h2>Enter your Email</h2>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        style={{ padding: '0.5rem', width: '250px' }}
      />
      <br /><br />
      <button onClick={handleSendOtp} style={{ padding: '0.5rem 1rem' }}>Send OTP</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default EmailPage;