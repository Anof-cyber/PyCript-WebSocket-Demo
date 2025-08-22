# WebSocket AES Chat

A simple Node.js WebSocket chat app with AES encryption using CryptoJS. Messages are encrypted in the browser, sent via WebSocket, decrypted on the server, and the server replies with an encrypted response.



## Getting Started

### 1. Install dependencies

In the main folder:
```sh
npm install
```

In the `script` folder (for PyCript WebSocket Script):
```sh
cd script
npm install
```

### 2. Start the server

From the main folder:
```sh
node server.js
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Usage
- Type a message in the chat box and send.
- The message is AES-encrypted in the browser, sent to the server, decrypted, and the server replies with your message (also encrypted).
- The browser decrypts and displays the server's reply.

### 4. PyCript WebSocket Scripts

- Open the Burp Suite, Navigate to the PyCript Web Socket folder and load the encryption and decryption file from the Script folder (Make sure to install the npm packages required for the Script)
- Navigate to the Proxy --> Web Socket History
- Select the Encrypted Web Socket message and click on PyCript Web Socket Data Editor Tab to see the decrypted message


## Configuration
- The AES secret key is hardcoded as `my_secret_key_123` in all scripts and the server. Change it in all places for production use.

## License
MIT
