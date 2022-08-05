const router = require('express').Router();

const users = ['Bobasdasdasdsss', 'Alexadasdasxxx', 'Wiasdasdall', 'Tristasdasdan'];

module.exports = (db) => {
  // all routes will go here 
  router.get('/', (req, res) => {
      res.json(users);
  });

  return router;
}