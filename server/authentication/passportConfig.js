const pool = require("../data/postgresConfig");
const passport = require("passport");
const fetch = require("cross-fetch");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

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

      pool
        .query("Select * FROM users WHERE auth_Id = $1", [id])
        .then((result) => {
          const user = {
            displayName: profile.displayName,
            photos: [{ value: avatar }],
          };

          if (result.rows.length <= 0) {
            pool.query(getDBInsertString(), [
              id,
              provider,
              displayName,
              givenName,
              familyName,
              email,
              avatar,
              marketing,
            ]);
            console.log("Created new profile");
            cb(null, user);
          } else {
            console.log("User profile exists");
            cb(null, user);
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

      pool
        .query("Select * FROM users WHERE auth_Id = $1", [id])
        .then((result) => {
          const user = {
            displayName: profile.displayName,
            photos: [{ value: avatar_url }],
          };

          if (result.rows.length <= 0) {
            pool.query(getDBInsertString(), [
              id,
              provider,
              displayName,
              firstName,
              lastName,
              email,
              avatar_url,
              marketing,
            ]);
            console.log("Created new profile");
            cb(null, user);
          } else {
            console.log("User profile exists");
            cb(null, user);
          }
        })
        .catch((e) => console.log(e));
    }
  )
);

//     ---------- FACEBOOK AUTHENTICATION ----------     //

// Creates new Facebook strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "displayName", "email", "name"],
    },
    function (accessToken, refreshToken, profile, cb) {
      const { id, provider, displayName } = profile;
      const { email, last_name, first_name } = profile._json;
      const marketing = false; // Temp value, will be set on profile page.

      const fetchUserPicture = fetch(
        `https://graph.facebook.com/${profile.id}/?fields=picture&type=large&access_token=${accessToken}`
      )
        .then((response) => response.json())
        .then((result) => {
          return {
            displayName: profile.displayName,
            photos: [{ value: result.picture.data.url }],
          };
        })
        .then((user) => {
          pool
            .query("Select * FROM users WHERE auth_Id = $1", [id])
            .then((result) => {
              if (result.rows.length <= 0) {
                pool.query(getDBInsertString(), [
                  id,
                  provider,
                  displayName,
                  first_name,
                  last_name,
                  email,
                  user.photos[1].value,
                  marketing,
                ]);
                console.log("created new profile");
                cb(null, user);
              } else {
                console.log("existing user");
                cb(null, user);
              }
            })
            .catch((e) => console.log(e));
        })
        .catch((e) => console.log(e));
    }
  )
);

//     ---------- HELPERS ----------     //

const getDBInsertString = () => {
  return `
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
};

// Serialize authenticated user to a persistent session.
passport.serializeUser((user, cb) => cb(null, user));

// Deserialize authenticated user from a persistent session.
passport.deserializeUser((user, cb) => cb(null, user));
