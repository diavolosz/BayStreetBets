const router = require("express").Router();
const bcrypt = require("bcryptjs");

const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateToken (req, res, next) {
  const authHeader = req.headers['authorization'];

  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify (token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.send(403);

    req.user = user
    next()
  })
}





module.exports = db => {
  router.get("/", authenticateToken, (req, res) => {

    res.json(req.user)
  });

  // router.post("/", (req, res) => {
  //   const email = req.body["0"].value;
  //   const password = req.body["1"].value;

  //   db.query(`SELECT * FROM users WHERE email = $1;`, [email]).then(result => {
  //     if (result.rows.length) {
  //       if (bcrypt.compareSync(password, result.rows[0].password)) {
  //         // const accessToken = jwt.sign(
  //         //   result.rows[0], process.env.ACCESS_TOKEN_SECRET
  //         //);

  //         const emailToken = { email: email };

  //         const accessToken = jwt.sign(emailToken, process.env.ACCESS_TOKEN_SECRET)



  //         return res.json({ user: result.rows[0].id });
  //       }
  //     }
  //     return res.json({ user: null });
  //   });
  // });

  router.post("/", (req, res) => {
    const email = req.body["0"].value;
    const password = req.body["1"].value;

    db.query(`SELECT * FROM users WHERE email = $1;`, [email]).then(result => {
      if (result.rows.length) {
        if (bcrypt.compareSync(password, result.rows[0].password)) {
          // const accessToken = jwt.sign(
          //   result.rows[0], process.env.ACCESS_TOKEN_SECRET
          //);

          const user = { user: email };

          const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)


          // console.log (accessToken)
          return res.json({accessToken});
        }
      }
      return res.json({ user: null });
    });
  });

  return router;
};
