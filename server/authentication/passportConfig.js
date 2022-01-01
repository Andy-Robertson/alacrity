const pool = require("../data/postgresConfig");
const passport = require("passport");

//     ---------- GOOGLE AUTHENTICATION ----------     //

// Load google strategy & credentials
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// Create new google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
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

// Serialize authenticated user to a persistent session.
passport.serializeUser((user, cb) => cb(null, user));

// Deserialize authenticated user from a persistent session.
passport.deserializeUser((user, cb) => cb(null, user));
