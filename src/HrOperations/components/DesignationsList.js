import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/DesignationsList.css";
import secureLocalStorage from 'react-secure-storage';
import EmpListForm from "../form/EmpListForm";
const config = require('../../config.json')




function DesignationsList() {

    const [renderInputs, setrenderInputs] = useState([
        { name: "Designation Name", type: "text" },
        { name: "Designation Abbr", type: "text", },
        { name: "Sort key", type: "text" },
        { name: "Job Evaluation Flag", type: "checkbox", value: "Check" },
        { name: "Department Code", type: "number", },
        { name: "Sat Allowance", type: "number", },
        { name: "Eve Allowance", type: "number" },
        { name: "JD Designation Code", type: "number" },
    ])


    var get_refresh_token = secureLocalStorage.getItem("refresh");
    var get_access_token = secureLocalStorage.getItem("access_token");
    const navigate = useNavigate()

    const [getDesignList, setGetDesignList] = useState([]);
    const [getInfoErr, setInfoErr] = useState(false);


    async function GetDesigList() {
        await fetch(
            `${config["baseUrl"]}/employment_desig/GetEmploymentDesignation`,
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
                        `${config["baseUrl"]}/employment_desig/GetEmploymentDesignation`,
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
                                setGetDesignList(response.data[0]);

                            }
                        })
                        .catch((error) => {
                            setInfoErr(error.message);
                        });
                } else {
                    setGetDesignList(response.data[0]);
                    console.log(response.data[0], "Response")
                }
            })
            .catch((error) => {
                setInfoErr(error.message);
            });
    }


    useEffect(() => {
        GetDesigList()
    }, [])
    

    return (
        <div className="container-fluid p-2">
            <div className="container-fluid mt-2  DesignationsListContainer">
                <span className="DesignationsListHeader py-2">Lists</span>
                <div className="row mt-1 p-2">
                    <div className="col-lg-5 d-flex align-items-center">
                        <input type="text" name="" id="" className="form-control DesignationsListInput" />
                        <button className="btn btn-dark mx-1">Search</button>
                    </div>
                </div>
                <div className="row p-3">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Code</th>
                                <th scope="col">Name</th>
                                <th scope="col">Department</th>
                                <th scope="col">Short Key</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getDesignList.map((items) => {
                                return(
                                    <tr>
                                        <th scope="row">{items.Dept_code}</th>
                                        <td>{items.Desig_name}</td>
                                        <td>{items.Desig_code}</td>
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
                        <div className="">
                            <Link type="submit" className='btn btn-dark' to={'/EmpListForm'}
                                onClick={() => {
                                    sessionStorage.setItem("FormData", JSON.stringify(renderInputs))
                                    sessionStorage.setItem("whichForm", "CreateEmpDesignation")
                                }}
                            >Add New</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DesignationsList;
