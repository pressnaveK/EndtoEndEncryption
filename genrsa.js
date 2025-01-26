import crypto ,{generateKeyPairSync} from 'crypto';



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

let priv = Buffer.from(privateKey,'utf8');
let pub = Buffer.from(publicKey,'utf8');
priv = priv.toString('base64');
pub = pub.toString('base64');
console.log(`PUBLIC KEY : \n ${pub} \n \n \n \n PRIVATE KEY: \n ${priv}`);



