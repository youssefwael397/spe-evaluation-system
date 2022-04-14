import React, { useContext } from 'react'
import Alert from '@mui/material/Alert';
import { Link } from 'react-router-dom'
import { UserContext } from './../UserProvider';
import ROOT_PATH from '../ROOT_PATH'

export default function My404Component() {
    const { isLogging } = useContext(UserContext)
    const root_route = ROOT_PATH
    return (
        <div className='container text-center mx-auto'>
            {
                isLogging ? (<Alert className="my-4 p-3 text-center" severity="error"><h3>ERROR 404 page not found. <Link className="text-decoration-none" exact to={`${root_route}/profile`}>Go To Profile Page.</Link> </h3></Alert>) : (<Alert className=" my-4 p-3 text-center" severity="error"><h5>ERROR 404 page not found. <Link className="text-decoration-none" exact to={`${root_route}/login`}>Go To Login Page.</Link> </h5></Alert>)
            }
        </div >
    )
}
