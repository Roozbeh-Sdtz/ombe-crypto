import JSEncrypt from './bin/jsencrypt'

export const generate_RSA_Keys = (sKey_size) => {
    var keySize = parseInt(sKey_size);
    var crypt = new JSEncrypt();
    crypt.getKey();
    let keys = {}
    keys.prvKey = crypt.getPrivateKey()
    keys.pubKey = crypt.getPublicKey()
    return keys
};

export const encrypt_RSA = (publicKey, input_val) => {
    // Create the encryption object.
    var crypt = new JSEncrypt();
    crypt.setPublicKey(publicKey)
    return crypt.encrypt(input_val)
};

export const decrypt_RSA = (privateKey, encrypted_val) => {
    var crypt = new JSEncrypt();
    crypt.setPrivateKey(privateKey)
    return crypt.decrypt(encrypted_val)
}