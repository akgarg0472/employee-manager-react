import React, { useEffect } from "react";
import useUser from "../hooks/useUser";
import axios from "axios";

const HomePage = () => {
  const { getUser, removeUser } = useUser();

  useEffect(() => {
    document.title = "Home";
  }, []);

  const getEmployees = async () => {
    if (getUser() !== null) {
      const res = await axios
        .get("http://localhost:8080/api/v1/user/employees", {
          headers: {
            Authorization: `Bearer ${getUser().auth__token}`,
            userId: `${getUser().auth_userId}`,
          },
        })
        .then((res) => res)
        .then((res) => (res !== null ? res.data.payload : null))
        .catch((err) => console.log(err));
      res === null ? alert("no auth") : console.log(res);
    } else {
      alert("pls login to continue");
    }
  };

  return (
    <>
      <h1>This is home page</h1>
      <br />
      <br />

      <button
        onClick={() => {
          getEmployees();
        }}
      >
        Show employees
      </button>
    </>
  );
};

export default HomePage;
