const authRouter = require("express").Router();
const passport = require("passport");
const CLIENT_URL = "http://localhost:3000/";

// Handle successful login (user authenticated)
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successful",
      user: req.user,
      cookies: req.cookies,
    });
  }
});

module.exports = authRouter;
