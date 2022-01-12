// Set server address, port and required packages.
const PORT = parseInt(process.env.PORT || "5000");
const Keygrip = require("keygrip");
const passport = require("passport");
const cors = require("cors");
const cookieSession = require("cookie-session");
const express = require("express");
const routes = require("./routes/routes");
const authRoutes = require("./routes/authRoutes");
require("./authentication/passportConfig");
require("./data/postgresConfig")
const app = express();

// Production / Development environment selection.
const CLIENT_URL = (
  process.env.WORKING_ENVIRONMENT === "production"
    ? "https://alacrity-team-gravity.herokuapp.com"
    : "http://localhost:3000"

);

    console.log(`server.js WE ${process.env.WORKING_ENVIRONMENT}`);
        console.log(`server.js ND ${process.env.NODE_DEV}`);

// Configure session cookies with 24hr expiration and random keys.
app.use(
  cookieSession({
    name: "session",
    keys: new Keygrip(["key1", "key2"], "SHA384"), // Keygrip instance used to generate keys.
    maxAge: 24 * 60 * 60 * 100, // 24 hours
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: CLIENT_URL,
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);

// Add Access Control headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", CLIENT_URL);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


app.use("/auth", authRoutes);

routes(app);

// Start alacrity server
const server = app.listen(PORT, (err) => {
  err
    ? console.log(`Error: ${err}`)
    : console.log(`Alacrity server is now gravitating on Port: ${PORT}`);
});
