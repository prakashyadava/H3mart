const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const hostname = 'localhost';
var fileupload = require('express-fileupload');
const port = 3000;
const productRouter = require('./Routes/productRouter');
const app = express();
app.use(fileupload());
app.use(bodyParser.json());
app.post('/upload',(req,res,next)=>{
    const file= req.files.product_list;
    file.mv('./uploads/' + file.name,(err,result)=>{
        if(err){
            throw err;
        }
        res.send({
            success : true,
            message : "File Uploaded"
        })
    })
    
})
app.use('/products',productRouter);
app.use((req,res, next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is Express server</h1></body></html>');
});
const server = http.createServer(app);
server.listen(port,hostname,()=>{
    console.log(`Server is running at http://${hostname}:${port}/`);
});