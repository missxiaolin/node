var crypto = require('crypto');



var aesutil =  {};

/**
 * aes加密
 * @param data 待加密内容
 * @param key 必须为32位私钥
 * @returns {string}
 */
aesutil.encryption = function (data, key, iv) {
    iv = iv || "";
    var clearEncoding = 'utf8';
    var cipherEncoding = 'base64';
    var cipherChunks = [];
    var cipher = crypto.createCipheriv('aes-256-ecb', key, iv);
    cipher.setAutoPadding(true);
    cipherChunks.push(cipher.update(data, clearEncoding, cipherEncoding));
    cipherChunks.push(cipher.final(cipherEncoding));
    return cipherChunks.join('');
}

/**
 * aes解密
 * @param data 待解密内容
 * @param key 必须为32位私钥
 * @returns {string}
 */
aesutil.decryption = function (data, key, iv) {
    if (!data) {
        return "";
    }
    iv = iv || "";
    var clearEncoding = 'utf8';
    var cipherEncoding = 'base64';
    var cipherChunks = [];
    var decipher = crypto.createDecipheriv('sha1', key, iv);
    decipher.setAutoPadding(true);
    cipherChunks.push(decipher.update(data, cipherEncoding, clearEncoding));
    cipherChunks.push(decipher.final(clearEncoding));
    return cipherChunks.join('');
}

function sha1(str,key) {
    var hmac = crypto.createHmac('sha256', key);

    hmac.update(str);

    return hmac.digest('hex');
}

//f0b53b2da041fca4  abcde



if(sha1('abcde','f0b53b2da041fca4')=='c54169579bccca96348741d3cfccf43579b4bd1839925aaab9f7c2bef9ca6589'){
    console.log('1')
}

// console.log(aesutil.decryption("XmSjGLDuzkGfVOcRUqMPMg==","3c6e0b8a9c15224a8228b9a98ca1531d","f0b53b2da041fca4"))

