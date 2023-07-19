import { Divider, List, Space, Tag, Typography } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../context/UserContext'
import Project from '../interfaces/Project'
import Task from '../interfaces/Task'
import TimeEntry from '../interfaces/TimeEntry'
import User from '../interfaces/User'
import { getProjects } from '../services/ProjectService'
import { getTasks } from '../services/TaskService'
import { getUsers } from '../services/UserService'
import AddButton from './AddButton'
import { getFirestoreInstance } from '../firebase'

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

    const firestore = getFirestoreInstance()

    useEffect(() => {
        const fetchData = async () => {
            const fetchedTasks = await getTasks()
            const fetchedProjects = await getProjects()
            const fetchedUsers = await getUsers()

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
                    <Typography>{task?.name}</Typography>
                </Space>
            </Link>
        )
    }

    const getTotalDuration = () => {
        const totalDuration = timeEntries.reduce(
            (acc, entry) => acc + entry.duration,
            0
        )
        return totalDuration
    }

    const renderTotalDuration = () => {
        // render only if there are more than one time entry
        if (timeEntries.length > 1) {
            return (
                <Typography>
                    Total duration: {getTotalDuration()} minutes
                </Typography>
            )
        }
    }

    const renderUser = (userId: string) => {
        if (currentUser?.admin) {
            const user = users.find((user) => user.id === userId)

            return <Typography>{user?.name}</Typography>
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
        return <>Date : {date}</>
    }

    const renderTimeEntryDetails = (timeEntry: TimeEntry) => {
        return (
            <>
                <List.Item.Meta
                    title={
                        <>
                            <Typography>
                                <Space>
                                    {renderDate(timeEntry)} Duration:
                                    {timeEntry.duration} min
                                </Space>
                            </Typography>
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
                style={{
                    width: '50%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                }}
                bordered
                itemLayout="vertical"
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
            <Divider>{renderTotalDuration()}</Divider>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'left',
                    width: '50%',
                }}
            >
                <AddButton />
            </div>
        </>
    )
}

export default TimeEntryList
