const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');

router.get('/', function (req, res) {
  let tweets = tweetBank.list();
  res.render( 'index', { tweets: tweets } );
});

router.get('/users/:name', function(req, res) {
  var name = req.params.name;
  var list = tweetBank.find({name : name});
  res.render( 'index', { tweets: list, showForm: true, name: name } );
});

router.get('/tweet/:id', function(req, res) {
  var id = Number(req.params.id);
  var list = tweetBank.find({id: id});
  res.render('index', {tweets: list});
})


//body-parser
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))

// parse routerlication/json
router.use(bodyParser.json())

router.post('/tweets', function(req, res) {
  var name = req.body.name;
  var text = req.body.text;
  tweetBank.add(name, text);
  res.redirect('/');
});



module.exports = router;
