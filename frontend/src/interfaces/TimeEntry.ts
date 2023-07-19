import { Timestamp } from 'firebase/firestore'

export default interface TimeEntry {
    id: string
    userId: string
    taskId: string
    projectId: string
    date: Timestamp
    duration: number
    comment: string
}
