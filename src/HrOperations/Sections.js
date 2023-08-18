import React from "react";
import Header from "../components/Includes/Header";
import SectionList from "./components/SectionList";
const HRSectionList = () => {
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="mt-5">
        <SectionList />
      </div>
    </>
  );
};

export default HRSectionList;
