import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import '../../src/Assets/css/main.css'
import { Login } from '../LoginScreens/Login';
import  Dashboard   from '../dashboard/dashboard';
import TransactionAppointmentPage from '../TransactionAppointment/TransactionAppointmentPage';
import TAPersonalform from '../TransactionAppointForm/TAPersonalform';
import TAEducationForm from '../TransactionAppointForm/TAEducationForm';
import TAExprienceForm from '../TransactionAppointForm/TAExprienceForm';
import TASalaryForm from '../TransactionAppointForm/TASalaryForm';
import TAppointmentMasterPayroll from  '../TransactionAppointForm/TAppointmentMasterPayroll';
import TACheckList from '../TransactionAppointForm/TACheckList'
import TAFamilyForm from '../TransactionAppointForm/TAFamilyForm';
import TAShortsCut from '../TransactionAppointForm/TAShortsCut'
import Employment_Type from '../HrOperations/Employment_Type';
import Divisions from '../HrOperations/Divisions'
import Departments from '../HrOperations/Departments';
import EmpListForm from '../HrOperations/form/EmpListForm'
import Sections from "../HrOperations/Sections";
import Cost_Centre from "../HrOperations/Cost_Centre";
import Education_Levels from "../HrOperations/Education_Levels";
import Employee_Category from "../HrOperations/Employee_Category";
import Country from "../HrOperations/Country";
import Grade from "../HrOperations/Grade";
import Education from '../HrOperations/Education';
import Designation from '../HrOperations/Designation';
import Leave_Category from '../HrOperations/Leave_Category'
import Leave_Types from '../HrOperations/Leave_Types'
import Previous_Employers from '../HrOperations/Previous_Employers'
import Transportation from '../HrOperations/Transportation'
import Institution from '../HrOperations/Institution'
import Resignation from '../HrOperations/Resignation';
import Religion from '../HrOperations/Religion';
import Locations from '../HrOperations/Locations';
import MasterData_Sec from '../Master_Maintaince/MasterData_Sec'
import MasterData_Leaves from '../Master_Maintaince/MasterData_Leaves';
import MasterPersonal from '../Master_Maintaince/MasterPersonal'
const routing = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/TransactionAppointmentPage" element={<TransactionAppointmentPage />}/>
          <Route path="/TAPersonalform" element={<TAPersonalform />} />
          <Route path="/TAEducationForm" element={<TAEducationForm />} />
          <Route path="/TAExprienceForm" element={<TAExprienceForm />} />
          <Route path="/TASalaryForm" element={<TASalaryForm />} />
          <Route path="/TAppointmentMasterPayroll" element={<TAppointmentMasterPayroll />} />
          <Route path="/TACheckList" element={<TACheckList />} />
          <Route path="/TAFamilyForm" element={<TAFamilyForm />} />
          <Route path="/TAShortsCut" element={<TAShortsCut />} />
          <Route path="/Employment_Type" element={<Employment_Type />} />
          <Route path="/Divisions" element={<Divisions />} />
          <Route path="/Departments" element={<Departments />} />
          <Route path="/EmpListForm" element={<EmpListForm />} />
          <Route path="/Sections" element={<Sections />} />
          <Route path="/Cost_Centre" element={<Cost_Centre />} />
          <Route path="/Education_Levels" element={<Education_Levels />} />
          <Route path="/Employee_Category" element={<Employee_Category />} />
          <Route path="/Country" element={<Country />} />
          <Route path="/Grade" element={<Grade />} />
          <Route path="/Education" element={<Education />} />
          <Route path="/Designation" element={<Designation />} />
          <Route path="/Leave_Category" element={<Leave_Category />} />
          <Route path="/Leave_Types" element={<Leave_Types />} />
          <Route path="/Previous_Employers" element={<Previous_Employers />} />
          <Route path="/Transportation" element={<Transportation />} />
          <Route path="/Institution" element={<Institution />} />
          <Route path="/Resignation" element={<Resignation />} />
          <Route path="/Religion" element={<Religion />} />
          <Route path="/Locations" element={<Locations />} />
          <Route path="/MasterData_Sec" element={<MasterData_Sec />} />
          <Route path="/MasterData_Leaves" element={<MasterData_Leaves />} />
          <Route path="/MasterPersonal" element={<MasterPersonal />} />


        </Routes>
      </Router>
    </>
  );
}

export default routing