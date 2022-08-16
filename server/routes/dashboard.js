const express = require('express');
const router = express.Router();

/* GET home page. */

module.exports = (db) => {
  router.get('/', function(req, res) {
    res.render('index');
  });

  return router;
};