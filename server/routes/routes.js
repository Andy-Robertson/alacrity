const pool = require("../data/postgresConfig");

// Route the app
const router = (app) => {
  // Root welcome message.
  app.get("/", (req, res) => {
    res.send({
      message: "Welcome to the Alacrity API!",
    });
  });

  // db connection test.
  //   app.get("/test", (req, res) => {
  //     pool.query("SELECT * FROM users").then((result) => {
  //       res.status(200).json(result);
  //     });
  //   });
};

module.exports = router;
