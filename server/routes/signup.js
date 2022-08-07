const router = require("express").Router();
const bcrypt = require("bcryptjs");

const {
  validatePassword,
  validatePasswordConfirmation,
  validateEmail,
  validateUsername,
} = require("../helpers/signupValidation");

module.exports = db => {
  router.post("/", (req, res) => {
    // Extract values from post request body
    const email = req.body["0"].value.trim();
    const username = req.body["1"].value.trim();
    const password = req.body["2"].value;
    const password_confirmation = req.body["3"].value;

    // Validate values
    const isValidEmail = validateEmail(email) || { error: "Invalid email." };
    const isValidPassword = validatePassword(password) || {
      error: "Password must be at least 8 characters long.",
    };
    const isValidUsername = validateUsername(username) === true || {
      error: validateUsername(username),
    };
    const isValidPasswordConfirmation = validatePasswordConfirmation(
      password,
      password_confirmation
    ) || { error: "Passwords do not match." };

    const validations = [
      isValidEmail,
      isValidPassword,
      isValidUsername,
      isValidPasswordConfirmation,
    ];

    let validated = { error: null };
    validations.forEach(validation => {
      if (validation !== true) {
        validated.error = validation.error;
        return;
      }
    });

    if (validated.error) {
      return res.json({ ...validated, user: null });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    // Insert new user into database
    db.query(
      `INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING *`,
      [email, username, hashedPassword]
    )
      .then(result => {
        if (result.rows.length) {
          // const accessToken = jwt.sign(
          //   result.rows[0], process.env.ACCESS_TOKEN_SECRET
          //   );
          return res.json({ user: result.rows[0].id });
        }
        return res.json({ user: result });
      })
      .catch(err => {
        // Handle general errors and case where email and username unavailable
        const { constraint } = err;

        switch (constraint) {
          case "users_email_key":
            return res.json({ error: "Email unavailable." });
          case "users_username_key":
            return res.json({ error: "Username unavailable." });
          default:
            return res.json({ error: err });
        }
      });
  });

  return router;
};
