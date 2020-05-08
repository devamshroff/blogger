var express = require('express');
var router = express.Router();
// set client
let client = require('../db');

/* GET users listing. */
// get rid of this get later, doesn't do anything
router.get('/', function(req, res, next) {
  res.send('getting response from blog.js without username');
});


// NEED TO USE COMMONMARK MODULE TO CONVERT MARKDOWN (TITLE AND BODY) TO HTML
// @NIKHIL COULD YOU DO THIS?
// ALSO NEED TO DISPLAY STUFF LIKE DATE, MODIFIED INSIDE BLOGLIST.EJS

router.get('/:username/:postid', function(req, res, next) {
  // res.send('getting response from blog.js');

  let collection = client.db('BlogServer').collection('Users');
  collection.find({username: req.params.username}).toArray(function (err, docs) {
    if(docs.length == 0){
      res.statusCode = 404;
      res.send('ERROR 404: Username not found');
    }
  });

  collection = client.db('BlogServer').collection('Posts');
  console.log(req.params.postid)
  collection.find({
    username: req.params.username, 
    postid: parseInt(req.params.postid, 10)
    }).toArray(function (err, docs) {
      if(docs.length == 0){
        res.statusCode = 404;
        res.send('ERROR 404: PostID not found');  
      }
      res.render('blog', {
                          username: req.params.username,
                          postid: req.params.postid,
                          blog_post:docs[0]
                        }
                )
  });
});

router.get('/:username', function(req, res, next) {
  // res.send('getting response from blog.js');
  var start_ind = 0;
  if (req.query.start){
    if (req.query.start > 0){
      start_ind = req.query.start;
    }
  }
  let collection = client.db('BlogServer').collection('Users');
  collection.find({username: req.params.username}).toArray(function (err, docs) {
    if(docs.length == 0){
      res.statusCode = 404;
      res.send('ERROR 404: Username not found');
    }
  });

  collection = client.db('BlogServer').collection('Posts');
  collection.find({username: req.params.username}).toArray(function (err, docs) {
    
      res.render('bloglist', {
                          posts: docs,
                          username: req.params.username,
                          start_ind: start_ind
                          }
                )
  });
});

module.exports = router;
