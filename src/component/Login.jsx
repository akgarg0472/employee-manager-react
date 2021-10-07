import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import {
  emailFormatCheckRegex,
  passwordFormatCheckRegex,
} from "../values/ConstantsAndValues";
import "./Login.css";
import swal from "sweetalert";

const validateSigninForm = () => {
  const email = document.getElementById("login_username");
  const password = document.getElementById("login__password");
  const errorField = document.getElementById("signin__error");

  // hides all error related stuff
  errorField.style.display = "none";
  email.classList.remove("signin__input__error");
  password.classList.remove("signin__input__error");

  if (
    email.value.trim() === "" ||
    !email.value.trim().match(emailFormatCheckRegex)
  ) {
    errorField.style.display = "block";
    errorField.innerHTML = "Please enter valid email";
    email.classList.add("signin__input__error");
    return false;
  }

  if (
    password.value.trim() === "" ||
    !password.value.trim().match(passwordFormatCheckRegex)
  ) {
    errorField.style.display = "block";
    errorField.innerHTML = "Enter valid password";
    password.classList.add("signin__input__error");
    return false;
  }

  return true;
};

const Login = () => {
  const [showPasswordToggle, setShowPasswordToggle] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [signinFormData, setSigninFormData] = useState({
    email: "",
    password: "",
  });

  const toggleShowPassword = () => {
    setShowPasswordToggle(!showPasswordToggle);
  };

  const updateSigninFormData = (e) => {
    setSigninFormData((oldData) => {
      const field = e.target.name;
      const value = e.target.value;
      return { ...oldData, [field]: value };
    });
  };

  const performLogin = (e) => {
    e.preventDefault();

    if (validateSigninForm()) {
      swal(
        "Congrats",
        "Sign in form is validated successfully",
        "success"
      ).then(() => {
        setShowLoader(true);
      });
    }
  };

  return (
    <>
      <div className="login__container">
        <div className="login__form__container">
          <form className="login__form">
            <div className="signin__heading__container">
              <h1>Welcome</h1>
              <p>Sign in to continue</p>
            </div>

            <div className="login__input__container">
              <label className="login__form__label" htmlFor="login_username">
                Email
              </label>
              <input
                className="login__form__input"
                type="email"
                id="login_username"
                name="email"
                value={signinFormData.email}
                onChange={updateSigninFormData}
                autoComplete="off"
                required
              />
            </div>

            <div className="login__input__container">
              <label className="login__form__label" htmlFor="login__password">
                Password
              </label>
              <input
                className="login__form__input"
                type={showPasswordToggle ? "text" : "password"}
                id="login__password"
                name="password"
                value={signinFormData.password}
                onChange={updateSigninFormData}
                required
              />
              <i
                className="fa fa-eye toggle__pass__icon"
                id="toggle__pass__icon"
                onClick={toggleShowPassword}
                style={{
                  color: showPasswordToggle ? "#fff" : "gray",
                }}
              ></i>
            </div>

            <div className="login__btn__container">
              <p className="signin__error" id="signin__error">
                login error
              </p>
              <button
                className="login__button"
                variant="contained"
                onClick={performLogin}
              >
                Login
              </button>

              <p className="forgot__pass__nav">Forgot Password?</p>
              <p className="signup__nav">
                New user?
                <Link to="/signup">Signup</Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      <Loader display={showLoader} />
    </>
  );
};

export default Login;
