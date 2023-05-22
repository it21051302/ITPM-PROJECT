import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Dashboard from "./components/dashboard";
import Reports from "./components/dashboard";
import RegisteredUsers from "./components/dashboard/registeredusers";
import ViewUsers from "./components/dashboard/viewusers";
import LoginPage from "./components/others/login";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/Dashboard">
          <Dashboard />
        </Route>
        <Route path="/viewUsers">
          <RegisteredUsers />
        </Route>
        <Route path="/">
          <ViewUsers />
        </Route>
        <Route path="/">
          <LoginPage />
        </Route>
        <Route path="/Reports">
          <Reports />
        </Route>
      </Switch>
    </Router>
  );
};
export default App;
