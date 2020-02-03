var mysql      = require('mysql');
var faker = require('faker');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '1',
  database : 'productsCRUD'
});

connection.connect();
for (var i = 0; i < 3000; i++){
  var productName = faker.commerce.productName();
  var productLength = faker.random.number();
  var productWidth = faker.random.number();
  var productPrice = faker.random.number();
  var productOrigin = faker.address.country();
  var productQuantity = faker.random.number();
  var sql = `insert into products(productName, productLength, productWidth, productPrice, productOrigin, productQuantity) values ("${productName}","${productLength}","${productWidth}","${productPrice}","${productOrigin}","${productQuantity}")`;
	connection.query(sql, function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});
}

connection.end();
