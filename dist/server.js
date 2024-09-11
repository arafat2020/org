"use strict";
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const path = require('path');
const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const binDir = path.join(process.cwd(), 'public2/bin');
app.prepare().then(() => {
    createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        const { pathname } = parsedUrl;
        // Handle requests to /bin/*
        if (pathname.startsWith('/bin/')) {
            const filePath = path.join(binDir, pathname.replace('/bin/', ''));
            // Serve any files from /bin/ directory
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.statusCode = 404;
                    res.end('File not found');
                    return;
                }
                // Set appropriate headers for the file type
                const ext = path.extname(filePath).toLowerCase();
                let contentType = 'application/octet-stream';
                switch (ext) {
                    case '.jpg':
                    case '.jpeg':
                        contentType = 'image/jpeg';
                        break;
                    case '.png':
                        contentType = 'image/png';
                        break;
                    case '.gif':
                        contentType = 'image/gif';
                        break;
                    case '.pdf':
                        contentType = 'application/pdf';
                        break;
                }
                res.setHeader('Content-Type', contentType);
                res.end(data);
            });
        }
        else {
            // Handle all other Next.js requests
            handle(req, res, parsedUrl);
        }
    }).listen(port);
    console.log(`> Server listening at http://localhost:${port} as ${dev ? 'development' : process.env.NODE_ENV}`);
});
