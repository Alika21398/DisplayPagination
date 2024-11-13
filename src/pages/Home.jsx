import React, { useState, useEffect } from "react";
import { useApi } from "../App";
import axios from "axios";

const Home = () => {
  const { data } = useApi();

  const [selected, setSelected] = useState([]);

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

  console.log("select", selected);

  return (
    <>
      <div className="px-44 py-20">
        <label htmlFor="">Page number</label>
        <select
          className="border ml-3 p-2 bg-blue-100"
          name=""
          id=""
          onChange={(e) => {
            selectedDatas(e.target.value);

            console.log("e", e.target.value);
          }}
        >
          <option>Select pages</option>
          <option value="1-10"> 1-10</option>
          <option value="10-20">10-20</option>
          <option value="20-30">20-30</option>
        </select>

        {selected.map((item, index) => {
          return (
            <div className="my-5" key={index}>
              <div>
                <span className="font-bold">Id:</span>
                {item.id}
              </div>
              <div className="">
                <span className="font-bold">Title:</span> {item.title}
              </div>
              <div className="">
                <span className="font-bold">Body:</span> {item.body}
              </div>
            </div>
          );
        }, [])}
      </div>
    </>
  );
};

export default Home;
