import React, { useState, useEffect, createContext, } from "react";
import { useJwt } from "react-jwt";
import API_PATH from './API_PATH';


export const UserContext = createContext();
export const UserProvider = (props) => {
    const [token, setToken] = useState()
    const [isLogging, setIsLogging] = useState(false)
    const { decodedToken, isExpired } = useJwt(token);
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState({});
    const [userInfo, setUserInfo] = useState({})
    const [image, setImage] = useState()

    useEffect(() => {
        if (window.localStorage.getItem("token")) {
            setToken(window.localStorage.getItem("token"))
        } else {
            setToken(null)
        }
    }, [token])

    useEffect(() => {
        if (window.localStorage.getItem("isLogging")) {
            setIsLogging(window.localStorage.getItem("isLogging"))
        } else {
            setIsLogging(false)
        }
    }, [isLogging])

    useEffect(() => {
        if (user) {
            getUserInfo()
        }
        console.log(user)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    useEffect(() => {
        if (token) {
            console.warn(decodedToken)
            if (decodedToken) {
                setUser({ ...decodedToken })
                setIsAdmin(decodedToken.is_admin)
            }
        }
    }, [decodedToken, isAdmin, token])


    useEffect(() => {
        console.log('expired')
        console.log(isExpired)
        if (decodedToken) {
            if (isExpired) {
                window.localStorage.clear()
                window.location.href = '/'
            }
        }
    }, [decodedToken, isExpired])

    useEffect(() => {
        setImage(userInfo.image)
    }, [userInfo])

    const getUserInfo = async () => {
        if (user.user_id) {

            await fetch(`${API_PATH}/users/${user.user_id}`)
                .then(res => res.json())
                .then(data => {
                    if (data.status === 'ok') {
                        setUserInfo(data.user)
                    }
                })
        }

    }

    return (
        <UserContext.Provider value={{ user, userInfo, image, token, isLogging, isAdmin }} >
            {props.children}
        </UserContext.Provider>
    )
}