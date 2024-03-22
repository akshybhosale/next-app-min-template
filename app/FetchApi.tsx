'use  client'
import React, { useState, useEffect } from "react";
export default function FetchApi(){
    const [users, setUser] = useState([]);

  const fetchData = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setUser(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchData();
    
  }, [])
  

  return users;
}