import React, { useState, useContext, useEffect } from "react";
import { useParams, Link, NavLink } from "react-router-dom";
import {
    Box,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    Button,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import API_PATH from "../API_PATH";
import { UserContext } from "./../UserProvider";
import ROOT_PATH from '../ROOT_PATH'


export default function ResetPassword() {

    const { id, token } = useParams();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [error, setError] = useState();
    const [confirmError, setConfirmError] = useState();
    const [resetPasswordError, setResetPasswordError] = useState();
    const [success, setSuccess] = useState();

    useEffect(() => {
        console.log(id)
        console.log(token)
    }, [id, token])

    useEffect(() => {
        if (password) {
            let has8pattern = /^(?=.{8,})/
            let has8 = has8pattern.test(password);
            if (!has8) {
                setError("at least 8 characters.")
            } else {
                let hasUpperCasePattern = /(?=.[A-Z])/
                let hasUpperCase = hasUpperCasePattern.test(password);
                if (!hasUpperCase) {
                    setError('must contains uppercase characters.')
                } else {
                    setError('')
                }
            }
        } else {
            setError('')
        }
    }, [password])

    useEffect(() => {
        if (password && confirmPassword && password !== confirmPassword) {
            setConfirmError("doesn't match")
        } else {
            setConfirmError("")
        }
    }, [password, confirmPassword])

    const resetPassword = async (e) => {
        e.preventDefault();
        setResetPasswordError("")
        setSuccess("")
        let form = new FormData();
        form.append('password', password)
        console.log(password)

        await fetch(`${API_PATH}/users/resetpassword/${id}/${token}`, {
            method: 'POST',
            body: form
        }).then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    setSuccess(data.msg)
                    setTimeout(() => {
                        window.location.href = `/spe-evaluation-system/login`;
                    }, 3000)
                } else {
                    data.error && setResetPasswordError(data.error)
                }
            })

    }


    return (
        <div class="container">
            <div className="mx-auto my-5 w-100">
                <form className="shadow-lg mt-4 p-5 rounded Login mx-auto" onSubmit={resetPassword}>
                    <h4 className="text-center text-muted my-3">Reset Password</h4>
                    <FormControl className="mt-2" variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">
                            Password
                        </InputLabel>
                        <OutlinedInput
                            required={true}
                            id="outlined-adornment-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            label="Password"
                        />
                    </FormControl>
                    <Box >
                        {error ? (
                            <div className="text-center error ">
                                <span className="text-danger">{error}</span>
                            </div>
                        ) : null}
                    </Box>
                    <FormControl className="mt-3 mb-2" variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">
                            Confirm Password
                        </InputLabel>
                        <OutlinedInput
                            required={true}
                            id="outlined-adornment-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type="password"
                            label="Password"
                            disabled={error ? true : false}
                        />
                    </FormControl>
                    <Box >
                        {success ? (
                            <div>
                                <span className="text-center text-primary mt-3">{success}</span>
                            </div>
                        ) : null}
                    </Box>
                    <Box >
                        {confirmError ? (
                            <div className="text-center error mt-1">
                                <span className="text-danger">{confirmError}</span>
                            </div>
                        ) : null}
                    </Box>

                    <div className="text-center mx-auto">
                        <Button
                            className="text-center mx-auto rounded-pill px-5 p-2 mt-2"
                            variant="outlined"
                            type="submit"
                            disabled={error || confirmError || !password || !confirmPassword ? true : false}
                        >
                            Submit
                        </Button>
                    </div>
                    <Box >
                        {resetPasswordError ? (
                            <div className="text-center error mt-1">
                                <span className="text-danger">{resetPasswordError}</span>
                            </div>
                        ) : null}
                    </Box>
                </form>
            </div >
        </div>
    )
}
