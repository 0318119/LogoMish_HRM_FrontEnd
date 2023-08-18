import React from 'react'
import '../assets/css/chart.css'
import Attendancechart from '../chart/Attendancechart';
import { BsFillCalendar2CheckFill as Calender_ico } from "react-icons/bs";
import Table from "../Tables/tables";
import EntryTable from "../Tables/entryTable";
import SummaryTable from "../Tables/SummaryTable";
import RequestTable from "../Tables/RequestTable";
import EmployeeVisualize from "../EmployeeVisualize/EmployeeVisualize";
import AttendanceSummaryTable from '../Tables/AttendanceSummaryTable'

const chart = () => {
  return (
    <div className="container-fluid">
      <div className="row ChartRow">
        <div className="col-lg-12 col-md-12 col-sm-12 p-0 ChartRow">
          <div className="ChartHeader">
            <span className="ChartHeadDetailHeading">
              <b>Attendance Summary</b>
            </span>
            <span className="ChartHeadDetailHeading">
              <b>View Attendance Details</b>
            </span>
            <select className="chartSelectTag" name="" id="">
              <option value="">Employee</option>
            </select>
            <select name="" id="" className="chartSelectTag">
              <option value="">Total Worked</option>
              <option value="">2</option>
              <option value="">3</option>
              <option value="">4</option>
            </select>
            <select name="" id="" className="chartSelectTag">
              <option value="">current Month</option>
              <option value="">2</option>
              <option value="">3</option>
              <option value="">4</option>
            </select>
          </div>
        </div>
        <div className="ChartCont mt-5">
          <Attendancechart />
        </div>
      </div>
      <div className="row d-flex mt-1 p-1 ChartRow">
        <div className="col-md-12 col-lg-6 d-flex TableCont">
          <Table headerName="ATTENDANCE" />
          <EntryTable
            Hname="SNO"
            Hname1="Monthly"
            Hname2="Leave/Attendance"
            Hname3="Status"
            col1="1"
            col2="july"
            col3="Absent"
            col4="good"
          />
        </div>
        <div className="col-md-12 col-lg-6 d-flex TableCont">
          <SummaryTable
            Hname="Type"
            Hname3="Balance"
            Hname2=""
            col1="Leave"
            col4="20.0"
          />
          <RequestTable
            Hname="Type"
            Hname3="Value"
            Hname2=""
            col1="Leave"
            col4="20.0"
          />
        </div>
      </div>
      <div className="row d-flex mt-1 p-1 ChartRow">
        <div className="col-md-12 col-lg-6 ">
          <EmployeeVisualize
            Hname="Week"
            Hname1="Description"
            Hname2="Scheduled Hours"
            Hname3="Workded Hours"
            Hname4="Average Hours"
            col1="aaa"
            col2="aaa"
            col3="aaa"
            col4="aaa"
            col5="aaa"
          />
        </div>
        <div className="col-lg-6 col-md-12  TableCont">
          <div className="d-flex">
            <SummaryTable
              Hname="Type"
              Hname2=""
              Hname3="Balance"
              col1="Leave"
              col4="20.0"
            />
            <SummaryTable
              Hname="Type"
              Hname3="Balance"
              Hname2=""
              col1="Leave"
              col4="20.0"
            />
          </div>
          <div className="d-flex mt-1 ">
            <RequestTable
              Hname="Type"
              Hname3="Value"
              Hname2=""
              col1="Leave"
              col4="20.0"
            />
            <RequestTable
              Hname="Type"
              Hname3="Value"
              Hname2=""
              col1="Leave"
              col4="20.0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default chart