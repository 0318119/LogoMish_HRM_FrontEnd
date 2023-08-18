import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/GradeList.css";
import secureLocalStorage from 'react-secure-storage';
import EmpListForm from "../form/EmpListForm";
const config = require('../../config.json')


function GradeList() {
  const [renderInputs, setrenderInputs] = useState([
    { name: "Grade Name", type: "text" },
    { name: "Grade Abbr", type: "text", },
    { name: "Probation Months", type: "number" },
    { name: "Incentive Hour Rate", type: "number", },
    { name: "Incentive Weekdays Limit Hour", type: "number" },
    { name: "Incentive Saturday Limit Hour", type: "number" },
    { name: "Medical Insurance Amount", type: "number" },
    { name: "Meal Deduction", type: "number" },
    { name: "Sort Key", type: "text" },
    { name: "Litres For Petrol", type: "number" },
    { name: "Insurance Category", type: "text" },
    { name: "Life Insurance Category", type: "text" },
    { name: "Long Name", type: "text" },
    { name: "Job Description Flag", type: "checkbox", value : "check" },
    { name: "Next Promotion Grade", type: "number" },
    { name: "Assigning Critaria For Next Promotion", type: "number" },
    { name: "Overtime Flag", type: "text", },
    { name: "Mobile Amount", type: "number" },
    { name: "Car Amount", type: "number" },

  ])


  var get_refresh_token = secureLocalStorage.getItem("refresh");
  var get_access_token = secureLocalStorage.getItem("access_token");
  const navigate = useNavigate()

  const [getGradeList, setGetgradeList] = useState([]);
  const [getInfoErr, setInfoErr] = useState(false);


  async function GetGradeList() {
    await fetch(
      `${config["baseUrl"]}/grade_code/GetGradeCode`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          accessToken: `Bareer ${get_access_token}`,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then(async (response) => {
        if (response.messsage == "unauthorized") {
          await fetch(
            `${config["baseUrl"]}/grade_code/GetGradeCode`,
            {
              method: "GET",
              headers: {
                "content-type": "application/json",
                refereshToken: `Bareer ${get_refresh_token}`,
              },
            }
          )
            .then((response) => {
              return response.json();
            })
            .then((response) => {
              if (response.messsage == "timeout error") {
                navigate("/");
              } else {
                secureLocalStorage.setItem("refresh", response.referesh_token);
                secureLocalStorage.setItem(
                  "access_token",
                  response.access_token
                );
                setGetgradeList(response.data[0]);

              }
            })
            .catch((error) => {
              setInfoErr(error.message);
            });
        } else {
          setGetgradeList(response.data[0]);
          console.log(response.data[0], "Response")
        }
      })
      .catch((error) => {
        setInfoErr(error.message);
      });
  }


  useEffect(() => {
    GetGradeList()
  }, [])


  return (
    <div className="container-fluid p-3">
      <div className="container-fluid mt-2  GradeListContainer">
        <span className="GradeListHeader py-2">Grade Centers List</span>
        <div className="row mt-3 px-2 GradeListRaw">
          <div className="ResTable">
          <table className="table table-striped ">
            <thead>
              <tr className="GradeTr">
                <th scope="col">Code</th>
                <th scope="col">Name</th>
                <th scope="col">Abbreviation</th>
                <th scope="col">Probation(Months)</th>
                <th scope="col">Incentive Rate</th>
                <th scope="col">Incentive Weekdays Limit (Hours)</th>
                <th scope="col">Incentive Saturday Limit (Hours)</th>
                <th scope="col">Medical Insurance Amount</th>
                <th scope="col">Meal Deduction Amount</th>
                <th scope="col">Petrol</th>
                <th scope="col">Next Promotion Required Grade</th>
                <th scope="col">Next Promotion Required Criteria</th>
                <th scope="col">Sort Key</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
                {getGradeList?.map((items) => {
                  return(
                    <tr>
                      <th scope="row">{items.Grade_code}</th>
                      <td>{items.Grade_name}</td>
                      <td>{items.Grade_abbr}</td>
                      <td>{items.Probation_Months}</td>
                      <td>{items.Incentive_Hour_Rate}</td>
                      <td>{items.Incentive_Weekdays_Limit_Hour}</td>
                      <td>{items.Incentive_Saturday_Limit_Hour}</td>
                      <td>{items.Medical_Insurance_Amount}</td>
                      <td>{items.Meal_Deduction}</td>
                      <td>{items.Litres_for_Petrol}</td>
                      <td>{items.next_promotion_grade}</td>
                      <td>{items.Assigning_Critaria_For_Next_Promotion}</td>
                      <td>{items.Sort_key}</td>
                      <td>
                        <button className="editBtnTable">Edit</button>
                      </td>
                      <td>
                        <button className="deleteBtnTable">Delete</button>
                      </td>
                    </tr>
                  )
                 
                })}
              
            </tbody>
          </table>
          </div>
        </div>
        <div className="row mt-1 p-3">
          <div className="col-md-12 col-sm-12 p-2">
            <div className="    ">
              <Link type="submit" className='btn btn-dark' to={'/EmpListForm'}
                onClick={() => {
                  sessionStorage.setItem("FormData", JSON.stringify(renderInputs))
                  sessionStorage.setItem("whichForm", "CreateGradeList")
                }}
              >Add New</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GradeList;
