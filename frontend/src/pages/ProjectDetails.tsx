import { Divider, Spin, Typography } from 'antd'
import 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import TimeEntryList from '../components/TimeEntryList'
import UserContext from '../context/UserContext'
import Project from '../interfaces/Project'
import TimeEntry from '../interfaces/TimeEntry'
import { getProjectById } from '../services/ProjectService'
import { getTimeEntriesByProject } from '../services/timeEntryService'

const ProjectDetails: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>()
    const [project, setProject] = useState<Project | null>(null)
    const userContext = useContext(UserContext)
    const currentUser = userContext?.user || null
    const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([])

    useEffect(() => {
        const fetchProject = async () => {
            if (!projectId) return
            const fetchedProject = await getProjectById(projectId)
            setProject(fetchedProject)
        }
        const fetchTimeEntries = async () => {
            if (!projectId || !currentUser) return
            const fetchedTimeEntries = await getTimeEntriesByProject(
                currentUser?.id,
                projectId
            )
            setTimeEntries(fetchedTimeEntries)
        }
        fetchProject()
        fetchTimeEntries()
    }, [projectId, currentUser])

    if (!project) {
        return <Spin />
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
                <Typography.Title level={2}>{project.name}</Typography.Title>
            </Divider>
            <TimeEntryList timeEntries={timeEntries} />
        </div>
    )
}

export default ProjectDetails
