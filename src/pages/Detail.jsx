import React, { useState } from "react";
import { useApi } from "../App";

const Detail = () => {
  const { data, dataCount, setDataCount } = useApi();

  // Function to update data count based on some logic
  const handleUpdateCount = () => {
    const newCount = data.length; // Here, we simply use the existing data length
    setDataCount(newCount); // Update count in context that sends value in app.jsx
    console.log("newcount", newCount);
  };
  console.log("data", data);

  return (
    <div className="px-44 py-20">
      <h1>Total Posts: {dataCount}</h1>
      <button onClick={handleUpdateCount}>Update Data Count</button>

      {/* Display the posts */}
      <div>
        {dataCount > 0 ? (
          <div>
            {data.map((item) => (
              <div key={item.id}>
                <h3>Title: {item.title}</h3>
                <p>Body: {item.body}</p>
              </div>
            ))}
          </div>
        ) : (
          "No data count"
        )}
      </div>
    </div>
  );
};

export default Detail;
