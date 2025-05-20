const { authenticator } = require('otplib');

function generateOtp() {
  return authenticator.generate(authenticator.generateSecret());
}

module.exports = { generateOtp };