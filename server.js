require('dotenv').config();
const express = require('express');
const Web3 = require('web3');
const axios = require('axios');

const app = express();
const port = 3000;

// Setting up Web3 to connect to the BSC Mainnet
const web3 = new Web3(process.env.BSC_MAINNET_URL);

// Token contract details
const contractAddress = process.env.CONTRACT_ADDRESS;
const contractABI = [
  {
    inputs: [
      { internalType: 'address', name: 'logic', type: 'address' },
      { internalType: 'address', name: 'admin', type: 'address' },
      { internalType: 'bytes', name: 'data', type: 'bytes' }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: 'previousAdmin', type: 'address' },
      { indexed: false, internalType: 'address', name: 'newAdmin', type: 'address' }
    ],
    name: 'AdminChanged',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'implementation', type: 'address' }
    ],
    name: 'Upgraded',
    type: 'event'
  },
  { stateMutability: 'payable', type: 'fallback' },
  {
    inputs: [],
    name: 'admin',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'newAdmin', type: 'address' }],
    name: 'changeAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'implementation',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'newImplementation', type: 'address' }],
    name: 'upgradeTo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'newImplementation', type: 'address' },
      { internalType: 'bytes', name: 'data', type: 'bytes' }
    ],
    name: 'upgradeToAndCall',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  { stateMutability: 'payable', type: 'receive' }
];

// Create contract instance
const tokenContract = new web3.eth.Contract(contractABI, contractAddress);

// Hardcoded data for display (to be dynamically updated if needed)
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
  logo: 'https://images.dodoex.
