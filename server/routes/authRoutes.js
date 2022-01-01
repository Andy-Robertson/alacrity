const authRouter = require("express").Router();
const passport = require("passport");
const CLIENT_URL = "http://localhost:3000/";

// Handle successful login (user authenticated).
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successful authentication",
      user: req.user,
      cookies: req.cookies,
    });
  }
});

// Handle failed login (user not authenticated).
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failed to authenticate",
  });
});

// Handle logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

module.exports = authRouter;
