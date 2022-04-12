import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import API_PATH from "../../API_PATH";
import {
    Select,
    FormControl,
    InputLabel,
    MenuItem,
    Typography,
} from '@mui/material';

import Alert from '@mui/material/Alert';



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


export default function AddCommitteeButton({ user_id, token }) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [committee, setCommittee] = useState();
    const [success, setSuccess] = useState()
    const [error, setError] = useState()


    const committeesList = [
        {
            name: "Academy",
            value: "Academy"
        },
        {
            name: "Android",
            value: "Android"
        },
        {
            name: "E4ME",
            value: "E4ME"
        },
        {
            name: "Extracurricular",
            value: "Extra"
        },
        {
            name: "HRD",
            value: "HRD"
        },
        {
            name: "HRM",
            value: "HRM"
        },
        {
            name: "IR",
            value: "IR"
        },
        {
            name: "Logistics",
            value: "Logistics"
        },
        {
            name: "Multimedia",
            value: "Multimedia"
        },
        {
            name: "Magazine Designs",
            value: "Magazine_Designs"
        },
        {
            name: "Web",
            value: "Web"
        },
        {
            name: "Magazine Editing",
            value: "Magazine_Editing"
        },
        {
            name: "Direct Marketing",
            value: "Direct_Marketing"
        },
        {
            name: "Organizing",
            value: "OC"
        },
        {
            name: "SOCIAL MEDIA",
            value: "SOCIAL_MEDIA"
        },
        {
            name: "DATA SCIENCE",
            value: "DATA SCIENCE"
        },
    ]



    const handleChangeCommittee = (event) => {
        setCommittee(event.target.value);
    };

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
            }, 1500)
        }
    }, [success])

    const handleAddCommittee = async (e) => {
        e.preventDefault()
        let form = new FormData()
        form.append('user_id', user_id)
        form.append('committee', committee)

        await fetch(`${API_PATH}/users/addcommittee`, {
            method: 'PUT',
            headers: { 'Authorization': token },
            body: form
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    setSuccess(`New Committee 's been Added.`)
                } else {
                    setError(`Failed to Add New Committee`)
                }
            })
    }

    return (
        <div>
            <Button variant="contained" size="small" color="primary" onClick={handleOpen}>
                Add Second Committee
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-photo-update"
                        variant="h6"
                        className="text-center mb-2"
                    >
                        Add Second Committee
                    </Typography>
                    <form onSubmit={(e) => handleAddCommittee(e)}>
                        <FormControl className='w-100 px-2 mb-3'>
                            <InputLabel id="demo-simple-select-helper-label">Committee</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={committee}
                                label="Committee"
                                required
                                onChange={handleChangeCommittee}
                                MenuProps={MenuProps}
                            >
                                {
                                    committeesList.map(com => (
                                        <MenuItem value={com.value}>{com.name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <br />
                        <Button className="mx-2 mb-3" variant="outlined" size="small" onClick={() => handleClose()}>
                            Cancel
                        </Button>
                        <Button className="mx-2 mb-3" type="submit" variant="contained" size="small" color="primary" >
                            Add {committee ? committee : null}
                        </Button>
                        {
                            success ? (
                                <Alert severity="success" color="info">
                                    {success}
                                </Alert>
                            ) : (null)
                        }
                        {
                            error ? (
                                <Alert severity="error" color="error">
                                    {error}
                                </Alert>
                            ) : (null)
                        }
                    </form>
                </Box>
            </Modal>
        </div>
    );
}
