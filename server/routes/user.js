const router = require("express").Router();

module.exports = db => {
  router.get("/", (req, res) => {});

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
          `SELECT * FROM competitions JOIN user_competitions ON competitions.id = user_competitions.competition_id WHERE user_competitions.user_id = $1 AND competitions.user_id != $2;`,
          [id, id]
        );
      })
      .then(result => {
        competitions["competitionsEnrolled"] = result.rows;
        res.json(competitions);
      });
  });

  router.post("/:id/profile", (req, res) => {
    const updated_username = req.body["0"].value
    const updated_email = req.body["1"].value

    const { id } = req.params;
    return db.query(`UPDATE users SET username = $1, email = $2 WHERE users.id = ${id};`,[updated_username, updated_email])
    .then(() => {
      return res.json(result);
    })
    .catch((err) => {
      return res.send(err)
    })
  })

  return router;
};
