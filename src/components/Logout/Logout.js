import React, { useEffect, useContext } from 'react'
import { UserContext } from './../UserProvider';
import ROOT_PATH from '../ROOT_PATH'
export default function Logout() {

    const { user } = useContext(UserContext)
    useEffect(() => {
        window.localStorage.clear()
        window.location = `login`
    }, [])


    return (
        <div className="text-center container my-5">
            <h3 className="text-primary">Great Job {user.user_name}</h3>
        </div>
    )
}
