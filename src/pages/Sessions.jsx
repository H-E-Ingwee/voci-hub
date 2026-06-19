import React, { useState } from 'react'
import { sessions } from '../data/mockData'
import Layout from '../components/Layout'
import { Calendar, Clock, Users, Star, Video, CheckCircle } from 'lucide-react'

const pillarColors = {
  'Communication': '#BF0000',
  'Personal Branding': '#D4A017',
  'Leadership': '#1E90FF',
  'Mentorship': '#D4A017',
  'Community Engagement': '#1E90FF',
  'All Pillars': '#BF0000',
}

function SessionCard({ session }) {
  const color = pillarColors[session.pillar] || '#BF0000'
  const isUpcoming = session.status === 'upcoming'
  return (
    <div className="card" style={{ borderLeft: `5px solid ${color}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6, flexWrap: 'wrap' }}>
            <span className="badge" style={{ background: `${color}15`, color, fontSize: 10 }}>{session.type}</span>
            <span className={`badge ${isUpcoming ? 'badge-red' : 'badge-green'}`} style={{ fontSize: 10 }}>
              {isUpcoming ? '🔴 Upcoming' : '✅ Completed'}
            </span>
            {session.rating && (
              <span className="badge badge-gold" style={{ fontSize: 10 }}>
                <Star size={9} /> {session.rating}/10
              </span>
            )}
          </div>
          <h3 style={{ fontWeight: 700, fontSize: 15, color: '#222', marginBottom: 8 }}>{session.title}</h3>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#666' }}>
              <Calendar size={13} color={color} /> {session.date}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#666' }}>
              <Clock size={13} color={color} /> {session.time}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#666' }}>
              <Users size={13} color={color} /> {session.attendees} attending
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#666' }}>
              <Video size={13} color={color} /> {session.platform}
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, paddingTop: 12, borderTop: '1px solid #f5f5f5' }}>
        <div style={{ fontSize: 12, color: '#888' }}>
          Facilitator: <strong style={{ color: '#333' }}>{session.facilitator}</strong>
        </div>
        {isUpcoming ? (
          <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: 13 }}>
            Join Session
          </button>
        ) : (
          <button className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: 13 }}>
            View Notes
          </button>
        )}
      </div>
    </div>
  )
}

export default function Sessions() {
  const [filter, setFilter] = useState('all')
  const upcoming = sessions.filter(s => s.status === 'upcoming')
  const completed = sessions.filter(s => s.status === 'completed')
  const filtered = filter === 'all' ? sessions : sessions.filter(s => s.status === filter)

  return (
    <Layout title="Sessions">
      {/* Stats */}
      <div className="grid-4" style={{ marginBottom: 28 }}>
        {[
          { icon: '📅', label: 'Upcoming', value: upcoming.length, color: '#BF0000' },
          { icon: '✅', label: 'Completed', value: completed.length, color: '#2d8a2d' },
          { icon: '⭐', label: 'Avg Rating', value: '9.4', color: '#D4A017' },
          { icon: '👥', label: 'Avg Attendance', value: '39', color: '#1E90FF' },
        ].map((s, i) => (
          <div key={i} className="card" style={{ borderTop: `4px solid ${s.color}`, textAlign: 'center' }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontWeight: 800, fontSize: 24, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 13, color: '#666', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Next session highlight */}
      {upcoming[0] && (
        <div style={{
          background: 'linear-gradient(135deg, #BF0000, #8B0000)',
          borderRadius: 14, padding: '24px 28px', marginBottom: 28, color: 'white',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <div style={{ fontSize: 12, color: '#D4A017', fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>NEXT SESSION</div>
            <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>{upcoming[0].title}</h2>
            <div style={{ display: 'flex', gap: 20, color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>
              <span>📅 {upcoming[0].date}</span>
              <span>⏰ {upcoming[0].time}</span>
              <span>📹 {upcoming[0].platform}</span>
            </div>
          </div>
          <button className="btn btn-gold" style={{ flexShrink: 0, marginLeft: 20 }}>
            Join Now →
          </button>
        </div>
      )}

      {/* Filter */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: 'white', padding: 4, borderRadius: 10, width: 'fit-content', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        {[
          { key: 'all', label: 'All Sessions' },
          { key: 'upcoming', label: '🔴 Upcoming' },
          { key: 'completed', label: '✅ Completed' },
        ].map(f => (
          <button key={f.key} onClick={() => setFilter(f.key)} style={{
            padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer',
            fontWeight: 600, fontSize: 14,
            background: filter === f.key ? '#BF0000' : 'transparent',
            color: filter === f.key ? 'white' : '#666',
            transition: 'all 0.2s',
          }}>{f.label}</button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {filtered.map(s => <SessionCard key={s.id} session={s} />)}
      </div>
    </Layout>
  )
}