const router = require("express").Router();

module.exports = db => {
  router.post("/", (req, res) => {
    if (!req.body.data.competition) {
      return res.json(null);
    }

    const userID = req.body.data.user.id;

    db.query(
      `SELECT buy_sell, symbol, price::money::numeric::int, number_of_shares, transaction_date, user_id, competition_id FROM transactions WHERE user_id = $1 ;`,
      [userID]
    )
      .then(result => {
        return res.json(result.rows);
      })
      .catch(e => {
        console.log("transaction error", e);
      });
  });

  router.post("/history", (req, res) => {

    if (!req.body.data.competition) {
      return res.json(null);
    }

    const userID = req.body.data.user.id;
    const competitionID = req.body.data.competition.id;

    db.query(
      `SELECT buy_sell, symbol, price::money::numeric::int, number_of_shares, transaction_date, user_id, competition_id FROM transactions WHERE user_id = $1 AND competition_id = $2;`, [userID, competitionID]).then(result => {

        return res.json(result.rows);
      })
      .catch(e => {
        console.log(e)
      });

  });

  router.post("/buy", (req, res) => {
    user_id = req.body.user_profile.id;
    competition_id = req.body.competition_id.id;
    transaction_date = new Date();
    buy_amount = req.body.buy;
    share_price = req.body.stockSearch.details.latestPrice;
    stock_symbol = req.body.stockSearch.details.symbol;
    let total = share_price * buy_amount;
    type = "Buy";

    return db.query(`UPDATE user_competitions SET user_balance = user_balance - $1 WHERE user_id = $2 AND competition_id = $3;`, [total, user_id, competition_id]).then(() => {
      return db.query(
        `INSERT INTO transactions(buy_sell, symbol, price, number_of_shares, transaction_date, user_id, competition_id) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *;`,
        [
          type,
          stock_symbol,
          share_price,
          buy_amount,
          transaction_date,
          user_id,
          competition_id,
        ]
      ).then(result => {
        res.json(result.rows[0]);
      });
    })
  });

  router.post("/sell", (req, res) => {
    user_id = req.body.user_profile.id;
    competition_id = req.body.competition_id.id;
    transaction_date = new Date();
    sell_amount = -req.body.sell;
    share_price = req.body.stockSearch.details.latestPrice;
    stock_symbol = req.body.stockSearch.details.symbol;
    type = "Sell";
    let total = share_price * sell_amount;

    return db.query(`UPDATE user_competitions SET user_balance = user_balance - $1 WHERE user_id = $2 AND competition_id = $3;`, [total, user_id, competition_id]).then(() => {
      db.query(
        `INSERT INTO transactions(buy_sell, symbol, price, number_of_shares, transaction_date, user_id, competition_id) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *;`,
        [
          type,
          stock_symbol,
          share_price,
          sell_amount,
          transaction_date,
          user_id,
          competition_id,
        ]
      ).then(result => {
        res.json(result.rows[0]);
      });
    });

  });

  return router;
};