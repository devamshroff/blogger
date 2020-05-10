let express = require('express');
let mongoUtil = require('../mongoUtil');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
const assert = require('assert');
let router = express.Router();

/* GET users post. */
router.get('/', function (req, res, next) {
  let redirect = req.query.redirect;
  res.render('login', {
    redirect: redirect
  });
});

router.post('/', function (req, res, next) {
  let username = req.body.username;
  let rawPassword = req.body.password;
  let redirect = req.body.redirect;
  let db = mongoUtil.getDb();
  db.collection('Users').findOne({
    'username': username,
  }).then(function (doc) {
    if (doc != null) { // user profile exists
      let storedPassword = doc.password;
      bcrypt.compare(rawPassword, storedPassword, function (err, result) {
        if (result) { // passwords match
          let expiration = new Date();
          expiration.setHours(expiration.getHours() + 2);
          console.log(expiration);
          let payload = {
            "exp": expiration.getTime(),
            "usr": username
          };
          let secretKey = "C-UFRaksvPKhx1txJYFcut3QGxsafPmwCY6SCly3G6c";
          let options = { algorithm: "HS256" };
          let token = jwt.sign(payload, secretKey, options);
          console.log(token);
          res.cookie('jwt', token);
          if (redirect != null) {
            res.redirect(redirect);
          } else {
            res.status(200);
            res.send('the authentication is successful.');
          }
        } else { // passwords do not match
          res.status(401);
          res.render('login', {
            redirect: redirect
          });
        }
      });
    } else { // user does not exist
      res.status(401);
      res.render('login', {
        redirect: redirect
      });
    }
  });
});

module.exports = router;