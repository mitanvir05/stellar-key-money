// Import Stellar SDK
const StellarSdk = require('stellar-sdk');

// Generate a new keypair
const pair = StellarSdk.Keypair.random();

// Print public and secret keys
console.log('Public Key:', pair.publicKey());   // Your public key (shareable)
console.log('Secret Key:', pair.secret());      // Your private key (keep this safe!)
