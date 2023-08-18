import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/SectionList.css";
import secureLocalStorage from 'react-secure-storage';
const config = require('../../config.json')


function SectionList() {

  var get_refresh_token = secureLocalStorage.getItem("refresh");
  var get_access_token = secureLocalStorage.getItem("access_token");
  const navigate = useNavigate()

  const [getSecList, setGetSecList] = useState([]);
  const [getSecListErr, setSecListErr] = useState(false);


  async function GetEmpSecList() {
    await fetch(
      `${config["baseUrl"]}/employment_section_code/GetEmploymentSectionCode`,
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
            `${config["baseUrl"]}/employment_section_code/GetEmploymentSectionCode`,
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
                setGetSecList(response.data);
                
              }
            })
            .catch((error) => {
              setSecListErr(error.message);
            });
        } else {
          setGetSecList(response.data[0]);
          console.log(response.data, "Response")
        }
      })
      .catch((error) => {
        setSecListErr(error.message);
      });
  }


  useEffect(() => {
    GetEmpSecList()
  }, [])


  return (
    <div className="container-fluid p-2">
      <div className="container-fluid mt-2  SectionListContainer">
        <span className="SectionListHeader py-2">Section List</span>
        <div className="row px-3 mt-2 py-1">
          <div className="col-lg-5 d-flex">
            <input
              type="text"
              className="form-control sectionSearch"
              name=""
              id=""
            />
            <button className="btn btn-dark mx-1">Search</button>
          </div>
        </div>
        <div className="row  p-3">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Code</th>
                <th scope="col">Name</th>
                <th scope="col">Department Name</th>
                <th scope="col">Section Head</th>
                <th scope="col">Sort Key</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {getSecList?.map((items) => {
                return(
                  <tr>
                    <th scope="row">{items.Section_code}</th>
                    <td>{items.Section_name}</td>
                    <td>{items.Dept_code}</td>
                    <td>{items.Section_Head}</td>
                    <td>{items.Sort_key}</td>
                    <td><button className="editBtnTable">Edit</button></td>
                    <td><button className="deleteBtnTable">Delete</button></td>
                  </tr>
                )
              })}
              
            </tbody>
          </table>
        </div>
        <div className="row mt-1 p-3">
          <div className="col-md-12 col-sm-12 p-2">
            <div className="    ">
              <button type="submit" className="btn btn-dark">
                Add New
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SectionList;
