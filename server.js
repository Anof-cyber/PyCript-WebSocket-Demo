const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');
const CryptoJS = require('crypto-js');

const SECRET_KEY = 'my_secret_key_123';

const server = http.createServer((req, res) => {
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(__dirname, 'public', filePath);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    // Decrypt incoming message
    let decrypted = '';
    try {
      const bytes = CryptoJS.AES.decrypt(message.toString(), SECRET_KEY);
      decrypted = bytes.toString(CryptoJS.enc.Utf8);
    } catch (e) {
      decrypted = '[decryption error]';
    }
    // Prepare reply
    const reply = `your message was: ${decrypted}`;
    // Encrypt reply
    const encryptedReply = CryptoJS.AES.encrypt(reply, SECRET_KEY).toString();
    ws.send(encryptedReply);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
