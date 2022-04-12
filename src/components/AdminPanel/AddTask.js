import React, { useState, useContext, useEffect } from 'react'
import {
    Button,
    MenuItem,
    Select,
    TextField,
    InputLabel,
    FormControl,
} from "@mui/material";
import Alert from '@mui/material/Alert';
import API_PATH from '../API_PATH';
import { UserContext } from './../UserProvider';


export default function AddTask() {

    const { user, token } = useContext(UserContext)
    const [taskName, setTaskName] = useState("")
    const [taskValue, setTaskValue] = useState("")
    const [type, setType] = useState("");
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    const [month, setMonth] = useState("")
    const typeList = [
        {
            name: "Task",
            value: "t",
        },
        {
            name: "Meeting",
            value: "m",
        },
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
        if (error) {
            setTimeout(() => {
                setError(null)
            }, 5000)
        }
    }, [error])

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                setSuccess(null)
            }, 3000)
        }
    }, [success])

    const AddTask = async (e) => {
        e.preventDefault()

        const form = new FormData()
        form.append('task_name', taskName)
        form.append('task_value', taskValue)
        form.append('type', type)
        form.append('committee_id', user.first_com_id)
        form.append('month', month)

        console.warn(taskName)
        console.warn(taskName)
        console.warn(taskValue)
        console.warn(type)
        console.warn(user.first_com_id)

        await fetch(`${API_PATH}/tasks/create`,
            {
                method: "POST",
                headers: { 'Authorization': token },
                body: form
            })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    setSuccess(data.message)
                    setTaskName('')
                    setTaskValue('')
                    setType('')
                } else {
                    setError(data.error)
                }
            })
    }

    return (
        <div className=" my-4 shadow rounded bg-white p-4 ">
            {
                success ? (
                    <Alert className="m-3" severity="success" color="info">
                        {success}
                    </Alert>
                ) : (null)
            }
            {
                error ? (
                    <Alert className="m-3" severity="error" color="error">
                        {error}
                    </Alert>
                ) : (null)
            }
            <div className="my-2">
                <h4 className="mb-4">Add Task or Meeting</h4>
                <form className="w-100" onSubmit={(e) => AddTask(e)} >
                    <div className="row">
                        <FormControl className="col-lg-6 col-sm-6 col-xs-12 mb-2">
                            <InputLabel id="demo-simple-select-label">Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={type}
                                label="Type"
                                onChange={(e) => setType(e.target.value)}
                                required

                            >
                                {typeList.map((type) => (
                                    <MenuItem value={type.value}>{type.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl className="col-lg-6 col-sm-6 col-xs-12 mb-2">
                            <InputLabel id="demo-simple-select-label">Month</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={month}
                                label="Month"
                                onChange={(e) => setMonth(e.target.value)}
                                required
                                className="col-lg-12 col-sm-12 col-xs-12 mb-2"
                            >
                                {monthList.map((month) => (
                                    <MenuItem value={month.value}>{month.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>


                        <TextField
                            className="col-lg-6 col-sm-6 col-xs-12 mb-2"
                            id="outlined-basic"
                            label="Task Name"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                            variant="outlined"
                            required
                        />

                        <TextField
                            className="col-lg-6 col-sm-6 col-xs-12 mb-2"
                            id="outlined-basic"
                            label="Value"
                            variant="outlined"
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 0 }}
                            type="number"
                            value={taskValue}
                            onChange={(e) => setTaskValue(e.target.value)}
                            required
                        />
                    </div>

                    <br />

                    <Button type="submit" className="w-25 rounded" variant="contained">
                        ADD
                    </Button>

                </form>
            </div>
        </div>
    )
}
