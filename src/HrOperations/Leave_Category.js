import React from "react";
import Header from "../components/Includes/Header";
import LeaveCatLists from "./components/LeaveCatLists";
const HRLeaveCatList = () => {
    return (
        <>
            <div>
                <Header />
            </div>
            <div className="mt-5">
                <LeaveCatLists />
            </div>
        </>
    );
};

export default HRLeaveCatList;
