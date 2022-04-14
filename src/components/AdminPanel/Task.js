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
    TextField,
    CardActionArea
} from "@mui/material";
import ListItemText from '@mui/material/ListItemText';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';
import GroupsIcon from '@mui/icons-material/Groups';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import DeleteIcon from '@mui/icons-material/Delete';
import API_PATH from "./../API_PATH";
import { UserContext } from './../UserProvider';
import PersonIcon from "@mui/icons-material/Person";
import ROOT_PATH from '../ROOT_PATH';

// import { UserContext } from '../../UserProvider';


export default function Task() {

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

    const params = useParams();
    const { token } = useContext(UserContext);
    const [task, setTask] = useState({});
    const [taskValue, setTaskValue] = useState("")
    const [users, setUsers] = useState([]);
    const [deleteTaskUser, setDeleteTaskUser] = useState({})
    const [taskUsers, setTaskUsers] = useState({});
    const [open, setOpen] = useState(false);
    const [personNames, setPersonNames] = useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonNames(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleOpen = (id, name) => {
        setOpen(true)
        setDeleteTaskUser({
            id: id,
            name: name
        })
    };
    const handleClose = () => setOpen(false);

    useEffect(() => {
        getTask()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params])

    useEffect(() => {
        if (task) {
            getTaskUsers()
            getUsers()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [task])
    const getTask = async () => {
        let api_url = `${API_PATH}/tasks/${params.id}`;

        await fetch(api_url)
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    setTask({ ...data.task })
                } else {
                    setTask({})
                }
            })
    }

    const getUsers = async () => {
        let api_url = `${API_PATH}/users?committee=${task.committee_id}&active=1`;

        await fetch(api_url, {
            method: 'GET',
            headers: { "Authorization": token }
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    setUsers([...data.active_users])
                } else {
                    setUsers([])
                }
            })
    }

    const getTaskUsers = async () => {
        let api_url = `${API_PATH}/tasks/users/${task.task_id}`;

        await fetch(api_url, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    setTaskUsers({ ...data.task_users })
                } else {
                    setTaskUsers({})
                }
            })
    }

    const handleDeleteTaskUser = async () => {
        let api_url = `${API_PATH}/tasks?task=${task.task_id}&user=${deleteTaskUser.id}`;

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

    const InsertUsers = async (e) => {
        e.preventDefault()
        const form = {
            "users": personNames.map(person => {
                return { "name": person }
            }),
            "value": taskValue,
            "task": task.task_id
        }
        let api_url = `${API_PATH}/tasks/insert`;

        await fetch(api_url, {
            method: 'POST',
            headers: { "Authorization": token, "Content-Type": "application/json" },
            body: JSON.stringify(form)
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    window.location.reload()
                } else {
                    alert(`Failed to add members to ${task.task_name}`)
                }
            })
    }


    const deleteTaskById = async () => {
        let api_url = `${API_PATH}/tasks?task=${task.task_id}`;

        await fetch(api_url, {
            method: 'DELETE',
            headers: { "Authorization": token }

        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    window.location.href = "../"
                } else {
                    alert(`Failed to delete ${task.task_name}`)
                }
            })
    }

    return (
        <div className="container-xl">
            <div className="my-4 rounded bg-white p-4 position-relative w-100">
                <div className="d-flex align-items-center my-4">
                    <div className="d-flex ">
                        <h5 className="text-secondary mx-2">{taskUsers.Users ? taskUsers.Users.length : null} {taskUsers.Users ? <GroupsIcon className="fs-3" /> : null}</h5>
                        <h5 className="text-danger mx-2">{task.task_value} <FormatListNumberedRtlIcon /></h5>
                    </div>
                    <h4 className="text-primary text-center mx-auto">{task.task_name} {task.type === "m" ? 'meeting' : 'task'}</h4>
                    <Button onClick={deleteTaskById}><DeleteIcon className="text-danger me-auto" /></Button>
                </div>
                <hr />
                <div className="task-options mb-2">
                    <h5 className="my-2">Add members values</h5>
                    <br />
                    <form onSubmit={(e) => InsertUsers(e)} >
                        <FormControl
                            className="w-100 mb-3"
                        >
                            <InputLabel id="demo-multiple-checkbox-label">Members</InputLabel>
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={personNames}
                                onChange={handleChange}
                                input={<OutlinedInput label="Members" />}
                                required
                                renderValue={(selected) => selected.join(', ')}
                            >

                                {
                                    users.map((user) => (
                                        <MenuItem key={user.user_name} value={user.user_name}>
                                            <Checkbox checked={personNames.indexOf(user.user_name) > -1} />
                                            <ListItemText primary={user.user_name} />
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>

                        <TextField
                            className="w-100 mb-2"
                            id="outlined-basic"
                            label="Value"
                            variant="outlined"
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 0, max: task.task_value + 2 }}
                            type="number"
                            value={taskValue}
                            onChange={(e) => setTaskValue(e.target.value)}
                            required
                        />
                        <br />
                        <br />

                        <Button type="submit" className="w-25 rounded" variant="contained">
                            Add
                        </Button>
                    </form>
                </div>

                {/* //////////////////////////////////// */}

                <div className="row my-4">
                    {
                        taskUsers.Users ? (
                            taskUsers.Users.map(user => (
                                <div className="col-lg-4 col-sm-6 col-xs-12">
                                    <Card className={`bg-light text-dark mb-4`}>
                                        <CardActionArea>
                                            <CardContent>
                                                <Typography className="d-flex justify-content-between" gutterBottom variant="h5" component="div">
                                                    <PersonIcon />
                                                    <Link className=" align text-decoration-none text-center" to={`${ROOT_PATH}/admin/member/${user.user_id}`}>
                                                        <Typography className=" text-primary fs-4"  >
                                                            {user.user_name}
                                                        </Typography>
                                                        <Typography className=" text-secondary fs-6" variant="body2" >
                                                            value : {user.User_Task.value}/{task.task_value}
                                                        </Typography>
                                                    </Link>
                                                    <Button onClick={() => handleOpen(user.user_id, user.user_name)} ><DeleteIcon className="text-danger" /></Button>
                                                </Typography>

                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </div>
                            ))
                        ) : <p className="fs-4 text-center">There is no members yet</p>
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
                            Delete {task.task_name} from {deleteTaskUser.name}
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
}
