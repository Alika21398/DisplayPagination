import React, { createContext, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";

export const ApiData = createContext();

export function useApi() {
  return useContext(ApiData);
}

const App = () => {
  const [data, setData] = useState([]);
  const [dataCount, setDataCount] = useState(0);

  const API = "https://jsonplaceholder.typicode.com/Posts";
  const fetchedData = async () => {
    try {
      const res = await axios.get(API);
      setData(res.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetchedData();
  }, []);

  console.log("data", data);
  console.log("appcount", dataCount);

  return (
    <ApiData.Provider value={{ data, setData, dataCount, setDataCount }}>
      <Outlet />
      

      {/* {data.title} */}
    </ApiData.Provider>
  );
};

export default App;
