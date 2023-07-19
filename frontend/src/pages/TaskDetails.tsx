import { Divider, Typography } from 'antd'
import 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TimeEntryList from '../components/TimeEntryList'
import UserContext from '../context/UserContext'
import Task from '../interfaces/Task'
import TimeEntry from '../interfaces/TimeEntry'
import { getTaskById } from '../services/TaskService'
import { getTimeEntriesByTask } from '../services/timeEntryService'

const TaskDetails: React.FC = () => {
    const { taskId } = useParams<{ taskId: string }>()
    const [task, setTask] = useState<Task | undefined>()
    const userContext = useContext(UserContext)
    const currentUser = userContext?.user || null
    const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([])

    useEffect(() => {
        const fetchData = async () => {
            if (!taskId || !currentUser) return
            const fetchedTask = await getTaskById(taskId)
            setTask(fetchedTask)
            const fetchedTimeEntries = await getTimeEntriesByTask(
                currentUser?.id,
                taskId
            )
            setTimeEntries(fetchedTimeEntries)
        }
        fetchData()
    }, [taskId, currentUser])

    if (!task) {
        return <div>Loading...</div>
    }

    return (
        <div
            style={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            }}
        >
            <Divider orientation="center">
                <Typography.Title level={2}>{task.name}</Typography.Title>
            </Divider>
            <TimeEntryList timeEntries={timeEntries} />
        </div>
    )
}

export default TaskDetails
