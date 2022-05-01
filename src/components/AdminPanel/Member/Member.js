import React, { useState, useEffect, useContext } from 'react'
import { useParams, Link } from "react-router-dom";
import {
    FormControl,
    MenuItem,
    Select,
    InputLabel,
    Box,
    Button,
    Typography,
    Modal,
    Card,
    CardContent,
    CardActionArea
} from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import DeleteUser from '../Members/DeleteUser'
import TaskIcon from '@mui/icons-material/Task';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupsIcon from '@mui/icons-material/Groups';
import SchoolIcon from '@mui/icons-material/School';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import API_PATH from "../../API_PATH";
import { UserContext } from '../../UserProvider';
import AddCommitteeButton from './AddCommitteeButton';
import ROOT_PATH from '../../ROOT_PATH';
import CircularProgress from '@mui/material/CircularProgress';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Member() {

    const params = useParams();

    const { user, token } = useContext(UserContext);
    const [deleteTaskUser] = useState({})
    const [userInfo, setUserInfo] = useState({});
    const [firstCom, setFirstCom] = useState();
    const [secondCom, setSecondCom] = useState();
    const [month, setMonth] = useState("");
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [error, setError] = useState(false);
    const [type, setType] = useState("");
    const [open, setOpen] = React.useState(false);
    const handleOpen = (task) => { setOpen(true); setTask({ ...task }) };
    const handleClose = () => setOpen(false);

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
        getUserInfo()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getTasks = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError(false)
        setTasks([])
        let api_url = ``;

        if (type === 'a') {
            if (isChecked) {
                api_url = `${API_PATH}/tasks?committee=${user.first_com_name}&user=${params.id}&month=${month}`;
            } else {
                api_url = `${API_PATH}/tasks?committee=${user.first_com_name}&user=${params.id}`;
            }
        }

        if (type !== 'a') {
            if (isChecked) {
                api_url = `${API_PATH}/tasks?committee=${user.first_com_name}&user=${params.id}&type=${type}&month=${month}`
            } else {
                api_url = `${API_PATH}/tasks?committee=${user.first_com_name}&user=${params.id}&type=${type}`
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
                }
            })

    }

    const getUserInfo = async () => {
        await fetch(`${API_PATH}/users/${params.id}`)
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    setUserInfo({ ...data.user })
                }
            })
    }

    const handleDeleteTaskUser = async () => {
        let api_url = `${API_PATH}/tasks?task=${task.task_id}&user=${userInfo.user_id}`;

        await fetch(api_url, {
            method: 'DELETE',
            headers: { "Authorization": token }

        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    window.location.reload()
                } else {
                    alert(`Failed to delete ${deleteTaskUser.name}`)
                }
            })
    }

    useEffect(() => {

        console.warn(userInfo)
        console.warn(user)


        if (userInfo.first_com_id === user.first_com_id && userInfo.first_com_id !== null) {
            fetch(`${API_PATH}/committees/${userInfo.first_com_id}`)
                .then(res => res.json())
                .then(data => {
                    if (data.status === 'ok') {
                        setFirstCom(data.committee[0].committee_name)
                    }
                })
        }
        else if (userInfo.second_com_id === user.first_com_id && userInfo.second_com_id !== null) {
            fetch(`${API_PATH}/committees/${userInfo.second_com_id}`)
                .then(res => res.json())
                .then(data => {
                    if (data.status === 'ok') {
                        setFirstCom(data.committee[0].committee_name)
                    }
                })
        }
    }, [firstCom, user, userInfo])

    useEffect(() => {

        if (userInfo.first_com_id !== user.first_com_id && userInfo.first_com_id !== null) {

            fetch(`${API_PATH}/committees/${userInfo.first_com_id}`)
                .then(res => res.json())
                .then(data => {
                    if (data.status === 'ok') {
                        setSecondCom(data.committee[0].committee_name)
                    }
                })
        } else if (userInfo.second_com_id !== user.first_com_id && userInfo.second_com_id !== null) {
            fetch(`${API_PATH}/committees/${userInfo.second_com_id}`)
                .then(res => res.json())
                .then(data => {
                    if (data.status === 'ok') {
                        setSecondCom(data.committee[0].committee_name)
                    }
                })
        }
    }, [secondCom, user, userInfo])

    if (user && userInfo && firstCom) {

        return (
            <div className="container-xl">

                <div className="my-4 rounded bg-white p-4 position-relative w-100">
                    <div className="row">
                        <div className="col-lg-6 col-sm-6 col-xs-12 text-center mx-auto px-5 mb-3">
                            <img
                                className="profile-image rounded text-center mx-auto w-100"
                                alt={userInfo.user_name}
                                src={`${userInfo.image}`}
                                height={userInfo.image.height}
                            />
                        </div>

                        <div className=" col-lg-6 col-sm-6 col-xs-12 ">
                            <div className="d-flex justify-content-between">
                                <h2 className="text-primary">{userInfo.user_name}</h2>
                                <DeleteUser user={userInfo} token={token} />
                            </div>
                            <hr className="w-25 rounded line" />
                            <p className="text-black-50"><EmailIcon />  {userInfo.email}</p>
                            <p className="text-black-50"><PhoneIcon />  {userInfo.phone}</p>
                            <p><a className="text-decoration-none text-black-50" target="_blank" href={userInfo.facebook} rel="noreferrer"><FacebookIcon />  Facebook</a></p>
                            <p className="text-black-50"><SchoolIcon />  {userInfo.faculty}</p>
                            <p className="text-black-50"><AssuredWorkloadIcon /> {userInfo.university}</p>
                            <p className="text-black-50"><AccessTimeIcon /> Created At :  {userInfo.createdAt}</p>
                            <p className="text-black-50">SPE ID : {userInfo.spe_id ? userInfo.spe_id : "doesn't exist"}</p>
                            <p className="text-black-50"> First Committee :  {firstCom}</p>
                            {
                                secondCom ? (
                                    <p className="text-black-50">Second Committee:  {secondCom}</p>
                                ) : (
                                    <AddCommitteeButton user_id={params.id} token={token} />
                                )
                            }
                        </div>
                    </div>

                    <hr />

                    <h4 className="my-4">{`Search for Tasks and meetings`}</h4>
                    <div className="task-options my-2 mx-2">
                        <form onSubmit={(e) => getTasks(e)} >
                            <div className="row my-2">
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
                    </div>

                    <div className="row my-3">
                        {
                            isLoading ? <Box className="text-center mx-auto mt-3">
                                <CircularProgress />
                            </Box> : null
                        }
                        {
                            tasks.length > 0 ? (<h5 className="my-3 text-primary">{tasks.length} {type === 'm' ? "meetings" : type === 't' ? 'tasks' : 'tasks and meetings'}</h5>) : null
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
                                                    {task.type === 't' ? <TaskIcon /> : <GroupsIcon />}
                                                    <Link className="align text-decoration-none text-light text-center" to={`${ROOT_PATH}/admin/task/${task.task_id}`}>
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
                                                    </Link>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        <Button onClick={() => handleOpen(task)} className="float-end"><DeleteIcon className="text-danger" /></Button>
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </div>
                                ))
                            ) : (null)
                        }
                    </div>

                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style} className="border border-secondary rounded-3">
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Delete {task.task_name} from {userInfo.user_name}
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <p>Are You Sure?</p>
                                <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                                <Button variant="contained" color="error" onClick={handleDeleteTaskUser} className="ms-2">Delete</Button>
                            </Typography>
                        </Box>
                    </Modal>

                </div>

            </div>
        )
    } else {
        return (
            <Box className="mt-5 text-center mx-auto ">
                <CircularProgress />
            </Box>
        )
    }
}
