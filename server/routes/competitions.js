const router = require("express").Router();
const jwt = require("jsonwebtoken");

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
    const userJwt = req.body["user"];

    // Check if user is logged in
    jwt.verify(userJwt, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      // Return 401 if JWT verification fails
      if (err) {
        return res.sendStatus(401);
      }

      // Perform database operations
      return db
        .query(
          `INSERT INTO competitions(name, description, starting_amount, start_date, end_date, created_date, user_id) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *;`,
          [
            name,
            description,
            starting_amount,
            start_date,
            end_date,
            new Date(),
            user.id,
          ]
        )
        .then(result => {
          db.query(
            `INSERT INTO user_competitions(user_balance, user_id, competition_id) VALUES($1, $2, $3) RETURNING *;`,
            [starting_amount, user.id, result.rows[0]["id"]]
          )
            .then(() => {
              return res.json(result);
            })
            .catch(err => {
              return res.send(err);
            });
        });
    });
  });

  router.post("/user_competitions", (req, res) => {
    const userID = req.body.data.user.id;

    db.query(`SELECT * FROM competitions WHERE user_id = $1;`, [userID]).then(
      result => {
        console.log(typeof result.rows);
        return res.json(result.rows);
      }
    );
  });

  router.delete("/", (req, res) => {
    const userJwt = req.headers.user;
    const { competitionId, creatorId } = req.body;

    // Check if user is logged in
    jwt.verify(userJwt, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(401);
      }

      // Check if user making the delete request is the creator of the competition
      if (user.id !== creatorId) {
        return res.sendStatus(401);
      }

      // Delete competition from competitions and user_competitions
      return db
        .query(`DELETE FROM competitions WHERE id = $1;`, [competitionId])
        .then(result => {
          db.query(`DELETE FROM user_competitions WHERE competition_id = $1;`, [
            competitionId,
          ])
            .then(() => {
              return res.sendStatus(200);
            })
            .catch(() => res.sendStatus(403));
        });
    });
  });

  router.delete("/leave", (req, res) => {
    const userJwt = req.headers.user;
    const { competitionId, creatorId } = req.body;

    // Check if user is logged in
    jwt.verify(userJwt, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err || user.id === creatorId) {
        return res.sendStatus(401);
      }

      // Delete entry in user_competitions
      db.query(
        `DELETE FROM user_competitions WHERE user_id = $1 AND competition_id = $2;`,
        [user.id, competitionId]
      )
        .then(() => {
          return res.sendStatus(200);
        })
        .catch(() => res.sendStatus(404));
    });
  });

  router.post("/join", (req, res) => {
    const userJwt = req.headers.user;
    const { competitionId, creatorId, startingBalance } = req.body;

    // Check if user is logged in
    jwt.verify(userJwt, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err || user.id !== creatorId) {
        return res.sendStatus(403);
      }

      // Insert entry in user_competitions
      db.query(
        `INSERT INTO user_competitions(user_balance, user_id, competition_id) VALUES($1, $2, $3)`,
        [startingBalance, user.id, competitionId]
      )
        .then(() => {
          return res.sendStatus(200);
        })
        .catch(() => res.sendStatus(404));
    });
  });

  return router;
};
