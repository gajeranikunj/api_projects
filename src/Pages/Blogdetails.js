import React, { useState, useEffect } from 'react';
import { useApi } from '../Apidata_and_fun/ApiDataprovider';

function Blogdetails() {
  const [serch, setserch] = useState('');
  const [Show, setShow] = useState(null);
  const { acdata } = useApi();

  useEffect(() => {
    let url = window.location.href;
    url = url.replace(/%20/g, ' '); // Replace all occurrences of %20 with space
    const searchParam = url.slice(url.indexOf("?s=") + 3);
    setserch(searchParam);
  }, []);

  useEffect(() => {
    if (acdata && serch) {
      const result = acdata.find((e) => serch === e.title);
      setShow(result);
    }
    console.log(acdata);
  }, [serch, acdata]);


  return (
    <>
      {Show ? (
        <div>
          <img src={Show.imgURL} style={{ width: "100%" }} alt="" />
        </div>
      ) : (
        <p>No data found</p>
      )}
    </>
  );
}

export default Blogdetails;
