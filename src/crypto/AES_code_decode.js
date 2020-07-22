import aesjs from './AES'

export const AES_code_decode = () => {
// An example 128-bit key (16 bytes * 8 bits/byte = 128 bits)
    var key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

// Convert text to bytes
    var text = 'Text may be any length you wish, no padding is required.';
    var textBytes = aesjs.utils.utf8.toBytes(text);

// The counter is optional, and if omitted will begin at 1
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var encryptedBytes = aesCtr.encrypt(textBytes);

// To print or store the binary data, you may convert it to hex
    var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    console.log(encryptedHex);
// "a338eda3874ed884b6199150d36f49988c90f5c47fe7792b0cf8c7f77eeffd87
//  ea145b73e82aefcf2076f881c88879e4e25b1d7b24ba2788"

// When ready to decrypt the hex string, convert it back to bytes
    var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);

// The counter mode of operation maintains internal state, so to
// decrypt a new instance must be instantiated.
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var decryptedBytes = aesCtr.decrypt(encryptedBytes);

// Convert our bytes back into text
    var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    console.log(decryptedText);
// "Text may be any length you wish, no padding is required."
}

export const AES_encrypt = (inputStringData) => {
    const key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];


    // const textBytes = aesjs.utils.utf8.toBytes(inputStringData)
    const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    return {
        data: aesCtr.encrypt(inputStringData),
        key: key
    };

// The counter is optional, and if omitted will begin at 1

}

export const AES_decrypt = (inputBytesData,key) => {
    // const textBytes = aesjs.utils.utf8.toBytes(inputBytesData);
    const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    return aesCtr.decrypt(inputBytesData);
}