import React, { useEffect, useState } from "react";
import "./assets/css/transactionAppointment.css";
import { BsCheckSquare as Check_ico } from "react-icons/bs";
import { BsFillPersonFill as Person_ico } from "react-icons/bs";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import PrintIcon from "@mui/icons-material/Print";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
const config = require("../config.json");

function TransactionAppointmentCom() {
  var get_refresh_token = secureLocalStorage.getItem("refresh");
  var get_access_token = secureLocalStorage.getItem("access_token");
  const navigate = useNavigate();
  const [getAppointStatus, setgetAppointStatus] = useState([]);
  const [getAppointStatusErr, setgetAppointStatusErr] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dataLoader, setDataLoader] = useState(false);

  async function getAppointStatusCall() {
    await fetch(
      `${config["baseUrl"]}/appointments/GetTranAppointmentsByCompanyCode`,
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
            `${config["baseUrl"]}/appointments/GetTranAppointmentsByCompanyCode`,
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
                setgetAppointStatus(response.data[0]);
                setDataLoader(true);
              }
            })
            .catch((error) => {
              setgetAppointStatusErr(error.message);
            })
            .finally(() => {
              setLoading(false);
            });
        } else {
          setgetAppointStatus(response.data[0]);
          setDataLoader(true);
        }
      })
      .catch((error) => {
        setgetAppointStatusErr(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    getAppointStatusCall();
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col p-3 border-bottom border-white">
            <span className="TAHeading">Transaction - Appointment</span>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 p-3 d-flex TaRes">
            <div className="form-group TransAppointFormGroup">
              <label htmlFor="">Search</label>
              <input type="text" className="from-control" />
              <button>Search</button>
            </div>
            <div className="form-group d-flex ml-2 TransAppointFormGroup">
              <label htmlFor="">Excel Record</label>
              <input type="file" className="from-control TAFile" />
            </div>
            <div className="form-group ml-2 TransAppointFormGroup">
              <button>Excel Upload</button>
              <input type="button" value="Download" />
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid p-3">
        <div className="row TAHeadingRow">
          <div className="col-lg-12  TAPList_Container">
            <span className="TAPlist_Header">
              <Check_ico /> &nbsp; Transaction - Appointment
            </span>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 mt-2 Tatble">
            <table className="w-100 Tatble">
              <thead>
                <tr className="TaLiLIstHeader">
                  <th>Sequence No</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Personal</th>
                  <th>Education</th>
                  <th>Salary</th>
                  <th>Exprience</th>
                  <th>Payroll</th>
                  <th>CheckList</th>
                  <th>Process</th>
                  <th>Family</th>
                  <th>Print</th>
                  <th>Detele</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <div
                    className="d-flex justify-content-center align-items-center w-100"
                    style={{ height: "100px", background: "#d3d3d345" }}
                  >
                    <div class="spinner-border text-primary" role="status">
                      <span class="sr-only"></span>
                    </div>
                  </div>
                )}
                {dataLoader && (
                  <>
                    <span className="m-0 p-0 alert-warning">
                      {getAppointStatusErr ? getAppointStatusErr : false}
                    </span>
                    {getAppointStatus.map((items) => {
                      return (
                        <tr className="TaListBody">
                          <td>
                            {items.Sequence_no ? items.Sequence_no : "Empty"}
                          </td>
                          <td>{items.Emp_name ? items.Emp_name : "Empty"}</td>
                          <td>
                            {items.Status ? items.Status : "Empty"}
                          </td>
                          <td className="text-center">
                            <Link to={`/TAPersonalform?userId=${items.Sequence_no}`}>
                              {" "}
                              <Person_ico className="List_ico" />{" "}
                            </Link>
                          </td>
                          <td className="text-center">
                            <Link
                              to={`/TAEducationForm?userId=${items.Sequence_no}`}
                            >
                              {" "}
                              <LibraryBooksIcon className="List_ico" />{" "}
                            </Link>
                          </td>
                          <td className="text-center">
                            <Link to={`/TASalaryForm?userId=${items.Sequence_no}`}>
                              {" "}
                              <LocalAtmIcon className="List_ico" />
                            </Link>
                          </td>
                          <td className="text-center">
                            <Link
                              to={`/TAExprienceForm?userId=${items.Sequence_no}`}
                            >
                              {" "}
                              <BusinessCenterIcon className="List_ico" />{" "}
                            </Link>
                          </td>
                          <td className="text-center">
                            <Link to={`/TAppointmentMasterPayroll?userId=${items.Sequence_no}`}>
                              <WbSunnyIcon className="List_ico" />
                            </Link>
                          </td>
                          <td className="text-center">
                            <Link to={`/TACheckList?userId=${items.Sequence_no}`} >
                              {" "}
                              <CheckBoxRoundedIcon className="List_ico" />
                            </Link>
                          </td>
                          <td className="text-center">
                            {" "}
                            <Link href="">
                              <SettingsSuggestRoundedIcon className="List_ico" />
                            </Link>
                          </td>
                          <td className="text-center">
                            <Link to={`/TAFamilyForm?userId=${items.Sequence_no}`}>
                              {" "}
                              <Diversity3Icon className="List_ico" />
                            </Link>
                          </td>
                          <td className="text-center">
                            <a href="">
                              {" "}
                              <PrintIcon className="List_ico" />
                            </a>
                          </td>
                          <td className="text-center">
                            <a href="">
                              <DeleteIcon className="List_ico" />
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                )}
              </tbody>
            </table>
          </div>

          <div className="col-12 mt-4 mb-3">
            <Link to='/TAPersonalform' className="TaAddBtn">Add New</Link>
          </div>
        </div>
        <div className="row d-flex"></div>
      </div>
    </>
  );
}

export default TransactionAppointmentCom;
