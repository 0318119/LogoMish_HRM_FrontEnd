import React, { useState } from "react";
import Header from "../components/Includes/Header";
import TransactionAppointmentCom from "../TransactionAppointment/transactionAppointmentCom";

const TransactionAppointmentPage = (props) => {
 

  return (
    <>
        <Header/>
        <TransactionAppointmentCom />
    </>
  );
};

export default TransactionAppointmentPage;
