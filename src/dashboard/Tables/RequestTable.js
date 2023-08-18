import React, { useState } from "react";
import "../assets/css/tables.css";
import { BsFillEyeFill as Eye_ico } from "react-icons/bs";
import { BsFolderFill as Folder_ico } from "react-icons/bs";

const RequestTable = (Data) => {
  const [tab, setTab] = useState(true);
  const [tab2, setTab2] = useState(false);
  const handleTab = () => {
    setTab2(false);
    setTab(true);
  };
  const handleTab2 = () => {
    setTab2(true);
    setTab(false);
  };
  return (
    <>
      <div className="TableContainer">
        <div className="d-flex justify-content-between TableHeaderContainer">
          <span className="d-flex align-items-center" onClick={handleTab}>
            <Folder_ico /> <p className="m-1">MY REQUEST</p>
          </span>
          <span className="d-flex align-items-center" onClick={handleTab2}>
            <Eye_ico /> <p className="m-1">MY APPROVALS</p>
          </span>
        </div>
        {tab ? (
          <div className="tableMain">
          <table className="table">
            <thead className="tableHeading">
              <tr className="d-flex justify-content-between w-100">
                <th>{Data.Hname}</th>
                <th>{Data.Hname3}</th>
              </tr>
            </thead>
            <tbody className="tablebody">
              <tr className="d-flex justify-content-between ">
                <td>{Data.col1}</td>
                <td className="RequestTableValue">{Data.col4}</td>
              </tr>
              <tr className="d-flex justify-content-between ">
                <td>{Data.col1}</td>
                <td className="RequestTableValue">{Data.col4}</td>
              </tr>
              <tr className="d-flex justify-content-between ">
                <td>{Data.col1}</td>
                <td className="RequestTableValue">{Data.col4}</td>
              </tr>
            </tbody>
          </table>
          </div>
        ) : (
          ""
        )}
        {tab2 ? (

            <div className="tableMain">
          <table className="table">
            <thead className="tableHeading">
              <tr className="d-flex justify-content-between w-100">
                <th>{Data.Hname}w</th>
                <th>{Data.Hname3}</th>
              </tr>
            </thead>
            <tbody className="tablebody">
              <tr className="d-flex justify-content-between ">
                <td>{Data.col1}</td>
                <td className="RequestTableValue">{Data.col4}</td>
              </tr>
              <tr className="d-flex justify-content-between ">
                <td>{Data.col1}</td>
                <td className="RequestTableValue">{Data.col4}</td>
              </tr>
              <tr className="d-flex justify-content-between ">
                <td>{Data.col1}</td>
                <td className="RequestTableValue">{Data.col4}</td>
              </tr>
            </tbody>
          </table>
            </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default RequestTable;