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
// call the functions to handle encryption,
const originalText = encryptMessage(data);

// write encrypted data to same temp file.
fs.writeFileSync(absoluteFilePath,originalText)

function encryptMessage(message) {
  // AES encryption logic using CryptoJS
  const SECRET_KEY = 'my_secret_key_123';
  const encrypted = CryptoJS.AES.encrypt(message, SECRET_KEY).toString();
  return encrypted;
}
