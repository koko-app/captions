const express = require('express');
const Web3 = require('web3');
const axios = require('axios');

const app = express();
const port = 3000;

// Setup Web3 connection to the BSC Mainnet
const web3 = new Web3('https://bsc-dataseed.binance.org/');

// Token contract address and ABI (example, add your specific token ABI if necessary)
const tokenAddress = '0xd5832b536a3e82d887436aafd56f4851c5f4389b';
const tokenABI = []; // Add your token ABI here if you need to fetch on-chain data

// Token details
const tokenData = {
  name: 'BUSD',
  lastPrice: 0.99,
  totalSupply: '69000000000000000000',
  circulatingSupply: '5600000000000',
  volume24h: '5600000000',
  marketCap: '69000000000000000',
  high24h: 1,
  low24h: 0.99,
  publicPrice: '1 USD per BUSD',
  network: 'BSC Mainnet',
  logo: 'https://images.dodoex.io/4z5LcreZcLE9ZYJF6ceVP5TqvYPCstbYVR3sBd65vYE/rs:fit:0/g:no/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2RvZG8tbWVkaWEtc3RhZ2luZy91cGxvYWRfaW1nXzk4MDUxMThfMjAyNDA4MTAyMDIxNDA3MjkuanBlZw.webp'
};

// Route to fetch and display token data
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>${tokenData.name} Console</title>
      </head>
      <body>
        <h1>${tokenData.name} Token Dashboard</h1>
        <img src="${tokenData.logo}" alt="${tokenData.name} logo" width="100">
        <ul>
          <li>Last Price: $${tokenData.lastPrice}</li>
          <li>Total Supply: ${tokenData.totalSupply}</li>
          <li>Circulating Supply: ${tokenData.circulatingSupply}</li>
          <li>24h Volume: ${tokenData.volume24h}</li>
          <li>Market Cap: ${tokenData.marketCap}</li>
          <li>24h High: $${tokenData.high24h}</li>
          <li>24h Low: $${tokenData.low24h}</li>
          <li>Public Price: ${tokenData.publicPrice}</li>
          <li>Network: ${tokenData.network}</li>
        </ul>
      </body>
    </html>
  `);
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
