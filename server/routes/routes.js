const pool = require("../data/postgresConfig");

// Route the app
const router = (app) => {
  // Root welcome message.
  app.get("/", (req, res) => {
    res.send({
      message: "Welcome to the Alacrity API!",
    });
  });
};

module.exports = router;
