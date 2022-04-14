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
import ROOT_PATH from '../ROOT_PATH'

function Login() {
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const { isLogging } = useContext(UserContext);
  const [email, setEmail] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    if (isLogging) {
      window.location = `${ROOT_PATH}/profile`;
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
      setError(newErr);
    } else {
      if (data.login_token) {
        window.localStorage.setItem("token", data.login_token);
        window.localStorage.setItem("isLogging", true);
        window.location = `${ROOT_PATH}/profile`;
      }
    }



  };

  return (
    <div class="container">
      <div className="mx-auto my-5 w-100">
        <form className="shadow-lg mt-4 p-5 rounded Login mx-auto" onSubmit={handleLogin}>
          <h3 className="text-muted my-3">Login Now</h3>
          <TextField className="text-center my-4"
            id="outlined-email-input"
            label="Email"
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
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
          <Button
            className="mx-auto rounded-pill px-5 p-2 mb-3 mt-3"
            variant="outlined"
            type="submit"
            endIcon={<ArrowForwardIosIcon />}
          >
            Login
          </Button>

          <p>
            Create A new Account <br />
            <NavLink className="text-decoration-none" exact to={`${ROOT_PATH}/signup`} underline="none">
              Sign Up
            </NavLink>
          </p>
        </form>
      </div >
    </div>
  );
}

export default Login;
