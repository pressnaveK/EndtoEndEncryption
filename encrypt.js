import crypto  from 'crypto';
import readline from 'readline';


const encrypt = (pubicKey , message)=>{
    //AES encryption
    const aesKey = crypto.randomBytes(32); // 32 bytes for AES-256
    const iv = crypto.randomBytes(16); // 16 bytes for AES
    const cipher = crypto.createCipheriv('aes-256-cbc', aesKey, iv);
    let encryptedMsg = cipher.update(message, 'utf8', 'hex');
    encryptedMsg += cipher.final('hex');
    //public key Decode
    let pub = Buffer.from(pubicKey , "base64");
    pub = pub.toString("utf8");
    //AES Encryption and Encoding
    let encryptedAES = crypto.publicEncrypt(pub,aesKey);
    encryptedAES = encryptedAES.toString('base64');//Convert it again as buffer on decode as 'base64'
    let encryptedIV = crypto.publicEncrypt(pub,iv);
    encryptedIV = encryptedIV.toString('base64');//Convert it again as buffer on decode as 'base64'
    let encryptedData = {encryptedMsg , encryptedAES , encryptedIV};
    //JSON Encoding
    encryptedData = JSON.stringify(encryptedData);
    encryptedData = Buffer.from(encryptedData,'utf8');
    encryptedData = encryptedData.toString('base64');
    return encryptedData ;
};

const askQuestion = (read, question) =>
    new Promise((resolve) => read.question(question, resolve));

async function startLoop() {
    const read = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    console.log("Encryption Get Started....");
    const publicKey = await askQuestion(read, '\nEnter your publicKey:\n');
    console.log('\nPublic Key received. Now you can start entering messages:');
    
    while (true) {
        const message = await askQuestion(read, '\nEnter your message (or type "exit" to quit):\n');
        
        
        if (message.toLowerCase() === 'exit') {
            console.log('\nExiting...');
            read.close(); 
            break;
        }

        const encryptedData = encrypt(publicKey, message);
        console.log(`\nENCRYPTED_DATA:\n${encryptedData}`);
    }
}

startLoop();
