import React, { useEffect, useState } from "react";
import "./App.css"

const App = () => {
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    const postData = async () => {
      try {
        const response = await fetch("https://chimpu.xyz/api/post.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phonenumber: "8595658562", // made it static because no dynamic thing is mentioned in the task document
          }),
        });

        const jsonData = await response.json();

        setResponseData(jsonData);

        const { msg, error, error_code } = jsonData;
        console.log("Message:", msg);
        console.log("Error:", error);
        console.log("Error Code:", error_code);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    postData();
  }, []);

  return (
    <div className="response-container">
      <div className="response-content">
        <p>Data received in headers:</p>
        <pre>{JSON.stringify(responseData, null, 2)}</pre>
      </div>
    </div>
  );
};

export default App;
