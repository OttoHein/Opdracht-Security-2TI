var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();

var blogList = [];

var db = new sqlite3.Database('./db/plsworkDB.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the plsworkDB database.');
});

/* GET newblog page */
router.get('/', function(req, res, next) {
  res.render('newblog', { });
});

/* Hopefully post a damn thing */
router.post('/', function(req, res, next) {
  //Getting id
  var id;
  /*
  Ok, dus het blijkt dat deze frameworks, databases etc. slimmer zijn dan gedacht. Doordat id binnen sqlite een PRIMARY KEY en INTEGER is,
   kent die daar zelf een waarde aan toe die aan deze constraints voldoet. I'm amazed. Also: RIP Nederlands
  */
  //Creating object
  var blogpost = {
          'id':id,
          'title':req.body.title,
          'content':req.body.content,
          'date': new Date()
        }

  //To database
  var sql = 'INSERT INTO posts(id,title,content,date) VALUES(' + blogpost.id + ',' + blogpost.title + ',' + blogpost.content ',' + blogpost.date + ')';
  var values = [blogpost.id, blogpost.title, blogpost.content, blogpost.date];
  db.run(sql, function(err) {
  if (err) {
    return console.log(err.message);
  }
  else {
    res.redirect('/');
  }
  });
});

module.exports = router;
