var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('./db/plsworkDB.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the plsworkDB database.');
});

/* GET search page */
router.get('/', function(req, res, next) {
  res.render('search', { });
});

/*Searching*/
router.post('/', function(req, res, next) {
  var sql = 'SELECT * FROM posts WHERE title == (?) LIMIT 1';
  db.get(sql, [req.body.title], (err, row) => {
  if (err) {
    return console.error(err.message);
  }
  return row
    ? res.render('search', {title: row.title, content: row.content, searchedfor: req.body.title})
    : res.render('search', {searchedfor: req.body.title + '(Not found)'});
  });
  res.set('title',req.body.title);
});

module.exports = router;
