import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import DeleteIcon from "@mui/icons-material/Delete";
import { MdOutlineCancel } from "react-icons/md";
import { useApi } from "../Apidata_and_fun/ApiDataprovider";
import { Route, Switch } from "react-router-dom";
import Blogdetails from "./Blogdetails";

function Blog() {
  const {
    data,
    Bloginputval,
    setBloginputval,
    Blogedit,
    setBlogedit,
    acdata,
    sendBlogdata,
    deleteBlogdata,
    editBlogdata,
    searchBlogdata,
    getBlogdata,
    getdat,
    goon
  } = useApi();
  const [mapdata, setmapdata] = useState([]);

  function setfild(item) {
    setBloginputval({ ...Bloginputval, [item.target.name]: item.target.value });
  }

  function sat() {
    const mappedData = [];
    data.forEach((element) => {
      mappedData.push({
        name: element.name,
        data: acdata.filter((e) => element._id === e.category),
      });
    });
    const unassignedData = acdata.filter(
      (e) => !data.some((d) => d._id === e.category)
    );
    if (unassignedData.length !== 0) {
      mappedData.push({
        name: "undefined",
        data: unassignedData,
      });
    }
    setmapdata(mappedData);
  }

  useEffect(() => {
    getdat();
    getBlogdata();
  }, []);

  useEffect(() => {
    if (acdata.length !== 0 && data.length !== 0) {
      sat();
    }
  }, [acdata, data]);

  return (
    <>
      <Switch>
        <Route
          exact
          path="/adminpanel/component/Blog"
          render={() => (
            <Box>
              <Typography variant="h5">Blog</Typography>
              <Box
                aria-label="breadcrumb"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  marginBottom: "30px",
                }}
              >
                <Box
                  sx={{
                    width: "200px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Link
                    className="Breadcrumb"
                    style={{
                      color: "#899bbd",
                      fontSize: "14px",
                      textDecoration: "none",
                    }}
                    to="/adminpanel"
                  >
                    Home
                  </Link>
                  /
                  <Typography color="#899bbd" fontSize="14px">
                    Components
                  </Typography>
                  /
                  <Typography color="#273246" fontSize="14px">
                    Blog
                  </Typography>
                </Box>
                <Box>
                  <TextField
                    label="search from Title"
                    sx={{
                      width: "200px", // Adjusted width
                      float: "right",
                    }}
                    onChange={(e) => {
                      searchBlogdata(e.target.value);
                    }}
                  />
                </Box>
              </Box>

              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <FormControl sx={{ width: "90px" }}> {/* Adjusted width */}
                  <InputLabel id="demo-simple-select-label">Category</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={Bloginputval.category}
                    label="Category"
                    onChange={(event) => {
                      setBloginputval({
                        ...Bloginputval,
                        category: event.target.value,
                      });
                    }}
                  >
                    {data.map((item) => (
                      <MenuItem
                        sx={{ width: "100%", textAlign: "center", fontSize: "20px" }}
                        key={item._id}
                        value={item._id}
                      >
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  value={Bloginputval.imgURL}
                  name="imgURL"
                  label="Add URL"
                  sx={{
                    width: "25%", // Adjusted width
                  }}
                  onChange={(e) => {
                    setfild(e);
                  }}
                />
                <TextField
                  name="title"
                  value={Bloginputval.title}
                  label="Add Title"
                  sx={{
                    width: "20%", // Adjusted width
                  }}
                  onChange={(e) => {
                    setfild(e);
                  }}
                />
                <TextField
                  name="description"
                  value={Bloginputval.description}
                  label="Add Description"
                  sx={{
                    width: "20%", // Adjusted width
                  }}
                  onChange={(e) => {
                    setfild(e);
                  }}
                />
                <Box sx={{ width: "90px" }}> {/* Adjusted width */}
                  <Button
                    startIcon={Blogedit ? <UpgradeIcon /> : <AddIcon />}
                    sx={{
                      padding: "10px 15px",
                      width: "90px", // Adjusted width
                      backgroundColor: "blue",
                      color: "white",
                      "&:hover": {
                        cursor: "pointer",
                        backgroundColor: "#0000ffb3",
                      },
                    }}
                    onClick={() => {
                      Blogedit ? editBlogdata() : sendBlogdata();
                    }}
                  >
                    {Blogedit ? "Update" : "Add"}
                  </Button>
                  {Blogedit ? (
                    <Button
                      startIcon={<MdOutlineCancel />}
                      sx={{
                        marginTop: "5px",
                        width: "90px", // Adjusted width
                        padding: "10px 15px",
                        backgroundColor: "blue",
                        color: "white",
                        "&:hover": {
                          cursor: "pointer",
                          backgroundColor: "#0000ffb3",
                        },
                      }}
                      onClick={() => {
                        setBlogedit(null);
                        setBloginputval({
                          imgURL: "",
                          title: "",
                          category: "",
                          description: "",
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  ) : (
                    ""
                  )}
                </Box>
              </Box>

              {mapdata.map((cat) => (
                <Box sx={{ width: "100%" }} key={cat.name}>
                  <Box
                    sx={{
                      padding: "0px 20px",
                      paddingTop: "20px",
                      fontWeight: "700",
                      fontSize: "25px",
                    }}
                  >
                    Category: {cat.name}
                  </Box>
                  <Grid container>
                    {cat.data.map((item) => (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={4}
                        sx={{ padding: "20px" }}
                        key={item._id}
                      >
                        <Box
                          sx={{
                            width: "100%",
                            boxShadow: "0px 0px 15px #0000005c",
                            "&:hover": {
                              boxShadow: "0px 0px 20px #0000005c",
                              scale: "1.01",
                              transition: "0.3s",
                            },
                          }}
                          onClick={() => goon(`/adminpanel/component/Blog/details/?s=${item.title}`)}
                        >
                          <Box sx={{ width: "100%" }}>
                            <Box
                              sx={{
                                width: "100%",
                                height: "300px",
                                backgroundImage: `url(${item.imgURL})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                              }}
                            ></Box>
                          </Box>
                          <Box
                            sx={{
                              height: "250px",
                              display: "flex",
                              justifyContent: "space-between",
                              flexDirection: "column",
                            }}
                          >
                            <Box>
                              <Box
                                sx={{
                                  padding: "10px",
                                  fontSize: "23px",
                                  fontWeight: "500",
                                }}
                              >
                                Movie name: {item.title.slice(0, 30)}
                                {item.title.length > 30 ? "...." : ""}
                              </Box>
                              <Box sx={{ padding: "10px" }}>
                                {item.description.slice(0, 130)}
                                {item.description.length > 130 ? "...." : ""}
                              </Box>
                            </Box>
                            <Box
                              sx={{
                                padding: "10px",
                                paddingBottom: "30px",
                                display: "flex",
                                justifyContent: "space-evenly",
                              }}
                            >
                              <Button
                                variant="outlined"
                                startIcon={<DeleteIcon />}
                                onClick={() => deleteBlogdata(item._id)}
                              >
                                Delete
                              </Button>

                              <Button
                                variant="outlined"
                                startIcon={<EditIcon />}
                                onClick={() => {
                                  window.scrollTo({ top: 0, behavior: "smooth" });
                                  setBlogedit(item._id);
                                  setBloginputval({
                                    imgURL: item.imgURL,
                                    title: item.title,
                                    category: item.category,
                                    description: item.description,
                                  });
                                }}
                              >
                                Edit
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              ))}
            </Box>
          )}
        />

        <Route path="/adminpanel/component/Blog/details" render={() => <Blogdetails />} />
      </Switch>
    </>
  );
}

export default Blog;
