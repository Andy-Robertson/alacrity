const pool = require("../data/postgresConfig");
require("../server");

//     ---------- QUERY STRING CONSTRAINTS ----------     //

const FIND_USER_BY_ID = "SELECT * FROM users WHERE auth_id = $1";

const UPDATE_USER_SETTINGS = `
  UPDATE
    users
  SET
    pom_minutes = $1,
    pom_seconds = $2
  WHERE
    auth_id = $3`;

//     -------------- ROUTER FUNCTION --------------     //

// App router.
const router = (app) => {
  // Root welcome message.
  app.get("/", (req, res) => {
    res.send({
      message: "Welcome to the Alacrity API!",
    });
  });

  // Load user settings.
  app.get("/settings", (req, res) => {
    // const auth_id = req.passport.user;
    const auth_id = "103330551192242680756"; // Temp

    pool
      .query(FIND_USER_BY_ID, [auth_id])
      .then((result) => {
        result.rows
          ? res.status(200).json({
              pom_minutes: result.rows[0].pom_minutes,
              pom_seconds: result.rows[0].pom_seconds,
            })
          : res
              .status(500)
              .json({ Result: "Failure", message: "Request not complete" });
      })
      .catch((e) => console.error(e));
  });

  // Update user settings.
  app.put("/settings", (req, res) => {
    // const auth_id = req.passport.user;
    const auth_id = "103330551192242680756"; // Temp
    const { pom_minutes, pom_seconds } = req.body;

    pool
      .query(UPDATE_USER_SETTINGS, [pom_minutes, pom_seconds, auth_id])
      .then((result) => {
        result.rowCount > 0
          ? res
              .status(200)
              .json({ Result: "Success", message: "Settings updated" })
          : res
              .status(500)
              .json({ Result: "Failure", message: "Request not complete" });
      })
      .catch((e) => console.error(e));
  });

  // Catch all - non matching routes sent back to index.html (keep below all other routes and above err handling).
  // app.get("*", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../../client/build/index.html"));
  // });

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
