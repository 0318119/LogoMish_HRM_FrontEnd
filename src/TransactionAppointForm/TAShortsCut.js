import React from "react";
import "./assets/css/TAShortsCut.css";
import { BsFillCheckSquareFill as FormCheck_ico } from "react-icons/bs";
import Header from "../components/Includes/Header";
import  {BsPlus as Plus_ico} from 'react-icons/bs'
import {GiHamburgerMenu as Payslip_ico} from 'react-icons/gi'
 

function TAShortsCut() {
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="container p-2 TaFamliyHeaderText">
        <span>Transaction - Appointment (ShortsCut)</span>
      </div>
      <div className="container mt-2 TaShortsCutFormContainer">
        <span className="TaShortsCutFormHead">
          <Payslip_ico /> Transaction - Appointment
        </span>
        <div className="row d-flex p-3">
          <div className="col-md-4 col-sm-4  p-1 d-flex flex-column justify-content-center align-items-center bg-light">
            <span className="TaShortCutIco">
              <Plus_ico />
            </span>
            <span className="TaShortCuttext">Leave</span>
          </div>
          <div className="col-md-4 col-sm-4 p-1 d-flex flex-column justify-content-center align-items-center bg-light">
            <span className="TaShortCutIco">
              <Payslip_ico />
            </span>
            <span className="TaShortCuttext">Payslip</span>
          </div>
          <div className="col-md-4 col-sm-4 p-1 d-flex flex-column justify-content-center align-items-center bg-light">
            <span className="TaShortCutIco">
              <Payslip_ico />
            </span>
            <span className="TaShortCuttext">Tax liability</span>
          </div>
        </div>
      </div>
      <div className="container mt-2 TaShortsCutFormContainer">
        <span className="TaShortsCutFormHead">
          <Payslip_ico /> Transaction - Appointment
        </span>
        <div className="row d-flex p-3">
          <span>Tasks</span>
        </div>
      </div>
    </>
  );
}

export default TAShortsCut;
