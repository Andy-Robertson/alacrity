// Production / Development environment selection.

const getEnvironment = () => {
  return process.env.NODE_ENV === "production"
    ? "https://alacrity-team-gravity.herokuapp.com/"
    : "http://localhost:3000";
};

module.exports = { getEnvironment };
