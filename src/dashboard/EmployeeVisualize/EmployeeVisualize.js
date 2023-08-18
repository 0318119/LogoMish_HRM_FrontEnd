import React from "react";
import "./employeeVisualize.css";
import EmployeeAttendanceVisualizeChart from "../chart/EmployeAttendanceVisualizeChart";
import { BiLineChart as Dashboard_ico } from "react-icons/bi";

const EmployeeVisualize = (Data) => {
  return (
    <div className="container1">
      <div className="row ChartRow  mt-1">
        <div className="d-flex border">
          <div className="Employee_ChartHeader">
            <span>
              <Dashboard_ico className="Dashboard_ico" /> EMPLOYEE ATTENDANCE
              VISUALIZATION
            </span>
            <select name="" id="">
              <option value="">Sammad(6516)</option>
              <option value="">2</option>
              <option value="">3</option>
              <option value="">4</option>
            </select>
          </div>
        </div>
        <div className="EmployeeAttendanceVisualizeChart">
          <EmployeeAttendanceVisualizeChart />
        </div>
        <div className="Employee_tableMain">
          <table className="table">
            <thead className="Eployee_tableHeading">
              <tr>
                <th>{Data.Hname}</th>
                <th>{Data.Hname1}</th>
                <th>{Data.Hname2}</th>
                <th>{Data.Hname3}</th>
                <th>{Data.Hname4}</th>
              </tr>
            </thead>
            <tbody className="tablebody">
              <tr>
                <td>{Data.col1}</td>
                <td>{Data.col2}</td>
                <td>{Data.col3}</td>
                <td>{Data.col4}</td>
                <td>{Data.col5}</td>
              </tr>
              <tr>
                <td>{Data.col1}</td>
                <td>{Data.col2}</td>
                <td>{Data.col3}</td>
                <td>{Data.col4}</td>
                <td>{Data.col5}</td>
              </tr>
              <tr>
                <td>{Data.col1}</td>
                <td>{Data.col2}</td>
                <td>{Data.col3}</td>
                <td>{Data.col4}</td>
                <td>{Data.col5}</td>
              </tr>
              <tr>
                <td>{Data.col1}</td>
                <td>{Data.col2}</td>
                <td>{Data.col3}</td>
                <td>{Data.col4}</td>
                <td>{Data.col5}</td>
              </tr>
              <tr>
                <td>{Data.col1}</td>
                <td>{Data.col2}</td>
                <td>{Data.col3}</td>
                <td>{Data.col4}</td>
                <td>{Data.col5}</td>
              </tr>
              <tr>
                <td>{Data.col1}</td>
                <td>{Data.col2}</td>
                <td>{Data.col3}</td>
                <td>{Data.col4}</td>
                <td>{Data.col5}</td>
              </tr>
              <tr>
                <td>{Data.col1}</td>
                <td>{Data.col2}</td>
                <td>{Data.col3}</td>
                <td>{Data.col4}</td>
                <td>{Data.col5}</td>
              </tr>
              <tr>
                <td>{Data.col1}</td>
                <td>{Data.col2}</td>
                <td>{Data.col3}</td>
                <td>{Data.col4}</td>
                <td>{Data.col5}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeVisualize;
