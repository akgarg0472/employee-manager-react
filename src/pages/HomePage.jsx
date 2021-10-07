import React, { useEffect } from "react";
import useUser from "../hooks/useUser";

const HomePage = () => {
  const { getUser, removeUser } = useUser();

  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <>
      <h1>This is home page</h1>
      <button
        style={{
          display: getUser() === null ? "none" : "inherit",
        }}
        onClick={() => {
          removeUser();
        }}
      >
        Logout
      </button>
    </>
  );
};

export default HomePage;
