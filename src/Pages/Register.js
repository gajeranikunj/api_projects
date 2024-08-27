import React from 'react';
import { Box, CssBaseline, Container, Stack, Typography, Card, CardContent, FormControl, FormLabel, TextField, OutlinedInput, InputAdornment, IconButton, Checkbox, Button, Grid } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useApi } from '../Apidata_and_fun/ApiDataprovider';

const Register = () => {
    const {
        goon,kye
    } = useApi();
    const inputRef = React.useRef(null);
    const [showPassword, setShowPassword] = React.useState(false);


    const [values, setValue] = React.useState({
        name: "",
        email: "",
        password: ""
    });

    const [visibale, setVisibale] = React.useState(true);
    const [tog, settog] = React.useState(false);


    const handleClickShowPassword = () => setShowPassword((show) => !show);


    const handleMouseDownPassword = (event) => {
        setValue({ ...values, [event.target.name]: event.target.value });
    };

    const url = "https://service.apikeeda.com/api/v1/user/signup";

    function CreateAc() {
        if (tog) {
            axios.post(url, values, {
                "headers": {
                    "x-apikeeda-key": kye
                }
            })
                .then((e) => {
                    console.log(e);
                    if (window.confirm("do you want to login")) {
                        goon("/adminpanel/login");
                    }
                })
                .catch((e) => {
                    if (e.message.includes("status code 500")) {
                        if (window.confirm("user already exists do you want to Login in this")) {
                            goon("/adminpanel/login");
                        } else {
                            setValue(
                                {
                                    name: "",
                                    email: "",
                                    password: ""
                                }
                            )
                        }
                    } else {
                        alert("something went wrong")
                    }
                })
        }
    }
    return (
        <Box>
            <CssBaseline />
            <Container maxWidth="sm">
                <Grid container justifyContent="center" padding="50px 0px">
                    <Grid item sm={8} xs={12}>
                        <Box textAlign="center" paddingBottom="18px">
                            <Typography component="a" href='#Ggf' sx={{ textDecoration: "none", display: "inline-block" }}>
                                <Stack spacing={1} direction="row" alignItems="center" justifyContent="center">
                                    <img
                                        src="https://bootstrapmade.com/demo/templates/NiceAdmin/assets/img/logo.png"
                                        alt="NiceAdminlogo"
                                        width="25px"
                                        height="25px"
                                    />
                                    <Typography
                                        variant="h6"
                                        noWrap
                                        className='nunito-sans'
                                        fontWeight={700}
                                        sx={{
                                            mr: 2,
                                            display: { xs: 'none', md: 'flex' },
                                            fontFamily: '"Nunito", sans-serif',
                                            fontSize: "24px",
                                            color: "#012970",
                                            textDecoration: 'none',
                                        }}
                                    >
                                        NiceAdmin
                                    </Typography>


                                </Stack>
                            </Typography>
                        </Box>
                        <Card sx={{ boxShadow: "0px 0px 8px rgba(0,0,0,0.3)" }}>
                            <CardContent sx={{ padding: "30px 20px" }}>
                                <Typography variant="h5" component="div" fontWeight={700} textAlign="center" className='nunito-sans' color="#012970" >
                                    Create an Account
                                </Typography>
                                <Typography variant="body2" textAlign="center" marginBottom="22px">
                                    Enter your personal details to create account
                                </Typography>
                                <Stack spacing={2}>
                                    <FormControl fullWidth>
                                        <FormLabel sx={{ color: "#000", marginBottom: "8px" }}>Username</FormLabel>
                                        <TextField name='name' type='text' size='small' onChange={handleMouseDownPassword} />
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <FormLabel sx={{ color: "#000", marginBottom: "8px" }} >Your Email</FormLabel>
                                        <TextField name='email' type='email' size='small' onChange={handleMouseDownPassword} />
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <FormLabel sx={{ color: "#000", marginBottom: "8px" }} >Password</FormLabel>
                                        <OutlinedInput
                                            ref={inputRef}
                                            name='password'
                                            onChange={handleMouseDownPassword}
                                            //  onClick={handleMouseDownPassword}
                                            type={showPassword ? 'text' : 'password'}
                                            endAdornment={
                                                visibale ?
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            // onMouseDown={handleMouseDownPassword}                                 
                                                            edge="end"
                                                        >
                                                            {!showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                    : ""
                                            }
                                            size='small'
                                        />
                                    </FormControl>
                                    <Stack direction="row" alignItems="center">
                                        <Checkbox disableRipple onClick={() => settog(!tog)} />
                                        <Typography>
                                            I agree and accept the
                                            <a href='#hh' style={{ color: "#4154f1", textDecoration: "none" }}> terms and conditions</a>
                                        </Typography>
                                    </Stack>
                                    <Button variant="contained" sx={{ textTransform: "capitalize", fontSize: "16px", backgroundColor: "#0d6efd" }} onClick={() => CreateAc()}>
                                        Create Account
                                    </Button>
                                    <Typography>
                                        Already have an account?
                                        <Typography component="a" color="#4154f1" sx={{ textDecoration: "none" }} onClick={() => { goon("/adminpanel/login") }}> Log in</Typography>
                                    </Typography>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>


    )
}

export default Register;