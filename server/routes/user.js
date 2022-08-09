const router = require("express").Router();

module.exports = db => {
  router.get("/", (req, res) => {
    

  }); 

  router.get("/:id", (req, res) => {
    const { id } = req.params;
    db.query(`SELECT * FROM users WHERE id = $1;`, [id]).then(result => {
      const user = {...result.rows[0]}
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
      return db.query(`SELECT * FROM competitions JOIN user_competitions ON competitions.id = user_competitions.competition_id WHERE user_competitions.user_id = $1;`, [id]);
    })
    .then((result) => {
      competitions["competitionsEnrolled"] = result.rows;
      res.json(competitions);
    });
  });

  return router;
};