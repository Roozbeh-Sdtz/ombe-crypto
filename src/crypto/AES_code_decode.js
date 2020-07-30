import aesjs from './AES'

export const AES_encrypt = (inputStringData) => {
    let key = [];
    for (let i = 0; i < 16; i++) {
        const k = Math.floor(Math.random() * 256)
        key.push(k)
    }
    const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    return {
        data: aesCtr.encrypt(inputStringData),
        key: key
    };
}

export const AES_decrypt = (inputBytesData, key) => {
    const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    return aesCtr.decrypt(inputBytesData);
}