import React, { Fragment, useState } from "react";
import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Reports from "../dashboard/reports/reports";
import UpdateFuel from "../dashboard/viewusers";

const NavBar = () => {
  const [ReportsColor, setReportsColor] = useState("white");
  const [UpdateColor, setUpdateColor] = useState("ActiveBorder");
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark "
      style={{ background: "#333 " }}
    >
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
              <a
                href="http://localhost:3000/"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontWeight: "bolder",
                }}
                onClick={() => {
                  setReportsColor("white");
                }}
              >
                Sleep Resources
              </a>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link">
              <a
                href="http://localhost:3000/viewUsers"
                style={{
                  textDecoration: "none",
                  color: ReportsColor,
                  fontWeight: "bolder",
                }}
                onClick={() => {
                  setReportsColor("ActiveBorder");
                }}
              >
                View Users
              </a>
            </a>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0"></form>
      </div>
    </nav>
  );
};
export default NavBar;
