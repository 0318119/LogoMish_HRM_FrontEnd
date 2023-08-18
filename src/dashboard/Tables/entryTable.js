import React, { useState } from "react";
import "../assets/css/tables.css";
import { BsClock as Time_ico } from "react-icons/bs";
import { BsFillCalendarCheckFill as Calender_ico } from "react-icons/bs";

const EntryTable = (Data) => {
  const [tab, setTab] = useState(true)
  const [tab2, setTab2] = useState(false)
  const handleTab =  () => {
     setTab2(false)
     setTab(true)
  }
   const handleTab2 = () => {
     setTab2(true);
     setTab(false);
   };
  return (
    <>
      <div className="TableContainer">
        <div className="d-flex justify-content-between TableHeaderContainer">
          <span className="d-flex align-items-center" onClick={handleTab}>
            <Time_ico /> <p className="m-1">MISSING ENTRY</p>
          </span>
          <span className="d-flex align-items-center" onClick={handleTab2}>
            <Calender_ico /> <p className="m-1">ABSENT ENTRY</p>
          </span>
        </div>
        {tab ? (
          <div className="tableMain">
            <table className="table">
              <thead className="tableHeading">
                <tr>
                  <th>{Data.Hname}</th>
                  <th>{Data.Hname1}</th>
                  <th>{Data.Hname2}</th>
                  <th>{Data.Hname3}</th>
                </tr>
              </thead>
              <tbody className="tablebody mt-3q">
                <tr>
                  <td>{Data.col1}</td>
                  <td>{Data.col2}</td>
                  <td>{Data.col3}</td>
                  <td>{Data.col4}</td>
                </tr>
                <tr>
                  <td>{Data.col1}</td>
                  <td>{Data.col2}</td>
                  <td>{Data.col3}</td>
                  <td>{Data.col4}</td>
                </tr>
                <tr>
                  <td>{Data.col1}</td>
                  <td>{Data.col2}</td>
                  <td>{Data.col3}</td>
                  <td>{Data.col4}</td>
                </tr>
                <tr>
                  <td>{Data.col1}</td>
                  <td>{Data.col2}</td>
                  <td>{Data.col3}</td>
                  <td>{Data.col4}</td>
                </tr>
                <tr>
                  <td>{Data.col1}</td>
                  <td>{Data.col2}</td>
                  <td>{Data.col3}</td>
                  <td>{Data.col4}</td>
                </tr>
                <tr>
                  <td>{Data.col1}</td>
                  <td>{Data.col2}</td>
                  <td>{Data.col3}</td>
                  <td>{Data.col4}</td>
                </tr>
                <tr>
                  <td>{Data.col1}</td>
                  <td>{Data.col2}</td>
                  <td>{Data.col3}</td>
                  <td>{Data.col4}</td>
                </tr>
                <tr>
                  <td>{Data.col1}</td>
                  <td>{Data.col2}</td>
                  <td>{Data.col3}</td>
                  <td>{Data.col4}</td>
                </tr>
                <tr>
                  <td>{Data.col1}</td>
                  <td>{Data.col2}</td>
                  <td>{Data.col3}</td>
                  <td>{Data.col4}</td>
                </tr>
                <tr>
                  <td>{Data.col1}</td>
                  <td>{Data.col2}</td>
                  <td>{Data.col3}</td>
                  <td>{Data.col4}</td>
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
                <tr>
                  <th>{Data.Hname}2</th>
                  <th>{Data.Hname1}</th>
                  <th>{Data.Hname2}</th>
                  <th>{Data.Hname3}</th>
                </tr>
              </thead>
              <tbody className="tablebody">
                <tr>
                  <td>{Data.col1}</td>
                  <td>{Data.col2}</td>
                  <td>{Data.col3}</td>
                  <td>{Data.col4}</td>
                </tr>
                <tr>
                  <td>{Data.col1}</td>
                  <td>{Data.col2}</td>
                  <td>{Data.col3}</td>
                  <td>{Data.col4}</td>
                </tr>
                <tr>
                  <td>{Data.col1}</td>
                  <td>{Data.col2}</td>
                  <td>{Data.col3}</td>
                  <td>{Data.col4}</td>
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

export default EntryTable;
