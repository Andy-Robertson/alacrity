import React from "react";
import { FaTwitter, FaFacebook, FaGoogle, FaGithub } from "react-icons/fa";

const Login = () => {
  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const github = () => {
    window.open("http://localhost:5000/auth/github", "_self");
  };

  const facebook = () => {
    window.open("http://localhost:5000/auth/facebook", "_self");
  };

  const twitter = () => {
    window.open("http://localhost:5000/auth/twitter", "_self");
  };

  return (
    <section className="login-section">
      <div className="wrapper-login-form">
        <form className="login-form">
          <div className="login-btn google-color" onClick={google}>
            <FaGoogle />
            Google Sign-in
          </div>
          <div className="login-btn twitter-color" onClick={twitter}>
            <FaTwitter />
            Twitter Sign-in
          </div>
          <div className="login-btn github-color" onClick={github}>
            <FaGithub />
            Github Sign-in
          </div>
          <div className="login-btn facebook-color" onClick={facebook}>
            <FaFacebook />
            Facebook Sign-in
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
