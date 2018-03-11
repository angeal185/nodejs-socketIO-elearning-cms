const express = require('express'),
  fs = require('fs'),
  router = express.Router(),
  config = require('../config/config'),
  data = require('../data/data'),
  modJSON = require('../modules/modJSON');


  listFiles = function(i) {
    var items = [];
    var items2 = [];
    var items3 = [];
    var items4 = [];
    var items5 = [];
    var objct = {};
    var cnt = 1;

    fs.readdir("./admin/public/audio/letters", function(err, files) {

      if (err) {

      console.log(err);

      return;
    }

    files.forEach(function(f,i) {
      items3.push(i+1);
      //console.log(JSON.stringify({src:f, id:f}))
      items.push(f);
      return;
    });

    items.forEach(function(f,i) {
        objct.id =  "";
        objct.question = "";
        objct.options = [];
        objct.answer = "";
        objct.score = 0;
        objct.status = "";
        items2.push(objct);
      });
      //console.log(items2);



      });
  };

//listFiles("audio/cooked-food");
//var b = "./img/numbers/1.jpg"
//console.log(b.slice(14,-4))
/* GET home page. */




router.get('/', function(req, res) {
  res.render('index', {
    title: 'dash',
    config: config
  });
});

router.get('/admin/create', function(req, res) {
  if ((data.mode)===("colors")) {
  	mode = data.colors;
  } else if ((data.mode)===("body")) {
  	mode = data.body;
  } else if ((data.mode)===("animals")) {
  	mode = data.animals;
  } else if ((data.mode)===("fruit")) {
  	mode = data.fruit;
  } else if ((data.mode)===("vegetables")) {
  	mode = data.vegetables;
  } else if ((data.mode)===("items")) {
  	mode = data.items;
  } else {
  	mode = data.cooked_food;
  }
  res.render('create', {
    title: 'create',
    config: config,
    data:mode
  });
});

router.get('/flashcard', function(req, res) {
  res.render('flashcard', {
    title: 'flashcard',
    config: config
  });
});

router.get('/memory', function(req, res) {
  res.render('memory', {
    title: 'memory',
    config: config
  });
});

router.get('/guess', function(req, res) {
  res.render('guess', {
    title: 'guess the number',
    config: config
  });
});

router.get('/plus', function(req, res) {
  res.render('plus', {
    title: 'plus',
    config: config
  });
});

router.get('/calculate', function(req, res) {
  res.render('calculate', {
    title: 'calculate',
    config: config
  });
});

router.get('/subtract', function(req, res) {
  res.render('subtract', {
    title: 'subtract',
    config: config
  });
});

router.get('/test', function(req, res) {
  res.render('test', {
    title: 'test',
    config: config
  });
});

module.exports = router;
