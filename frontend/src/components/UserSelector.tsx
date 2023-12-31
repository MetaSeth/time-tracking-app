import React, { useContext, useEffect, useState } from 'react'
import { Select, Spin } from 'antd'
import UserContext from '../context/UserContext'
import { getUsers } from '../services/UserService'
import User from '../interfaces/User'

const UserSelector: React.FC = () => {
    const userContext = useContext(UserContext)
    //if setUser is undefined. Make sure you are wrapping your component with UserContext.Provider
    if (!userContext) {
        return <Spin />
    }
    const [users, setUsers] = useState<User[]>([])
    const { setUser, setIsAdmin } = userContext

    useEffect(() => {
        const fetchUsers = async () => {
            const fetchedUsers = await getUsers()
            setUsers(fetchedUsers)
        }
        fetchUsers()
    }, [])

    const handleChange = (value: string) => {
        const selectedUser = users.find((user) => user.id === value)
        setUser(selectedUser)
        setIsAdmin(isAdmin(selectedUser))
    }

    const isAdmin = (user: User | undefined) => {
        if (!user) {
            return false
        }
        return user.role.includes('admin')
    }

    return (
        <Select
            placeholder="Connect as..."
            onChange={handleChange}
            defaultActiveFirstOption={true}
        >
            {users.map((user) => (
                <Select.Option key={user.id} value={user.id}>
                    {user.name}
                </Select.Option>
            ))}
        </Select>
    )
}

export default UserSelector
