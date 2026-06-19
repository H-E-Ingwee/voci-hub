import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { levelSystem } from '../data/mockData'
import Layout from '../components/Layout'
import { Edit3, Save, X, Star, Flame, Trophy, Shield } from 'lucide-react'

export default function Profile() {
  const { user, setUser } = useApp()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ ...user })

  const save = () => { setUser(form); setEditing(false) }
  const cancel = () => { setForm({ ...user }); setEditing(false) }

  const currentLevel = levelSystem.find(l => l.level === user.level)
  const xpPct = Math.round((user.xp / user.xpToNext) * 100)

  return (
    <Layout title="My Profile">
      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 24 }}>

        {/* Left — Identity Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="card" style={{ textAlign: 'center', borderTop: `4px solid ${currentLevel?.color}` }}>
            {/* Avatar */}
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: 'linear-gradient(135deg, #BF0000, #D4A017)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: 800, fontSize: 28,
              margin: '0 auto 16px',
              boxShadow: '0 4px 16px rgba(191,0,0,0.3)',
            }}>{user.avatar}</div>

            <h2 style={{ fontWeight: 800, fontSize: 20, color: '#222' }}>{user.name}</h2>
            <div style={{ color: '#BF0000', fontWeight: 600, fontSize: 14, marginTop: 4 }}>{user.role}</div>
            <div style={{ color: '#888', fontSize: 13, marginTop: 4 }}>{user.campus}</div>
            <div className="badge badge-gold" style={{ margin: '12px auto 0', display: 'inline-flex' }}>
              {user.cohort}
            </div>

            {/* XP Bar */}
            <div style={{ marginTop: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#888', marginBottom: 6 }}>
                <span>Level {user.level} — {user.levelName}</span>
                <span>{user.xp.toLocaleString()} / {user.xpToNext.toLocaleString()} XP</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${xpPct}%`, background: currentLevel?.color }} />
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginTop: 20 }}>
              {[
                { icon: <Flame size={16} color="#BF0000" />, val: user.streak, label: 'Streak' },
                { icon: <Star size={16} color="#D4A017" />, val: user.xp, label: 'XP' },
                { icon: <Trophy size={16} color="#1E90FF" />, val: user.badges.length, label: 'Badges' },
              ].map((s, i) => (
                <div key={i} style={{ background: '#f8f8f8', borderRadius: 8, padding: '10px 8px', textAlign: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>{s.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: '#222' }}>{s.val}</div>
                  <div style={{ fontSize: 11, color: '#888' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div className="card">
            <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 14 }}>🏅 Badges</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {user.badges.map((b, i) => (
                <span key={i} className="badge badge-red" style={{ fontSize: 11 }}>
                  <Shield size={10} /> {b}
                </span>
              ))}
            </div>
          </div>

          {/* Level System */}
          <div className="card">
            <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 14 }}>📊 Level System</h3>
            {levelSystem.map(l => (
              <div key={l.level} style={{
                display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10,
                opacity: l.level > user.level ? 0.4 : 1,
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: l.level <= user.level ? l.color : '#ddd',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontWeight: 700, fontSize: 12, flexShrink: 0,
                }}>{l.level}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: l.level === user.level ? l.color : '#333' }}>
                    {l.name} {l.level === user.level && '← You'}
                  </div>
                  <div style={{ fontSize: 11, color: '#888' }}>{l.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Edit bar */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
            {editing ? (
              <>
                <button onClick={cancel} className="btn btn-secondary"><X size={14} /> Cancel</button>
                <button onClick={save} className="btn btn-primary"><Save size={14} /> Save Changes</button>
              </>
            ) : (
              <button onClick={() => setEditing(true)} className="btn btn-secondary"><Edit3 size={14} /> Edit Profile</button>
            )}
          </div>

          {/* Personal Info */}
          <div className="card">
            <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 20, color: '#BF0000' }}>Personal Information</h3>
            <div className="grid-2" style={{ gap: 16 }}>
              {[
                { label: 'Full Name', key: 'name' },
                { label: 'Email', key: 'email' },
                { label: 'Role / Title', key: 'role' },
                { label: 'Campus', key: 'campus' },
                { label: 'Primary Sphere', key: 'sphere' },
                { label: 'Join Date', key: 'joinDate' },
              ].map(({ label, key }) => (
                <div key={key}>
                  <label style={{ fontSize: 12, color: '#888', fontWeight: 600, display: 'block', marginBottom: 6 }}>{label}</label>
                  {editing ? (
                    <input
                      value={form[key] || ''}
                      onChange={e => setForm({ ...form, [key]: e.target.value })}
                      style={{
                        width: '100%', padding: '10px 12px', borderRadius: 8,
                        border: '1px solid #ddd', fontSize: 14, outline: 'none',
                      }}
                    />
                  ) : (
                    <div style={{ fontSize: 14, color: '#222', padding: '10px 0', borderBottom: '1px solid #f5f5f5' }}>
                      {user[key] || '—'}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Brand Identity */}
          <div className="card">
            <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 20, color: '#BF0000' }}>Brand Identity</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 12, color: '#888', fontWeight: 600, display: 'block', marginBottom: 6 }}>My UVP (Unique Value Proposition)</label>
                {editing ? (
                  <input value={form.uvp || ''} onChange={e => setForm({ ...form, uvp: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', fontSize: 14, outline: 'none' }} />
                ) : (
                  <div style={{
                    fontSize: 15, color: '#BF0000', fontWeight: 600, fontStyle: 'italic',
                    padding: '12px 16px', background: '#fff8f8', borderRadius: 8, borderLeft: '4px solid #BF0000',
                  }}>"{user.uvp}"</div>
                )}
              </div>
              <div>
                <label style={{ fontSize: 12, color: '#888', fontWeight: 600, display: 'block', marginBottom: 6 }}>Bio</label>
                {editing ? (
                  <textarea value={form.bio || ''} onChange={e => setForm({ ...form, bio: e.target.value })} rows={3}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', fontSize: 14, outline: 'none', resize: 'vertical' }} />
                ) : (
                  <div style={{ fontSize: 14, color: '#333', lineHeight: 1.6 }}>{user.bio}</div>
                )}
              </div>
              <div>
                <label style={{ fontSize: 12, color: '#888', fontWeight: 600, display: 'block', marginBottom: 8 }}>Core Values</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {user.values.map((v, i) => (
                    <span key={i} className="badge badge-red">{v}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mentorship */}
          <div className="card">
            <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 20, color: '#BF0000' }}>Mentorship Connections</h3>
            <div className="grid-2" style={{ gap: 16 }}>
              {[
                { label: 'My Mentor', person: user.mentor, role: 'Vertical Mentor' },
                { label: 'My Mentee', person: user.mentee, role: 'Vertical Mentee' },
                { label: 'Peer Partner', person: user.peerPartner, role: 'Accountability Partner' },
              ].map(({ label, person, role }) => (
                <div key={label} style={{
                  padding: 16, background: '#f8f8f8', borderRadius: 10,
                  display: 'flex', gap: 12, alignItems: 'center',
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #BF0000, #D4A017)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontWeight: 700, fontSize: 14, flexShrink: 0,
                  }}>{person.avatar}</div>
                  <div>
                    <div style={{ fontSize: 11, color: '#888', fontWeight: 600 }}>{label}</div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: '#222' }}>{person.name}</div>
                    <div style={{ fontSize: 12, color: '#BF0000' }}>{person.sphere}</div>
                    <div style={{ fontSize: 11, color: '#888' }}>{role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}