interface TimeEntry {
    // TODO: should be mandatory ?
    id?: string;
    taskId: string;
    userId: string;
    entryDate: string;
    duration: string;
    comment: string;
}

export default TimeEntry;