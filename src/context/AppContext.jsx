import React, { createContext, useContext, useState } from 'react'
import { currentUser, actionPlan, wins } from '../data/mockData'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [user, setUser] = useState(currentUser)
  const [tasks, setTasks] = useState(actionPlan)
  const [feed, setFeed] = useState(wins)
  const [notifications, setNotifications] = useState([
    { id: 'n1', text: 'UVP Alignment Session is this Sunday at 8 PM!', read: false, time: '2h ago' },
    { id: 'n2', text: 'Joy Karimi completed her mentorship session', read: false, time: '5h ago' },
    { id: 'n3', text: 'New announcement: Cohort 2 recruitment begins July 1st', read: true, time: '1d ago' },
  ])
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const addWin = (text) => {
    const newWin = {
      id: `w${Date.now()}`,
      member: user.name,
      avatar: user.avatar,
      win: text,
      date: 'Just now',
      likes: 0,
      sphere: user.sphere,
    }
    setFeed(prev => [newWin, ...prev])
  }

  const likeWin = (id) => {
    setFeed(prev => prev.map(w => w.id === id ? { ...w, likes: w.likes + 1 } : w))
  }

  const markNotificationRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <AppContext.Provider value={{
      user, setUser,
      tasks, toggleTask,
      feed, addWin, likeWin,
      notifications, markNotificationRead, unreadCount,
      sidebarOpen, setSidebarOpen,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)