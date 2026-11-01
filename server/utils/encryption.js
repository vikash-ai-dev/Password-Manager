
const crypto = require('crypto');

const algorithm = 'aes-256-gcm';

function getKey() {
    const key = process.env.ENCRYPTION_KEY;

    if (!key || !/^[0-9a-fA-F]{64}$/.test(key)) {
        throw new Error(
            'ENCRYPTION_KEY must be a 64-character hexadecimal string'
        );
    }

    return Buffer.from(key, 'hex');
}

function encryptPassword(password) {
    const iv = crypto.randomBytes(12);

    const cipher = crypto.createCipheriv(
        algorithm,
        getKey(),
        iv
    );

    let encrypted = cipher.update(password, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag();

    return [
        iv.toString('hex'),
        authTag.toString('hex'),
        encrypted
    ].join(':');
}

function decryptPassword(encryptedData) {
    const [ivHex, authTagHex, encrypted] = encryptedData.split(':');

    if (!ivHex || !authTagHex || !encrypted) {
        throw new Error('Invalid encrypted password format');
    }

    const decipher = crypto.createDecipheriv(
        algorithm,
        getKey(),
        Buffer.from(ivHex, 'hex')
    );

    decipher.setAuthTag(Buffer.from(authTagHex, 'hex'));

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}

module.exports = {
    encryptPassword,
    decryptPassword
};
