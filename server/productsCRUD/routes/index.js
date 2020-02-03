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
  
  

module.exports = router;
