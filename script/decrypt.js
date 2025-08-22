// String Decryption with AES 128 UTF8
const fs = require('fs');
const path = require('path');
var CryptoJS = require("crypto-js");
const { program } = require('commander');
const { Buffer } = require('buffer');

program
  .option('-d, --data <file_path>', 'Path to JSON file containing base64 encoded + encrypted data');

program.parse(process.argv);
const options = program.opts();

const filePath = options.data;
const absoluteFilePath = path.resolve(filePath);
var data = fs.readFileSync(absoluteFilePath, 'utf8')
// call the functions to handle decryption,
const originalText = decryptMessage(data);

// write decrypt data to same temp file.
fs.writeFileSync(absoluteFilePath,originalText)

function decryptMessage(encryptedMessage) {
  // AES decryption logic using CryptoJS
  const SECRET_KEY = 'my_secret_key_123';
  // If the encryptedMessage is a JSON string with base64, parse it
  let encrypted = encryptedMessage;
  try {
    // If input is JSON with a field, parse it
    const parsed = JSON.parse(encryptedMessage);
    if (parsed.encrypted) {
      encrypted = parsed.encrypted;
    }
  } catch (e) {
    // Not JSON, treat as raw string
  }
  // Decrypt
  const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
  const decrypted_data = bytes.toString(CryptoJS.enc.Utf8);
  return decrypted_data;
}
