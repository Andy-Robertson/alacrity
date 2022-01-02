const pool = require("../data/postgresConfig");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;

//     ---------- GOOGLE AUTHENTICATION ----------     //

// Create new google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      const { id, provider, displayName } = profile;
      const { givenName, familyName } = profile.name;
      const email = profile.emails[0].value;
      const avatar = profile.photos[0].value;
      const marketing = false; // Temp value, will be set on profile page.

      const insertUserDetailsQuery = `
        INSERT INTO users
        (
            auth_id,
            provider_name,
            display_name,
            first_name,
            last_name,
            email,
            avatar,
            marketing
        )
        VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8)`;

      pool
        .query("Select * FROM users WHERE auth_Id = $1", [id])
        .then((result) => {
          if (result.rows.length <= 0) {
            pool.query(insertUserDetailsQuery, [
              id,
              provider,
              displayName,
              givenName,
              familyName,
              email,
              avatar,
              marketing,
            ]);
            console.log("User account created");
            cb(null, profile);
          } else {
            console.log("User account exists");
            cb(null, profile);
          }
        })
        .catch((e) => console.log(e));
    }
  )
);

//     ---------- GITHUB AUTHENTICATION ----------     //

// Load Github strategy & credentials.

// Create new Github strategy.
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      const { id, provider, displayName } = profile;
      const { email, avatar_url } = profile._json;
      const firstName = "";
      const lastName = "";
      const marketing = false; // Temp value, will be set on profile page.

      const userDetailsInsertQuery = `
        INSERT INTO users
        (
            auth_id,
            provider_name,
            display_name,
            first_name,
            last_name,
            email,
            avatar,
            marketing
        )
        VALUES
        ($ 1, $ 2, $ 3, $ 4, $ 5, $ 6, $ 7, $ 8)`;

      pool
        .query("Select * FROM users WHERE auth_Id = $1", [id])
        .then((result) => {
          if (result.rows.length <= 0) {
            pool.query(userDetailsInsertQuery, [
              id,
              provider,
              displayName,
              firstName,
              lastName,
              email,
              avatar_url,
              marketing,
            ]);
            console.log("created new profile");
            cb(null, profile);
          } else {
            console.log("existing user");
            cb(null, profile);
          }
        })
        .catch((e) => console.log(e));
    }
  )
);

// Serialize authenticated user to a persistent session.
passport.serializeUser((user, cb) => cb(null, user));

// Deserialize authenticated user from a persistent session.
passport.deserializeUser((user, cb) => cb(null, user));
