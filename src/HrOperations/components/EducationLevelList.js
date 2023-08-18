import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/EducationLevelList.css";
import secureLocalStorage from 'react-secure-storage';
import EmpListForm from "../form/EmpListForm";
import { useSelector, useDispatch } from 'react-redux';
import { fetchApiData  } from '../../redux/slices/GetSlice';
const config = require('../../config.json')


function EducationLevelList() {
  const [renderInputs, setrenderInputs] = useState([
    { name: "Education Level Name", type: "text" },
    { name: "Education Level Abbrivation", type: "text", },
    { name: "Sort Key", type: "text", }, 
  ])


  var get_refresh_token = secureLocalStorage.getItem("refresh");
  var get_access_token = secureLocalStorage.getItem("access_token");
  const navigate = useNavigate()

  const [getEduLevel, setGetEduLevel] = useState([]);
  const [getInfoErr, setInfoErr] = useState(false);
  const dispatch = useDispatch();
  const getData = useSelector((state) => state.getData);
  const apiStatus = useSelector((state) => state.getData.status);
  const getDataError = useSelector((state) => state.getData.error);



  async function GetEduLevel() {
    await fetch(
      `${config["baseUrl"]}/educationlevel/GetEducationLevel`,
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
            `${config["baseUrl"]}/educationlevel/GetEducationLevel`,
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
                setGetEduLevel(response.data[0]);

              }
            })
            .catch((error) => {
              setInfoErr(error.message);
            });
        } else {
          setGetEduLevel(response.data[0]);
          console.log(response.data[0], "Response")
        }
      })
      .catch((error) => {
        setInfoErr(error.message);
      });
  }


  // useEffect(() => {
  //   GetEduLevel()
  // }, [])
  const API_URL = "/educationlevel/GetEducationLevel"
  console.log("educationlevel",getData)
  useEffect(() => {
    dispatch(fetchApiData(API_URL));
  }, [dispatch]);





  return (
    <div className="container-fluid p-2">
      <div className="container-fluid mt-2  EducationLevelListContainer">
        <span className="EducationLevelListHeader py-2">Education Level List</span>
        <ul className="p-0 mx-2 mt-2">
            {getDataError == "Fetched" ? "" : <li className={`alert alert-warning` + " " + "mt-1"}>{`${getDataError}`}</li>}
        </ul>
        <div className="row  p-3">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Code</th>
                <th scope="col">Education Level Name</th>
                <th scope="col">Education Level Abbrivation</th>
                <th scope="col">Sort Key</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {apiStatus == "loading" && (
                <div
                  className="d-flex justify-content-center pt-2 w-100"
                  style={{ background: "white" }}
                >
                  <div class="spinner-border text-primary" role="status">
                  </div>
                </div>
              )}
              {getData?.data?.data?.[0]?.map((items) => {
                return(
                  <tr>
                    <th scope="row">{items.Edu_level_code}</th>
                    <td>{items.Edu_level_name}</td>
                    <td>{items.Edu_level_abbr}</td>
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
        <div className="row mt-1 p-3">
          <div className="col-md-12 col-sm-12 p-2">
            <div className="    ">
              <Link type="submit" className='btn btn-dark' to={'/EmpListForm'}
                onClick={() => {
                  sessionStorage.setItem("FormData", JSON.stringify(renderInputs))
                  sessionStorage.setItem("whichForm", "CreateEduLevel")
                }}
              >Add New</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EducationLevelList;
