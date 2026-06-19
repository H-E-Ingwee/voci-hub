import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { members } from '../data/mockData'
import Layout from '../components/Layout'
import { Heart, Send, Search, Users, Star } from 'lucide-react'

function MemberCard({ member, isCurrentUser }) {
  const levelColors = { 1: '#888', 2: '#1E90FF', 3: '#D4A017', 4: '#BF0000', 5: '#8B0000' }
  return (
    <div className="card card-hover" style={{ textAlign: 'center', position: 'relative' }}>
      {isCurrentUser && (
        <div style={{
          position: 'absolute', top: 12, right: 12,
          background: '#BF0000', color: 'white',
          fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 10,
        }}>You</div>
      )}
      <div style={{
        width: 56, height: 56, borderRadius: '50%',
        background: `linear-gradient(135deg, ${levelColors[member.level]}, #D4A017)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'white', fontWeight: 800, fontSize: 18,
        margin: '0 auto 12px',
      }}>{member.avatar}</div>
      <div style={{ fontWeight: 700, fontSize: 14, color: '#222' }}>{member.name}</div>
      <div style={{ fontSize: 12, color: '#BF0000', marginTop: 2 }}>{member.role}</div>
      <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{member.sphere}</div>
      <div style={{ marginTop: 8 }}>
        <span className="badge" style={{
          background: `${levelColors[member.level]}20`,
          color: levelColors[member.level],
          fontSize: 10,
        }}>
          <Star size={9} /> L{member.level} {member.levelName}
        </span>
      </div>
    </div>
  )
}

export default function Community() {
  const { user, feed, addWin, likeWin } = useApp()
  const [tab, setTab] = useState('feed')
  const [winText, setWinText] = useState('')
  const [search, setSearch] = useState('')

  const filteredMembers = members.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.sphere.toLowerCase().includes(search.toLowerCase())
  )

  const handlePost = () => {
    if (winText.trim()) { addWin(winText); setWinText('') }
  }

  return (
    <Layout title="Community">
      {/* Stats */}
      <div className="grid-4" style={{ marginBottom: 28 }}>
        {[
          { icon: '👥', label: 'Total Members', value: members.length, color: '#BF0000' },
          { icon: '🌍', label: 'Spheres Active', value: 8, color: '#D4A017' },
          { icon: '🏆', label: 'Wins Shared', value: feed.length, color: '#1E90FF' },
          { icon: '🎓', label: 'Cohort', value: 1, color: '#BF0000' },
        ].map((s, i) => (
          <div key={i} className="card" style={{ borderTop: `4px solid ${s.color}`, textAlign: 'center' }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontWeight: 800, fontSize: 24, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 13, color: '#666', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: 'white', padding: 4, borderRadius: 10, width: 'fit-content', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        {[
          { key: 'feed', label: '🏆 Wins Feed' },
          { key: 'members', label: '👥 Members' },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{
            padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer',
            fontWeight: 600, fontSize: 14,
            background: tab === t.key ? '#BF0000' : 'transparent',
            color: tab === t.key ? 'white' : '#666',
            transition: 'all 0.2s',
          }}>{t.label}</button>
        ))}
      </div>

      {/* Wins Feed */}
      {tab === 'feed' && (
        <div style={{ maxWidth: 680 }}>
          {/* Post */}
          <div className="card" style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{
                width: 42, height: 42, borderRadius: '50%',
                background: 'linear-gradient(135deg, #BF0000, #D4A017)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontWeight: 700, fontSize: 14, flexShrink: 0,
              }}>{user.avatar}</div>
              <div style={{ flex: 1 }}>
                <textarea
                  value={winText}
                  onChange={e => setWinText(e.target.value)}
                  placeholder="Share a win with the VOCI community... 🎉 What are you celebrating today?"
                  rows={3}
                  style={{
                    width: '100%', padding: '12px 14px', borderRadius: 8,
                    border: '1px solid #eee', fontSize: 14, outline: 'none',
                    resize: 'none', fontFamily: 'inherit', background: '#f8f8f8',
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                  <button onClick={handlePost} className="btn btn-primary">
                    <Send size={14} /> Share Win
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Feed */}
          {feed.map(w => (
            <div key={w.id} className="card" style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #BF0000, #D4A017)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontWeight: 700, fontSize: 13, flexShrink: 0,
                }}>{w.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6, flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{w.member}</span>
                    <span className="badge badge-red" style={{ fontSize: 10 }}>{w.sphere}</span>
                    <span style={{ fontSize: 11, color: '#aaa', marginLeft: 'auto' }}>{w.date}</span>
                  </div>
                  <div style={{ fontSize: 14, color: '#333', lineHeight: 1.6 }}>{w.win}</div>
                  <div style={{ marginTop: 12, display: 'flex', gap: 16 }}>
                    <button
                      onClick={() => likeWin(w.id)}
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: 6,
                        color: '#888', fontSize: 13, fontWeight: 600,
                      }}
                    >
                      <Heart size={15} color="#BF0000" fill="#BF0000" /> {w.likes}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Members Directory */}
      {tab === 'members' && (
        <div>
          <div style={{ display: 'flex', gap: 12, marginBottom: 20, alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1, maxWidth: 360 }}>
              <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search members by name or sphere..."
                style={{
                  width: '100%', paddingLeft: 38, paddingRight: 16, paddingTop: 10, paddingBottom: 10,
                  border: '1px solid #eee', borderRadius: 8, fontSize: 14, outline: 'none',
                }}
              />
            </div>
            <div style={{ fontSize: 13, color: '#888' }}>
              <Users size={14} style={{ display: 'inline', marginRight: 4 }} />
              {filteredMembers.length} members
            </div>
          </div>
          <div className="grid-4">
            {filteredMembers.map(m => (
              <MemberCard key={m.id} member={m} isCurrentUser={m.id === 'm1'} />
            ))}
          </div>
        </div>
      )}
    </Layout>
  )
}