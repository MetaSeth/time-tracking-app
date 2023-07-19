import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import TimeEntryForm from './components/TimeEntryForm'
import UserSelector from './components/UserSelector'
import { UserProvider } from './context/UserContext'
import Home from './pages/Home'
import ProjectDetails from './pages/ProjectDetails'
import TaskDetails from './pages/TaskDetails'
import CustomHeader from './components/CustomHeader'

const App: React.FC = () => {
    return (
        <UserProvider>
            <div
                style={{
                    display: 'flex',
                    width: '75%',
                    justifyContent: 'end',
                }}
            >
                <UserSelector />
            </div>
            <Router>
                <CustomHeader />
                <Routes>
                    <Route path="/create" element={<TimeEntryForm />} />
                    <Route path="/" element={<Home />} />
                    <Route
                        path="project/:projectId"
                        element={<ProjectDetails />}
                    />
                    <Route path="task/:taskId" element={<TaskDetails />} />
                </Routes>
            </Router>
        </UserProvider>
    )
}

export default App
