import React from "react";
import Header from "../components/Includes/Header";
import EducationLevelList from "./components/EducationLevelList";
const HR_EducationLevelList = () => {
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="mt-5">
        <EducationLevelList />
      </div>
    </>
  );
};

export default HR_EducationLevelList;
