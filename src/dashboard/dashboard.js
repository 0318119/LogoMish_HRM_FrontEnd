import React, {  useState } from "react";
import Header from "../components/Includes/Header";
import  Tabs from '../dashboard/tabs/tabs'
import '../dashboard/assets/css/dashboard.css'
import Attendancechart from '../dashboard/chart/chart';




  
const Dashboard = (props) => {
     const tabs = [
       { title: "Dashboard", content: <Attendancechart  /> },
       { title: "Attendance Dashboard", content: "Attendance Dashboard" },
       { title: "Payroll Dashboard", content: "Payroll" },
       { title: "Recruitment Dashboard", content: "recruitment" },
       { title: "Employee Dashboard", content: "employee" },
     ];
  return (
    <div className="Dashboard">
        <Header />
        <Tabs tabs={tabs} />
    </div>
  );
};

export default Dashboard;
