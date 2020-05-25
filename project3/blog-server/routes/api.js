var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
// set client
let client = require('../db');


// 1. GET /api/:username
router.get('/:username', function(req, res, next) {
    var jwt_token = req.cookies.jwt;
    if (!jwt_token)
        return res.status(401).send('ERROR 401: Unauthorized Status Code, invalid JWT token');
    else if (!jwt.verify(jwt_token,"C-UFRaksvPKhx1txJYFcut3QGxsafPmwCY6SCly3G6c"))
        return res.status(401).send('ERROR 401: Unauthorized Status Code, invalid signature');
    else if (jwt.decode(jwt_token).usr!=req.params.username)
        return res.status(401).send('ERROR 401: Unauthorized Status Code, invalid username');
    else if (jwt.decode(jwt_token).exp<=(Date.now()/1000))
        return res.status(401).send('ERROR 401: Unauthorized Status Code, past expiration');

    let collection = client.db('BlogServer').collection('Users');
    collection.findOne({username: req.params.username}).then((docs) =>  {
    if(docs.length == 0){
        res.statusCode = 404;
        res.send('ERROR 404: Username not found');
        }
    });
    collection = client.db('BlogServer').collection('Posts');
    collection.find({username: req.params.username}).toArray().then((docs) => {
    var JSON_docs = JSON.stringify(docs)
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON_docs);
  });
});

// 2. GET /api/:username/:postid
router.get('/:username/:postid', function(req, res, next) {
    var jwt_token = req.cookies.jwt;
    if (!jwt_token)
        return res.status(401).send('ERROR 401: Unauthorized Status Code, invalid JWT token');
    else if (!jwt.verify(jwt_token,"C-UFRaksvPKhx1txJYFcut3QGxsafPmwCY6SCly3G6c"))
        return res.status(401).send('ERROR 401: Unauthorized Status Code, invalid signature');
    else if (jwt.decode(jwt_token).usr!=req.params.username)
        return res.status(401).send('ERROR 401: Unauthorized Status Code, invalid username');
    else if (jwt.decode(jwt_token).exp<=(Date.now()/1000))
        return res.status(401).send('ERROR 401: Unauthorized Status Code, past expiration');

    let collection = client.db('BlogServer').collection('Users');
    let postid= parseInt(req.params.postid);
    if (!postid)
    {
        res.status(400).send("Invalid postid");
    }
    collection.findOne({username: req.params.username}).then((docs) =>  {
    if(docs.length == 0){
        res.statusCode = 404;
        res.send('ERROR 404: Username not found');
        }
    });
    collection = client.db('BlogServer').collection('Posts');
    collection.findOne({
        username: req.params.username,
        postid: postid
    }).then((docs) => {
        if(!docs){
            res.status(404).send("404 (Not found)");
        }else{
            var JSON_docs = JSON.stringify(docs)
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON_docs);
        }
    });
});

// 3. POST /api/:username/:postid
// insert new blog
router.post('/:username/:postid', function(req, res, next) {
    var jwt_token = req.cookies.jwt;
    if (!jwt_token)
        return res.status(401).send('ERROR 401: Unauthorized Status Code, invalid JWT token');
    else if (!jwt.verify(jwt_token,"C-UFRaksvPKhx1txJYFcut3QGxsafPmwCY6SCly3G6c"))
        return res.status(401).send('ERROR 401: Unauthorized Status Code, invalid signature');
    else if (jwt.decode(jwt_token).usr!=req.params.username)
        return res.status(401).send('ERROR 401: Unauthorized Status Code, invalid username');
    else if (jwt.decode(jwt_token).exp<=(Date.now()/1000))
        return res.status(401).send('ERROR 401: Unauthorized Status Code, past expiration');

    var d = new Date();
    let postid= parseInt(req.params.postid);
    if (!postid)
    {
        res.status(400).send("Invalid postid");
    }
    var created = d.getTime();
    var modified = d.getTime();
    console.log(req.body.title);
    console.log(req.body.body);
    if(!req.body.title || !req.body.body){
        req.body.title = "";
        req.body.body = "";
    }
    // check username + postid
    let collection = client.db('BlogServer').collection('Posts');
    collection.findOne({
        postid: postid,
        username: req.params.username
    }).then((docs) =>  {
    if(docs){
        res.status(400).send("400 (Bad request)");
        return;
    }else{
        // insert new post
        collection.insertOne({
            "postid": postid,
            "username": req.params.username,
            "created": created,
            "modified": modified,
            "title": req.body.title,
            "body": req.body.body
        }).then((docs) =>{
            if (!docs){
                res.status(400).send("400 (Bad request)");
                return;
            }
            res.status(201).send("201 (Created)");
        });
    }
    });
    
});

// 4. PUT /api/:username/:postid
// Update a blog post
router.put('/:username/:postid', function(req, res, next) {
    var jwt_token = req.cookies.jwt;
    if (!jwt_token)
        return res.status(401).send('ERROR 401: Unauthorized Status Code, invalid JWT token');
    else if (!jwt.verify(jwt_token,"C-UFRaksvPKhx1txJYFcut3QGxsafPmwCY6SCly3G6c"))
        return res.status(401).send('ERROR 401: Unauthorized Status Code, invalid signature');
    else if (jwt.decode(jwt_token).usr!=req.params.username)
        return res.status(401).send('ERROR 401: Unauthorized Status Code, invalid username');
    else if (jwt.decode(jwt_token).exp<=(Date.now()/1000))
        return res.status(401).send('ERROR 401: Unauthorized Status Code, past expiration');

    var title = req.body.title;
    var body = req.body.body;
    var date = new Date();
    var date_time = date.getTime();
    let postid= parseInt(req.params.postid);
    if (!postid)
    {
        res.status(400).send("Invalid postid");
    }
    let collection = client.db('BlogServer').collection('Posts');
    collection.updateMany({
        "postid": postid,
        "username": req.params.username
    },{$set: {title: title, body : body , modified: date_time}}).then((docs) =>  {
    if(docs.matchedCount==0){
        res.status(400).send("400 (Bad request)");
        return;
    }
    res.status(200).send("Document updated");
    })
    .catch(err => res.status(400).send("400 (Bad request)"));

});

// 5. DELETE /api/:username/:postid
// Delete a blog post
router.delete('/:username/:postid', function(req, res, next) {
    var jwt_token = req.cookies.jwt;
    if (!jwt_token)
        return res.status(401).send('ERROR 401: Unauthorized Status Code, invalid JWT token');
    else if (!jwt.verify(jwt_token,"C-UFRaksvPKhx1txJYFcut3QGxsafPmwCY6SCly3G6c"))
        return res.status(401).send('ERROR 401: Unauthorized Status Code, invalid signature');
    else if (jwt.decode(jwt_token).usr!=req.params.username)
        return res.status(401).send('ERROR 401: Unauthorized Status Code, invalid username');
    else if (jwt.decode(jwt_token).exp<=(Date.now()/1000))
        return res.status(401).send('ERROR 401: Unauthorized Status Code, past expiration');

  
    let postid= parseInt(req.params.postid);
    if (!postid)
    {
        res.status(400).send("Invalid postid");
    }
    let collection = client.db('BlogServer').collection('Posts');
    collection.deleteMany({
        "postid": postid,
        "username": req.params.username
    }).then((docs) =>  {
    if(docs.deletedCount==0){
        res.status(400).send("400 (Bad request)");
        return;
    }
    res.status(204).send("Document deleted");
    })
    .catch(err => res.status(400).send("400 (Bad request)"));

});

module.exports = router;
