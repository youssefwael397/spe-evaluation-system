import React, { useState, useEffect, useContext } from "react";
import { Avatar } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { NavLink } from "react-router-dom";
import Requests from '../Requests/Requests'
import { UserContext } from './../UserProvider'
import ROOT_PATH from '../ROOT_PATH.js'
import logo from './logo.png'

const NavBar = () => {

  const root_route = ROOT_PATH
  const { user, userInfo, image, isLogging, isAdmin } = useContext(UserContext)
  const [navListItems, setNavListItems] = useState([])

  useEffect(() => {

    if (isAdmin && isLogging) {
      console.log("is logging and admin")

      setNavListItems([
        {
          path: `${root_route}/profile`,
          title: userInfo.user_name,
          icon: (
            <Avatar
              className="mx-1"
              alt={userInfo.user_name}
              src={`${image}`}
              sx={{ width: 30, height: 30 }}
            />
          ),
        },
        {
          path: `${root_route}/leaderBoard`,
          title: "Leader Board",
          icon: <LeaderboardIcon className="mx-1" />,
        },
        {
          path: `${root_route}/admin`,
          title: "Admin Panel",
          icon: <AdminPanelSettingsIcon className="mx-1" />,
        },
        {
          path: "/requests",
        },
        {
          path: `${root_route}/logout`,
          title: "Logout",
          icon: <LogoutIcon className="text-secondary mx-1" />
          ,
        }
      ])
    } else if (!isAdmin && isLogging) {
      console.log("not logging or admin")
      setNavListItems([
        {
          path: `${root_route}/profile`,
          title: user.user_name,
          icon: (
            <Avatar
              className="mx-1"
              alt={userInfo.user_name}
              src={`${image}`}
              sx={{ width: 30, height: 30 }}
            />
          ),
        },
        {
          path: `${root_route}/leaderBoard`,
          title: "Leader Board",
          icon: <LeaderboardIcon className="mx-1" />,
        },
        {
          path: `${root_route}/logout`,
          title: "Logout",
          icon: <LogoutIcon className="text-secondary mx-1" />
          ,
        },
      ])
    } else {
      console.log("not logging")
      setNavListItems([
        {
          path: `${root_route}/signup`,
          title: 'Register',
          icon: (
            <PersonAddIcon />
          ),
        },
        {
          path: `${root_route}/login`,
          title: 'Login',
          icon: (
            <LoginIcon />
          ),
        },
      ])
    }
  }, [isAdmin, isLogging, user.user_name, image])

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-spe-logo nav-shadow">
      <div className="container-xl">
        <NavLink className="navbar-brand" exact to={isLogging ? `${root_route}/profile` : `${root_route}/login`}>
          <img width="65px" src={logo} alt="logo" />
          <span className="mx-2 fs-5 ">SPESUSCES</span>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse mx-auto" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {
              navListItems.map((item) => (
                item.path.includes('profile') ? (
                  <li className="nav-item">
                    <NavLink className="nav-link d-flex align-items-center" exact to={item.path}>
                      {item.icon}
                      <span className="fs-6">{item.title}</span>
                    </NavLink>
                  </li>
                ) : (
                  item.path === "/requests" ? (
                    <li className="nav-item" >
                      <NavLink className="nav-link" exact to="#">
                        <Requests />
                      </NavLink>
                    </li>
                  ) : (
                    <li className="nav-item" >
                      <NavLink className="nav-link" exact to={item.path}>
                        {item.icon}
                        {item.title}
                      </NavLink>
                    </li>
                  )
                )
              )
              )
            }
          </ul>
        </div>
      </div>
    </nav >
  );
};
export default NavBar;
