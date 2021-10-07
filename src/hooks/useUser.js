import { useEffect, useState } from "react";

const useUser = () => {
  useEffect(() => {
    if (localStorage.getItem("auth__user") === null) {
      localStorage.setItem("auth__user", null);
    }
  }, []);

  const [authenticatedUser, setauthenticatedUser] = useState(
    JSON.parse(localStorage.getItem("auth__user"))
  );

  const setUser = (props) => {
    if (authenticatedUser === null) {
      const user = JSON.stringify(props);
      localStorage.setItem("auth__user", user);
      setauthenticatedUser(JSON.parse(localStorage.getItem("auth__user")));
    }

    return authenticatedUser;
  };

  const getUser = () => {
    return authenticatedUser;
  };

  return { setUser, getUser };
};

export default useUser;
