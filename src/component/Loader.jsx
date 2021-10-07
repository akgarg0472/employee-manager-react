import React from "react";
import "./Loader.css";

const Loader = (props) => {
  const { color, display } = props;

  const loaderStyling = {
    borderTopColor: color ? color : "#dc3545",
  };

  const loaderContainerStyling = {
    display: display ? "flex" : "none",
  };

  return (
    <div className="loader__container" style={loaderContainerStyling}>
      <div className="loader" style={loaderStyling}></div>
    </div>
  );
};

export default Loader;
