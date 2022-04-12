/* eslint-disable react/jsx-pascal-case */
import {
  Routes,
  Route,
} from "react-router-dom";
import React, { useContext } from 'react'
import SignUp from './Sign up/Sign up';
import Profile from './Profile/Profile';
import Login from './Login/Login';
import AdminPanel from './AdminPanel/AdminPanel';
import Leader_Board from './Leader_Board/Leader_Board';
import Logout from './Logout/Logout';
import { UserContext } from './UserProvider';
import Requests from './Requests/Requests';
import Member from './AdminPanel/Member/Member';
import Task from './AdminPanel/Task';

export default function AppRoutes() {

  const { isLogging, isAdmin } = useContext(UserContext)
  return (
    <Routes>
      {
        isLogging ? (
          <>
            {
              isAdmin ? (
                <>
                  <Route path="admin/member/:id" element={<Member />} />
                  <Route path="admin/task/:id" element={<Task />} />
                  <Route path="/admin" element={<AdminPanel />} />
                  <Route path="/requests" element={<Requests />} />
                </>
              ) : null
            }
            <Route path="/leaderBoard" element={<Leader_Board />} />
            <Route index path="/" element={<Profile />} />
            <Route path="/logout" element={<Logout />} />
          </>
        ) : (
          <>
            <Route index path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </>

        )
      }
    </Routes>

  )
}
