const express = require('express');
const app = express();

const http = require('http');

http.createServer((request, response) => {
  response.writeHead(200, {'Content-Type': 'text/plain')};
    response.end('Welcome to Fight Club!\n');
}).listen(8080);

console.log('My 1st Node test server running on port 8080!');
