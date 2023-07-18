import React, { useEffect, useState } from 'react'
import { List } from 'antd'
import { Link } from 'react-router-dom'
import 'firebase/firestore'

import Project from '../interfaces/Project'
import { firestore } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'

const ProjectList: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([])

    useEffect(() => {
        const fetchProjects = async () => {
            const projectsCollection = collection(firestore, 'projects')
            const projectsSnapshot = await getDocs(projectsCollection)
            const fetchedProjects = projectsSnapshot.docs.map(
                (doc) => doc.data() as Project
            )
            setProjects(fetchedProjects)
        }

        fetchProjects()
    }, [])

    return (
        <List
            itemLayout="horizontal"
            dataSource={projects}
            renderItem={(project: Project) => (
                <List.Item>
                    <List.Item.Meta
                        title={
                            <Link to={`/project/${project.id}`}>
                                {project.name}
                            </Link>
                        }
                        description={`ID: ${project.id},`}
                    />
                    <div>{/* Render other details of the project */}</div>
                </List.Item>
            )}
        />
    )
}

export default ProjectList
