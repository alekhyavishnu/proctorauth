import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmailPage from './pages/EmailPage';
import OtpPage from './pages/OtpPage';
import AwsPage from './pages/AwsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmailPage />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/aws" element={<AwsPage />} />
      </Routes>
    </Router>
  );
}

export default App;