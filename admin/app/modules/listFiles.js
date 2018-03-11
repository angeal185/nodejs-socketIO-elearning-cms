const fs = require('fs'),
modJSON = require('./modJSON'),
fileList = require('../data/files');

exports.listFiles = function(i) {
  var items = [];
  fs.readdir("./admin/public/" + i, function(err, files) {

    if (err) {

    console.log(err);

    return;
  }

  files.forEach(function(f) {
    items.push(f)
  });

  function remove(arr, what) {
      var found = arr.indexOf(what);

      while (found !== -1) {
          arr.splice(found, 1);
          found = arr.indexOf(what);
      }
  }

  remove(items, 'redactor');
  remove(items, 'src-min-noconflict');
  //arr = ij.filter(e => e !== el);
  //console.log(items)

  modJSON.path("./admin/app/data/files")
    .modify(i, items)


//console.log(fileList.js)


  });
};
