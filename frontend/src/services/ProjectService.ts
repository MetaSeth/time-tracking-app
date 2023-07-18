import { Firestore } from 'firebase/firestore'
import Project from '../interfaces/Project'
import { collection, getDocs } from 'firebase/firestore'

export async function getProjects(firestore: Firestore): Promise<Project[]> {
    const projectsCollection = collection(firestore, 'projects')
    const projectsSnapshot = await getDocs(projectsCollection)
    return projectsSnapshot.docs.map((doc) => doc.data() as Project)
}

export async function getProjectById(
    firestore: Firestore,
    id: string
): Promise<Project> {
    const projectsCollection = collection(firestore, 'projects')
    const projectsSnapshot = await getDocs(projectsCollection)
    const project = projectsSnapshot.docs.find((doc) => doc.id === id)
    return project?.data() as Project
}
