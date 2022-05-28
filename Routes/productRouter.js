const express = require("express");
const bodyParser = require("body-parser");

const productRouter = express.Router();
const reader = require("xlsx");


let data = [];


productRouter.use(bodyParser.json());
productRouter.route("/")
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
})
.get((req, res, next) => {
    
    if(data.length==0){
        let workbook = reader.readFile('./uploads/product_list.xlsx')
    
    const temp = reader.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
    temp.forEach((res) => {
        data.push(res);
    });
    }


    res.setHeader('Content-Type', 'application/json');
    res.json(data);
  });

productRouter.route("/:productId")
.get((req, res, next) => {
    var detail = []
    for(var i=0;i<data.length;i++){
        if(data[i]['product_code'] === req.params.productId){
            var temp = data[i];
            detail.push({"status": res.statusCode,"data": temp})
            
        }
    }
    if(detail.length!=0){
        
       res.setHeader('Content-Type', 'application/json');
        res.json(detail);

    }
    else{
        res.statusCode = 404
        detail.push({"status": res.statusCode,"message": "Product is not found!"})
        res.setHeader('Content-Type', 'application/json');
        res.json(detail);
    }
})
.put((req,res,next)=>{
    for(var i=0;i<data.length;i++){
        if(data[i]['product_code'] === req.params.productId){
            data[i]['price'] = req.body.price;
            
        }
    }
    res.end(req.body.price + " price updated")
})

module.exports = productRouter;
