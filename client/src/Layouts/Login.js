import React from "react";
import { FaTwitter, FaFacebook, FaGoogle, FaGithub } from "react-icons/fa";

const Login = ({ currentDomain }) => {
  console.log(`login page ${currentDomain}`);
  const google = () => {
    window.open(`${currentDomain}/auth/google`, "_self");
  };

  const github = () => {
    window.open(`${currentDomain}/auth/github`, "_self");
  };

  const facebook = () => {
    window.open(`${currentDomain}/auth/facebook`, "_self");
  };

  const twitter = () => {
    window.open(`${currentDomain}/auth/twitter`, "_self");
  };

  return (
    <section className="login-section">
      <div className="wrapper-login-form">
        <form className="login-form">
          <div className="login-btn google-color" onClick={google}>
            <FaGoogle />
            Google
          </div>
          <div className="login-btn twitter-color" onClick={twitter}>
            <FaTwitter />
            Twitter
          </div>
          <div className="login-btn github-color" onClick={github}>
            <FaGithub />
            Github
          </div>
          <div className="login-btn facebook-color" onClick={facebook}>
            <FaFacebook />
            Facebook
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
