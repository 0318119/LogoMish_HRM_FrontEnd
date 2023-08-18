import React from "react";
import Header from "../components/Includes/Header";
import EmployeeList from "./components/EmployeeCategory";
const HREmployeeCategoryList = () => {
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="mt-5">
        <EmployeeList />
      </div>
    </>
  );
};

export default HREmployeeCategoryList;
