import React, { createContext, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";

export const ApiData = createContext();

export function useApi() {
  return useContext(ApiData);
}

const App = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);

  const API = "https://jsonplaceholder.typicode.com/Posts";
  const fetchedData = async () => {
    const res = await axios.get(API);
    setData(res.data);
  };
  useEffect(() => {
    fetchedData();
  }, []);
  const selectedDatas = (range) => {
    let filteredData = [];
    if (range == "1-10") {
      filteredData = data.filter((x) => x.id >= 1 && x.id <= 10);
    } else if (range == "10-20") {
      filteredData = data.filter((x) => x.id >= 11 && x.id <= 20);
    } else if (range == "20-30") {
      filteredData = data.filter((x) => x.id >= 21 && x.id <= 30);
    }
    setSelected(filteredData);
    console.log("filteredData", filteredData);
  };

  console.log("data", data);
  return (
    <ApiData.Provider value={{ data, selectedDatas, selected }}>
      <Outlet />

      {/* {data.title} */}
    </ApiData.Provider>
  );
};

export default App;
