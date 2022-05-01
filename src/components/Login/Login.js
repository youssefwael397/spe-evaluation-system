import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  TextField,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import API_PATH from "../API_PATH";
import { UserContext } from "./../UserProvider";
import LinearProgress from '@mui/material/LinearProgress';
import ROOT_PATH from '../ROOT_PATH'

function Login() {
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const { isLogging } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    if (isLogging) {
      window.location = `/spe-evaluation-system/profile`;
    }
  }, [isLogging]);

  const handleChangePassword = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    setError('');
    const form = new FormData();
    form.append("email", email);
    form.append("password", values.password);

    const res = await fetch(`${API_PATH}/login`, {
      method: "POST",
      body: form,
    });


    const data = await res.json();
    if (data.status !== "ok") {
      const newErr = await data.error;
      setIsLoading(false)
      setError(newErr);
    } else {
      if (data.login_token) {
        window.localStorage.setItem("token", data.login_token);
        window.localStorage.setItem("isLogging", true);
        window.location.href = `/spe-evaluation-system/profile`;
      }
    }

  };

  return (
    <div class="container">
      <div className="mx-auto my-5 w-100">

        <form className="shadow-lg rounded Login mx-auto" onSubmit={handleLogin}>
          {
            isLoading && <Box className="overflow-hidden" sx={{ width: '100%' }}>
              <LinearProgress />
            </Box>
          }

          <div className={`mt-4 p-5 ${isLoading && 'opacity-50'}`}>

            <h3 className="text-center text-muted my-2">Login Now</h3>
            <TextField className="text-center my-4"
              id="outlined-email-input"
              label="Email"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading & true}
            />
            <Box >
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  required={true}
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChangePassword("password")}
                  disabled={isLoading & true}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              {error ? (
                <div className="error">
                  <span className="text-danger">{error}</span>
                </div>
              ) : null}
            </Box>
            <div className=" text-center mx-auto">
              <Button
                className="text-center mx-auto rounded-pill px-5 p-2 mb-1 mt-3"
                variant="outlined"
                type="submit"
                endIcon={<ArrowForwardIosIcon />}
              >
                Login
              </Button>
            </div>
            <div className="mt-2 text-center">
              <NavLink className="text-danger text-decoration-none" exact to={`${ROOT_PATH}/forgetpassword`} underline="none">
                Forget Password?
              </NavLink>
              <br />
              <NavLink className=" text-decoration-none" exact to={`${ROOT_PATH}/signup`} underline="none">
                Create A new Account
              </NavLink>
            </div>
          </div>
        </form>
      </div >
    </div>
  );
}

export default Login;
