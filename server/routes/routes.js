const pool = require("../data/postgresConfig");

// Route the app.
const router = (app) => {
  // Root welcome message.
  app.get("/", (req, res) => {
    res.send({
      message: "Welcome to the Alacrity API!",
    });
  });

  // Catch all - non matching routes sent back to index.html (keep below all other routes and above err handling).
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/build/index.html"));
  });

  // Error handling
  app.use((req, res) => {
    res.status(404).json({
      message: "Route Not Found",
    });
  });
  app.use((err, req, res) => {
    res.status(err.status || 500).json({
      message: err.message,
      error: {},
    });
  });

};

module.exports = router;
