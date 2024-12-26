const NodeRSA = require('node-rsa');

function encrypt(publicKeyBase64, salt, message) {
    let publicKeyPem = `-----BEGIN PUBLIC KEY-----
${publicKeyBase64}
-----END PUBLIC KEY-----`;
    
    let encryptor = new NodeRSA();
    encryptor.importKey(publicKeyPem, 'pkcs8-public-pem');

    let buffer = Buffer.from(encryptor.encrypt(salt+message));
    return buffer.toString("base64");
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
        return encrypt(publicKeyBase64, salt, message);
    },
}]