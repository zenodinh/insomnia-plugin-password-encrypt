const crypto = require('crypto');



function getPublicKeyPem(publicKeyBase64) {
    // Public key (in PEM format)
    const publicKey = `-----BEGIN PUBLIC KEY-----
${publicKeyBase64}
-----END PUBLIC KEY-----`;
    return publicKey;
}

// Function to encrypt password using RSA and public key
function encryptPassword(publicKeyBase64, salt, password) {
    // Concatenate salt and password
    const data = salt + password;

    // Use crypto module to encrypt with the public key
    const buffer = Buffer.from(data, 'utf-8');

    // Initialize the encryption using the public key
    const encrypted = crypto.publicEncrypt(
        {
            key: getPublicKeyPem(publicKeyBase64),
            padding: crypto.constants.RSA_PKCS1_PADDING,
        },
        buffer
    );

    // Return the encrypted data as a Base64 string
    return encrypted.toString('base64');
}


module.exports.templateTags = [{
    name: 'PasswordEncrypt',
    displayName: 'Encrypt Password',
    description: 'Encrypt password with RSA',
    args: [
        {
            displayName: 'publicKey',
            description: 'Public key in base64 format',
            type: 'string',
            defaultValue: '',
        },
        {
            displayName: 'salt',
            description: 'Salt text for padding',
            type: 'string',
            defaultValue: '',
        },
        {
            displayName: 'message',
            description: 'message to be encrypted',
            type: 'string',
            defaultValue: '',
        },
    ],
    async run(context, publicKeyBase64, salt, message) {
        return encryptPassword(publicKeyBase64, salt, message);
    },
}]