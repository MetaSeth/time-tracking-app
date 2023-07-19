import { Divider } from 'antd'
import { useContext, useEffect, useState } from 'react'
import TimeEntryList from '../components/TimeEntryList'
import UserContext from '../context/UserContext'
import TimeEntry from '../interfaces/TimeEntry'
import { getTimeEntries } from '../services/timeEntryService'

const Home = () => {
    const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([])
    const userContext = useContext(UserContext)
    const currentUser = userContext?.user || null

    useEffect(() => {
        if (!currentUser) return
        const fetchData = async () => {
            const fetchedTimeEntries = await getTimeEntries(currentUser?.id)
            setTimeEntries(fetchedTimeEntries)
        }
        fetchData()
    }, [currentUser])

    return (
        <div
            style={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            }}
        >
            <Divider orientation="center" />
            <TimeEntryList timeEntries={timeEntries} />
        </div>
    )
}

export default Home
