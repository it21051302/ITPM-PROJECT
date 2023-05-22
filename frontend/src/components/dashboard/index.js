import React, { useEffect } from "react";
import NavBar from "../navbar";
import { toast } from "react-toastify";
import ViewUsers from "./viewusers";
const Dashboard = () => {
  useEffect(() => {
    console.log(localStorage.getItem("userId"));
    toast.success("SuccessFully Logged in !!");
  });
  return (
    <div>
      <NavBar></NavBar>
      <ViewUsers></ViewUsers>
    </div>
  );
};
export default Dashboard;
