const router = require('express').Router();
module.exports = (db) => {

  router.post('/', (req, res) => {
    const email = req.body["0"].value;
    const password = req.body["1"].value;

    db.query(`SELECT * FROM users WHERE email = $1 AND password = $2;`, [email, password])
    .then((result) => {
      if (result.rows.length) {
        // const accessToken = jwt.sign(
        //   result.rows[0], process.env.ACCESS_TOKEN_SECRET
        //   );
        return res.json({ user: result.rows[0].id });
      }  
      return res.json({ user: null });
    })
  });

  return router;
}