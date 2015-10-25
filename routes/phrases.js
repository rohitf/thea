var Phrases = require('../models/phrase');
var express = require('express');
var router = express.Router();

// GET APIS
router.get('/', function(req, res, next) {
  Phrases.find(function(err, data) {
    if (err)
      res.send(err);
    res.json(data);
  });
});

router.get('/:phrase', function(req, res, next) {
  Phrases.find({"phrase":req.params.phrase.toLowerCase()},function(err, data) {
    if (err)
      res.send(err);
    console.log(data);
    res.json(data);
  });
});

router.get('/votes/:phrase/:link', function(req, res, next) {
  Phrases.findOne({"phrase":req.params.phrase.toLowerCase()},function(err, data) {
    var votes = 0;

    data.links.forEach(function(item){
      if(item.link == req.params.link){
        votes = item.votes;
      }
    });
    
    if (err)
      res.send(err);
    res.json({"votes:": votes});
  });
});

//POST API
router.post('/add/:phrase/:link', function(req, res, next) {
  Phrases.update({"phrase":req.params.phrase.toLowerCase()}, { $addToSet: {links: {"link": req.params.link, "votes": 0}} }, { upsert: true }, function(err, data) {
    if (err)
      res.send(err);
    res.send("Added " + req.params.phrase + " " + req.params.link);
  });
});

//PUT API
router.put('/vote/:phrase/:link/:change', function(req, res, next) {
  Phrases.update({"phrase":req.params.phrase.toLowerCase(), "links.link": req.params.link}, {$inc:{"links.$.votes": req.params.change}}, {upsert: true}, function(err, data) {
    if (err)
      res.send(err);
    res.json(data);
  });
});

module.exports = router;
