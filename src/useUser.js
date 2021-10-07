import { useEffect, useState } from "react";

const useUser = () => {
  useEffect(() => {
    console.log("useEffect of useUser called");
    if (localStorage.getItem("auth__user") === null) {
      const user = {
        auth__userid: "",
        auth__token: "",
        auth__id: "",
      };
      localStorage.setItem("auth__user", JSON.stringify(user));
    }
  }, []);

  const [authenticatedUser, setauthenticatedUser] = useState(
    JSON.parse(localStorage.getItem("auth__user"))
  );

  const setUser = (props) => {
    return authenticatedUser;
  };

  const getUser = () => {
    return JSON.parse(authenticatedUser);
  };

  return { setUser, getUser };
};

export default useUser;
