var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
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
    var username = req.body.username;
    var password = req.body.password;
    var redirect = req.body.redirect;
    console.log(username);
    let collection = client.db('BlogServer').collection('Users');
    collection.findOne({username: username}).then((docs) =>  {
    if(!docs){
        console.log("Problem1");
        return res.status(401).render('login', {
          redirect: redirect
      });
    }
    else {
    let to_compare = docs.password;
    bcrypt.compare(password, to_compare, function(err,mod_res) {
        if (mod_res)
        {
            let expr = Date.now()+7200000;
            console.log("Time");
            console.log(expr);
            let jwt_payload = 
            {
                "exp" : (expr/1000),
                "usr" : username
            };
            let jwt_header = 
            {
                header: 
                {
                    "alg": "HS256",
                    "typ": "JWT"
                }
            };
            let jwt_token = jwt.sign(jwt_payload, "C-UFRaksvPKhx1txJYFcut3QGxsafPmwCY6SCly3G6c",jwt_header);
            
            res.cookie('jwt',jwt_token);
            
            if (redirect)
            {
                return res.redirect(redirect);  
            }
            else
            {
                return res.status(200).send("Succesful Authentication");
                
            }
  
        }
        else
        {
            console.log("Problem2");
            return res.status(401).render('login', {
            redirect: redirect
        });
    
        }
      
  });
      
}
  });


});

module.exports = router;
