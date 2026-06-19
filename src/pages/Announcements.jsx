import React from 'react'
import { announcements } from '../data/mockData'
import Layout from '../components/Layout'
import { Bell, Calendar, Users, BookOpen, Megaphone } from 'lucide-react'

const typeConfig = {
  event: { icon: <Calendar size={16} />, color: '#BF0000', label: 'Event' },
  resource: { icon: <BookOpen size={16} />, color: '#1E90FF', label: 'Resource' },
  recruitment: { icon: <Users size={16} />, color: '#2d8a2d', label: 'Recruitment' },
  announcement: { icon: <Megaphone size={16} />, color: '#D4A017', label: 'Announcement' },
}

export default function Announcements() {
  return (
    <Layout title="Announcements">
      <div style={{ maxWidth: 720 }}>
        <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
          <Bell size={20} color="#BF0000" />
          <span style={{ fontSize: 15, color: '#555' }}>
            Stay up to date with everything happening in VOCI.
          </span>
        </div>

        {announcements.map(a => {
          const cfg = typeConfig[a.type] || typeConfig.announcement
          return (
            <div key={a.id} className="card" style={{
              marginBottom: 16,
              borderLeft: `5px solid ${cfg.color}`,
              background: a.urgent ? '#fff8f8' : 'white',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span className="badge" style={{ background: `${cfg.color}15`, color: cfg.color, fontSize: 11 }}>
                    {cfg.icon} {cfg.label}
                  </span>
                  {a.urgent && (
                    <span className="badge badge-red" style={{ fontSize: 10 }}>🔔 Urgent</span>
                  )}
                </div>
                <span style={{ fontSize: 12, color: '#aaa' }}>{a.date}</span>
              </div>
              <h3 style={{ fontWeight: 700, fontSize: 16, color: '#222', marginBottom: 8 }}>{a.title}</h3>
              <p style={{ fontSize: 14, color: '#555', lineHeight: 1.6, marginBottom: 10 }}>{a.body}</p>
              <div style={{ fontSize: 12, color: '#888' }}>
                Posted by: <strong style={{ color: '#333' }}>{a.author}</strong>
              </div>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}