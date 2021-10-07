import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import {
  emailFormatCheckRegex,
  passwordFormatCheckRegex,
  phoneFormatCheckRegex,
} from "../values/ConstantsAndValues";
import Loader from "./Loader";
import axios from "axios";
import "./Signup.css";

const validateForm = () => {
  const lastName = document.getElementById("last__name");
  const email = document.getElementById("user__email");
  const password = document.getElementById("user__password");
  const confirmPassword = document.getElementById("user__confirm_password");
  const phone = document.getElementById("user__phone__number");
  const errorTag = document.getElementById("signup__error");
  const checkbox = document.getElementById("tnc__checkbox");

  // hides all error related designing stuff
  errorTag.style.display = "none";
  lastName.classList.remove("signup__form__error__input");
  email.classList.remove("signup__form__error__input");
  password.classList.remove("signup__form__error__input");
  confirmPassword.classList.remove("signup__form__error__input");
  phone.classList.remove("signup__form__error__input");

  if (lastName.value.trim() === "") {
    errorTag.style.display = "block";
    errorTag.innerHTML = "Please enter Last name";
    lastName.classList.add("signup__form__error__input");
    return;
  }

  if (
    email.value.trim() === "" ||
    !email.value.trim().match(emailFormatCheckRegex)
  ) {
    errorTag.style.display = "block";
    errorTag.innerHTML = "Please enter valid email address";
    email.classList.add("signup__form__error__input");
    return;
  }

  if (
    password.value.trim() === "" ||
    !password.value.trim().match(passwordFormatCheckRegex)
  ) {
    errorTag.style.display = "block";
    errorTag.innerHTML =
      "Your password should contain atleast 8 characters, one special character, one lowercase and one uppercase letter";
    password.classList.add("signup__form__error__input");
    return;
  }

  if (
    confirmPassword.value.trim() === "" ||
    !confirmPassword.value.trim().match(passwordFormatCheckRegex)
  ) {
    errorTag.style.display = "block";
    errorTag.innerHTML =
      "Your password should contain atleast 8 characters, one special character, one lowercase and one uppercase letter";
    confirmPassword.classList.add("signup__form__error__input");
    return;
  }

  if (password.value.trim() !== confirmPassword.value.trim()) {
    errorTag.style.display = "block";
    errorTag.innerHTML = "Passwords mismatch";
    password.classList.add("signup__form__error__input");
    confirmPassword.classList.add("signup__form__error__input");
    return;
  }

  if (
    phone.value.trim() === "" ||
    !phone.value.trim().match(phoneFormatCheckRegex)
  ) {
    errorTag.style.display = "block";
    errorTag.innerHTML = "Enter valid phone number";
    phone.classList.add("signup__form__error__input");
    return;
  }

  if (!checkbox.checked) {
    errorTag.style.display = "block";
    errorTag.innerHTML = "Please agree to Terms & Conditions";
    return;
  }

  return true;
};

const Signup = () => {
  const [signupFormData, setSignupFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [showLoader, setShowLoader] = useState(false);
  const history = useHistory();

  useEffect(() => {
    document.title = "Signup";
  }, []);

  const updateSignupFormInput = (e) => {
    const field = e.target.name;
    const value = e.target.value;

    setSignupFormData((previousData) => {
      return { ...previousData, [field]: value };
    });
  };

  const submitSignupForm = async () => {
    const email = document.getElementById("user__email");
    const errorTag = document.getElementById("signup__error");

    if (validateForm()) {
      setShowLoader(true);

      const response = await axios
        .post("http://localhost:8080/api/v1/signup", signupFormData)
        .then((res) => {
          setShowLoader(false);
          return res.data;
        })
        .catch(() => {
          setShowLoader(false);
          swal(
            "Server error",
            "Unexpected server error occured. Please try again later",
            "error"
          );
        });

      if (response.status === 409) {
        email.classList.add("signup__form__error__input");
        errorTag.style.display = "block";
        errorTag.innerHTML = response.message;
      } else {
        email.classList.remove("signup__form__error__input");
        errorTag.style.display = "none";
        errorTag.innerHTML = "";
        swal("Congratulations", response.message, "success").then(() => {
          setSignupFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            phone: "",
          });
          history.push("/login");
        });
      }
    }
  };

  return (
    <>
      <div className="signup__container">
        <div className="signup__form__container">
          <form className="signup__form">
            <div className="signup__heading__container">
              <h1>Sign up to SPM</h1>
              <p>
                Already have an account? <Link to="/login">Sign in</Link>
              </p>
            </div>
            <div className="name__input__div">
              <input
                className="signup__form__input__field name__input__field"
                type="text"
                name="firstName"
                id="first__name"
                value={signupFormData.firstName}
                onChange={updateSignupFormInput}
                placeholder="First Name"
                autoComplete="none"
              />
              <input
                className="signup__form__input__field"
                type="text"
                name="lastName"
                id="last__name"
                value={signupFormData.lastName}
                onChange={updateSignupFormInput}
                placeholder="Last Name"
                autoComplete="none"
              />
            </div>
            <input
              className="signup__form__input__field"
              type="email"
              name="email"
              id="user__email"
              value={signupFormData.email}
              onChange={updateSignupFormInput}
              placeholder="Enter Email-id"
              autoComplete="none"
            />

            <input
              className="signup__form__input__field"
              type="password"
              name="password"
              id="user__password"
              value={signupFormData.password}
              onChange={updateSignupFormInput}
              placeholder="Enter Password"
            />

            <input
              className="signup__form__input__field"
              type="password"
              name="confirmPassword"
              id="user__confirm_password"
              value={signupFormData.confirmPassword}
              onChange={updateSignupFormInput}
              placeholder="Confirm Password"
            />

            <input
              className="signup__form__input__field"
              type="tel"
              name="phone"
              id="user__phone__number"
              value={signupFormData.phone}
              onChange={updateSignupFormInput}
              placeholder="Enter Phone Number"
              autoComplete="none"
            />

            <div className="tnc__container">
              <input type="checkbox" id="tnc__checkbox" name="tnc__checkbox" />
              <label htmlFor="tnc__checkbox">
                I accept all&nbsp;
                <Link to="/terms-and-conditions">Terms & Conditions</Link>
              </label>
            </div>

            <div className="signup__btn__container">
              <p className="signup__error" id="signup__error">
                This is the error of the sign up form
              </p>
              <button
                type="button"
                className="signup__btn"
                onClick={submitSignupForm}
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>

      <Loader display={showLoader} />
    </>
  );
};

export default Signup;
