import { List, Typography } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UserContext from '../context/UserContext'
import { firestore } from '../firebase'
import Task from '../interfaces/Task'
import TimeEntry from '../interfaces/TimeEntry'
import { getTimeEntriesByTask } from '../services/TimeEntryService'

interface TaskEntriesListProps {
    task: Task
}

const TaskEntriesList: React.FC<TaskEntriesListProps> = ({ task }) => {
    const { taskId } = useParams<{ taskId: string }>()
    const userContext = useContext(UserContext)
    const currentUser = userContext?.user || null
    const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([])

    useEffect(() => {
        console.log('taskId:', taskId)
        console.log('currentUser:', currentUser)

        if (!taskId || !currentUser) return
        const fetchData = async () => {
            const fetchedTimeEntries = await getTimeEntriesByTask(
                firestore,
                currentUser?.id,
                taskId
            )
            console.log('fetchedTimeEntries:', fetchedTimeEntries)

            setTimeEntries(fetchedTimeEntries)
            console.log('timeEntries:', timeEntries)
        }
        fetchData()
    }, [firestore, taskId, currentUser])

    return (
        <List
            itemLayout="horizontal"
            dataSource={timeEntries}
            renderItem={(timeEntry: TimeEntry) => (
                <List.Item>
                    <List.Item.Meta
                        title={timeEntry.date.toDate().toDateString()}
                        description={`duration: ${timeEntry.duration} minutes`}
                    />
                    <Typography>{timeEntry.comment}</Typography>
                </List.Item>
            )}
        />
    )
}

export default TaskEntriesList
