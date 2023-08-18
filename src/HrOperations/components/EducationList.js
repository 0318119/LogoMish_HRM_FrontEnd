import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/EducationList.css";
import secureLocalStorage from 'react-secure-storage';
import EmpListForm from "../form/EmpListForm";
const config = require('../../config.json')

function EducationList() {
    const [renderInputs, setrenderInputs] = useState([
        { name: "Education Name", type: "text" },
        { name: "Education Abbrivation", type: "text", },
        { name: "Education Level Code", type: "number", },
        { name: "Sort key", type: "text" },
    ])

    // console.log("renderInputs", renderInputs)
    var get_refresh_token = secureLocalStorage.getItem("refresh");
    var get_access_token = secureLocalStorage.getItem("access_token");
    const navigate = useNavigate()

    const [getEducation, setGetEducation] = useState([]);
    const [getInfoErr, setInfoErr] = useState(false);


    async function GetEmpList() {
        await fetch(
            `${config["baseUrl"]}/education_code/GetEducation`,
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
                        `${config["baseUrl"]}/education_code/GetEducation`,
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
                                setGetEducation(response.data);

                            }
                        })
                        .catch((error) => {
                            setInfoErr(error.message);
                        });
                } else {
                    setGetEducation(response.data[0]);
                    console.log(response.data, "Response")
                }
            })
            .catch((error) => {
                setInfoErr(error.message);
            });
    }


    useEffect(() => {
        GetEmpList()
    }, [])

    return (
        <div className="container-fluid p-2">
            <div className="container-fluid mt-2  EducationListContainer">
                <span className="EducationListHeader py-2">Education List</span>
                <div className="row mt-1 p-2">
                    <div className="col-lg-5 d-flex align-items-center">
                        <input type="text" name="" id="" className="form-control eductionListInput" />
                        <button className="btn btn-dark mx-1">Search</button>
                    </div>
                </div>
                <div className="row p-3">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Code</th>
                                <th scope="col">Name</th>
                                <th scope="col">Education Level Name</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getEducation?.map((items) => {
                                return(
                                    <tr>
                                        <th scope="row">{items.Edu_code}</th>
                                        <td>{items.Edu_name}</td>
                                        <td>{items.Edu_abbr}</td>
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
                                    sessionStorage.setItem("whichForm", "CreateEducation")
                                }}
                            >Add New</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EducationList;
