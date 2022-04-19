import React, { useState, useEffect } from "react";
import {
  Select,
  FormControl,
  Button,
  InputLabel,
  MenuItem,
  TextField,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import "./Sign up.css";
import API_PATH from "../API_PATH";
import ROOT_PATH from '../ROOT_PATH'
import Alert from "@mui/material/Alert";
import { NavLink } from "react-router-dom";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const facultyList = [
  "Petroleum and Mining Engineering",
  "Engineering",
  "Computers and Information",
  "Commerce",
  "Education",
  "Mass media and communication technology",
  "Medicine",
  "Pharmacy",
  "Agriculture",
  "Science",
  "Economics and Political Science",
  "Arts",
  "Al-Sun",
  "Nursing",
  "Law",
  "Physical Therapy",
  "Oral and Dental Medicine",
  "Veterinary Medicine",
  "other",
];

const uniList = [
  "Suez University",
  "Cairo University",
  "Ain Shams University",
  "Helwan University",
  "Mansoura University",
  "Damnhour University",
  "Suez Canal University",
  "Alexandria University",
  "Zagazig University",
  "The American University in Cairo",
  "The German University in Cairo",
  "British University in Egypt",
  "other",
];

const committeesList = [
  {
    name: "Academy",
    value: "Academy",
  },
  {
    name: "Android Development",
    value: "Android",
  },
  {
    name: "E4me",
    value: "E4ME",
  },
  {
    name: "Extracurricular",
    value: "Extra",
  },
  {
    name: "HRD",
    value: "HRD",
  },
  {
    name: "HRM",
    value: "HRM",
  },
  {
    name: "IR",
    value: "IR",
  },
  {
    name: "Logistics",
    value: "Logistics",
  },
  {
    name: "Multimedia",
    value: "Multimedia",
  },
  {
    name: "Magazine Design",
    value: "Magazine_Designs",
  },
  {
    name: "Web Development",
    value: "Web",
  },
  {
    name: "Magazine Editing",
    value: "Magazine_Editing",
  },
  {
    name: "Direct Marketing",
    value: "Direct_Marketing",
  },
  {
    name: "Organizing",
    value: "OC",
  },
  {
    name: "Social Media",
    value: "SOCIAL_MEDIA",
  },
  {
    name: "Data Analysis",
    value: "DATA ANALYSIS",
  },
  {
    name: "BD",
    value: "BD",
  },
];

function SiginUp() {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [committee, setCommittee] = useState("");
  const [faculty, setFaculty] = useState();
  const [university, setUniversity] = useState();
  const [fName, setFName] = useState();
  const [lName, setLName] = useState();
  const [speId, setSpeId] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [gender, setGender] = React.useState("");
  const [facebook, setFacebook] = React.useState("");
  const [image, setImage] = React.useState("");
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleChangeCommittee = (event) => {
    setCommittee(event.target.value);
  };

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };

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

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }, [success]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    if (image === "") {
      setError("Failed to create an account. Please Attach your photo.");
    }
    let form = new FormData();
    form.append("user_name", fName.trim() + " " + lName.trim());
    form.append("spe_id", speId);
    form.append("phone", phone);
    form.append("email", email);
    form.append("password", values.password);
    form.append("gender", gender);
    form.append("faculty", faculty);
    form.append("university", university);
    form.append("facebook", facebook);
    form.append("committee_name", committee);
    form.append("image", image);

    await fetch(`${API_PATH}/users/create`, {
      method: "POST",
      body: form,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setSuccess(
            "Thank you for Registration. Wait for Accepting your Request"
          );
        } else {
          setError(data.error);
        }
      })
      .catch((error) =>
        setError("Failed To Create An Account. Please Try Again.")
      );
  };

  return (
    <div class="container">
      <div className="mx-auto my-5 w-100 mx-auto">
        <div className="mx-auto shadow-lg mt-4 p-4 Register rounded">
          <form onSubmit={(e) => handleRegister(e)} className="row">
            <h3 className="text-center text-muted mb-3">Create new Account</h3>
            <TextField
              className="col-md-6 col-xs-12 px-2 mb-3"
              id="outlined-name-input"
              label="First Name"
              variant="outlined"
              value={fName}
              type="text"
              required
              onChange={(e) => setFName(e.target.value)}
            />

            <TextField
              className="col-md-6 col-xs-12 px-2 mb-3"
              id="outlined-name-input"
              label="Last Name"
              variant="outlined"
              value={lName}
              type="text"
              required
              onChange={(e) => setLName(e.target.value)}
            />

            <TextField
              className="col-md-6 col-xs-12 px-2 mb-3"
              id="outlined-name-input"
              label="SPE ID"
              variant="outlined"
              value={speId}
              type="number"
              inputMode="numeric"
              required
              inputProps={{ inputMode: "numeric", min: 0 }}
              maxLength="11"
              onChange={(e) => setSpeId(e.target.value)}
            />

            <TextField
              className="col-md-6 col-xs-12 px-2 mb-3"
              id="outlined-phone-input"
              label="Phone"
              type="text"
              inputMode="tel"
              inputProps={{ inputMode: "tel", min: 0 }}
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              length="11"
              value={phone}
              required
              onChange={(e) => setPhone(e.target.value)}
              variant="outlined"
            />

            <TextField
              id="outlined-email-input"
              className="col-md-6 col-xs-12 px-2 mb-3"
              label="Email"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />

            <FormControl
              className="col-md-6 col-xs-12 px-2 mb-3"
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                required
                onChange={handleChangePassword("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            <FormControl className="col-md-6 col-xs-12 px-2 mb-3">
              <InputLabel id="demo-simple-select-helper-label">
                Gender
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={gender}
                required
                label="Gender"
                onChange={handleChangeGender}
                MenuProps={MenuProps}
              >
                <MenuItem value={"m"}>Male</MenuItem>
                <MenuItem value={"f"}>Female</MenuItem>
              </Select>
            </FormControl>

            <TextField
              className="col-md-6 col-xs-12 px-2 mb-3"
              id="outlined-facebook-input"
              label="Your facebook link"
              value={facebook}
              required
              onChange={(e) => setFacebook(e.target.value)}
              type="url"
            />

            <FormControl className="col-md-6 col-xs-12 px-2 mb-3">
              <InputLabel id="demo-simple-select-helper-label">
                Faculty
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={faculty}
                label="Faculty"
                onChange={(e) => setFaculty(e.target.value)}
                MenuProps={MenuProps}
              >
                {facultyList.map((faculty) => (
                  <MenuItem value={faculty}>{faculty}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl className="col-md-6 col-xs-12 px-2 mb-3">
              <InputLabel id="demo-simple-select-helper-label">
                University
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={university}
                label="University"
                onChange={(e) => setUniversity(e.target.value)}
                MenuProps={MenuProps}
              >
                {uniList.map((uni) => (
                  <MenuItem value={uni}>{uni}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl className="col-md-6 col-xs-12 px-2 mb-3">
              <InputLabel id="demo-simple-select-helper-label">
                Committee
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={committee}
                label="Committee"
                required
                onChange={handleChangeCommittee}
                MenuProps={MenuProps}
              >
                {committeesList.map((com) => (
                  <MenuItem value={com.value}>{com.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <label
              className="text-dark border border-secondary opacity-75 col-md-6 col-xs-12 px-2 mb-3"
              htmlFor="icon-button-file"
            >
              <IconButton
                className="mx-auto text-center"
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
                <span className="text-center fs-5 ms-2">
                  {image ? image.name : "Upload your Picture"}
                </span>
              </IconButton>
            </label>

            <input
              onChange={(e) => setImage(e.target.files[0])}
              required
              accept="image/*"
              id="icon-button-file"
              type="file"
              style={{ display: "none" }}
            />

            {success ? (
              <Alert className="m-3" severity="success" color="info">
                {success}
              </Alert>
            ) : null}
            {error ? (
              <Alert className="m-3" severity="error" color="error">
                {error}
              </Alert>
            ) : null}
            <Button
              type="submit"
              variant="outlined"
              endIcon={<ArrowForwardIosIcon />}
              className="rounded-pill px-5 p-2 mb-3 mt-3 w-50 mx-auto"
            >
              Create
            </Button>
            <p className="text-center">
              Have An Account <br />
              <NavLink
                className="text-decoration-none"
                exact
                to={`${ROOT_PATH}/login`}
                underline="none"
              >
                Login
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SiginUp;
