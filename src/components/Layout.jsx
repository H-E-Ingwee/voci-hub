import React from 'react'
import { useApp } from '../context/AppContext'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

export default function Layout({ children, title }) {
  const { sidebarOpen } = useApp()
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f8f8' }}>
      <Sidebar />
      <div style={{
        marginLeft: sidebarOpen ? 260 : 72,
        flex: 1,
        transition: 'margin-left 0.3s ease',
        minHeight: '100vh',
      }}>
        <TopBar title={title} />
        <main style={{ padding: '88px 28px 40px', maxWidth: 1400, margin: '0 auto' }}>
          {children}
        </main>
      </div>
    </div>
  )
}