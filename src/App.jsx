import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Default items per page

  const API = "https://jsonplaceholder.typicode.com/posts";

  // Fetch data
  const fetchData = async () => {
    try {
      const res = await axios.get(API);
      setData(res.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Handle changing items per page
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Get current data to display based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="app-container">
      <h1>Pagination Example</h1>

      {/* Dropdown for selecting items per page */}
      <label>
        Items per page:
        <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </label>

      {/* Display current page data */}
      <ul>
        {currentData.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>

      {/* Pagination controls */}
      <div className="pagination-controls">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            disabled={index + 1 === currentPage}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
