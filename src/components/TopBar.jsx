import React, { useState } from 'react'
import { Bell, Search, Menu, X } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function TopBar({ title }) {
  const { user, notifications, markNotificationRead, unreadCount, sidebarOpen } = useApp()
  const [showNotifs, setShowNotifs] = useState(false)
  const [searchVal, setSearchVal] = useState('')

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: sidebarOpen ? 260 : 72,
      right: 0,
      height: 64,
      background: 'white',
      borderBottom: '1px solid #eee',
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
      gap: 16,
      zIndex: 90,
      transition: 'left 0.3s ease',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    }}>
      {/* Page title */}
      <h1 style={{ fontSize: 20, fontWeight: 700, color: '#222', flex: 1 }}>{title}</h1>

      {/* Search */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <Search size={16} style={{ position: 'absolute', left: 12, color: '#888' }} />
        <input
          value={searchVal}
          onChange={e => setSearchVal(e.target.value)}
          placeholder="Search VOCI Hub..."
          style={{
            paddingLeft: 36, paddingRight: 16, paddingTop: 8, paddingBottom: 8,
            border: '1px solid #eee', borderRadius: 8,
            fontSize: 14, color: '#333', background: '#f8f8f8',
            outline: 'none', width: 220,
          }}
        />
      </div>

      {/* Notifications */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setShowNotifs(!showNotifs)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            position: 'relative', padding: 8, borderRadius: 8,
            display: 'flex', alignItems: 'center',
          }}
        >
          <Bell size={20} color="#555" />
          {unreadCount > 0 && (
            <span style={{
              position: 'absolute', top: 4, right: 4,
              background: '#BF0000', color: 'white',
              borderRadius: '50%', width: 16, height: 16,
              fontSize: 10, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{unreadCount}</span>
          )}
        </button>

        {showNotifs && (
          <div style={{
            position: 'absolute', right: 0, top: 48,
            background: 'white', borderRadius: 12,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            border: '1px solid #eee',
            width: 320, zIndex: 200,
          }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700, fontSize: 15 }}>Notifications</span>
              <button onClick={() => setShowNotifs(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={16} color="#888" />
              </button>
            </div>
            {notifications.map(n => (
              <div
                key={n.id}
                onClick={() => markNotificationRead(n.id)}
                style={{
                  padding: '14px 20px',
                  borderBottom: '1px solid #f5f5f5',
                  background: n.read ? 'white' : '#fff8f8',
                  cursor: 'pointer',
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                }}
              >
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: n.read ? '#ddd' : '#BF0000',
                  marginTop: 6, flexShrink: 0,
                }} />
                <div>
                  <div style={{ fontSize: 13, color: '#333', lineHeight: 1.4 }}>{n.text}</div>
                  <div style={{ fontSize: 11, color: '#888', marginTop: 4 }}>{n.time}</div>
                </div>
              </div>
            ))}
            {notifications.length === 0 && (
              <div style={{ padding: 24, textAlign: 'center', color: '#888', fontSize: 14 }}>No notifications</div>
            )}
          </div>
        )}
      </div>

      {/* User avatar */}
      <div style={{
        width: 38, height: 38, borderRadius: '50%',
        background: 'linear-gradient(135deg, #BF0000, #D4A017)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'white', fontWeight: 700, fontSize: 13, cursor: 'pointer',
        flexShrink: 0,
      }}>{user.avatar}</div>
    </header>
  )
}