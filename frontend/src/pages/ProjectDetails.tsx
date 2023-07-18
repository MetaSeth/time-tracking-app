import { Typography } from 'antd'
import 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { firestore } from '../firebase'

import Project from '../interfaces/Project'
import { getProjectById } from '../services/ProjectService'
import ProjectEntriesList from './ProjectEntriesList'
import TimeEntryList from '../components/TimeEntryList'
import TimeEntry from '../interfaces/TimeEntry'
import { getTimeEntriesByProject } from '../services/TimeEntryService'
import UserContext from '../context/UserContext'

const ProjectDetails: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>()
    const [project, setProject] = useState<Project | null>(null)
    const userContext = useContext(UserContext)
    const currentUser = userContext?.user || null
    const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([])

    useEffect(() => {
        const fetchProject = async () => {
            if (!projectId) return
            const fetchedProject = await getProjectById(firestore, projectId)
            setProject(fetchedProject)
        }
        const fetchTimeEntries = async () => {
            if (!projectId || !currentUser) return
            const fetchedTimeEntries = await getTimeEntriesByProject(
                firestore,
                currentUser?.id,
                projectId
            )
            setTimeEntries(fetchedTimeEntries)
        }
        fetchProject()
        fetchTimeEntries()
    }, [firestore, projectId, currentUser])

    if (!project) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <Typography.Title level={2}>{project.name}</Typography.Title>
            {/* <ProjectEntriesList project={project} /> */}
            <TimeEntryList timeEntries={timeEntries} />
        </div>
    )
}

export default ProjectDetails
