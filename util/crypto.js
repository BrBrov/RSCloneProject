const crypto = require('crypto');

async function getKey() {
  let keyAES = await crypto.webcrypto.subtle.generateKey({
    name: 'AES-CBC',
    length: 128
  }, true, ['encrypt', 'decrypt']);

  return keyAES;
}

async function exportKey(key) {
  let exKey = await crypto.webcrypto.subtle.exportKey("jwk", key);
  return exKey ? exKey : null;
}

async function decript(data, key, subKey) {
  const decData = await crypto.webcrypto.subtle.decrypt(
    {
      name: "AES-CBC",
      iv: subKey,
    },
    key,
    data
  );
  console.log(decData);
  return decData;
}

async function encript(data, key, subKey) {
  const encData = await crypto.webcrypto.subtle.encrypt(
    {
      name: "AES-CBC",
      iv: subKey,
    },
    key,
    data
  );

  return encData;
}

module.exports = { getKey, exportKey, decript, encript };