import React, { useState, useEffect, useContext } from "react";
import "./Leader_Board.css";
import { UserContext } from './../UserProvider';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {
    FormControl,
    MenuItem,
    Select,
    InputLabel,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    Button,
    TableRow,
    Paper,
} from "@mui/material";

import API_PATH from "../API_PATH";

function Leader_Board() {
    const { user } = useContext(UserContext);
    let count = 0;
    const [month, setMonth] = useState("");
    const [idleError, setIdleError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isRequestSent, setIsRequestSent] = useState(false);
    const [members, setMembers] = useState([]);
    const [sortedMembers, setSortedMembers] = useState([]);
    const [committee, setCommittee] = useState();
    const monthList = [
        {
            name: "JANUARY",
            value: 1,
        },
        {
            name: "FEBRUARY",
            value: 2,
        },
        {
            name: "MARCH",
            value: 3,
        },
        {
            name: "APRIL",
            value: 4,
        },
        {
            name: "MAY",
            value: 5,
        },
        {
            name: "JUNE",
            value: 6,
        },
        {
            name: "JULY",
            value: 7,
        },
        {
            name: "AUGUST",
            value: 8,
        },
        {
            name: "SEPTEMBER",
            value: 9,
        },
        {
            name: "OCTOBER",
            value: 10,
        },
        {
            name: "NOVEMBER",
            value: 11,
        },
        {
            name: "DECEMBER",
            value: 12,
        },
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

    useEffect(() => {
        if (!user.second_com_name) {
            setCommittee(user.first_com_name)
        }
    }, [user.first_com_name, user.second_com_name])

    useEffect(() => {
        const sortedLeaderBoard = sortLeaderBoard(members)
        setSortedMembers([...sortedLeaderBoard])
        setIsLoading(false)
        if (sortedLeaderBoard.length < 1) {
            setIdleError("This month is full of idleness. There is no tasks or meetings.")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [members])

    const getLeaderBoard = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setIsRequestSent(true)
        setIdleError('')
        await fetch(`${API_PATH}/users/board/${committee}/${month}`)
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw new Error()
                }
            }).then(data => setMembers(data))
            .catch(error => console.log(error))
    }

    const sortLeaderBoard = (members) => {
        const leaderBoard = members.map(member => {
            return {
                user_name: member.user_name,
                image: member.image,
                meetings: `${member.user_meeting_grades ? member.user_meeting_grades : member.type === 'm' ? member.user_grades : '0'}/${member.type === 'm' ? member.task_grades : !member.type ? member.meeting_grades : '0'}`,
                tasks: `${member.user_task_grades ? member.user_task_grades : member.type === 't' ? member.user_grades : '0'}/${member.type === 't' || !member.type ? member.task_grades : '0'}`,
                total: `${member.user_task_grades ? (+member.user_task_grades + +member.user_meeting_grades) : member.user_grades}/${member.meeting_grades ? (+member.task_grades + +member.meeting_grades) : member.task_grades}`,
                percent: `${member.user_task_grades ? Math.round((+member.user_task_grades + +member.user_meeting_grades) / (+member.task_grades + +member.meeting_grades) * 100) : Math.round((member.user_grades / member.task_grades) * 100)}`
            }
        })


        for (let i = 0; i < leaderBoard.length; i++) {
            for (let j = 0; j < leaderBoard.length - 1; j++) {
                if (+leaderBoard[j].percent < +leaderBoard[j + 1].percent) {
                    let temp = leaderBoard[j];
                    leaderBoard[j] = leaderBoard[j + 1];
                    leaderBoard[j + 1] = temp
                }
            }
        }

        return leaderBoard
    }

    return (
        <div className="container-xl mx-auto text-center">
            <div className=" my-4 shadow rounded bg-white p-4  w-100">
                <div className=" my-2  mx-auto">
                    <form onSubmit={(e) => getLeaderBoard(e)} >

                        <div className="d-flex">

                            {
                                user.second_com_name ? (
                                    <FormControl className="mx-auto w-50 px-2">
                                        <InputLabel className="px-3" id="demo-simple-select-label">Committee</InputLabel>
                                        <Select
                                            className="px-3"
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

                            <FormControl className="mx-auto w-50 px-2">
                                <InputLabel className="px-3" id="demo-simple-select-label">Month</InputLabel>
                                <Select
                                    className="px-3"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={month}
                                    label="Month"
                                    required
                                    onChange={(e) => setMonth(e.target.value)}
                                >
                                    {monthList.map((month) => (
                                        <MenuItem value={month.value}>{month.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                        </div>

                        <br />
                        <Button type="submit" className="m-0 rounded" variant="contained">
                            Search
                        </Button>
                    </form>
                </div>

                <div className="task-container my-4 ">
                    {
                        isLoading && <Box sx={{ width: '100%' }}>
                            <LinearProgress />
                        </Box>
                    }


                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead className="bg-dark">
                                <TableRow>
                                    <TableCell className="fw-bold text-light">No.</TableCell>
                                    <TableCell className="fw-bold text-light" align="center">Photo</TableCell>
                                    <TableCell className="fw-bold text-light" align="center">Name</TableCell>
                                    <TableCell className="fw-bold text-light" align="center">Meetings</TableCell>
                                    <TableCell className="fw-bold text-light" align="center">Tasks</TableCell>
                                    <TableCell className="fw-bold text-light" align="center">Total</TableCell>
                                    <TableCell className="fw-bold text-light" align="center">Percent</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    isLoading ? (
                                        null
                                    ) : (
                                        sortedMembers.map((member, index) => (
                                            <TableRow
                                                className="my-grades"
                                                key={member.user_name}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="member">
                                                    {
                                                        index === 3 ? count = count + 4 : null
                                                    }
                                                    {
                                                        index > 3 && ++count
                                                    }
                                                    {
                                                        index === 0 && <WorkspacePremiumIcon style={{ color: '#FFD700' }} />
                                                    }
                                                    {
                                                        index === 1 && <WorkspacePremiumIcon style={{ color: '#C0C0C0' }} />
                                                    }
                                                    {
                                                        index === 2 && <WorkspacePremiumIcon style={{ color: '#CD7F32' }} />
                                                    }
                                                </TableCell>
                                                <TableCell align="center">
                                                    <LazyLoadImage
                                                        className="rounded Leader_Board-image mx-auto"
                                                        alt={member.user_name}
                                                        src={member.image}
                                                        height="120px"
                                                        effect="opacity"
                                                    />
                                                </TableCell>
                                                <TableCell align="center">{member.user_name}</TableCell>
                                                <TableCell align="center">{member.meetings}</TableCell>
                                                <TableCell align="center">{member.tasks}</TableCell>
                                                <TableCell align="center">{member.total}</TableCell>
                                                <TableCell align="center">{member.percent}%</TableCell>
                                            </TableRow>
                                        ))
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {
                        sortedMembers.length < 1 && members.length < 1 && month && isRequestSent ? <h5 className="mt-3 text-danger">{idleError}</h5> : null
                    }
                </div>
            </div>
        </div>
    )
}

export default Leader_Board;