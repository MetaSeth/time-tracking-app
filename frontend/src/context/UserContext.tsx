import React, { createContext, ReactNode, useState } from 'react'
import User from '../interfaces/User'

interface UserContextProps {
    user: User | undefined
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>
    isAdmin: boolean
    setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>
}

const UserContext = createContext<UserContextProps | undefined>(undefined)

export const UserProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | undefined>(undefined)
    const [isAdmin, setIsAdmin] = useState<boolean>(false)

    return (
        <UserContext.Provider value={{ user, setUser, isAdmin, setIsAdmin }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext
