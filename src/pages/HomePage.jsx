import React, { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <>
      <h1>This is home page</h1>
    </>
  );
};

export default HomePage;
