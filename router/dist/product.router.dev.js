"use strict";

var express = require('express'); // ref for express router


var proRoute = express.Router();

var Pro = require('../model/product.model');

proRoute.route('/').get(function (req, res) {
  Pro.find(function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.render('index', {
        products: data
      });
    }
  });
});
proRoute.route('/edit/:id').get(function (req, res) {
  var id = req.params.id; //res.render('edit);

  Pro.findById({
    _id: id
  }, function (err, data) {
    console.log(data);
    res.render('edit', {
      product: data
    });
  });
});
proRoute.route('/update/:id').post(function (req, res) {
  var id = req.params.id;
  Pro.findById({
    _id: id
  }, function (err, data) {
    if (!data) {
      res.status(400).send(' No data found');
    } else {
      data.title = req.body.title;
      data.image = req.body.image;
      data.price = req.body.price;
      data.gst = req.body.gst;
      data.description = req.body.description;
      data.save().then(function (myData) {
        res.redirect('/');
      })["catch"](function (err) {
        res.status(400).send('unable to update the values');
      });
    }
  });
});
proRoute.route('/create').get(function (req, res) {
  res.render('create');
});
proRoute.route('/edit/:id').get(function (req, res) {
  res.render('edit');
});
proRoute.route('/add').post(function (req, res) {
  var data = new Pro(req.body);
  console.log(data);
  data.save().then(function (emp) {
    res.redirect('/');
  })["catch"](function (err) {
    res.status(400).send('Unable to save value into database');
  });
});
proRoute.route('/delete/:id').get(function (req, res) {
  var id = req.params.id;
  Pro.findByIdAndDelete({
    _id: id
  }, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});
module.exports = proRoute;