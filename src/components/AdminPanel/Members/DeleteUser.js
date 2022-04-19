import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import API_PATH from "../../API_PATH";
import { UserContext } from './../../UserProvider';
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

export default function BasicModal({ user, token }) {

    const userContext = useContext(UserContext)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [success, setSuccess] = useState()
    const [error, setError] = useState()


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
                window.location.href = 'admin'
            }, 1500)
        }
    }, [success])


    const handleDelete = async (user_id) => {
        await fetch(`${API_PATH}/users/disactivate?user=${user_id}&committee=${userContext.user.first_com_id}`, {
            method: 'PUT',
            headers: { 'Authorization': token }
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    setSuccess(`${user.user_name} 's been deleted.`)
                } else {
                    setError(`Failed to delete ${user.user_name}.`)
                }
            })
    }

    return (
        <div>
            <Button size="small" color="error" onClick={handleOpen}>
                <DeleteIcon />
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Delete {user.user_name}
                    </Typography>
                    <Typography id="modal-modal-description" className="fs-5 my-3">
                        Are You Sure?
                    </Typography>
                    <Button className="me-3" variant="outlined" size="small" onClick={() => handleClose()}>
                        Cancel
                    </Button>
                    <Button variant="contained" size="small" color="error" onClick={() => handleDelete(user.user_id)}>
                        yes, Delete
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
                            <Alert severity="error" color="info">
                                {error}
                            </Alert>
                        ) : (null)
                    }
                </Box>
            </Modal>
        </div>
    );
}
