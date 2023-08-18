import React from "react";
import "../assets/css/tables.css";
import { BsClock as Time_ico } from "react-icons/bs";

function Table(Data) {
  return (
    <>
      <div className="TableContainer">
        <div className="d-flex justify-content-between TableHeaderContainer">
          <span className="d-flex align-items-center">
            <Time_ico /> <p className="m-1">{Data.headerName}</p>
          </span>
        </div>
        <table className="table">
          <thead className="tableHeading">
            
          </thead>
          <tbody className="tablebody">
          
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Table;
