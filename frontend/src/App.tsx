import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import  FirebaseProvider  from './firebase';
import TimeEntryForm from './components/TimeEntryForm';
import TimeEntryList from './components/TimeEntryList';

const App: React.FC = () => {
  return (
    // <FirebaseProvider>
      <Router>
        <div>
          <h1>Time Tracking App</h1>
          <Routes>
            <Route path="/create" element={<TimeEntryForm />} />
            <Route path="/" element={<TimeEntryList />} />
          </Routes>
        </div>
      </Router>
    // </FirebaseProvider>
  );
};

export default App;
