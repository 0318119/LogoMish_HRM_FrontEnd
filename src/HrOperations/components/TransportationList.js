import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/TransportationList.css";
import secureLocalStorage from 'react-secure-storage';
const config = require('../../config.json')

function TransportationList() {
    const [renderInputs, setrenderInputs] = useState([
        { name: "Transport Name", type: "text" },
        { name: "Transport Abbrivation", type: "text", },
        { name: "Sort Key", type: "text" },
        { name: "Area Code", type: "number", },
        { name: "Region Code", type: "number" },
        { name: "Location Code", type: "number" },
        { name: "Leave Head Office Treatment Flag", type: "checkbox", value: "Check" },
        { name: "Head Office Region Flag", type: "checkbox", value: "Check" },
    ])

    var get_refresh_token = secureLocalStorage.getItem("refresh");
    var get_access_token = secureLocalStorage.getItem("access_token");
    const navigate = useNavigate()

    const [GetTransportList, setGetTransportList] = useState([]);
    const [GetTransportListErr, setGetTransportListErr] = useState(false);


    async function GetDepartmentList() {
        await fetch(
            `${config["baseUrl"]}/transportation/GetTransportation`,
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
                        `${config["baseUrl"]}/transportation/GetTransportation`,
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
                                setGetTransportList(response.data);

                            }
                        })
                        .catch((error) => {
                            setGetTransportListErr(error.message);
                        });
                } else {
                    setGetTransportList(response.data[0]);
                    console.log(response.data, "Response")
                }
            })
            .catch((error) => {
                setGetTransportListErr(error.message);
            });
    }


    useEffect(() => {
        GetDepartmentList()
    }, [])
 
    
    return (
        <div className="container-fluid p-2">
            <div className="container-fluid mt-2  TransportationListContainer">
                <span className="TransportationListHeader py-2">Transportations List</span>
                {/* <div className="row mt-1 p-2">
                    <div className="col-lg-5 d-flex align-items-center">
                        <input type="text" name="" id="" className="form-control PreEmployerListInput" />
                        <button className="btn btn-dark mx-1">Search</button>
                    </div>
                </div> */}
                <div className="row p-3">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Code</th>
                                <th scope="col">Transportation Name</th>
                                <th scope="col">Abbreviation</th>
                                <th scope="col">Short Key</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {GetTransportList?.map((items) => {
                                return(
                                    <tr>
                                        <th scope="row">{items.Transport_code}</th>
                                        <td>{items.Transport_name}</td>
                                        <td>{items.Transport_abbr}</td>
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
                                    sessionStorage.setItem("whichForm", "CreateTransportList")
                                }}
                            >Add New</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TransportationList;
