var express = require('express');
var router = express.Router();
// set client
let client = require('../db');

/* GET users listing. */
// get rid of this get later, doesn't do anything


// returns an HTML page that contains an HTML form w username and password
// sends post request on submission
router.get('/', function(req, res, next) {
    var redirect = "";
    if (req.query.redirect){
        redirect = req.query.redirect;
    }
    res.render('login', {
        redirect: redirect
    }
)
});

// 
router.post('/', function(req, res, next) {
  // res.send('getting response from blog.js');
    // get params like this: req.params.login, req.params.
    // still have to set these params when doing the post request in login.ejs
    res.send("login received!");
});

module.exports = router;

