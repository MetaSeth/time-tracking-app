import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { getFirestoreInstance } from '../firebase'
import TimeEntry from '../interfaces/TimeEntry'
import { userIsAdmin } from './UserService'

const firestore = getFirestoreInstance()

export async function getTimeEntries(userId: string): Promise<TimeEntry[]> {
    const isAdmin = await userIsAdmin(userId)
    if (isAdmin) {
        const timeEntriesCollection = collection(firestore, 'timeEntries')
        const timeEntriesSnapshot = await getDocs(timeEntriesCollection)
        return timeEntriesSnapshot.docs.map((doc) => doc.data() as TimeEntry)
    } else {
        const timeEntriesCollection = collection(firestore, 'timeEntries')
        const timeEntriesSnapshot = await getDocs(timeEntriesCollection)
        return timeEntriesSnapshot.docs
            .map((doc) => doc.data() as TimeEntry)
            .filter((timeEntry) => timeEntry.userId === userId)
    }
}

export async function getTimeEntriesByTask(userId: string, taskId: string) {
    const timeEntries = await getTimeEntries(userId)
    return timeEntries.filter((timeEntry) => timeEntry.taskId === taskId)
}

export async function getTimeEntriesByProject(
    userId: string,
    projectId: string
) {
    const timeEntries = await getTimeEntries(userId)
    return timeEntries.filter((timeEntry) => timeEntry.projectId === projectId)
}

export async function getTimeEntriesByPeriod(
    startDate: Date,
    endDate: Date,
    userId: string
): Promise<TimeEntry[]> {
    const timeEntriesCollection = collection(firestore, 'timeEntries')
    const isAdmin = await userIsAdmin(userId)

    let timeEntryQuery
    if (isAdmin) {
        // If user is admin, retrieve all time entries within the specified period
        timeEntryQuery = query(
            timeEntriesCollection,
            where('entryDate', '>=', startDate),
            where('entryDate', '<=', endDate)
        )
    } else {
        // If user is normal user, retrieve time entries specific to their user ID within the specified period
        timeEntryQuery = query(
            timeEntriesCollection,
            where('userId', '==', userId),
            where('entryDate', '>=', startDate),
            where('entryDate', '<=', endDate)
        )
    }

    const timeEntrySnapshot = await getDocs(timeEntryQuery)

    // Map the time entry documents to TimeEntry objects
    const timeEntries = timeEntrySnapshot.docs.map(
        (doc) => doc.data() as TimeEntry
    )

    return timeEntries
}

export async function addTimeEntry(timeEntry: TimeEntry): Promise<void> {
    const timeEntriesCollection = collection(firestore, 'timeEntries')
    await addDoc(timeEntriesCollection, timeEntry)
}
