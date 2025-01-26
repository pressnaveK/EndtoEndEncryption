const { generateKeyPairSync } = require('crypto');
const crypto = require('crypto');


const { publicKey, privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  });
  const pri = crypto.createPrivateKey({
    key:privateKey,
    format: 'pem'
  });

const exportPrivateKey = pri.export({format:"pem",type:"pkcs8"});
const byteData = Buffer.from(exportPrivateKey,'utf8');
const byteString = byteData.toString('base64');
const data = Buffer.from(byteString,"base64");
const finaldata = data.toString('utf8');
console.log('Public Key:\n', finaldata);
  
  