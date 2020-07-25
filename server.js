var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/swag-shop');
var product = require('./models/product');
var wishlist = require('./models/wishlist');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.listen(3000,function(){
  console.log("Swag Shop api running at port 3000");
})
