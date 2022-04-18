import * as React from "react";
import { useEffect, useState, useContext } from 'react';
import {
    Button,
    TextField,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";
import { Link } from 'react-router-dom';
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from "@mui/icons-material/Facebook";
import { UserContext } from './../../UserProvider';
import DeleteUser from './DeleteUser'
import API_PATH from "../../API_PATH";


export default function Members() {

    const { user, token } = useContext(UserContext);
    const [members, setMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [searchValue, setSearchValue] = useState('')


    useEffect(() => {
        getActiveMembers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (searchValue !== '') {
            setFilteredMembers(members.filter((user) =>
                user.user_name.toLowerCase().includes(searchValue.toLowerCase().trim()) || user.email.toLowerCase().includes(searchValue.toLowerCase().trim()) || user.phone.includes(searchValue.trim())
            ))
        } else {
            setFilteredMembers(members)
        }

    }, [members, searchValue])

    const getActiveMembers = async () => {
        await fetch(`${API_PATH}/users/?active=1&committee=${user.first_com_id}`, {
            headers: { 'Authorization': token }
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    setMembers([...data.active_users])
                }
            })
    }

    return (
        <div className="mx-auto">
            <div className="AdminPanel my-4 shadow rounded bg-white p-4 w-100">
                <div className="AdminPanel-name my-2">
                    <h4>{members.length} Members</h4>
                    {/* search input */}
                    <TextField
                        className="w-100 my-2"
                        id="outlined-basic"
                        label="Search by name, email or phone number"
                        variant="outlined"
                        type="search"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        required
                    />
                    {/* Members Container */}
                    <div className="row mt-4">
                        {
                            filteredMembers.map(member => (
                                <Card className="col-lg-4 col-md-6 col-xs-12 mb-4 p-4">
                                    <CardMedia
                                        component="img"
                                        height="400"
                                        image={`${member.image}`}
                                        alt={member.user_name}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {member.user_name}
                                        </Typography>
                                        <Typography color="text.secondary">
                                            <EmailIcon className="my-1" /> {member.email}
                                            <br />
                                            <PhoneIcon className="my-1" /> {member.phone}
                                            {/* <br /> */}
                                            {/* <TaskIcon className="my-1" /> 100
                                            <br />
                                            <GroupsIcon className="my-1" /> 100 */}
                                        </Typography>
                                    </CardContent>
                                    <CardActions className="d-flex justify-content-between">
                                        <div >
                                            <a className="text-decoration-none" href={member.facebook} target="_blank" rel="noreferrer">
                                                <Button size="small">
                                                    <FacebookIcon /> Facebook
                                                </Button>
                                            </a>
                                            <Link className="text-decoration-none mx-2" exact to={`member/${member.user_id}`}>More</Link>
                                        </div>
                                        <div>
                                            <DeleteUser user={member} token={token} />
                                        </div>
                                    </CardActions>
                                </Card>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
