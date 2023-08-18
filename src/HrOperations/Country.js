import React from "react";
import Header from "../components/Includes/Header";
import CountriesList from "./components/CountriesList";

const Country = () => {
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="mt-5">
        <CountriesList />
      </div>
    </>
  );
};

export default Country;
