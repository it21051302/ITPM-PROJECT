import axios from "axios";
import React, { Fragment, useState } from "react";
import {
  BrowserRouter,
  Redirect,
  Route,
  Router,
  Switch,
  useHistory,
} from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateFuel from "../dashboard/viewusers";

const LoginPage = () => {
  let history = useHistory();
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const LoginButtonOnClick = () => {
    console.log(JSON.stringify(Username));
    console.log(JSON.stringify(Password));
    axios({
      url: "http://fuelreseration-api.atwebpages.com/fuel_station_login.php",
      method: "post",
      data: { email: Username, password: Password },
    }).then((response) => {
      console.log("response", response);
      if (response.data.result == 1) {
        console.log(response.data.id);
        localStorage.setItem("userId", response.data.id);
        localStorage.setItem("name", response.data.name);
        history.push("/Dashboard");
      }
      if (response.data.result == 0) {
        toast.error(response.data.msg);
      }
    });
  };

  return (
    <Fragment>
      <div>
        <br></br>
        <br></br>
        <br></br>

        <h1 style={{ marginLeft: "600px" }}>
          Anti-Queue Fuel Reservation System
        </h1>
        <br></br>
        <img
          src="newlogo.png"
          style={{ marginLeft: "750px", width: "300px" }}
        ></img>
        <br></br>
        <br></br>
        <br></br>
        <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-md-4">
            <form>
              <div className="form-group">
                &nbsp; &nbsp; &nbsp; &nbsp;
                <input
                  className="form-control col-md-8"
                  type="text"
                  placeholder="Username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  name="Username"
                ></input>
                <br></br>
                <input
                  className="form-control col-md-8"
                  placeholder="Password"
                  type="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  name="Password"
                ></input>
              </div>
            </form>
            <div className="row">
              <div className="col-md-2"></div>
              <div className="col-md-6">
                <button
                  onClick={LoginButtonOnClick}
                  className="btn btn-danger col-md-6"
                >
                  LOGIN
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
      <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>
      <div className="row">
        <div className="col-md-5"> </div>
        <div className="col-md-4">All Right Reserved Ⓒ 2022 </div>
        <div className="col-md-4"> </div>
      </div>
    </Fragment>
  );
};
export default LoginPage;
