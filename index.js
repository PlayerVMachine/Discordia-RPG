const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

//node_modules
const jimp = require('jimp');

jimp.read('./assets/base/challenger.png', (err, image) => {
    if (err)
        throw err;

    image.greyscale()

    jimp.loadFont('./assets/fonts/open-sans/open-sans-16-white/open-sans-16-white.fnt').then(font => {
        image.print(font, 200, 20, 'Congratulations');
    });

    image.write('./assets/comp/challenger.png');
});

http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    //parse URL
    const parsedUrl = url.parse(req.url);
    // extract URL path
    const pathname = `.${parsedUrl.pathname}`;
    // map file extensions to MIME types
    const mimeType = {
        '.ico': 'image/x-icon',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.wav': 'audio/wav',
        '.mp3': 'audio/mpeg',
        '.pdf': 'application/pdf',
    };

    fs.exists(pathname, (exist) => {
        if(!exist) {
            // if the file is not found, return 404
            res.statusCode = 404;
            res.end(`File ${pathname} not found!`);
            return;
        }

        // read file from file system
        fs.readFile(pathname, (err, data) => {
            if(err){
                res.statusCode = 500;
                res.end(`Error getting the file: ${err}.`);
            } else {
                // based on the URL path, extract the file extention. e.g. .js, .doc, ...
                const ext = path.parse(pathname).ext;
                // if the file is found, set Content-type and send data
                res.setHeader('Content-type', mimeType[ext] || 'text/plain' );
                res.end(data);
            }
        });
    });
}).listen(3000);