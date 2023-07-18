import { Typography } from 'antd'
import 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { firestore } from '../firebase'

import Task from '../interfaces/Task'
import { getTaskById } from '../services/TaskService'
import TaskEntriesList from './TaskEntriesList'
import TimeEntryList from '../components/TimeEntryList'
import { getTimeEntriesByTask } from '../services/TimeEntryService'
import UserContext from '../context/UserContext'
import TimeEntry from '../interfaces/TimeEntry'

const TaskDetails: React.FC = () => {
    const { taskId } = useParams<{ taskId: string }>()
    const [task, setTask] = useState<Task | undefined>()
    const userContext = useContext(UserContext)
    const currentUser = userContext?.user || null
    const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([])

    useEffect(() => {
        const fetchData = async () => {
            if (!taskId || !currentUser) return
            const fetchedTask = await getTaskById(firestore, taskId)
            setTask(fetchedTask)
            const fetchedTimeEntries = await getTimeEntriesByTask(
                firestore,
                currentUser?.id,
                taskId
            )
            setTimeEntries(fetchedTimeEntries)
        }
        fetchData()
    }, [firestore, taskId, currentUser])

    if (!task) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <Typography.Title level={2}>{task.name}</Typography.Title>
            {/* <TaskEntriesList task={task} /> */}
            <TimeEntryList timeEntries={timeEntries} />
        </div>
    )
}

export default TaskDetails
