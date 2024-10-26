const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const path = require('path'); // Add this line

const server = http.createServer(function(req, res) {
    const page = url.parse(req.url).pathname;
    const params = querystring.parse(url.parse(req.url).query);
    console.log(page);
    if (page == '/') {
      fs.readFile('index.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      });
    }else if(page == '/api'){ //how to treat /api route
        if('text' in params){ //if text is in the query param of api...
            const word=params.text; //gets value of text parameter
            const isPalindrome=word.toLowerCase()===word.toLowerCase().split('').reverse().join('');//checks to see if word(value of text parameter) is a palindrome
            res.writeHead(200, {'Content-Type': 'application/json'});//status is okay and file type expecte dis json
            const objToJson={//JS object to convert to JSON
                word:word,
                isPalindrome:isPalindrome
                };
                res.end(JSON.stringify(objToJson));
            }else{//handle error
                res.writeHead(400, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({error: 'No text found'}));
        }
    }else if (page == '/style.css'){
      fs.readFile('style.css', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.write(data);
        res.end();
      });
    }else if (page == '/main.js'){
      fs.readFile('main.js', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/javascript'});
        res.write(data);
        res.end();
      });
    }else if(page.startsWith('/image/')){
      const imagePath=path.join(__dirname,page);
      const ext=path.extname(imagePath).toLowerCase();
      const contentType={
        '.jpg': 'image/jpeg',
      }[ext] || 'application/octet-stream';
      
      fs.readFile(imagePath, (err, data) => {
        res.writeHead(200, {'Content-Type': contentType});
        res.end(data);
      });
    }
  });
  
  server.listen(8000);

  