import { Divider, List, Typography } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import UserContext from '../context/UserContext'
import { firestore } from '../firebase'
import Project from '../interfaces/Project'
import Task from '../interfaces/Task'
import TimeEntry from '../interfaces/TimeEntry'
import { getTasksByProject } from '../services/TaskService'
import { getTimeEntries } from '../services/TimeEntryService'

interface ProjectEntriesListProps {
    project: Project
}

const ProjectEntriesList: React.FC<ProjectEntriesListProps> = ({ project }) => {
    const { projectId } = useParams<{ projectId: string }>()
    const userContext = useContext(UserContext)
    const currentUser = userContext?.user || null
    const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([])
    const [tasks, setTasks] = useState<Task[]>([])

    useEffect(() => {
        if (!projectId || !currentUser) return
        const fetchData = async () => {
            const fetchedTasks = await getTasksByProject(firestore, projectId)
            setTasks(fetchedTasks)
            const fetchedTimeEntries = await getTimeEntries(
                firestore,
                currentUser?.id
            )
            setTimeEntries(fetchedTimeEntries)
        }
        fetchData()
    }, [firestore, projectId, currentUser])
    const renderTask = (taskId: string) => {
        const timeEntriesForTask = timeEntries.filter(
            (entry) => entry.taskId === taskId
        )
        return (
            <>
                <List
                    itemLayout="vertical"
                    dataSource={timeEntriesForTask}
                    renderItem={(timeEntry: TimeEntry) => (
                        <List.Item>
                            <List.Item.Meta
                                title={timeEntry.date.toDate().toDateString()}
                                description={`Duration: ${timeEntry.duration} minutes`}
                            />
                        </List.Item>
                    )}
                />
            </>
        )
    }
    return (
        <>
            <Divider />
            <Typography.Title level={3}>Tasks:</Typography.Title>
            <List
                itemLayout="vertical"
                dataSource={tasks}
                renderItem={(task: Task) => (
                    <List.Item>
                        <Link to={`/task/${task.id}`}>
                            <List.Item.Meta
                                title={
                                    <Typography.Title level={5}>
                                        {task.name}
                                    </Typography.Title>
                                }
                            />
                            <div>{renderTask(task.id)}</div>
                        </Link>
                    </List.Item>
                )}
            />
            <Divider />
        </>
    )
}

export default ProjectEntriesList
