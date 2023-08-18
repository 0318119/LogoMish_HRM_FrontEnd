import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/LeaveTypeList.css";
import secureLocalStorage from 'react-secure-storage';
import EmpListForm from "../form/EmpListForm";
const config = require('../../config.json')

function LeaveTypeList() {

    const [renderInputs, setrenderInputs] = useState([
        { name: "Leave Name", type: "text" },
        { name: "Leave Type Abbrivation", type: "text" },
        { name: "Leave Category Code", type: "number" },
        { name: "Start Date", type: "date" },
        { name: "End Date", type: "date" },
        { name: "Annual Credit", type: "number" },
        { name: "Accumulation Limit", type: "number" },
        { name: "Proportionate Flag", type: "checkbox", value: "check" },
        { name: "Advance Days", type: "number" },
        { name: "Minimum Days Per Form", type: "number" },
        { name: "Maximum Days Per Form", type: "number" },
        { name: "Life Times", type: "number" },
        { name: "Religion Code", type: "number" },
        { name: "Increase Leave Code", type: "number" },
        { name: "Join Confirm Flag", type: "checkbox", value: "check" },
        { name: "Balance Check Flag", type: "checkbox", value: "check" },
        { name: "Meal Flag", type: "checkbox", value: "check" },
        { name: "Encashment Flag", type: "checkbox", value: "check" },
        { name: "Without Pay Flag", type: "checkbox", value: "check" },
        { name: "Medical Certificate Flag", type: "checkbox", value: "check" },
        { name: "Medical Certificate Days", type: "number"},
        { name: "Special Approval Flag", type: "checkbox", value: "check" },
        { name: "Special Approval Days", type: "number" },
        { name: "Married Flag", type: "checkbox", value: "check" },
        { name: "Adjustment flag", type: "checkbox", value: "check" },
        { name: "Adjustment Leave Code", type: "number" },
        { name: "Sort Key", type: "text" },
        { name: "On Confirm Flag", type: "checkbox", value: "check" },
        { name: "Days Apply On", type: "checkbox", value: "check" },
        { name: "Sandwich Flag", type: "checkbox", value: "check" },
        { name: "Attachment Flag", type: "checkbox", value: "check" },
        { name: "Attachment Days", type: "number" },
        { name: "HR Entry Stop Flag", type: "checkbox", value: "check" },
        { name: "Repayment Flag", type: "checkbox", value: "check" },
        { name: "Gender Flag", type: "checkbox", value: "check" },
        { name: "Compensatory Flag", type: "checkbox", value: "check" },




        

    ])


    var get_refresh_token = secureLocalStorage.getItem("refresh");
    var get_access_token = secureLocalStorage.getItem("access_token");
    const navigate = useNavigate()

    const [getLeaveType, setGetLeaveType] = useState([]);
    const [getInfoErr, setInfoErr] = useState(false);


    async function GetLeaveType() {
        await fetch(
            `${config["baseUrl"]}/employment_leave_type/GetLeaveType`,
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
                        `${config["baseUrl"]}/employment_leave_type/GetLeaveType`,
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
                                setGetLeaveType(response.data);

                            }
                        })
                        .catch((error) => {
                            setInfoErr(error.message);
                        });
                } else {
                    setGetLeaveType(response.data[0]);
                    console.log(response.data[0], "Response")
                }
            })
            .catch((error) => {
                setInfoErr(error.message);
            });
    }


    useEffect(() => {
        GetLeaveType()
    }, [])  

    return (
        <div className="container-fluid p-2">
            <div className="container-fluid mt-2  LeaveTypeListContainer">
                <span className="LeaveTypeListHeader py-2">Leave Type List</span>
                {/* <div className="row mt-1 p-2">
                    <div className="col-lg-5 d-flex align-items-center">
                        <input type="text" name="" id="" className="form-control LeaveCatListsInput" />
                        <button className="btn btn-dark mx-1">Search</button>
                    </div>
                </div> */}
                <div className="row p-3">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Code</th>
                                <th scope="col"> Name</th>
                                <th scope="col">Encashment Flag</th>
                                <th scope="col">Without Pay Flag</th>
                                <th scope="col">Religion Name</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getLeaveType?.map((items) => {
                                return (
                                    <tr>
                                        <th scope="row">{items.Leave_type_code}</th>
                                        <td>{items.Leave_name}</td>
                                        <td>{items.Encashment_flag}</td>
                                        <td>{items.Without_pay_flag}</td>
                                        <td>{items.Religion_code}</td>
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
                                    sessionStorage.setItem("whichForm", "CreateLeaveType")
                                }}
                            >Add New</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LeaveTypeList;
