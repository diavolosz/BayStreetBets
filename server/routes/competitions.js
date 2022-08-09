const router = require("express").Router();

module.exports = db => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM competitions;`).then(result => {
      
      return res.json(result.rows);
    });

  }); 

  return router;
};