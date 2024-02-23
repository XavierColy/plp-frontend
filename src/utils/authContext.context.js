import React, {createContext, useState} from 'react'

export const hostsContext = createContext({});

export default function AuthProvider(props) {
    const [hosts, setHosts] = useState([])

    const value = {
        hosts, setHosts
    }
    return (
        <hostsContext.Provider value={value} {...props}/>
    )
}