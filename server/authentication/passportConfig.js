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
      marketing
  )
  VALUES
  ($1, $2, $3, $4, $5, $6, $7, $8)`;

const DB_ID_SEARCH_STRING = `SELECT * FROM users WHERE auth_Id = $1`;

//     ---------- GOOGLE AUTHENTICATION ----------     //

// Production / Development environment selection.
const GOOGLE_CALLBACK_URL = (
  process.env.WORKING_ENVIRONMENT === "production"
    ? "http://alacritybackend.herokuapp.com/auth/google/callback"
    : "/auth/google/callback"
);

// Create new google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, cb) {
      const { id, provider } = profile;
      const { name, given_name, family_name, picture, email } = profile._json;
      const marketing = false;

      const user = {
        displayName: profile.displayName,
        photos: [{ value: picture }],
      };

      poolQuery(
        id,
        provider,
        name,
        family_name,
        given_name,
        email,
        picture,
        user,
        cb
      );
    }
  )
);

//     ---------- GITHUB AUTHENTICATION ----------     //

const GITHUB_CALLBACK_URL = (
  process.env.WORKING_ENVIRONMENT === "production"
    ? "https://alacritybackend.herokuapp.com/auth/github/callback"
    : "/auth/github/callback"
);

// Create new Github strategy.
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: GITHUB_CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, cb) {
      const { id, provider, displayName } = profile;
      const { email, avatar_url } = profile._json;
      const firstName = "";
      const lastName = "";

      const user = {
        displayName: profile.displayName,
        photos: [{ value: avatar_url }],
      };

      poolQuery(
        id,
        provider,
        displayName,
        lastName,
        firstName,
        email,
        avatar_url,
        user,
        cb
      );
    }
  )
);

//     ---------- FACEBOOK AUTHENTICATION ----------     //

// Production / Development environment selection.
const FACEBOOK_CALLBACK_URL = (
  process.env.WORKING_ENVIRONMENT === "production"
    ? "https://alacritybackend.herokuapp.com/auth/facebook/callback"
    : "/auth/facebook/callback"
);

// Creates new Facebook strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: FACEBOOK_CALLBACK_URL,
      profileFields: ["id", "displayName", "email", "name"],
    },
    function (accessToken, refreshToken, profile, cb) {
      const { id, provider, displayName } = profile;
      const { email, last_name, first_name } = profile._json;

      const fetchUserPicture = fetch(
        `https://graph.facebook.com/${profile.id}/?fields=picture&type=large&access_token=${accessToken}`
      )
        .then((response) => response.json())
        .then((result) => {
          const user = {
            displayName: profile.displayName,
            photos: [{ value: result.picture.data.url }],
          };

          poolQuery(
            id,
            provider,
            displayName,
            last_name,
            first_name,
            email,
            result.picture.data.url,
            user,
            cb
          );
        })
        .catch((e) => console.log(e));
    }
  )
);

//     ---------- TWITTER AUTHENTICATION ----------     //

// Production / Development environment selection.
const TWITTER_CALLBACK_URL = (
  process.env.WORKING_ENVIRONMENT === "production"
    ? "http://alacritybackend.herokuapp.com/auth/twitter/callback"
    : "/auth/twitter/callback"
);

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CLIENT_ID,
      consumerSecret: process.env.TWITTER_CLIENT_SECRET,
      callbackURL: TWITTER_CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, cb) {
      const { id, name, profile_image_url } = profile._json;
      const { provider } = profile;
      const email = "";
      const givenName = "";
      const familyName = "";

      const user = {
        displayName: name,
        photos: [{ value: profile_image_url }],
      };

      poolQuery(
        id,
        provider,
        name,
        givenName,
        familyName,
        email,
        profile_image_url,
        user,
        cb
      );
    }
  )
);

//     ---------- HELPERS ----------     //

// Complete pool query calling `getDBInsertString()` and `getSearchForAuthIdString()`
const poolQuery = (
  id,
  provider,
  displayName,
  first_name,
  last_name,
  email,
  picture,
  user,
  cb
) => {
  const marketing = true;

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
          marketing,
        ]);
        cb(null, user);
      } else {
        cb(null, user);
      }
    })
    .catch((e) => console.log(e));
};

// Serialize authenticated user to a persistent session.
passport.serializeUser((user, cb) => cb(null, user));

// Deserialize authenticated user from a persistent session.
passport.deserializeUser((user, cb) => cb(null, user));
