import React, { useEffect, useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { Link } from "react-router-dom";
import "./NavigationBar.css";

const NavigationBar = (props) => {
  const [showNavigationLinks, setShowNavigationLinks] = useState(true);
  const { width } = useWindowDimensions();

  useEffect(() => {
    setShowNavigationLinks(width <= 768 ? false : true);
  }, [width, props.user]);

  const hideNavigation = () => {
    const element = document.getElementById("toggle__pass__icon");

    if (element) {
      element.style.display = "block";
    }
    setShowNavigationLinks(false);
  };

  const navLinksContainerStyling = {
    display: width > 768 ? "flex" : showNavigationLinks ? "flex" : "none",
  };

  const navCloseButtonStyling = {
    display: width > 768 ? "none" : showNavigationLinks ? "block" : "none",
  };

  return (
    <nav className="my__navbar">
      <div className="nav__container">
        <div className="home__url">
          <Link to="/">EmpMgr</Link>
        </div>

        <i
          className="fas fa-times navbar__close__btn"
          style={navCloseButtonStyling}
          onClick={hideNavigation}
        ></i>

        <div className="nav__links__container" style={navLinksContainerStyling}>
          <ul className="nav__links">
            <li className="nav__link">
              <Link
                className="navbar__nav__url"
                to="/"
                onClick={hideNavigation}
              >
                Home
              </Link>
            </li>

            <li
              className="nav__link"
              style={{
                display: props.user !== false ? "none" : "inherit",
              }}
            >
              <Link
                className="navbar__nav__url"
                to="/login"
                onClick={hideNavigation}
              >
                Login
              </Link>
            </li>

            <li
              className="nav__link"
              style={{
                display: props.user !== false ? "none" : "inherit",
              }}
            >
              <Link
                className="navbar__nav__url"
                to="/signup"
                onClick={hideNavigation}
              >
                Signup
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
