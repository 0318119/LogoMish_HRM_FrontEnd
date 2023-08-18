import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/CountriesList.css";
import secureLocalStorage from 'react-secure-storage';
import EmpListForm from "../form/EmpListForm";
const config = require('../../config.json')



function CountriesList() {

  const [renderInputs, setrenderInputs] = useState([
    { name: "Country Name", type: "text" },
    { name: "Country Abbrivation", type: "text" },
    { name: "Sort Key", type: "text"},
  ])

  var get_refresh_token = secureLocalStorage.getItem("refresh");
  var get_access_token = secureLocalStorage.getItem("access_token");
  const navigate = useNavigate()

  const [getCountry, setGetCountry] = useState([]);
  const [getInfoErr, setInfoErr] = useState(false);


  async function GetCountryList() {
    await fetch(
      `${config["baseUrl"]}/countries/GetCountries`,
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
            `${config["baseUrl"]}/countries/GetCountries`,
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
                setGetCountry(response.data);

              }
            })
            .catch((error) => {
              setInfoErr(error.message);
            });
        } else {
          setGetCountry(response.data[0]);
          console.log(response.data[0], "Response")
        }
      })
      .catch((error) => {
        setInfoErr(error.message);
      });
  }


  useEffect(() => {
    GetCountryList()
  }, [])

  return (
    <div className="container-fluid p-2">
      <div className="container-fluid mt-2  CountriesListContainer">
        <span className="CountriesListHeader py-2">Countries List</span>
        <div className="row px-3 mt-2 py-1">
          <div className="col-lg-5 d-flex"></div>
        </div>
        <div className="row  p-3">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Code</th>
                <th scope="col">Country Name</th>
                <th scope="col">Country Abbreviation</th>
                <th scope="col">Sort Key</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {getCountry?.map((items) => {
                return(
                  <tr>
                    <th scope="row">{items.Country_Code}</th>
                    <td>{items.Country_Name}</td>
                    <td>{items.Country_Abbr}</td>
                    <td>{items.SortKey}</td>
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
                  sessionStorage.setItem("whichForm", "CreateCountry")
                }}
              >Add New</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountriesList;
