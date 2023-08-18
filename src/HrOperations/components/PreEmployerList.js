import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/PreEmployerList.css";
import secureLocalStorage from 'react-secure-storage';
import EmpListForm from "../form/EmpListForm";
const config = require('../../config.json')


function PreEmployerList() {

    const [renderInputs, setrenderInputs] = useState([
        { name: "Employee Type", type: "text" },
        { name: "Employee Type Abbrivation", type: "text", },
        { name: "Sort key", type: "text" },
        { name: "Company Code", type: "number", },
        { name: "Retirement Age", type: "number" },
        { name: "Permanant Flag", type: "checkbox", value: "Check" },
        { name: "Company Employee Flag", type: "checkbox", value: "Check" },
        { name: "Probation Month", type: "month" },
        { name: "Change Probation Month", type: "select" },
    ])

    // console.log("renderInputs", renderInputs)
    var get_refresh_token = secureLocalStorage.getItem("refresh");
    var get_access_token = secureLocalStorage.getItem("access_token");
    const navigate = useNavigate()

    const [getPreEmployer, setGetPreEmployer] = useState([]);
    const [getInfoErr, setInfoErr] = useState(false);


    async function GetPreviousEmp() {
        await fetch(
            `${config["baseUrl"]}/employment_type_code/GetEmploymentTypeCode`,
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
                        `${config["baseUrl"]}/employment_type_code/GetEmploymentTypeCode`,
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
                                setGetPreEmployer(response.data);

                            }
                        })
                        .catch((error) => {
                            setInfoErr(error.message);
                        });
                } else {
                    setGetPreEmployer(response.data[0]);
                    console.log(response.data, "Response")
                }
            })
            .catch((error) => {
                setInfoErr(error.message);
            });
    }


    useEffect(() => {
        GetPreviousEmp()
    }, [])

    return (
        <div className="container-fluid p-2">
            <div className="container-fluid mt-2  PreEmployerListContainer">
                <span className="PreEmployerListHeader py-2">Previous Employer List</span>
                <div className="row mt-1 p-2">
                    <div className="col-lg-5 d-flex align-items-center">
                        <input type="text" name="" id="" className="form-control PreEmployerListInput" />
                        <button className="btn btn-dark mx-1">Search</button>
                    </div>
                </div>
                <div className="row p-3">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Code</th>
                                <th scope="col">Name</th>
                                <th scope="col">Industry Flag</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Mark</td>
                                <td><button className="editBtnTable">Edit</button></td>
                                <td><button className="deleteBtnTable">Delete</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="row mt-1 p-3">
                    <div className="col-md-12 col-sm-12 p-2">
                        <div className="">
                            <Link type="submit" className='btn btn-dark' to={'/EmpListForm'}
                                onClick={() => {
                                    sessionStorage.setItem("FormData", JSON.stringify(renderInputs))
                                    sessionStorage.setItem("whichForm", "CreatePreviousEmp")
                                }}
                            >Add New</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PreEmployerList;
