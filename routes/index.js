var express = require('express');
var router = express.Router();
var Recent = require('./../models/recent');
var mongoose = require('mongoose');
var request = require('request');

router.get('/search/:search', function(req, res) {
  if(!req.params.search) {
    return next(err);
  } else {
		
		var newRecent = new Recent({
      term: req.params.search
    });
    newRecent.save(function(err) {
      if (err) return next(err);
    });
		
		var page = 0;
		if (req.query.page) {
			page = req.query.page;
		}
		
    request({
			url: 'https://api.imgur.com/3/gallery/search/time/' + page,
			method: 'GET',
			headers: {
				'Authorization': 'Client-ID 018a95c1e9c3235'
			},
			qs: {'q': req.params.search}
		}, function (error, response, body) {
			
			if (!error && response.statusCode == 200) {
				var items = JSON.parse(body).data.map(function(obj){ 
					if (obj.cover) {
						
						var rObj = { 
							link: 'http://i.imgur.com/' + obj.cover + '.jpg',
							page: obj.link,
							title: obj.title,
							topic: obj.topic
						};
					} else {
						var rObj = { 
							link: obj.link,
							page: obj.link,
							title: obj.title,
							topic: obj.topic
						};
					}
					
					return rObj;
				});
				res.json({ items });
			}
			
		})		
  }
});

router.get('/recent', function(req, res) {
  Recent.find({}, function(err, recent) {
    var items = recent.map(function(obj){ 
			return { term: obj.term, when: obj.when};
		});
    res.json({ items });  
  });
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'FreeCodeCamp Challenge: Image Search Abstraction Layer' });
});

module.exports = router;
