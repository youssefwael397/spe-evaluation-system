import React, { useEffect, useContext } from 'react'
import { UserContext } from './../UserProvider';

export default function Logout() {

    const { user } = useContext(UserContext)
    useEffect(() => {
        window.localStorage.clear()
        window.location = "/"
    }, [])


    return (
        <div className="text-center container my-5">
            <h3 className="text-primary">Great Job {user.user_name}</h3>
        </div>
    )
}
