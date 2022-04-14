/* eslint-disable react/jsx-pascal-case */
import {
  Routes,
  Route,
  HashRouter
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
import My404Component from "./My404Component/My404Component";
import ROOT_PATH from './ROOT_PATH.js'
export default function AppRoutes() {

  const root_route = ROOT_PATH
  const { isLogging, isAdmin } = useContext(UserContext)
  return (
    // <HashRouter>
    <Routes>
      <Route path='*' exact={true} element={<My404Component />} />
      {
        isLogging ? (
          <>
            {
              isAdmin ? (
                <>
                  <Route path={`${root_route}/admin/member/:id`} element={<Member />} />
                  <Route path={`${root_route}/admin/task/:id`} element={<Task />} />
                  <Route path={`${root_route}/admin`} element={<AdminPanel />} />
                  <Route path={`${root_route}/requests`} element={<Requests />} />
                </>
              ) : null
            }
            <Route path={`${root_route}/leaderBoard`} element={<Leader_Board />} />
            <Route index path={`${root_route}/profile`} element={<Profile />} />
            <Route path={`${root_route}/logout`} element={<Logout />} />
          </>
        ) : (
          <>
            <Route index path={`${root_route}/login`} element={<Login />} />
            <Route path={`${root_route}/signup`} element={<SignUp />} />
          </>
        )
      }
    </Routes>
    // </HashRouter>
  )
}
