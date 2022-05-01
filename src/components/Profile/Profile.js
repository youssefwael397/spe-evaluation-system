import React, { useState, useEffect, useContext } from "react";

import "./Profile.css";
import { NavLink } from "react-router-dom";
import {
  Avatar,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Button,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Box,
  Modal,
  IconButton,
} from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import SchoolIcon from '@mui/icons-material/School';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import API_PATH from "./../API_PATH";
import EditProfile from "./../EditProfile/EditProfile";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { UserContext } from './../UserProvider';
import ROOT_PATH from '../ROOT_PATH'
import background from './background.jpeg'
import CircularProgress from '@mui/material/CircularProgress';
function Profile() {

  const { user, userInfo, isAdmin, image, isLogging } = useContext(UserContext);
  const [month, setMonth] = React.useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const [committee, setCommittee] = useState();
  const [updatedImage, setUpdatedImage] = useState('');
  const [newImageName, setNewImageName] = useState('');
  const [error, setError] = useState("");


  const [type, setType] = useState("");
  const typeList = [
    {
      name: "All",
      value: "a",
    },
    {
      name: "Task",
      value: "t",
    },
    {
      name: "Meeting",
      value: "m",
    }
  ];

  const committeesList = [
    {
      name: user.first_com_name,
      value: user.first_com_name,
    },
    {
      name: user.second_com_name,
      value: user.second_com_name,
    }
  ];

  const monthList = [
    {
      name: "JANUARY",
      value: "1",
    },
    {
      name: "FEBRUARY",
      value: "2",
    },
    {
      name: "MARCH",
      value: "3",
    },
    {
      name: "APRIL",
      value: "4",
    },
    {
      name: "MAY",
      value: "5",
    },
    {
      name: "JUNE",
      value: "6",
    },
    {
      name: "JULY",
      value: "7",
    },
    {
      name: "AUGUST",
      value: "8",
    },
    {
      name: "SEPTEMBER",
      value: "9",
    },
    {
      name: "OCTOBER",
      value: "10",
    },
    {
      name: "NOVEMBER",
      value: "11",
    },
    {
      name: "DECEMBER",
      value: "12",
    },
  ];

  useEffect(() => {
    if (!user.second_com_name) {
      setCommittee(user.first_com_name)
    }
  }, [user.first_com_name, user.second_com_name])

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  useEffect(() => {
    if (!isLogging) {
      window.location = `${ROOT_PATH}/login`;
    }
  }, [isLogging])


  const getTasks = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setTasks([])
    let api_url = ``;

    if (type === 'a') {
      if (isChecked) {
        api_url = `${API_PATH}/tasks?committee=${committee}&user=${user.user_id}&month=${month}`;
      } else {
        api_url = `${API_PATH}/tasks?committee=${committee}&user=${user.user_id}`;
      }
    }

    if (type !== 'a') {
      if (isChecked) {
        api_url = `${API_PATH}/tasks?committee=${committee}&user=${user.user_id}&type=${type}&month=${month}`
      } else {
        api_url = `${API_PATH}/tasks?committee=${committee}&user=${user.user_id}&type=${type}`
      }
    }

    await fetch(api_url)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'ok') {
          setTasks([...data.tasks])
          setIsLoading(false)
          if (data.tasks.length < 1) {
            setError(
              `There is no ${type === "m"
                ? "meetings"
                : type === "t"
                  ? "tasks"
                  : "meetings or tasks"
              }.`
            );
          }
        } else {
          setTasks([])
        }
      })
  }


  const updateImage = async (e) => {
    e.preventDefault()
    let form = new FormData()
    form.append('image', updatedImage)
    form.append('user_id', user.user_id)
    await fetch(`${API_PATH}/users/update/image`, {
      method: 'PUT',
      body: form
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'ok') {
          window.location.href = `/spe-evaluation-system/profile`;
        } else {
          alert('Failed to update photo. Try Again...')
        }
      })
  }

  if (userInfo && user && image && isLogging) {

    return (
      <div className="container-xl mx-auto ">
        <div className="Profile my-4 rounded bg-white p-4 position-relative w-100">
          <Avatar
            className="w-100"
            alt={userInfo.user_name}
            src={background}
            sx={{ height: 300 }}
            variant="rounded"
          />

          <Button
            // className="ms-auto"
            className="profile-image"
            size="small"
            component="span"
            onClick={handleOpen}
          >

            <Avatar
              alt={userInfo.user_name}
              src={`${image}`}
              sx={{ width: 150, height: 150 }}
              variant="rounded"

            />
          </Button>

          <div className="profile-name my-2 d-flex">
            <div>
              <h2 className="text-primary">{userInfo.user_name}</h2>
            </div>
          </div>

          <div className="mx-auto pt-4 mt-2">
            <div className="m-4 ps-4">
              <div className="d-flex justify-content-between">
                <p className="text-black-50"><EmailIcon />  {userInfo.email}</p>
                <EditProfile />
              </div>
              <p className="text-black-50"><PhoneIcon />  {userInfo.phone}</p>
              <p><a className="text-decoration-none text-black-50" target="_blank" href={userInfo.facebook} rel="noreferrer"><FacebookIcon />  Facebook</a></p>
              <p className="text-black-50"><SchoolIcon />  {userInfo.faculty}</p>
              <p className="text-black-50"><AssuredWorkloadIcon /> {userInfo.university}</p>
              <p className="text-black-50">SPE ID : {userInfo.spe_id ? userInfo.spe_id : "doesn't exist"}</p>
              <p className="text-black-50"> First Committee :  {user.first_com_name}</p>
              {
                user.second_com_name ? (
                  <p className="text-black-50">Second Committee:  {user.second_com_name}</p>
                ) : (
                  null
                )
              }

            </div>
          </div>

          <hr />

          {
            !isAdmin ? (
              <h4 className="my-4">{`Search for Tasks and meetings`}</h4>
            ) : (null)
          }
          <div className="task-options my-2 mx-2">
            {
              !isAdmin ? (
                <form onSubmit={(e) => getTasks(e)} >

                  <div className="row my-2">
                    {
                      user.second_com_name ? (
                        <FormControl className="col-6 px-1 my-2">
                          <InputLabel id="demo-simple-select-label">Committee</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={committee}
                            label="Committee"
                            required
                            onChange={(e) => setCommittee(e.target.value)}
                          >
                            {committeesList.map((com) => (
                              <MenuItem value={com.value}>{com.name}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      ) : null
                    }

                    <FormControl className="col-6 px-1 my-2">
                      <InputLabel id="demo-simple-select-label">Type</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label="Type"
                        required
                        onChange={(e) => setType(e.target.value)}
                      >
                        {typeList.map((type) => (
                          <MenuItem value={type.value}>{type.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <div className="col-6 d-flex flex-row my-2">
                      <input className="me-3 form-check-input d-flex align-self-center" type="checkbox" id="checkboxNoLabel" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} aria-label="..." />
                      <FormControl className="w-100">
                        <InputLabel id="demo-simple-select-label">Month</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={month}
                          label="Month"
                          disabled={!isChecked}
                          required={isChecked ? isChecked : !isChecked}
                          onChange={(e) => setMonth(e.target.value)}
                        >
                          {monthList.map((month) => (
                            <MenuItem value={month.value}>{month.name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>

                  </div>

                  <br />
                  <Button type="submit" className="m-0 rounded" variant="contained">
                    Search
                  </Button>
                </form>
              )
                : (null)
            }
          </div>

          <div className="row my-3">
            {
              isLoading ? <Box className="text-center mx-auto ">
                <CircularProgress />
              </Box> : null
            }
            {
              tasks.length > 0 && type ? (<h5 className="my-3 text-primary">{tasks.length} {type === 'm' ? "meetings" : type === 't' ? 'tasks' : 'tasks and meetings'}</h5>) : null
            }
            {
              error ? (<h5 className="my-3 text-danger">{error}</h5>) : null
            }

            {
              tasks.length > 0 ? (
                tasks.map(task => (
                  <div className="col-lg-4 col-sm-6 col-xs-12">
                    <Card className={`${task.type === 't' ? 'cards' : 'cards_Meeting'} text-light mb-4`}>
                      <CardActionArea className="text-light">
                        <CardContent className="d-flex justify-content-between">
                          {/* {task.type === 't' ? <TaskIcon /> : <GroupsIcon />} */}
                          <div className="align text-decoration-none text-light mx-auto">
                            <Typography className="fs-4" color="text.light">
                              {task.task_name}
                            </Typography>
                            <Typography className="fs-6 my-1" color="text.light">
                              type : {task.type === 't' ? 'task' : 'meeting'}
                            </Typography>
                            <Typography className="fs-6 my-1" color="text.light">
                              value : {task.Users[0].User_Task.value}/{task.task_value}
                            </Typography>
                            <Typography className="fs-6 my-1" color="text.light">
                              month : {task.month}
                            </Typography>
                          </div>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </div>
                ))
              ) : (
                isAdmin ? (
                  <h5 className="text-center">Admins don't have tasks. Go to <NavLink className="text-decoration-none" exact to={`${ROOT_PATH}/admin`}>admin panel</NavLink></h5>
                ) : (null)

              )
            }
          </div>

          <Modal
            className="overflow-auto"
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-photo-update"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography
                id="modal-photo-update"
                variant="h6"
                component="h2"
              >
                Edit photo
              </Typography>

              <img className="w-100 my-2 rounded" src={`${image}`} alt={user.user_name} />

              <form onSubmit={(e) => updateImage(e)}>
                <Typography id="modal-modal-description" sx={{ mt: 2 }} className="text-center w-100 mx-auto">
                  <label
                    className="text-dark border w-100 px-2 mb-3"
                    htmlFor="icon-button-file"
                  >
                    <IconButton
                      className="w-100 text-wrap mx-auto text-center"
                      color="primary"
                      aria-label="Edit photo"
                      component="span"
                    >
                      <PhotoCamera />
                      <span className="text-center text-wrap fs-6 ms-2">{newImageName ? newImageName : "Upload New Picture"}</span>
                    </IconButton>
                  </label>

                  <input
                    onChange={(e) => {
                      setUpdatedImage(e.target.files[0])
                      setNewImageName(e.target.files[0].name)
                    }}
                    required
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    style={{ display: "none" }}
                  />
                  <br />
                  <br />
                  <Button type="submit" variant="contained">Update</Button>
                </Typography>
              </form>
            </Box>
          </Modal>

        </div>
      </div>
    );
  } else {
    return (
      <Box className="mt-5 text-center mx-auto ">
        <CircularProgress />
      </Box>
    )
  }
}

export default Profile;
