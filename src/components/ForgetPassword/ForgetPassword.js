import React, { useState } from "react";
import {
    Box,
    TextField,
    Button,
} from "@mui/material";

import API_PATH from "../API_PATH";

export default function ForgetPassword() {

    const [email, setEmail] = useState();
    const [error, setError] = useState();
    const [success, setSuccess] = useState();

    const handleForgetPassword = async (e) => {
        e.preventDefault();
        setError("")
        setSuccess("")
        let form = new FormData();
        form.append('email', email)
        await fetch(`${API_PATH}/users/forgetpassword`, {
            method: 'POST',
            body: form
        }).then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    setSuccess(data.msg)
                } else {
                    data.error && setError(data.error)
                }
            })
    }

    return (
        <div class="container">
            <div className="mx-auto my-5 w-100">
                <form className="shadow-lg mt-4 p-5 rounded Login mx-auto" onSubmit={handleForgetPassword}>
                    <h4 className="text-center text-muted my-3">Forget Password</h4>
                    <TextField className="text-center my-2"
                        id="outlined-email-input"
                        label="Enter Your Email"
                        type="email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Box >
                        {success ? (
                            <div>
                                <span className="text-center text-primary mt-3">{success}</span>
                            </div>
                        ) : null}
                    </Box>
                    <Box >
                        {error ? (
                            <div className="text-center error mt-1">
                                <span className="text-danger">{error}</span>
                            </div>
                        ) : null}
                    </Box>

                    <div className="text-center mx-auto">
                        <Button
                            className="text-center mx-auto rounded-pill px-5 p-2 mt-2"
                            variant="outlined"
                            type="submit"
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </div >
        </div>
    )
}
