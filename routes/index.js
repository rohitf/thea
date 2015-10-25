var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {str: 'spanish'})
});

router.get('/:searchStr', function(req, res, next) {
  res.render('index', {str: req.params.searchStr})
});

router.get('/tools', function(req, res, next) {
  res.sendfile("./public/reference.html");
});

router.get('/wit', function(req, res, next) {
  res.sendfile("./public/wit.html");
});

module.exports = router;
