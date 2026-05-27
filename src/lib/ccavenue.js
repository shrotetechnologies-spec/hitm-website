import crypto from 'crypto';

export function getAlgorithm(keyBase64) {
    const key = Buffer.from(keyBase64, 'base64');
    switch (key.length) {
        case 16:
            return 'aes-128-cbc';
        case 32:
            return 'aes-256-cbc';
    }
    throw new Error('Invalid key length: ' + key.length);
}

export function encrypt(plainText, workingKey) {
    // Generate Md5 hash for the key and then convert in base64 string
    const md5 = crypto.createHash('md5').update(workingKey).digest();
    const keyBase64 = Buffer.from(md5).toString('base64');

    // Initializing Vector and then convert in base64 string
    const ivBase64 = Buffer.from([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f]).toString('base64');

    const key = Buffer.from(keyBase64, 'base64');
    const iv = Buffer.from(ivBase64, 'base64');

    const cipher = crypto.createCipheriv(getAlgorithm(keyBase64), key, iv);
    let encrypted = cipher.update(plainText, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

export function decrypt(encText, workingKey) {
    // Generate Md5 hash for the key and then convert in base64 string
    const md5 = crypto.createHash('md5').update(workingKey).digest();
    const keyBase64 = Buffer.from(md5).toString('base64');

    // Initializing Vector and then convert in base64 string
    const ivBase64 = Buffer.from([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f]).toString('base64');

    const key = Buffer.from(keyBase64, 'base64');
    const iv = Buffer.from(ivBase64, 'base64');

    const decipher = crypto.createDecipheriv(getAlgorithm(keyBase64), key, iv);
    let decrypted = decipher.update(encText, 'hex');
    decrypted += decipher.final();
    return decrypted;
}
