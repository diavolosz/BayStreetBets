const router = require("express").Router();

module.exports = db => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM competitions;`).then(result => {
      
      return res.json(result.rows);
    });

  }); 

  router.post("/user_competitions", (req, res) => {
    const userID = req.body.data.user.id

    db.query(`SELECT * FROM competitions WHERE user_id = $1;`, [userID]).then(result => {
      
      return res.json(result.rows);
    });

  }); 

  return router;
};