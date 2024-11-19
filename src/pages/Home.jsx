import React, { useState, useEffect } from "react";
import { useApi } from "../App";

const Home = () => {
  const { data } = useApi();
  const [selectedRange, setSelectedRange] = useState(5);
  const [selectedData, setSelectedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // used this to display data at first without selecting any range
    // data dependecines so that everytime data is chnaged it displaysdata and useeffect is runs. Used data dependecy because at first nothing was displayed as i assumed data wasn't fetched so used dependency
    const filteredData = data.slice(0, selectedRange);
    setSelectedData(filteredData);
    console.log("displayData", filteredData);
  }, [data, selectedRange]);

  // to find the total page required
  const totalPages = Math.ceil(data.length / selectedRange);
  console.log("totalPages", totalPages);

  // to choose how many to display on a page
  const handleRangeChange = (e) => {
    const rangeValue = parseInt(e.target.value, 10);
    setSelectedRange(rangeValue);
    setCurrentPage(1);
    const startIndex = 0;
    const endIndex = rangeValue;
    setSelectedData(data.slice(startIndex, endIndex));

    console.log("rangeValue", rangeValue);
  };
  //  for making a dropdown dynamic means the numbers will be set according to length od data in difference of 5
  const dropdownOption = () => {
    const options = [];
    const maxItem = data.length;
    for (let i = 5; i <= maxItem; i += 5) {
      options.push(i);
    }
    console.log("options", options);
    return options;
  };
  // pagination for changing page previous and next
  const handlePageChange = (page) => {
    setCurrentPage(page);
    const startIndex = (page - 1) * selectedRange;
    const endIndex = startIndex + selectedRange;
    setSelectedData(data.slice(startIndex, endIndex));
  };

  console.log("select", selectedData);

  return (
    <>
      <div className="px-44 py-20">
        <div className="flex justify-between">
          <div>
            <label htmlFor="">Page number</label>
            <select
              className="border ml-3 p-2 bg-blue-100"
              name=""
              id=""
              value={selectedRange}
              onChange={
                handleRangeChange

                // console.log("e", e.target.value);
              }
            >
              {dropdownOption().map((option) => (
                <option key={option} value={option}>
                  {" "}
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* pagination for paging  */}
          <div className="flex gap-5  justify-end items-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage == 1}
            >
              prev
            </button>
            <div>{currentPage}</div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage == totalPages}
            >
              Next
            </button>
          </div>
        </div>

        {/* displaying data  */}

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
