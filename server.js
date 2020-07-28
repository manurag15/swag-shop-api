var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var db = mongoose.connect("mongodb://localhost/swag-shop");
// no need to store into var db... mongoose.connect is important
var Product = require("./models/product");
var wishlist = require("./models/wishlist");

// Body parser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// get all products from the database
app.get("/product", function (req, res) {
  Product.find({}, function (err, products) {
    if (err) {
      res.send("Could not fetch products");
    } else {
      res.send(products);
    }
  });
  // res.send("Products found");
});

app.post("/product", function (req, res) {
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

// ****WORKING WITH WISHLISTS:

// Step 1: Create post method to add a wishlist
// Step 2: Adding products to wishlist:(Wishlist schema contains product array with ref: products.js model)
//   -> create a put method

// wishlist get request
app.get("/wishlist", function (req, res) {
  wishlist
    .find({})
    .populate({ path: "products", model: "Product" })
    .exec(function (err, wishLists) {
      if (err) {
        res.status(500).send({ error: "Could not fetch wishlist" });
      } else {
        res.status(200).send(wishLists);
      }
    });
});

// post method for wishlist
app.post("/wishlist", function (req, res) {
  // create new wishlist
  var newlist = new wishlist();
  newlist.title = req.body.title;

  newlist.save(function (err, newWishList) {
    if (err) {
      res.status(500).send({ error: "Could not save wishlist" });
    } else {
      res.status(200).send(newWishList);
    }
  });
});

// put method to add product to wishlist both identified by their ids
// app.put("/wishlist/product/add", function (req, res) {
//   Product.findOne({ _id: req.body.productId }, function (err, foundProduct) {
//     if (err) {
//       res.status(500).send({ error: "Could not find the product" });
//     } else {
//       // found the product now add to wishlist
//       wishlist.update({ _id: req.body.wishlistId }),
//         { $addToSet: { products: foundProduct._id } },
//         function (err, updatedList) {
//           if (err) {
//             res.status(500).send({ error: "Could not add to wishlist" });
//           } else {
//             res.status(200).send("Successfully added to list");
//           }
//         };
//     }
//   });
// });

app.put("/wishlist/product/add", function (req, res) {
  Product.findOne({ _id: req.body.productId }, function (err, foundProduct) {
    if (err) {
      res
        .status(500)
        .send({ error: "Could not find product with given product id" });
    } else {
      wishlist.update(
        { _id: req.body.wishlistid },
        { $addToSet: { products: foundProduct._id } },
        function (err, updatedWishlist) {
          if (err) {
            res.status(500).send({ error: "Could not update wishlist" });
          } else {
            res.status(200).send("Successful");
          }
        }
      );
    }
  });
});

app.listen(3000, function () {
  console.log("Swag Shop api running at port 3000");
});
