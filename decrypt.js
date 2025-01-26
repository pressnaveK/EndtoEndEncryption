import crypto  from 'crypto';
import readline from 'readline';
const decrypt = (privateKey , encryptedData)=>{
    //Decode privateKey
    let priv = Buffer.from(privateKey , "base64");
    priv = priv.toString("utf8");
    //Decode encryptedData
    let data = Buffer.from(encryptedData,'base64');
    data = data.toString('utf8');
    data = JSON.parse(data);
    let {encryptedMsg , encryptedAES , encryptedIV} = data;
    //Decode AES key pairs
    encryptedAES = Buffer.from(encryptedAES,'base64');
    encryptedIV = Buffer.from(encryptedIV,'base64');
    //Decrypt AES key pairs using private key
    const aesKey = crypto.privateDecrypt(priv, encryptedAES);
    const iv = crypto.privateDecrypt(priv, encryptedIV);
    //Decrypt Encrypted message
    const decipher = crypto.createDecipheriv('aes-256-cbc', aesKey, iv);
    let decrypted = decipher.update(encryptedMsg, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;

}


const askQuestion = (read, question) =>
    new Promise((resolve) => read.question(question, resolve));


async function startDecryptLoop() {
    const read = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    console.log("Decryption Get Started ....");
    const privateKey = await askQuestion(read, '\nEnter your privateKey:\n');
    console.log('\nPrivate Key received. Now you can start entering encrypted data:');
    
    while (true) {
        const encryptedData = await askQuestion(read, '\nEnter your encrypted data (or type "exit" to quit):\n');
        
        
        if (encryptedData.toLowerCase() === 'exit') {
            console.log('\nExiting...');
            read.close(); // Close the interface
            break;
        }

        try {
            const message = decrypt(privateKey, encryptedData);
            console.log(`\nDECRYPTED MESSAGE:\n${message}`);
        } catch (error) {
            console.error('\nFailed to decrypt the data. Ensure the private key and encrypted data are correct.');
        }
    }
}


startDecryptLoop();
