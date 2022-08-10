const router = require("express").Router();

module.exports = db => {
  router.post("/", (req, res) => {
    console.log("req.body.data will give user", req.body.data)
    const userID = req.body.data.user.id

    db.query(`SELECT buy_sell, symbol, price::money::numeric::int, number_of_shares, transaction_date, user_id, competition_id FROM transactions WHERE user_id = $1;`, [userID])
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