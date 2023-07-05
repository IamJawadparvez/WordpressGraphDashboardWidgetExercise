
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const DashboardWidget = () => {

   //state for storing api data
  const [apiData, setApiData] = useState([]);
  
  //state for storing filtered data
  const [Fdata, setFdata] = useState([]);

  //state for storing the selected option
  const [selectedOption, setSelectedOption] = useState("7");

  const url = `${appLocalizer.apiUrl}/wprk/v1/settings`;

  //onChnage funtion for setting selected option
  const changeFilter = (eve) => {
    setSelectedOption(eve.target.value);
  };

//Fetching api data on component mount with axios
  useEffect(() => {
    axios.get(url).then((res) => {
      setApiData(res.data);
    });
  }, []);


//Applying filtering when selected option changes show graph according to that option
  useEffect(() => {
    const filteredData = apiData.filter((item) => {
      const currentDate = new Date();
      const itemDate = new Date(item.dateT);
      const timeDiff = currentDate - itemDate;
      const diffDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      return diffDays <= parseInt(selectedOption);
    });
    setFdata(filteredData);
  }, [apiData, selectedOption]);


//Applying initial filtering to show graph when component mounts
  useEffect(() => {
    const initialFilteredData = apiData.filter((item) => {
      const currentDate = new Date();
      const itemDate = new Date(item.dateT);
      const timeDiff = currentDate - itemDate;
      const diffDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      return diffDays <= 7;
    });
    setFdata(initialFilteredData);
  }, []);

  return (
    <div>
      <h3 style={{ display: "inline" }}>Graph Widget</h3>
      <div style={{ float: "right" }}>
        <select value={selectedOption} onChange={changeFilter}>
          <option value="7">Last 7 Days</option>
          <option value="15">Last 15 Days</option>
          <option value="30">Last 1 Month</option>
        </select>
      </div>
      <LineChart
        width={400}
        height={300}
        data={Fdata}
        margin={{
          top: 30,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#8884D8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="uv" stroke="#82CA9D" />
      </LineChart>
    </div>
  );
};

export default DashboardWidget;
