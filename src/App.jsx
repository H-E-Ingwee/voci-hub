import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Training from './pages/Training'
import Mentorship from './pages/Mentorship'
import Community from './pages/Community'
import Spheres from './pages/Spheres'
import Sessions from './pages/Sessions'
import Impact from './pages/Impact'
import Announcements from './pages/Announcements'
import Progress from './pages/Progress'

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/training" element={<Training />} />
          <Route path="/mentorship" element={<Mentorship />} />
          <Route path="/community" element={<Community />} />
          <Route path="/spheres" element={<Spheres />} />
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/progress" element={<Progress />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}