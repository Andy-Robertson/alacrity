// Set server address, port and required packages.
const PORT = parseInt(process.env.PORT || "5000");
const SERVER = "localhost";
const express = require("express");
const routes = require("./routes/routes");
const authRoutes = require("./routes/authRoutes");
require("./authentication/passportConfig");
const app = express();

routes(app);

// Start alacrity server
const server = app.listen(PORT, SERVER, (err) => {
  err
    ? console.log(`Error: ${err}`)
    : console.log(
        `Alacrity server now gravitating on ${server.address().address}:${
          server.address().port
        }`
      );
});
