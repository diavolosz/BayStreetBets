const router = require("express").Router();

module.exports = db => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM competitions;`).then(result => {
      
      return res.json(result.rows);
    });

  }); 

  router.post("/", (req, res) => {
    const name = req.body["0"].value;
    const description = req.body["1"].value;
    const starting_amount = req.body["2"].value;
    const start_date = req.body["4"][0].slice(0, 10);
    const end_date = req.body["4"][1].slice(0, 10);
    const user_id = req.body["user"];

    // Check if user is logged in
    if (!user_id) {
      return res.sendStatus(401);
    }

    return db.query(`INSERT INTO competitions(name, description, starting_amount, start_date, end_date, created_date, user_id) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *;`, [name, description, starting_amount, start_date, end_date, new Date(), user_id])
    .then(result => {
      db.query(`INSERT INTO user_competitions(user_balance, user_id, competition_id) VALUES($1, $2, $3) RETURNING *;`, [starting_amount, user_id, result.rows[0]["id"]])
    .then(() => {
        return res.sendStatus(201);
    })
    .catch((err) => {
      return res.send(err);
    });
    });

  }); 

  return router;
};