// utils/encryption.js
import CryptoJS from "crypto-js";

export function encryptMessage(text, key) {
  const keyUtf8 = CryptoJS.enc.Utf8.parse(key);
  const textUtf8 = CryptoJS.enc.Utf8.parse(text);
  const encrypted = CryptoJS.AES.encrypt(textUtf8, keyUtf8, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}

export function decryptMessage(cipherText, key) {
  const keyUtf8 = CryptoJS.enc.Utf8.parse(key);
  const decrypted = CryptoJS.AES.decrypt(
    {
      ciphertext: CryptoJS.enc.Base64.parse(cipherText),
    },
    keyUtf8,
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  return decrypted.toString(CryptoJS.enc.Utf8);
}
