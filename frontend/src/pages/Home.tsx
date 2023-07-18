import { useContext, useEffect, useState } from 'react'
import { getTimeEntries } from '../services/TimeEntryService'
import UserContext from '../context/UserContext'
import { firestore } from '../firebase'
import TimeEntry from '../interfaces/TimeEntry'
import TimeEntryList from '../components/TimeEntryList'

const Home = () => {
    const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([])
    const userContext = useContext(UserContext)
    const currentUser = userContext?.user || null

    useEffect(() => {
        if (!currentUser) return
        const fetchData = async () => {
            const fetchedTimeEntries = await getTimeEntries(
                firestore,
                currentUser?.id
            )
            setTimeEntries(fetchedTimeEntries)
        }
        fetchData()
    }, [firestore, currentUser])

    return (
        <div>
            <h1>Home</h1>
            <TimeEntryList timeEntries={timeEntries} />
        </div>
    )
}

export default Home
