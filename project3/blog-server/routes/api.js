var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
// set client
let client = require('../db');


router.get('/:username', function(req, res, next) {

});

router.get('/:username/:postid', function(req, res, next) {

});

router.post('/:username/:postid', function(req, res, next) {

});

router.put('/:username/:postid', function(req, res, next) {

});

router.delete('/:username/:postid', function(req, res, next) {

});

module.exports = router;