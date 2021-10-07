import React from "react";
import { Link } from "react-router-dom";
import "./Error404.css";

const Error404 = () => {
  return (
    <>
      <div className="not-found">
        <h1>404</h1>
        <h2>WE ARE SORRY, PAGE NOT FOUND!</h2>
        <p>
          THE PAGE YOU ARE LOOKING FOR MIGHT HAVE BEEN REMOVED OR ITS NAME HAS
          BEEN CHANGED <br />
          OR IT IS TEMPORARY UNAVAILABLE
        </p>

        {/* change to Link */}
        <a to="/" className="back-home-btn">
          Back to Home
        </a>
      </div>
    </>
  );
};

export default Error404;
