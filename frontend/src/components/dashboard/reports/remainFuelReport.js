import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import "../../../assets/style.css";
const RemainFuelReport = () => {
  const [UserId, setUserId] = useState("");
  const [Dataset, setDataset] = useState("");

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
  });
  const getFuelCapacities = () => {
    axios({
      url: "http://fuelreseration-api.atwebpages.com/get_Rfuel.php",
      method: "post",
      data: { id: UserId },
    }).then((response) => {
      setDataset(response.data.fuel);
    });
  };
  return (
    <div id="main">
      <div className="card">
        <div className="card-header">Remain Fuel Capacities Report</div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-8">
              <button className="btn btn-primary" onClick={getFuelCapacities}>
                Genarate Report
              </button>
              <br></br> <br></br>
            </div>
          </div>
          <table id="customers">
            {Dataset && (
              <tr>
                <th>Fuel Type</th>
                <th>Fuel Capacity</th>
              </tr>
            )}

            {Dataset &&
              Dataset.map((eventItem, index) => {
                return (
                  <tr key={index}>
                    <td>{eventItem.type}</td>
                    <td>{eventItem.capacity}L</td>
                  </tr>
                );
              })}
          </table>
        </div>
      </div>
    </div>
  );
};
export default RemainFuelReport;
