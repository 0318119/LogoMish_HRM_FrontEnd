import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import secureLocalStorage from 'react-secure-storage';
import '../assets/css/DivisionList.css'
const config = require('../../config.json')

function DivisionList() {

    const [renderInputs, setrenderInputs] = useState([
        { name: "Division Name", type: "text" },
        { name: "Division Abbrivation", type: "text" },
        { name: "Division Head", type: "number" },
        { name: "Sort Key", type: "text" },
        { name: "Division Category Code", type: "number" },
    ]) 


    var get_refresh_token = secureLocalStorage.getItem("refresh");
    var get_access_token = secureLocalStorage.getItem("access_token");
    const navigate = useNavigate()

    const [getDivisionList, setGetDivisionList] = useState([]);
    const [getInfoErr, setInfoErr] = useState(false);

    async function GetDivisionList() {
        await fetch(
            `${config["baseUrl"]}/division/GetAllDevisions`,
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
                        `${config["baseUrl"]}/division/GetAllDevisions`,
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
                                setGetDivisionList(response.data[0]);
                            }
                        })
                        .catch((error) => {
                            setInfoErr(error.message);
                        });
                } else {
                    setGetDivisionList(response.data[0]);
                    console.log(response.data, "Response")
                }
            })
            .catch((error) => {
                setInfoErr(error.message);
            });
    }


    useEffect(() => {
        GetDivisionList()
    }, [])

    return (
        <div className="container-fluid p-2">
            <div className="container-fluid mt-2  DivisionListContainer">
                <span className="DivisionListHeader py-2">
                    Division List
                </span>
                <div className="row px-3 mt-2 py-1">
                    <div className="col-lg-5 d-flex">
                        <input type="text" className="form-control divisionSearch" name="" id="" />
                        <button className="btn btn-dark mx-1">Search</button>
                    </div>
                </div>
                <div className="row  p-3">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Divisio Code</th>
                                <th scope="col">Name</th>
                                <th scope="col">Division Head</th>
                                <th scope="col">Short Key</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getDivisionList?.map((items) => {
                                return(
                                    <tr>
                                        <th scope="row">{items.Div_code}</th>
                                        <td>{items.Div_name}</td>
                                        <td>{items.Div_abbr}</td>
                                        <td>{items.Div_Head}</td>
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
                            <Link type="submit" className='btn btn-dark' to={'/EmpListForm'}
                                onClick={() => {
                                    sessionStorage.setItem("FormData", JSON.stringify(renderInputs))
                                    sessionStorage.setItem("whichForm", "CreateDivisions")
                                }}
                            >Add New</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DivisionList;