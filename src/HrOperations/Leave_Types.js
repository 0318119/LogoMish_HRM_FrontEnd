import React from "react";
import Header from "../components/Includes/Header";
import LeaveTypeList from "./components/Leave_Types";
const Leave_Types = () => {
    return (
        <>
            <div>
                <Header />
            </div>
            <div className="mt-5">
                <LeaveTypeList />
            </div>
        </>
    );
};

export default Leave_Types;
