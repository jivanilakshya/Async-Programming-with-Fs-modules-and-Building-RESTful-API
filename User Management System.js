const http = require('http');

const server = http.createServer((req, res) => {
    console.log("request mode:");
    if (req.method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Get Request\n');
      } 
    else if (req.method === 'POST') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Post Request\n');
      }
      else if(req.method === 'PUT') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Put Request\n');
      }
      else if(req.method === 'DELETE') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Delete Request\n');
      }
      else {
        res.statusCode = 405; 
        res.setHeader('Content-Type', 'text/plain');
        res.end('Method Not Allowed\n');
      }
  });
  
const port = 1501;
server.listen(port,() =>{console.log("Request Send:")});

