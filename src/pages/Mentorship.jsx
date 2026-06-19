import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { mentorshipSessions } from '../data/mockData'
import Layout from '../components/Layout'
import { CheckCircle, Clock, Plus, MessageCircle, Calendar, Target } from 'lucide-react'

const growSteps = [
  { letter: 'G', label: 'Goal', color: '#BF0000', prompt: 'What do you want to achieve in this session?' },
  { letter: 'R', label: 'Reality', color: '#D4A017', prompt: 'Where are you now? What is working / not working?' },
  { letter: 'O', label: 'Options', color: '#1E90FF', prompt: 'What are the possible paths forward?' },
  { letter: 'W', label: 'Way Forward', color: '#BF0000', prompt: 'What will you commit to doing before the next session?' },
]

function SessionCard({ session }) {
  const isUpcoming = session.status === 'upcoming'
  return (
    <div className="card" style={{ borderLeft: `4px solid ${isUpcoming ? '#BF0000' : '#2d8a2d'}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: 'linear-gradient(135deg, #BF0000, #D4A017)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 700, fontSize: 13, flexShrink: 0,
          }}>{session.avatar}</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>{session.with}</div>
            <div style={{ fontSize: 12, color: '#888' }}>
              {session.type === 'mentor' ? '👤 You are mentoring' : '🎓 Your mentor'}
            </div>
          </div>
        </div>
        <span className={`badge ${isUpcoming ? 'badge-red' : 'badge-green'}`}>
          {isUpcoming ? <Clock size={10} /> : <CheckCircle size={10} />}
          {isUpcoming ? 'Upcoming' : 'Completed'}
        </span>
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, color: '#333', marginBottom: 6 }}>📌 {session.topic}</div>
      <div style={{ fontSize: 12, color: '#888', marginBottom: session.notes ? 10 : 0 }}>
        <Calendar size={12} style={{ display: 'inline', marginRight: 4 }} />
        {session.date}
      </div>
      {session.notes && (
        <div style={{
          fontSize: 12, color: '#555', padding: '10px 12px',
          background: '#f8f8f8', borderRadius: 8, marginTop: 8,
          borderLeft: '3px solid #D4A017',
        }}>
          💡 {session.notes}
        </div>
      )}
    </div>
  )
}

export default function Mentorship() {
  const { user } = useApp()
  const [tab, setTab] = useState('sessions')
  const [growAnswers, setGrowAnswers] = useState({ G: '', R: '', O: '', W: '' })
  const [showGrow, setShowGrow] = useState(false)
  const [checkIn, setCheckIn] = useState({ win: '', challenge: '', commitment: '' })

  const upcoming = mentorshipSessions.filter(s => s.status === 'upcoming')
  const completed = mentorshipSessions.filter(s => s.status === 'completed')

  return (
    <Layout title="Mentorship">
      {/* Header cards */}
      <div className="grid-3" style={{ marginBottom: 28 }}>
        <div className="card" style={{ borderTop: '4px solid #BF0000', textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🎓</div>
          <div style={{ fontWeight: 800, fontSize: 18, color: '#BF0000' }}>{user.mentor.name}</div>
          <div style={{ fontSize: 13, color: '#888', marginTop: 4 }}>Your Mentor</div>
          <div style={{ fontSize: 12, color: '#BF0000', marginTop: 4 }}>{user.mentor.sphere}</div>
          <button className="btn btn-primary" style={{ marginTop: 14, width: '100%', justifyContent: 'center' }}>
            <MessageCircle size={14} /> Message
          </button>
        </div>
        <div className="card" style={{ borderTop: '4px solid #D4A017', textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>👤</div>
          <div style={{ fontWeight: 800, fontSize: 18, color: '#D4A017' }}>{user.mentee.name}</div>
          <div style={{ fontSize: 13, color: '#888', marginTop: 4 }}>Your Mentee</div>
          <div style={{ fontSize: 12, color: '#D4A017', marginTop: 4 }}>{user.mentee.sphere}</div>
          <button className="btn btn-gold" style={{ marginTop: 14, width: '100%', justifyContent: 'center' }}>
            <MessageCircle size={14} /> Message
          </button>
        </div>
        <div className="card" style={{ borderTop: '4px solid #1E90FF', textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🤝</div>
          <div style={{ fontWeight: 800, fontSize: 18, color: '#1E90FF' }}>{user.peerPartner.name}</div>
          <div style={{ fontSize: 13, color: '#888', marginTop: 4 }}>Peer Partner</div>
          <div style={{ fontSize: 12, color: '#1E90FF', marginTop: 4 }}>{user.peerPartner.sphere}</div>
          <button className="btn btn-secondary" style={{ marginTop: 14, width: '100%', justifyContent: 'center', borderColor: '#1E90FF', color: '#1E90FF' }}>
            <MessageCircle size={14} /> Check In
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: 'white', padding: 4, borderRadius: 10, width: 'fit-content', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        {[
          { key: 'sessions', label: '📅 Sessions' },
          { key: 'grow', label: '⚡ GROW Tool' },
          { key: 'checkin', label: '✅ Peer Check-In' },
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

      {/* Sessions Tab */}
      {tab === 'sessions' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontWeight: 700, fontSize: 16 }}>Upcoming Sessions ({upcoming.length})</h3>
            <button className="btn btn-primary"><Plus size={14} /> Schedule Session</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
            {upcoming.map(s => <SessionCard key={s.id} session={s} />)}
          </div>
          <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Past Sessions ({completed.length})</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {completed.map(s => <SessionCard key={s.id} session={s} />)}
          </div>
        </div>
      )}

      {/* GROW Tool Tab */}
      {tab === 'grow' && (
        <div>
          <div style={{ marginBottom: 20, padding: '16px 20px', background: '#fff8f8', borderRadius: 10, borderLeft: '4px solid #BF0000' }}>
            <div style={{ fontWeight: 700, color: '#BF0000', marginBottom: 4 }}>⚡ The GROW Framework</div>
            <div style={{ fontSize: 13, color: '#555' }}>Use this tool to structure your mentorship conversations. Fill in each section before or during your session.</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {growSteps.map(step => (
              <div key={step.letter} className="card" style={{ borderLeft: `5px solid ${step.color}` }}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%',
                    background: step.color, color: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, fontSize: 20, flexShrink: 0,
                  }}>{step.letter}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 16, color: step.color, marginBottom: 4 }}>{step.label}</div>
                    <div style={{ fontSize: 13, color: '#888', marginBottom: 10 }}>{step.prompt}</div>
                    <textarea
                      value={growAnswers[step.letter]}
                      onChange={e => setGrowAnswers({ ...growAnswers, [step.letter]: e.target.value })}
                      placeholder={`Write your ${step.label.toLowerCase()} here...`}
                      rows={3}
                      style={{
                        width: '100%', padding: '10px 12px', borderRadius: 8,
                        border: `1px solid ${step.color}40`, fontSize: 14,
                        outline: 'none', resize: 'vertical', fontFamily: 'inherit',
                        background: '#fafafa',
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
            <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
              <Target size={14} /> Save Session Notes
            </button>
            <button className="btn btn-secondary" onClick={() => setGrowAnswers({ G: '', R: '', O: '', W: '' })}>
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Peer Check-In Tab */}
      {tab === 'checkin' && (
        <div>
          <div style={{ marginBottom: 20, padding: '16px 20px', background: '#e8f4ff', borderRadius: 10, borderLeft: '4px solid #1E90FF' }}>
            <div style={{ fontWeight: 700, color: '#1E90FF', marginBottom: 4 }}>✅ Peer Accountability Check-In</div>
            <div style={{ fontSize: 13, color: '#555' }}>
              Check in with <strong>{user.peerPartner.name}</strong> — your peer accountability partner. Share your win, your challenge, and your commitment for the week.
            </div>
          </div>
          <div className="card">
            <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 20 }}>This Week's Check-In</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { key: 'win', label: '🏆 My Win This Week', placeholder: 'What went well? What are you celebrating?', color: '#2d8a2d' },
                { key: 'challenge', label: '⚡ My Challenge This Week', placeholder: 'What was difficult? What did you struggle with?', color: '#D4A017' },
                { key: 'commitment', label: '🎯 My Commitment for Next Week', placeholder: 'What specific action will you take before the next check-in?', color: '#BF0000' },
              ].map(({ key, label, placeholder, color }) => (
                <div key={key}>
                  <label style={{ fontWeight: 700, fontSize: 14, color, display: 'block', marginBottom: 8 }}>{label}</label>
                  <textarea
                    value={checkIn[key]}
                    onChange={e => setCheckIn({ ...checkIn, [key]: e.target.value })}
                    placeholder={placeholder}
                    rows={3}
                    style={{
                      width: '100%', padding: '12px 14px', borderRadius: 8,
                      border: `1px solid ${color}40`, fontSize: 14,
                      outline: 'none', resize: 'vertical', fontFamily: 'inherit',
                    }}
                  />
                </div>
              ))}
            </div>
            <button className="btn btn-primary" style={{ marginTop: 20, width: '100%', justifyContent: 'center' }}>
              <CheckCircle size={14} /> Submit Check-In to {user.peerPartner.name}
            </button>
          </div>
        </div>
      )}
    </Layout>
  )
}