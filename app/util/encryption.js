const crypto = require('crypto');

// Define the encryption parameters
const algorithm = 'aes-256-cbc'; // Symmetric encryption algorithm
// const key = crypto.randomBytes(32); // Must be 32 bytes for AES-256
const iv = crypto.randomBytes(16); // Initialization vector (16 bytes)
const password = "1234fdsd"
const keyLength = 32; // Key length for AES-256
const ivLength = 16; 
const salt = crypto.randomBytes(16); // Random salt for key derivation
const iterations = 100000; // Number of iterations for PBKDF2

let encryption = {}

function deriveKey(password) {
    return crypto.pbkdf2Sync(password, salt, iterations, keyLength, 'sha256');
}
// Function to encrypt a message
encryption.encrypt=(text) =>{
    
    const cipher = crypto.createCipheriv(algorithm, deriveKey(password), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return { encryptedData: encrypted, iv: iv.toString('hex') }; // Return IV for decryption
}

// Function to decrypt a message
encryption.decrypt= (encryptedData, iv) =>{
    const decipher = crypto.createDecipheriv(algorithm, deriveKey(password), Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

module.exports = encryption