const crypto = require('crypto');

// Parameters
const algorithm = 'aes-256-cbc'; // Symmetric encryption algorithm
const salt = crypto.randomBytes(16); // Random salt for key derivation
const iterations = 100000; // Number of iterations for PBKDF2
const keyLength = 32; // Key length for AES-256
const ivLength = 16; // IV length for AES

// Derive a key from the external string (passphrase)
function deriveKey(password) {
    return crypto.pbkdf2Sync(password, salt, iterations, keyLength, 'sha256');
}

// Encrypt function
function encrypt(text, password) {
    const iv = crypto.randomBytes(ivLength); // Random IV
    const key = deriveKey(password);
    const cipher = crypto.createCipheriv(algorithm, key, iv);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return {
        encryptedData: encrypted,
        iv: iv.toString('hex'),
        salt: salt.toString('hex'), // Include salt for decryption
    };
}

// Decrypt function
function decrypt(encryptedData, ivHex, saltHex, password) {
    const iv = Buffer.from(ivHex, 'hex');
    const salt = Buffer.from(saltHex, 'hex');
    const key = crypto.pbkdf2Sync(password, salt, iterations, keyLength, 'sha256');
    const decipher = crypto.createDecipheriv(algorithm, key, iv);

    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// Example usage
const password = 'my_secure_password'; // External string (passphrase)
const message = 'Hello information';

console.log('Original Message:', message);

// Encrypt the message
const encrypted = encrypt(message, password);
console.log('Encrypted Data:', encrypted.encryptedData);
console.log('IV:', encrypted.iv);
console.log('Salt:', encrypted.salt);

// Decrypt the message
const decrypted = decrypt(encrypted.encryptedData, encrypted.iv, encrypted.salt, password);
console.log('Decrypted Message:', decrypted);
