import React, {createContext, useState} from 'react'

export const authContext = createContext({});

export default function AuthProvider(props) {
    const [authUser, setAuthUser] = useState({})

    const value = {
        authUser,
        setAuthUser
    }
    return (
        <authContext.Provider value={value} {...props}/>
    )
}