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
const app = express();

// Production / Development environment selection.
const CLIENT_URL = (
  process.env.WORKING_ENVIRONMENT === "production"
    ? "https://alacrity-team-gravity.herokuapp.com"
    : "http://localhost:3000"
);
console.log(`authRoutes.js ${process.env.WORKING_ENVIRONMENT}`);

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
app.use("/auth", authRoutes);

routes(app);

// Start alacrity server
const server = app.listen(PORT, (err) => {
  err
    ? console.log(`Error: ${err}`)
    : console.log(`Alacrity server is now gravitating on Port: ${PORT}`);
});
