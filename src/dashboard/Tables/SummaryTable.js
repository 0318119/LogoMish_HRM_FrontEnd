import React, { useState } from "react";
import "../assets/css/tables.css";
import {MdSummarize as Summary_ico} from 'react-icons/md'
const SummaryTable = (Data) => {


  return (
    <>
      <div className="TableContainer">
        <div className="d-flex justify-content-between TableHeaderContainer">
          <span className="d-flex align-items-center">
            <Summary_ico /> <p className="m-1">LEAVE SUMMARY</p>
          </span>
        </div>
        <div className="tableMain">
        <table className="table">
          <thead className="tableHeading">
            <tr className="d-flex justify-content-between w-100">
              <th>{Data.Hname}</th>
              <th>{Data.Hname3}</th>
            </tr>
          </thead>
          <tbody className="tablebody">
            <tr className="d-flex justify-content-between">
              <td>{Data.col1}</td>
              <td className="RequestTableValue">{Data.col4}</td>
            </tr>
            <tr className="d-flex justify-content-between">
              <td>{Data.col1}</td>
              <td className="RequestTableValue">{Data.col4}</td>
            </tr>
            <tr className="d-flex justify-content-between">
              <td>{Data.col1}</td>
              <td className="RequestTableValue">{Data.col4}</td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    </>
  );
};

export default SummaryTable;
