import { collection, getDocs } from 'firebase/firestore'
import { getFirestoreInstance } from '../firebase'
import Project from '../interfaces/Project'

const firestore = getFirestoreInstance()

export async function getProjects(): Promise<Project[]> {
    const projectsCollection = collection(firestore, 'projects')
    const projectsSnapshot = await getDocs(projectsCollection)
    return projectsSnapshot.docs.map((doc) => doc.data() as Project)
}

export async function getProjectById(id: string): Promise<Project> {
    const projectsCollection = collection(firestore, 'projects')
    const projectsSnapshot = await getDocs(projectsCollection)
    const project = projectsSnapshot.docs.find((doc) => doc.id === id)
    return project?.data() as Project
}
