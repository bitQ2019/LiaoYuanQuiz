var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var UrlMapping = require('../model/UrlMapping');

router.get('/:short_url', function (req, res) {
  UrlMapping.findOne({'shortUrl': req.params.short_url}, 'shortUrl raw',function(err, urlmapping){
    if (err) {
      res.send(err);
    }
    // console.log(req.url);
    // var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    // console.log(fullUrl);
    res.redirect(urlmapping.raw);
  });
});

router.post('/', function(req, res, next) {
  var raw = req.body.raw;
  UrlMapping.count({}, function(err, count){
    UrlMapping.create({'shortUrl': count.toString() , 'raw': raw}, function(err,model){
      if (err) { return next(err) }
      res.json(model);
    });
  });
});

module.exports = router;