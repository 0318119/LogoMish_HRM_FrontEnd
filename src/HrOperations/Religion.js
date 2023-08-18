import React from "react";
import Header from "../components/Includes/Header";
import ReligionList from "./components/ReligionList";
const HRReligion = () => {
    return (
        <>
            <div>
                <Header />
            </div>
            <div className="mt-5">
                <ReligionList />
            </div>
        </>
    );
};

export default HRReligion;
