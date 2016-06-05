var express = require('express');
var router = express.Router();
var Link = require('./../models/recent');
var mongoose = require('mongoose');

router.get('/search/:url', function(req, res) {

});

router.get('/recent', function(req, res) {
  
});

router.get('/', function(req, res) {
    res.render('index', { title: 'FreeCodeCamp Challenge: Image Search Abstraction Layer' });
});

module.exports = router;
