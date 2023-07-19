import { collection, getDocs, query, where } from 'firebase/firestore'
import { getFirestoreInstance } from '../firebase'
import Task from '../interfaces/Task'

const firestore = getFirestoreInstance()

export async function getTasks(): Promise<Task[]> {
    const tasksCollection = collection(firestore, 'tasks')
    const tasksSnapshot = await getDocs(tasksCollection)
    return tasksSnapshot.docs.map((doc) => doc.data() as Task)
}

export async function getTaskById(id: string) {
    const tasks = await getTasks()
    return tasks.find((task) => task.id === id)
}
export async function getTasksByProject(projectId: string): Promise<Task[]> {
    const tasks = await getTasks()
    return tasks.filter((task) => task.projectId === projectId)
}

export async function getTasksByUser(userId: string): Promise<Task[]> {
    const tasksCollection = collection(firestore, 'tasks')
    const timeEntriesCollection = collection(firestore, 'timeEntries')

    // Get all time entries for the specified user
    const timeEntryQuery = query(
        timeEntriesCollection,
        where('userId', '==', userId)
    )
    const timeEntrySnapshot = await getDocs(timeEntryQuery)

    // Get the task IDs from the time entries
    const taskIds = timeEntrySnapshot.docs.map((doc) => doc.data().taskId)

    // Get the tasks corresponding to the retrieved task IDs
    const tasksQuery = query(tasksCollection, where('id', 'in', taskIds))
    const tasksSnapshot = await getDocs(tasksQuery)

    // Map the task documents to Task objects
    const tasks = tasksSnapshot.docs.map((doc) => doc.data() as Task)

    return tasks
}
