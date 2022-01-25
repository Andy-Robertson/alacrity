const pool = require("../data/postgresConfig");
const passport = require("passport");
const fetch = require("cross-fetch");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;

//     ---------- QUERY STRING CONSTRAINTS ----------     //

const DB_INSERT_STRING = `
  INSERT INTO users
  (
      auth_id,
      provider_name,
      display_name,
      first_name,
      last_name,
      email,
      avatar,
      marketing,
      pom_minutes,
      pom_seconds
  )
  VALUES
  ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;

const DB_ID_SEARCH_STRING = `SELECT * FROM users WHERE auth_Id = $1`;

//     ---------- GOOGLE AUTHENTICATION ----------     //

// Create new google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      const { id, provider } = profile;
      const { name, given_name, family_name, picture, email } = profile._json;
      const user = { userId: id };

      poolQuery(
        id,
        provider,
        name,
        family_name,
        given_name,
        email,
        picture,
        user,
        done
      );
    }
  )
);

//     ---------- GITHUB AUTHENTICATION ----------     //

// Create new Github strategy.
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      const { id, provider, displayName } = profile;
      const { email, avatar_url } = profile._json;
      const firstName = "";
      const lastName = "";
      const user = { userId: id };

      poolQuery(
        id,
        provider,
        displayName,
        lastName,
        firstName,
        email,
        avatar_url,
        user,
        done
      );
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
    function (accessToken, refreshToken, profile, done) {
      const { id, provider, displayName } = profile;
      const { email, last_name, first_name } = profile._json;

      const fetchUserPicture = fetch(
        `https://graph.facebook.com/${profile.id}/?fields=picture&type=large&access_token=${accessToken}`
      )
        .then((response) => response.json())
        .then((result) => {
          const user = { userId: id };

          poolQuery(
            id,
            provider,
            displayName,
            last_name,
            first_name,
            email,
            result.picture.data.url,
            user,
            done
          );
        })
        .catch((e) => console.log(e));
    }
  )
);

//     ---------- TWITTER AUTHENTICATION ----------     //

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CLIENT_ID,
      consumerSecret: process.env.TWITTER_CLIENT_SECRET,
      callbackURL: "/auth/twitter/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      const { id, name, profile_image_url } = profile._json;
      const { provider } = profile;
      const email = "";
      const givenName = "";
      const familyName = "";
      const user = { userId: id };

      poolQuery(
        id,
        provider,
        name,
        givenName,
        familyName,
        email,
        profile_image_url,
        user,
        done
      );
    }
  )
);

//     ---------- HELPERS ----------     //

// Complete pool query
const poolQuery = (
  id,
  provider,
  displayName,
  first_name,
  last_name,
  email,
  picture,
  user,
  done
) => {

  const defaultSettings = {
    marketing: false,
    pom_minutes: 25,
    pom_seconds: 00,
  };

  return pool
    .query(DB_ID_SEARCH_STRING, [id])
    .then((result) => {
      if (result.rows.length <= 0) {
        pool.query(DB_INSERT_STRING, [
          id,
          provider,
          displayName,
          first_name,
          last_name,
          email,
          picture,
          defaultSettings.marketing,
          defaultSettings.pom_minutes,
          defaultSettings.pom_seconds,
        ]);
        console.log(`default ${defaultSettings.pom_minutes}`);
        done(null, user);
      } else {
        done(null, user);
      }
    })
    .catch((e) => console.log(e));
};


// Serialize authenticated user to a persistent session.
passport.serializeUser((user, done) => {
  done(null, user.userId);
});

// Deserialize authenticated user from a persistent session.
passport.deserializeUser((id, done) => {
  pool.query(DB_ID_SEARCH_STRING, [id]).then((result) => {
    if (result.rows.length === 0) {
      done(new Error("User not found"), null);
    } else {
      done(null, result.rows[0]);
    }
  });
});
