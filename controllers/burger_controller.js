var express = require("express");

var router = express.Router();

// Import the model to use its database functions.
var burger = require("../models/burger.js");

// Create  route to GET all the burgers
router.get("/", function(req, res) {
    burger.all(function(data) {
      var hbsObject = {
        burgers: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
  });
  
//   create a route for created burgers "POST" 
  router.post("/api/burger", function(req, res) {
    burger.create([
      "burger_name"
    ], [
      req.body.burger_name
    ], function() {
      res.redirect("/");
    });
  });
  
//   Create route for updating the burger "PUT"
  router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
  
    console.log("condition", condition);
  
    burger.update({
      devoured: req.body.devoured
    }, condition, function() {
    
        if (result.changedRows === 0) {
          // If no rows were changed, then the ID must not exist, so 404
          return res.status(404).end();
        }
        // res.status(200).end();
        res.redirect("/");
      
    });
  });
  
  
  // Export routes for server.js to use.
  module.exports = router;
