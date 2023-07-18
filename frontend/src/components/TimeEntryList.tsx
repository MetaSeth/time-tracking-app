import { List, Space, Tag, Typography } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../context/UserContext'
import { firestore } from '../firebase'
import Project from '../interfaces/Project'
import Task from '../interfaces/Task'
import TimeEntry from '../interfaces/TimeEntry'
import User from '../interfaces/User'
import { getProjects } from '../services/ProjectService'
import { getTasks } from '../services/TaskService'
import { getUsers } from '../services/UserService'

const { Text } = Typography

interface TimeEntryListProps {
    timeEntries: TimeEntry[]
}

const TimeEntryList: React.FC<TimeEntryListProps> = ({ timeEntries }) => {
    const userContext = useContext(UserContext)
    const currentUser = userContext?.user || null
    // const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([])
    const [tasks, setTasks] = useState<Task[]>([])
    const [projects, setProjects] = useState<Project[]>([])
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const fetchedTasks = await getTasks(firestore)
            const fetchedProjects = await getProjects(firestore)
            const fetchedUsers = await getUsers(firestore)

            setTasks(fetchedTasks)
            setProjects(fetchedProjects)
            setUsers(fetchedUsers)
        }
        fetchData()
    }, [firestore])

    function renderTask(taskId: string) {
        const task = tasks.find((task) => task.id === taskId)

        return (
            <Link to={`/task/${task?.id}`}>
                <Space>
                    <Text>{task?.name}</Text>
                </Space>
            </Link>
        )
    }

    const getTotalDuration = () => {
        const totalDuration = timeEntries.reduce(
            (acc, entry) => acc + entry.duration,
            0
        )
        console.log(totalDuration)

        return totalDuration
    }

    const renderTotalDuration = () => {
        // render only if there are more than one time entry
        if (timeEntries.length > 1) {
            return <Text>Total duration: {getTotalDuration()}</Text>
        }
    }

    const renderUser = (userId: string) => {
        console.log('admin', currentUser?.admin)

        if (currentUser?.admin) {
            const user = users.find((user) => user.id === userId)

            return <Text>{user?.name}</Text>
        }
    }

    const renderProject = (projectId: string) => {
        const project = projects.find((project) => project.id === projectId)

        return (
            <Link to={`/project/${project?.id}`}>
                <Tag color="blue" key={project?.id}>
                    {project?.name}
                </Tag>
            </Link>
        )
    }

    const renderDate = (timeEntry: TimeEntry) => {
        const date = timeEntry?.date?.seconds
            ? new Date(timeEntry.date.seconds).toDateString()
            : ''
        return <>{date}</>
    }

    const renderTimeEntryDetails = (timeEntry: TimeEntry) => {
        return (
            <>
                <List.Item.Meta
                    title={
                        <>
                            <Text>
                                Date: {renderDate(timeEntry)}, Duration:
                                {timeEntry.duration}
                            </Text>
                        </>
                    }
                    description={timeEntry.comment}
                />
            </>
        )
    }

    return (
        <>
            <List
                itemLayout="horizontal"
                dataSource={timeEntries}
                renderItem={(timeEntry: TimeEntry) => (
                    <List.Item
                        actions={[
                            renderProject(timeEntry.projectId),
                            renderTask(timeEntry.taskId),
                            renderUser(timeEntry.userId),
                        ]}
                    >
                        {renderTimeEntryDetails(timeEntry)}
                    </List.Item>
                )}
            />
            {renderTotalDuration()}
        </>
    )
}

export default TimeEntryList
