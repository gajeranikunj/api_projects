import React, { useState, useRef, createContext, useContext, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

// Create Context
const Apidata = createContext();

// Provider Component
export const Apidataprovider = ({ children }) => {
  const history = useHistory();
  const [inputval, setInputval] = useState({ name: "" });
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(null);
  const inputRef = useRef(null);
  const kye = "f1724733013058sur45565656zg";
  const [auth, setAuth] = useState(window.localStorage.getItem("kye"))

  // Fetch Data


  const getdat = () => {
    axios.get("https://service.apikeeda.com/api/v1/category", {
      headers: {
        "x-apikeeda-key": kye,
        "authorization": auth,
      },
    })
      .then((e) => {
        setData(e.data.data);
        console.log(e.data.data, "get data 1");
      })
      .catch((e) => {
        console.error(e);
      });
  };


  // Add Data
  const senddata = () => {
    axios.post("https://service.apikeeda.com/api/v1/category", inputval, {
      headers: {
        "x-apikeeda-key": kye,
        "authorization": auth,
      },
    })
      .then(() => {
        getdat();
        setInputval({ name: "" });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // Delete Data
  const deletedata = (id) => {
    if (id !== edit) {
      axios.delete(`https://service.apikeeda.com/api/v1/category/${id}`, {
        headers: {
          "x-apikeeda-key": kye,
          "authorization": auth,
        },
      })
        .then(() => {
          getdat();
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      alert("This input field is in edit mode, please finish editing first.")
    }
  };

  // Edit Data
  const editdata = () => {
    axios.patch(`https://service.apikeeda.com/api/v1/category/${edit}`, inputval, {
      headers: {
        "x-apikeeda-key": kye,
        "authorization": auth,
      },
    })
      .then(() => {
        setEdit(null);
        setInputval({ name: "" });
        getdat();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // Search Data
  const serch = (input) => {
    axios.get(`https://service.apikeeda.com/api/v1/category/search?search=${input}`, {
      headers: {
        "x-apikeeda-key": kye,
        "authorization": auth,
      },
    })
      .then((e) => {
        setData(e.data.data);
        console.log(e.data.data, "get serch 1");
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // Blog-specific functions
  const [Bloginputval, setBloginputval] = useState({
    imgURL: "",
    title: "",
    category: "",
    description: "",
  });
  const [Blogedit, setBlogedit] = useState(null);
  const [acdata, setacdata] = useState([]);


  const getBlogdata = () => {
    axios.get("https://service.apikeeda.com/api/v1/blog", {
      headers: {
        "x-apikeeda-key": kye,
        "authorization": auth,
      },
    })
      .then((d) => {
        setacdata(d.data.data);
        setBloginputval({ imgURL: "", title: "", category: "", description: "" });
      })
      .catch((e) => {
        if (e.response.status === 401) {
          window.localStorage.removeItem("kye")
          if (window.location.href.includes("/adminpanel")) {
            goon("/adminpanel/login")
          }
        }
      });
  };

  useEffect(() => {
    getBlogdata()
  }, [])

  const sendBlogdata = () => {
    axios.post("https://service.apikeeda.com/api/v1/blog", Bloginputval, {
      headers: {
        "x-apikeeda-key": kye,
        "authorization": auth,
      },
    })
      .then(() => {
        getBlogdata();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const deleteBlogdata = (id) => {
    if (Blogedit !== id) {
      axios.delete(`https://service.apikeeda.com/api/v1/blog/${id}`, {
        headers: {
          "x-apikeeda-key": kye,
          "authorization": auth,
        },
      })
        .then(() => {
          getBlogdata();
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      alert("This input field is in edit mode, please finish editing first.");
    }
  };

  const editBlogdata = () => {
    axios.patch(`https://service.apikeeda.com/api/v1/blog/${Blogedit}`, Bloginputval, {
      headers: {
        "x-apikeeda-key": kye,
        "authorization": auth,
      },
    })
      .then(() => {
        setBlogedit(null);
        setBloginputval({ imgURL: "", title: "", category: "", description: "" });
        getBlogdata();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const searchBlogdata = (input) => {
    axios.get(`https://service.apikeeda.com/api/v1/blog/search?search=${input}`, {
      headers: {
        "x-apikeeda-key": kye,
        "authorization": auth,
      },
    })
      .then((e) => {
        setacdata(e.data.data);
        console.log(e.data.data, "serch blog");
      })
      .catch((e) => {
        console.error(e);
      });
  };


  const goon = (url) => {
    history.push(url);
  };
  return (
    <Apidata.Provider value={{
      inputval, setInputval, data, edit, setEdit, inputRef, getdat,
      senddata, deletedata, editdata, serch, kye, goon,
      Bloginputval, setBloginputval, Blogedit, setBlogedit, acdata,
      getBlogdata, sendBlogdata, deleteBlogdata, editBlogdata, searchBlogdata, setAuth
    }}>
      {children}
    </Apidata.Provider>
  );
};

// Custom hook to use context
export const useApi = () => useContext(Apidata);
