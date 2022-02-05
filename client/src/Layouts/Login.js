import React from "react";
import { FaTwitter, FaFacebook, FaGoogle, FaGithub } from "react-icons/fa";

const Login = ({ SERVER_URL }) => {
  const google = () => {
    window.open(`${SERVER_URL}/auth/google`, "_self");
  };

  const github = () => {
    window.open(`${SERVER_URL}/auth/github`, "_self");
  };

  const facebook = () => {
    window.open(`${SERVER_URL}/auth/facebook`, "_self");
  };

  const twitter = () => {
    window.open(`${SERVER_URL}/auth/twitter`, "_self");
  };

  return (
    <section className="login-section">
      <div className="wrapper-login-form animate__animated animate__fadeInUpBig">
        <form className="login-form">
          <h3>Log-in</h3>
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
