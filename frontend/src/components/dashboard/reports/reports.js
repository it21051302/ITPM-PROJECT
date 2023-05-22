import React from "react";
import RemainFuelReport from "./remainFuelReport";
import TokenReport from "./tokeReport";

const Reports = () => {
  return (
    <div>
      <br></br>
      <div className="row">
        <div className="col-md-6">
          <RemainFuelReport />
        </div>
        <div className="col-md-6">
          <TokenReport />
        </div>
      </div>
    </div>
  );
};
export default Reports;
