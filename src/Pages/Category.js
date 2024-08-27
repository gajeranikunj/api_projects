// CategoryPage.js
import React, { useEffect } from "react";
import {
  Breadcrumbs,
  TextField,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper
} from "@mui/material";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import { useApi } from "../Apidata_and_fun/ApiDataprovider";

const CategoryPage = () => {
  const {
    inputval,
    setInputval,
    data,
    edit,
    setEdit,
    inputRef,
    senddata,
    deletedata,
    editdata,
    serch,
    getdat,
  } = useApi();
  useEffect(() => {
    getdat()
  }, [])
  return (
    <>
      <Box>
        <Typography variant="h5" marginBottom="5px">
          Category
        </Typography>
        <Breadcrumbs aria-label="breadcrumb" marginBottom="30px">
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
          <Typography color="#899bbd" fontSize="14px">
            Components
          </Typography>
          <Typography color="#273246" fontSize="14px">
            Category
          </Typography>
        </Breadcrumbs>

        <Box
          sx={{
            width: "90%",
            margin: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextField
            inputRef={inputRef} 
            onChange={(e) => setInputval({ name: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                edit ? editdata() : senddata();
              }
            }}
            value={inputval.name}
            label="add"
            sx={{ width: "50%" }}
          />
          <Button
            startIcon={edit ? <UpgradeIcon /> : <AddIcon />}
            sx={{
              padding: "10px 18px",
              backgroundColor: "blue",
              color: "white",
              "&:hover": {
                cursor: "pointer",
                backgroundColor: "#0000ffb3",
              },
            }}
            onClick={() => edit ? editdata() : senddata()}
          >
            {edit ? "Update" : "Add"}
          </Button>
          <TextField
            label="search"
            type="text"
            onChange={(e) => serch(e.target.value)}
          />
        </Box>
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6" gutterBottom>
            Movie List
          </Typography>
          <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">No</TableCell>
                  <TableCell align="center">API ID</TableCell>
                  <TableCell align="center">Movie Name</TableCell>
                  <TableCell align="center">Delete</TableCell>
                  <TableCell align="center">Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={item._id} sx={{ textAlign: 'center',backgroundColor:item._id!==edit?"white":"#c5c5c5" }}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{item._id}</TableCell>
                    <TableCell align="center">{item.name}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        onClick={() => deletedata(item._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        startIcon={<EditIcon />}
                        onClick={() => {
                          setEdit(item._id);
                          setInputval({ name: item.name });
                          inputRef.current.focus(); // Focus the input field
                        }}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
};

export default CategoryPage;
