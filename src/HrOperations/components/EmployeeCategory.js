import React, { useState } from "react";
import "../assets/css/EmployeeCategory.css";
import { Link } from "react-router-dom";
function EmployeeList() {
  const [renderInputs, setrenderInputs] = useState([
    { name: "Employee cat Name", type: "text" },
    { name: "Emp Category abbr", type: "text", },
    { name: "graduity fund percentage", type: "number"},
    { name: "Sort key", type: "text" },
  ])
  return (
    <div className="container-fluid p-2">
      <div className="container-fluid mt-2  EmployeeListContainer">
        <span className="EmployeeListHeader py-2">Employee Category List</span>

        <div className="row  p-3">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Code</th>
                <th scope="col">Employee Level Name</th>
                <th scope="col">Sort key</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>22</td>
                <td>
                  <button className="editBtnTable">Edit</button>
                </td>
                <td>
                  <button className="deleteBtnTable">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="row mt-1 p-3">
          <div className="col-md-12 col-sm-12 p-2">
            <div className="    ">
              <Link  type="submit" className="btn btn-dark"
                to={'/EmpListForm'}
                onClick={() => {
                  sessionStorage.setItem("FormData", JSON.stringify(renderInputs))
                  sessionStorage.setItem("whichForm", "CreateEmpCat")
                }}
              >
                Add New
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeList;
