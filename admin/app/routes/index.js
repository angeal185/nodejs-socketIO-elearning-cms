const express = require('express'),
fs = require('fs'),
router = express.Router(),
config = require('../config/config'),
data = require('../data/data'),
modJSON = require('../modules/modJSON');

  var flashcard = ['flashcard','times-tables','count','money'];
  var toRender = ['multiple-choice','memory','guess','plus','calculate','subtract','test'];

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

flashcard.forEach(function(i) {
  router.get('/'+i, function(req, res) {
    res.render('flashcard', {
      title: i,
      config: config
    });
  });
});

toRender.forEach(function(i) {
  router.get('/'+i, function(req, res) {
    res.render(i, {
      title: i,
      config: config
    });
  });
});

router.get('/create', function(req, res) {
  var mode;
  if ((data.mode)===("colors")) {
  	mode = data.colors;
  } else if ((data.mode)===("body")) {
  	mode = data.body;
  } else if ((data.mode)===("shapes")) {
  	mode = data.shapes;
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

module.exports = router;
