const authRouter = require("express").Router();
const passport = require("passport");

// Production / Development environment selection.
const CLIENT_URL =
  process.env.WORKING_ENVIRONMENT === "production"
    ? "https://alacrity-focus.herokuapp.com"
    : "http://localhost:3000";

// Handle successful login (user authenticated).
authRouter.get("/login/success", (req, res) => {

  if (req.user) {
    const minUserLoginDetails = {
      avatar: req.user.avatar,
      displayName: req.user.display_name,
    };

    res.status(200).json({
      success: true,
      message: "authentication successful",
      user: minUserLoginDetails,
      cookies: req.cookies,
    });
  } else {
    res.status(401).json({ success: false, Message: "Not authorized" });
  }
});

// Handle failed login (user not authenticated).
authRouter.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failed to authenticate",
  });
});

// Handle logout
authRouter.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

//     ---------- GOOGLE SPECIFIC ROUTES ----------     //

// Set request scope, user profile and email returned on successful auth.
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Set redirect routes upon authentication success or failure.
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

//     ---------- GITHUB SPECIFIC ROUTES ----------     //

authRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["profile"] })
);

// Set redirect routes upon authentication success or failure.
authRouter.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

//     ---------- FACEBOOK SPECIFIC ROUTES ----------     //

authRouter.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["public_profile", "email"],
  })
);

authRouter.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

//     ---------- TWITTER SPECIFIC ROUTES ----------     //

authRouter.get("/twitter", passport.authenticate("twitter"));

authRouter.get(
  "/twitter/callback",
  passport.authenticate("twitter", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = authRouter;
