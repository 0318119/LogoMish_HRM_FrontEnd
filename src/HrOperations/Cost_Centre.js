import React from "react";
import Header from "../components/Includes/Header";
import CostList from "./components/CostList";
const HR_CostCentersList = () => {
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="mt-5">
        <CostList />
      </div>
    </>
  );
};

export default HR_CostCentersList;
