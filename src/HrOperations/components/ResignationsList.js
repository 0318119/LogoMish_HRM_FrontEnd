import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/ResignationsList.css";
import secureLocalStorage from 'react-secure-storage';
import EmpListForm from "../form/EmpListForm";
const config = require('../../config.json')

function ResignationsList() {
    const [renderInputs, setrenderInputs] = useState([
        { name: "Resignation Reason", type: "text" },
        { name: "Resignation Abbrivation", type: "text", },
        { name: "Sort Key", type: "text", },
  
    ])

    // console.log("renderInputs", renderInputs)
    var get_refresh_token = secureLocalStorage.getItem("refresh");
    var get_access_token = secureLocalStorage.getItem("access_token");
    const navigate = useNavigate()

    const [getRegList, setGetRegList] = useState([]);
    const [getInfoErr, setInfoErr] = useState(false);


    async function GetRegList() {
        await fetch(
            `${config["baseUrl"]}/employee_resignation/GetEmploymentResignation`,
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
                        `${config["baseUrl"]}/employee_resignation/GetEmploymentResignation`,
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
                                setGetRegList(response.data[0]);
                                console.log(response.data[0], "Response2")

                            }
                        })
                        .catch((error) => {
                            setInfoErr(error.message);
                        });
                } else {
                    setGetRegList(response.data[0]);
                    console.log(response.data[0], "Response")
                }
            })
            .catch((error) => {
                setInfoErr(error.message);
            });
    }


    useEffect(() => {
        GetRegList()
    }, [])

    return (
        <div className="container-fluid p-2">
            <div className="container-fluid mt-2  ResignationsListContainer">
                <span className="ResignationsListHeader py-2">Resignations List</span>
                {/* <div className="row mt-1 p-2">
                    <div className="col-lg-5 d-flex align-items-center">
                        <input type="text" name="" id="" className="form-control ResignationsListInput" />
                        <button className="btn btn-dark mx-1">Search</button>
                    </div>
                </div> */}
                <div className="row p-3">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Code</th>
                                <th scope="col">Resignation Reason</th>
                                <th scope="col">Abbreviation</th>
                                <th scope="col">Short Key</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getRegList?.map((items) => {
                                return(
                            <tr>
                                <th scope="row">{items.Resign_code}</th>
                                <td>{items.Resign_reason}</td>
                                <td>{items.Resign_abbr}</td>
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
                                    sessionStorage.setItem("whichForm", "CreateResignation")
                                }}
                            >Add New</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResignationsList;
