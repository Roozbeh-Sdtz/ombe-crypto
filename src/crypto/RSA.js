import JSEncrypt from './bin/jsencrypt'

export const generate_RSA_Keys = (key_size) => {
    var sKeySize = key_size

    var keySize = parseInt(sKeySize);
    var crypt = new JSEncrypt();
    crypt.getKey();
    let keys = {}
    keys.privkey = crypt.getPrivateKey()
    keys.pubkey = crypt.getPublicKey()
    return keys
};

export const encrypt_RSA = (publicKey, input_val) => {
    // Create the encryption object.
    var crypt = new JSEncrypt();
    crypt.setPublicKey(publicKey)
    const encrypted = crypt.encrypt(input_val);
    return encrypted
};

export const decrypt_RSA = (privateKey,encrypted_val)=>{
    var crypt = new JSEncrypt();
    crypt.setPrivateKey(privateKey)
    const decrypted = crypt.decrypt(encrypted_val);
    return decrypted
}