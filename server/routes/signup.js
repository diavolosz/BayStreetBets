const router = require("express").Router();
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
    const isValidUsername = validateUsername(username) || {
      error: "Username can only contain alphanumeric characters.",
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

    let validated = true;
    validations.forEach(validation => {
      if (validation !== true) {
        validated = validation.error;
        return;
      }
    });

    if (validated !== true) {
      returnres.send(validated);
    }

    // Insert new user into database
    db.query(
      `INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING *`,
      [email, username, password]
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
            return res.send("Email unavailable.");
          case "users_username_key":
            return res.send("Username unavailable.");
          default:
            return res.send(err);
        }
      });
  });

  return router;
};
