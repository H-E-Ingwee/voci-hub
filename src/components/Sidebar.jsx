import React from 'react'
import { NavLink } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import {
  LayoutDashboard, User, BookOpen, Handshake, Globe,
  Megaphone, BarChart3, Users, ChevronLeft, ChevronRight,
  Zap, Target, Bell
} from 'lucide-react'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/profile', icon: User, label: 'My Profile' },
  { to: '/training', icon: BookOpen, label: 'Training Library' },
  { to: '/mentorship', icon: Handshake, label: 'Mentorship' },
  { to: '/community', icon: Users, label: 'Community' },
  { to: '/spheres', icon: Globe, label: 'Spheres & Hubs' },
  { to: '/sessions', icon: Zap, label: 'Sessions' },
  { to: '/impact', icon: Target, label: 'Impact Projects' },
  { to: '/announcements', icon: Megaphone, label: 'Announcements' },
  { to: '/progress', icon: BarChart3, label: 'My Progress' },
]

export default function Sidebar() {
  const { user, sidebarOpen, setSidebarOpen, unreadCount } = useApp()

  return (
    <aside style={{
      width: sidebarOpen ? 260 : 72,
      minHeight: '100vh',
      background: '#1a0000',
      display: 'flex',
      flexDirection: 'column',
      transition: 'width 0.3s ease',
      position: 'fixed',
      left: 0, top: 0, bottom: 0,
      zIndex: 100,
      overflowX: 'hidden',
    }}>
      {/* Logo */}
      <div style={{
        padding: sidebarOpen ? '24px 20px 20px' : '24px 16px 20px',
        borderBottom: '1px solid rgba(212,160,23,0.3)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        justifyContent: sidebarOpen ? 'space-between' : 'center',
      }}>
        {sidebarOpen && (
          <div>
            <div style={{ color: '#BF0000', fontWeight: 800, fontSize: 18, letterSpacing: 1 }}>VOCI</div>
            <div style={{ color: '#D4A017', fontSize: 10, letterSpacing: 2, marginTop: 2 }}>THE HUB</div>
          </div>
        )}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            background: 'rgba(191,0,0,0.2)',
            border: '1px solid rgba(191,0,0,0.4)',
            borderRadius: 8,
            color: '#D4A017',
            cursor: 'pointer',
            padding: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>

      {/* User mini card */}
      {sidebarOpen && (
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <div style={{
            width: 40, height: 40,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #BF0000, #D4A017)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 700, fontSize: 14, flexShrink: 0,
          }}>{user.avatar}</div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ color: 'white', fontWeight: 600, fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</div>
            <div style={{ color: '#D4A017', fontSize: 11 }}>Level {user.level} · {user.levelName}</div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 0', overflowY: 'auto' }}>
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: sidebarOpen ? '11px 20px' : '11px 0',
              justifyContent: sidebarOpen ? 'flex-start' : 'center',
              color: isActive ? '#D4A017' : 'rgba(255,255,255,0.65)',
              background: isActive ? 'rgba(191,0,0,0.25)' : 'transparent',
              borderLeft: isActive ? '3px solid #BF0000' : '3px solid transparent',
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: isActive ? 600 : 400,
              transition: 'all 0.2s',
              position: 'relative',
            })}
          >
            <Icon size={18} style={{ flexShrink: 0 }} />
            {sidebarOpen && <span style={{ whiteSpace: 'nowrap' }}>{label}</span>}
            {label === 'Announcements' && unreadCount > 0 && sidebarOpen && (
              <span style={{
                marginLeft: 'auto',
                background: '#BF0000',
                color: 'white',
                borderRadius: 10,
                padding: '2px 7px',
                fontSize: 11,
                fontWeight: 700,
              }}>{unreadCount}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div style={{
        padding: sidebarOpen ? '16px 20px' : '16px 0',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        textAlign: sidebarOpen ? 'left' : 'center',
      }}>
        {sidebarOpen ? (
          <>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>vociglobal.site</div>
            <div style={{ color: 'rgba(212,160,23,0.6)', fontSize: 10, marginTop: 4, fontStyle: 'italic' }}>
              "Your voice is your power."
            </div>
          </>
        ) : (
          <div style={{ color: '#D4A017', fontSize: 16 }}>🎙️</div>
        )}
      </div>
    </aside>
  )
}