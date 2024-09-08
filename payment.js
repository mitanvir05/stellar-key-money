const { Server, Networks, TransactionBuilder, BASE_FEE, Operation, Asset, Keypair } = require('stellar-sdk');
const server = new Server('https://horizon-testnet.stellar.org');

// Public and Secret Key of the sender
const senderPublicKey = 'GDFZH2KPGRUI4QRGAHHY73DN5CJRVM7623EY5LS44KS45AIY3QM57XTE';
const senderSecretKey = 'SDCL23H6EITQXBZMEYHXLHA7LLQGO5CIXJE5FOGMX5AW7CQE2AKR3I5Y'; // Replace with your actual secret key

const receiverPublicKey = 'GDF74FMSB3VAALKO5BQUH2NORK2OJAHAYRY3J5IUUE232TPBJ6WGK7F2'; // Replace with receiver's public key
const amount = '1000'; // Amount to send (in XLM)

async function sendPayment() {
    try {
        // Load the account data
        const senderAccount = await server.loadAccount(senderPublicKey);
        
        // Create a transaction builder using the latest sequence number
        const transaction = new TransactionBuilder(senderAccount, {
            fee: BASE_FEE,
            networkPassphrase: Networks.TESTNET
        })
        .addOperation(Operation.payment({
            destination: receiverPublicKey,
            asset: Asset.native(), // XLM is the native asset
            amount: amount
        }))
        .setTimeout(30) // Transaction expires in 30 seconds
        .build();
        
        // Sign the transaction
        const senderKeypair = Keypair.fromSecret(senderSecretKey);
        transaction.sign(senderKeypair);

        // Submit the transaction to the Stellar network
        const transactionResult = await server.submitTransaction(transaction);
        console.log('Transaction successful:', transactionResult);
    } catch (error) {
        console.error('Transaction failed:', error.response ? error.response.data : error.message);
    }
}

sendPayment();
