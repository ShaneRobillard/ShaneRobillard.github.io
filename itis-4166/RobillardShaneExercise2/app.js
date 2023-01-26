const http = require('http');
const fs = require('fs');
const port = 8080;
const host = 'localhost';
const server = http.createServer((req,res)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/html');
    let path = './';
    if(req.url === '/about'){
        path = path + 'views/about.html';
    }else if(req.url === '/contact'){
        path = path + 'views/contact.html';
    }else{
        res.statusCode=404;
        path = path + 'views/404.html';
    }
    fs.readFile(path,(err,data)=>{
        if(err){
            console.log(err);
            res.end();
        }else{
            res.write(data);
            res.end();
        }
    });
});
server.listen(port,host,()=>{
    console.log(console.log('The server is running on port',port));
});