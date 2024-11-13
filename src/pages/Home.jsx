import React, { useState, useEffect } from "react";
import { useApi } from "../App";

const Home = () => {
  const { data } = useApi();

  const [selectedData, setSelectedData] = useState([]);
  useEffect(() => {
    const filteredData = data.filter((x) => x.id >= 1 && x.id <= 10);
    setSelectedData(filteredData);
    console.log("displayData", filteredData);
  }, [data]);

  const handleChange = (range) => {
    const rangeArray = range.split("-");
    const initialValue = rangeArray[0];
    const finalValue = rangeArray[1];
    console.log("rangeArray", rangeArray);

    const filteredData = data.filter(
      (x) => x.id >= initialValue && x.id <= finalValue
    );

    setSelectedData(filteredData);
    console.log("filteredData", filteredData);
  };

  console.log("select", selectedData);

  return (
    <>
      <div className="px-44 py-20">
        <label htmlFor="">Page number</label>
        <select
          className="border ml-3 p-2 bg-blue-100"
          name=""
          id=""
          onChange={(e) => {
            handleChange(e.target.value);

            console.log("e", e.target.value);
          }}
        >
          <option value="1-10"> 1-10</option>
          <option value="11-20">11-20</option>
          <option value="21-30">21-30</option>
        </select>

        {selectedData.map((item, index) => {
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
        })}
      </div>
    </>
  );
};

export default Home;
