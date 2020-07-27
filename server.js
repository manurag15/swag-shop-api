var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/swag-shop');
// no need to store into var db... mongoose.connect is important
var Product = require('./models/product');
var wishlist = require('./models/wishlist');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/product',function(req,res){
  Product.find({},function(err,products){
    if(err){
      res.send("Could not fetch products");
    }else{
      res.send(products);
    }
  });
  // res.send("Products found");
});


app.post('/product', function(req, res) {

  var product = new Product();
  // res.send("Post request")

  product.title = req.body.title;
  product.price = req.body.price;
// *********save method with error handling and returning the saved product
  // product.save(function(err, savedProduct) {
  //   if (err) {
  //     res.status(500).send({
  //       error: "Could not save product"
  //     });
  //   } else {
  //     res.status(200).send(savedProduct);
  //   }

  // });


// ***********save method without error handling and without returning the saved product just save it in the db
  product.save();
  res.send("Product saved");

});

app.listen(3000, function() {
  console.log("Swag Shop api running at port 3000");
})