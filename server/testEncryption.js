require('dotenv').config();

const{
    encryptPassword,
    decryptPassword,

}= require('./utils/encryption');

const original = "Mysecret123";

const encrypted = encryptPassword(original);


console.log('Encrypted data:', encrypted);
console.log('Parts:', encrypted.split(':').length);

const decrypted = decryptPassword(encrypted);

console.log('Decrypted:', decrypted);
console.log('Match:', original === decrypted);