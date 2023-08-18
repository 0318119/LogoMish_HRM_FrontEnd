import React from "react";
import '../assets/css/chart.css'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "1june",
    uv: 4000,
    pv: 1000,
    amt: "day 1",
  },
  {
    name: "2june",
    uv: 3000,
    pv: 1398,
    amt: "day 1",
  },
  {
    name: "3june",
    uv: 2000,
    pv: 9800,
    amt: "day 1",
  },
  {
    name: "3june",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "3june",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "3june",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "3june",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "3june",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "3june",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "3june",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
];

export default function Attendan1022hart() {
  return (
    
    <BarChart
      width={1200}
      height={300}
      data={data}
      margin={{
        top: 15,
      }}
      >
      <CartesianGrid strokeDasharray="1 1" className="BarChart" />
      <XAxis dataKey="name" className="BarChart" />
      <YAxis dataKey="amt" className="BarChart" />
      {/* <Tooltip /> */}
      <Legend className="BarChart" />
      <Bar dataKey="pv" fill="blue" />
      <Bar dataKey="uv" fill="red" />
      <Bar dataKey="uv" fill="yellow" />
      <Bar dataKey="uv" fill="#dec56d" />
      <Bar dataKey="uv" fill="black" />
      <Bar dataKey="uv" fill="#82ca9d" />
      <Bar dataKey="uv" fill="#82ca9d" />
      <Bar dataKey="uv" fill="#82ca9d" />
    </BarChart>
   
  );
}
