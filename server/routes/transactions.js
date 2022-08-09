const router = require("express").Router();

module.exports = db => {
  router.post("/", (req, res) => {
    console.log("req.body.data will give user", req.body.data)
    const userID = req.body.data.user.id

    db.query(`SELECT * FROM transactions WHERE user_id = $1;`, [userID])
    .then(result => {
      console.log (result.rows)
      return res.json(result.rows);
    })
    .catch(e => {
      console.log("transaction error", e)
    });

  }); 

  return router;
};