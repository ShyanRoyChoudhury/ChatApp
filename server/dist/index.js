"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require('http');
const server = require('createServer');
const port = 3000;
http.server((req, res) => {
    res.write('Helo WOld');
    res.end();
});
server.listen(port, () => {
    console.log(`server running on port ${port}`);
});
