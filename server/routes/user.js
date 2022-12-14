const router = require("express").Router();
const bcrypt = require("bcryptjs");

module.exports = db => {

  router.get("/:id", (req, res) => {
    const { id } = req.params;
    db.query(`SELECT * FROM users WHERE id = $1;`, [id]).then(result => {
      const user = { ...result.rows[0] };
      delete user.password;
      return res.json(user);
    });
  });

  router.get("/:id/competitions", (req, res) => {
    const { id } = req.params;
    let competitions = {};
    db.query(`SELECT * FROM competitions WHERE user_id = $1;`, [id])
      .then(result => {
        competitions["competitionsCreated"] = result.rows;

        return db.query(
          `SELECT competitions.id, competitions.name, competitions.description, competitions.starting_amount, competitions.start_date, competitions.end_date, competitions.created_date, competitions.user_id, user_competitions.user_balance, user_competitions.competition_id FROM competitions JOIN user_competitions ON competitions.id = user_competitions.competition_id WHERE user_competitions.user_id = $1 AND competitions.user_id != $2;`,
          [id, id]
        );
      })
      .then(result => {
        competitions["competitionsEnrolled"] = result.rows;
        res.json(competitions);
      });
  });

  router.post("/:id/profile", (req, res) => {
    const updated_username = req.body["0"].value;
    const updated_email = req.body["1"].value;
    const updated_password = req.body["2"].value;
    const hashed_password = bcrypt.hashSync(updated_password, 10);

    const { id } = req.params;
    return db.query(`UPDATE users SET username = $1, email = $2, password = $3 WHERE users.id = ${id} RETURNING *;`, [updated_username, updated_email, hashed_password])
      .then((result) => {
        const user = result.rows[0]
        delete user.password
        return res.json(user);
      })
      .catch((err) => {
        return res.send(err)
      })
  })

  router.post("/information", (req, res) => {
    let user_id = req.body.data.user_id
    db.query(
      `SELECT id, email FROM users WHERE id = $1;`, [user_id])
      .then(result => {
        return res.json(result.rows);
      })
      .catch(e => {
        console.log(e)
      });
  })

  return router;
};
