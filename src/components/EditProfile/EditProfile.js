import React, { useState, useEffect, useContext } from 'react'
import {
    TextField,
    Button,
    Typography,
    Box,
    Modal,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { UserContext } from './../UserProvider';
import API_PATH from './../API_PATH'
import ROOT_PATH from '../ROOT_PATH';

export default function EditProfile() {

    const { userInfo } = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [speId, setSpeId] = useState('');
    const [facebook, setFacebook] = useState('');
    const [phone, setPhone] = useState('');
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 300,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };


    useEffect(() => {
        setName(userInfo.user_name);
        setEmail(userInfo.email);
        setSpeId(userInfo.spe_id);
        setFacebook(userInfo.facebook);
        setPhone(userInfo.phone);
    }, [userInfo])

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const editInformation = async (e) => {
        e.preventDefault()

        const form = new FormData()

        form.append('user_id', userInfo.user_id)
        form.append('user_name', name)
        form.append('email', email)
        form.append('facebook', facebook)
        form.append('phone', phone)
        form.append('spe_id', speId)

        await fetch(`${API_PATH}/users/edit`, {
            method: "PUT",
            body: form
        }).then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    window.location.href = `${ROOT_PATH}/profile`
                } else {
                    alert('Failed to edit info. Please Try Again...')
                }
            })
    }

    return (
        <>
            <Button
                className="ms-auto"
                size="small"
                component="span"
                onClick={handleOpen}
                startIcon={<CreateIcon />}
            ></Button>
            <Modal
                open={open}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={(e) => editInformation(e)}>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            Edit Information
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }} className="text-center mx-auto">

                            <TextField
                                className="mb-2"
                                id="outlined-email-input"
                                label="Full Name"
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoComplete="current-email"
                            />
                            <TextField
                                className="mb-2"
                                id="outlined-email-input"
                                label="SPE ID"
                                type="text"
                                value={speId}
                                required
                                onChange={(e) => setSpeId(e.target.value)}
                                autoComplete="current-email"
                            />
                            <TextField
                                className="mb-2"
                                id="outlined-email-input"
                                label="Email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="current-email"
                            />
                            <TextField
                                className="mb-2"
                                value={phone}
                                required
                                onChange={(e) => setPhone(e.target.value)}
                                id="outlined-phone-input"
                                label="Phone"
                                type="text"
                            />
                            <TextField
                                className="mb-2"
                                value={facebook}
                                required
                                onChange={(e) => setFacebook(e.target.value)}
                                id="outlined-facebook-input"
                                label="Your facebook account url"
                                type="url"
                            />

                            {/* <TextField
                                className="mb-2"
                                value={facebook}
                                required
                                onChange={(e) => setFacebook(e.target.value)}
                                id="outlined-facebook-input"
                                label="Your facebook account url"
                                type="url"
                            />

                            <TextField
                                className="mb-2"
                                value={facebook}
                                required
                                onChange={(e) => setFacebook(e.target.value)}
                                id="outlined-facebook-input"
                                label="Your facebook account url"
                                type="url"
                            /> */}
                            <br />
                            <Button className="mx-2" variant="outlined" onClick={handleClose}>Cancel</Button>
                            <Button type='submit' variant="contained">Update</Button>
                        </Typography>
                    </form>
                </Box>
            </Modal>
        </>
    )
}
