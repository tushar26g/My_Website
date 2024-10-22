import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Job.css'

const DataFetchingComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/public/allPosts')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {data.map(item => (
        // console.log(item),
        <div key={item._id} className="box">
          
          <h2>{item.company}</h2>
          <p>vacansy: {item.vacansy}</p>
          <p>location: {item.location}</p>
        </div>
      ))}
    </div>
  );
};

export default DataFetchingComponent;
