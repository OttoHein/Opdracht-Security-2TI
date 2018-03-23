var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();

var blogList = [];

// open the database
var db = new sqlite3.Database('./db/plsworkDB.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the plsworkDB database.');
});

//get the data
db.serialize(() => {
  db.each('SELECT * FROM posts', (err, row) => {
    if (err) {
      console.error(err.message);
    }
    var post = { id: row.id, title: row.title, content: row.content, date: row.date};
    blogList.push(post);
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title1: blogList[blogList.length - 1].title, content1: blogList[blogList.length - 1].content,
                        title2: blogList[blogList.length - 2].title, content2: blogList[blogList.length - 2].content,
                        title3: blogList[blogList.length - 3].title, content3: blogList[blogList.length - 3].content});
});

//SEARCH
router.post('/', function(req, res, next) {
  res.render('search', {});
});

module.exports = router;
