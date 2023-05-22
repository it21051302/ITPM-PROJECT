import React, { Fragment, useState } from "react";
import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Reports from "../dashboard/reports/reports";
import UpdateFuel from "../dashboard/viewusers";

const NavBar = () => {
  const [ReportsColor, setReportsColor] = useState("white");
  const [UpdateColor, setUpdateColor] = useState("ActiveBorder");
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link">
                <Link
                  to={"/"}
                  style={{
                    textDecoration: "none",
                    color: UpdateColor,
                    fontWeight: "bolder",
                  }}
                  onClick={() => {
                    setReportsColor("white");
                  }}
                >
                  Sleep Education
                </Link>
                
              </a>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link">
                <Link
                  to={"/Reports"}
                  style={{
                    textDecoration: "none",
                    color: ReportsColor,
                    fontWeight: "bolder",
                  }}
                  onClick={() => {
                    setReportsColor("ActiveBorder");
                  }}
                >
                  Reports
                </Link>
              </a>
            </li> */}
          </ul>
          <form className="form-inline my-2 my-lg-0"></form>
        </div>
      </nav>
      <Switch>
        <Route path="/Reports">
          <Reports />
        </Route>
        <Route path="/UpdateFuel">
          <UpdateFuel />
        </Route>
      </Switch>
    </Router>
  );
};
export default NavBar;
