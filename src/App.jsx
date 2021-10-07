import React from "react";
import { Switch, Route } from "react-router-dom";
import NavigationBar from "./component/NavigationBar";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Error404 from "./component/Error404";
import HomePage from "./pages/HomePage";
import useUser from "./hooks/useUser";

const App = () => {
  const { getUser } = useUser();

  return (
    <>
      <NavigationBar user={getUser() !== null} />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>

        <Route path="/login" exact>
          <LoginPage />
        </Route>

        <Route path="/signup" exact>
          <SignupPage />
        </Route>

        <Route>
          <Error404 />
        </Route>
      </Switch>
    </>
  );
};

export default App;
