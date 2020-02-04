var express = require('express');
var router = express.Router();

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

/*var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1',
  database : 'productsCRUD',
  multipleStatements: true
});*/
 
var db = require('../db');
router.get('/products', function(req, res, next) {
  var page = Number(req.query.page);
  var limit = Number(req.query.limit);
  var offset = ((page - 1) * limit) + "";
  var sql = `select * from products order by productId desc limit ${limit} offset ${offset};select count(*) as count from products`;
  var data = {};  
connection.query(sql, function (error, results, fields) {
  	if (error) throw error;
  		data["code"] = 0;
            data["msg"] = "";
            data["count"] = results[1][0]["count"];
            data["data"] = results[0];
            res.json(data);
}); 

});
  
router.post('/products/:id', function(req, res, next) {
  var productId = req.params.id;
  var productName = req.body.productName;
  var productLength = req.body.productLength;
  var productWidth = req.body.productWidth;
  var productPrice = req.body.productPrice;
  var productOrigin = req.body.productOrigin;
  var productQuantity = req.body.productQuantity;
  var sql = `update products set productName='${productName}', productLength='${productLength}', productWidth='${productWidth}', productPrice='${productPrice}', productOrigin='${productOrigin}', productQuantity='${productQuantity}' where productId='${productId}'`;
  
connection.query(sql, function (error, results, fields) {
        if (error) throw error;
            res.json({ code : 1 });
});
});

router.get('/deleteProduct/:id', function(req, res, next) {
  var productId = req.params.id;
  var sql = `delete from products where productId=${productId}`;
connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        res.json({ code : 1 });

});

});  

router.post('/products', function(req, res, next) {
  var productId = req.params.id;
  var productName = req.body.productName;
  var productLength = req.body.productLength;
  var productWidth = req.body.productWidth;
  var productPrice = req.body.productPrice;
  var productOrigin = req.body.productOrigin;
  var productQuantity = req.body.productQuantity;
  var sql = `insert into products (productName, productLength, productWidth, productPrice, productOrigin, productQuantity) values ('${productName}','${productLength}','${productWidth}','${productPrice}','${productOrigin}','${productQuantity}')`;
connection.query(sql, function (error, results, fields) {
        if (error) throw error;
            res.json({ code : 1 });
});
});

router.get('/searchProduct', function(req, res, next) {
  var page = Number(req.query.page);
  var limit = Number(req.query.limit);
  var offset = ((page - 1) * limit) + "";
  var sql1 = `select * from products`;
  var sql2 = `select count(*) as count from products`;
  var term = req.query.term;
	if (term !== ""){
            sql1 += " where productName like '%" + term + "%'";
            sql2 += " where productName like '%" + term + "%'";
        }
  sql1 += ` order by productId desc limit ${limit} offset ${offset}`;
  var sql = sql1 + ";" + sql2;
var data = {};  
connection.query(sql, function (error, results, fields) {
        if (error) throw error;
                data["code"] = 0;
            data["msg"] = "";
            data["count"] = results[1][0]["count"];
            data["data"] = results[0];
            res.json(data);
}); 
  
});
module.exports = router;
