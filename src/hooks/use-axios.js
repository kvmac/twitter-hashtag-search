import React, { useState, useEffect } from 'react';
import axios from 'axios';



export const useAxios = async (url, options) => {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(url);

      setResponse(res);
    };
    getData();
  }, []);

  return response;
};