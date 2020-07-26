var express = require('express');
var app = express();
// var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/swag-shop');
var Product = require('./models/product');
var wishlist = require('./models/wishlist');


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
// extended: false
// }));


app.post('/product', function(req, res) {

  var product = new Product();
  // res.send("Post request")

  product.title = req.body.title;
  product.price = req.body.price;

  product.save(function(err, savedProduct) {
    if (err) {
      res.status(500).send({
        error: "Could not save product"
      });
    } else {
      res.status(200).send(savedProduct);
    }

  });

});

app.listen(3000, function() {
  console.log("Swag Shop api running at port 3000");
})