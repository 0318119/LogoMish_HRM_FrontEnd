import React from "react";
import Header from "../components/Includes/Header";
import TransportationList from "./components/TransportationList";
const HRTransportation = () => {
    return (
        <>
            <div>
                <Header />
            </div>
            <div className="mt-5">
                <TransportationList />
            </div>
        </>
    );
};

export default HRTransportation;
