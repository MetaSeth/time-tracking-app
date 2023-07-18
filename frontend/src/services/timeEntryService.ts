import { Firestore, addDoc, query, where } from 'firebase/firestore'
import { getDocs, collection } from 'firebase/firestore'
import TimeEntry from '../interfaces/TimeEntry'
import { userIsAdmin } from '../services/UserService'

export async function getTimeEntries(
    firestore: Firestore,
    userId: string
): Promise<TimeEntry[]> {
    const isAdmin = await userIsAdmin(firestore, userId)
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

export async function getTimeEntriesByTask(
    firestore: Firestore,
    userId: string,
    taskId: string
) {
    const timeEntries = await getTimeEntries(firestore, userId)
    return timeEntries.filter((timeEntry) => timeEntry.taskId === taskId)
}

export async function getTimeEntriesByProject(
    firestore: Firestore,
    userId: string,
    projectId: string
) {
    const timeEntries = await getTimeEntries(firestore, userId)
    return timeEntries.filter((timeEntry) => timeEntry.projectId === projectId)
}

export async function getTimeEntriesByPeriod(
    firestore: Firestore,
    startDate: Date,
    endDate: Date,
    userId: string
): Promise<TimeEntry[]> {
    const timeEntriesCollection = collection(firestore, 'timeEntries')
    const isAdmin = await userIsAdmin(firestore, userId)

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

export async function addTimeEntry(
    timeEntry: TimeEntry,
    firestore: Firestore
): Promise<void> {
    const timeEntriesCollection = collection(firestore, 'timeEntries')
    await addDoc(timeEntriesCollection, timeEntry)
}
