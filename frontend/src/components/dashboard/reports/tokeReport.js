import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import "../../../assets/style.css";
const TokenReport = () => {
  const [Dataset, setDataset] = useState("");
  const [UserId, setUserId] = useState("");
  const [SelectedDate, setSelectedDate] = useState("");
  const APIModel = { id: parseInt(UserId), date: SelectedDate };
  const getReportDetails = () => {
    console.log(APIModel);
    axios({
      url: "http://fuelreseration-api.atwebpages.com/get_tokenbymonth.php",
      method: "post",
      data: APIModel,
    }).then((response) => {
      setDataset(response.data);
      console.log("Rep", response);
    });
  };
  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
  });
  return (
    <div id="main">
      <div className="card">
        <div className="card-header">Month End Token Report</div>
        <div className="card-body">
          <div className="row">
            <br></br>
            <div className="col-md-2">Date:</div>
            <div className="col-md-7">
              <input
                className="form-control col-md-6"
                type={"date"}
                onChange={(e) => {
                  setSelectedDate(
                    moment(e.target.valueAsDate).format("yyyy-MM").toString()
                  );
                }}
              />
            </div>
          </div>
          <br></br>
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-8">
              <button className="btn btn-primary" onClick={getReportDetails}>
                Genarate Report
              </button>
            </div>
          </div>
          <br></br>
          <table id="customers">
            {Dataset && (
              <tr>
                <th>Token Number</th>
                <th>Customer Name</th>
                <th>Customer Phone</th>
                <th>Fuel Capacity</th>
                <th>Vehicle Type</th>
                <th>Date Issued</th>
                <th>Status</th>
              </tr>
            )}

            {Dataset &&
              Dataset.map((eventItem, index) => {
                let x;
                if (eventItem.status == 0) {
                  console.log(eventItem.status);
                  x = "Pending";
                }
                if (eventItem.status == 1) {
                  console.log(eventItem.status);
                  x = "Done";
                }
                if (eventItem.status == 2) {
                  console.log(eventItem.status);
                  x = "Canceled";
                }
                // console.log(eventItem.status);
                // console.log(x);
                return (
                  <tr key={index}>
                    <td>{eventItem.token_id}</td>
                    <td>{eventItem.customer_name}</td>
                    <td>{eventItem.customer_phone}</td>
                    <td>{eventItem.fuel_capacity}L</td>
                    <td>{eventItem.vehicle_type}</td>
                    <td>{eventItem.date_issued}</td>
                    <td>{x}</td>
                  </tr>
                );
              })}
          </table>
        </div>
      </div>
    </div>
  );
};
export default TokenReport;
