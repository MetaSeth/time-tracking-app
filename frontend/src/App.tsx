import React from 'react'
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import AddButton from './components/AddButton'
import TimeEntryForm from './components/TimeEntryForm'
import UserSelector from './components/UserSelector'
import { UserProvider } from './context/UserContext'
import ProjectDetails from './pages/ProjectDetails'
import TaskDetails from './pages/TaskDetails'
import Home from './pages/Home'

const App: React.FC = () => {
    return (
        <UserProvider>
            <Router>
                <div>
                    <Link to="/">
                        <h1>Time Tracking App</h1>
                    </Link>
                    <UserSelector />
                    <Routes>
                        <Route path="/create" element={<TimeEntryForm />} />
                        <Route path="/" element={<Home />} />
                        <Route
                            path="project/:projectId"
                            element={<ProjectDetails />}
                        />
                        <Route path="task/:taskId" element={<TaskDetails />} />
                    </Routes>
                    <AddButton />
                </div>
            </Router>
        </UserProvider>
    )
}

export default App
