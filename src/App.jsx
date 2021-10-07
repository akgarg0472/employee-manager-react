import React from "react";
import { Switch, Route } from "react-router-dom";
import NavigationBar from "./component/NavigationBar";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Error404 from "./component/Error404";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <>
      <NavigationBar />

      <Switch>
        <Route path="/" component={HomePage} exact></Route>
        <Route path="/login" component={LoginPage} exact></Route>
        <Route path="/signup" component={SignupPage} exact></Route>
        <Route component={Error404}></Route>
      </Switch>
    </>
  );
};

export default App;
