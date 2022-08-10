const router = require("express").Router();

module.exports = db => {
  router.post("/portfolio_pie", (req, res) => {

    const userID = req.body.data.user.id

    console.log(req.body.data)
    const competitionID = req.body.data.user_competitions.id


    db.query(
      `SELECT * FROM transactions WHERE user_id = $1 AND competition_id = $2;`, [userID, competitionID]).then(result => {

      return res.json(result.rows);
    })
    .catch(e => {
      console.log (e)
    });

  });


  return router;
};