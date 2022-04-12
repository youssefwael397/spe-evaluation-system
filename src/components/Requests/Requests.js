import React, { useState, useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import API_PATH from '../API_PATH';
import { UserContext } from './../UserProvider';

export default function Requests() {

    const { user, token } = useContext(UserContext)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [success, setSuccess] = useState()
    const [error, setError] = useState()
    const [requests, setRequests] = useState([])

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
                window.location.reload()
            }, 3000)
        }
    }, [success])


    useEffect(() => {
        getRequests()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [success])


    const getRequests = async () => {
        await fetch(`${API_PATH}/users?active=0&committee=${user.first_com_id}`,
            {
                method: "get",
                headers: { 'Authorization': token }
            })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    setRequests(data.disactive_users)
                }
            })
    }


    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const acceptUser = async (user_id, user_name) => {

        console.log(user_id)
        await fetch(`${API_PATH}/users/activate?user=${user_id}&committee=${user.first_com_id}`, {
            method: 'PUT',
            headers: { 'Authorization': token }
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    setSuccess(`${user_name} 's been activated.`)
                } else {
                    setError(`Failed to activate ${user_name}.`)
                }
            })
    }

    const rejectUser = async (user_id, user_name) => {

        console.log(user_id)
        await fetch(`${API_PATH}/users/disactivate?user=${user_id}&committee=${user.first_com_id}`, {
            method: 'PUT',
            headers: { 'Authorization': token }
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    setSuccess(`${user_name} 's been rejected.`)
                } else {
                    setError(`Failed to reject ${user_name}.`)
                }
            })
    }


    return (
        <>
            <Box className="m-0 p-0">
                <Tooltip title={null}>
                    <IconButton
                        className="text-white opacity-75"
                        onClick={handleClick}
                        size="small"
                        sx={{ m: 0, p: 0 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                    // aria-expanded={open ? 'true' : undefined}
                    >
                        <NotificationsIcon className="mx-1" />
                        Requests
                        <span class="badge badge-warning text-warning">{requests.length}</span>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                style={{ marginTop: '30px', padding: '20px', maxHeight: '400px', overflow: 'auto' }}
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
            >
                {
                    success ? (
                        <Alert severity="success" color="info">
                            {success}
                        </Alert>
                    ) : (null)
                }
                {
                    error ? (
                        <Alert severity="error" color="info">
                            {error}
                        </Alert>
                    ) : (null)
                }
                {
                    requests.length > 0 ? (
                        requests.map((user, index) => (
                            <>
                                <div class="p-3 bg-body rounded">
                                    <span className="fs-5">{user.user_name}</span>
                                    <br />
                                    <span className="text-secondary my-2">{user.email}</span>
                                    <div className="my-2">
                                        <Button onClick={() => acceptUser(user.user_id, user.user_name)} variant="contained">Accept</Button>
                                        <Button onClick={() => rejectUser(user.user_id, user.user_name)} className='ms-3' color="error" variant="outlined">Reject</Button>
                                    </div>
                                </div>
                                {
                                    requests.length - 1 === index ? null : <hr className="text-primary" />
                                }
                            </>
                        ))
                    ) : (
                        <p className="m-3">There is no Requests</p>
                    )
                }
            </Menu>
        </>
    );
}
