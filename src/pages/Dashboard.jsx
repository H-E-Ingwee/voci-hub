import React from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { pillars, sessions, announcements, progressData } from '../data/mockData'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Flame, Star, Trophy, ArrowRight, Calendar, CheckCircle, Clock } from 'lucide-react'
import Layout from '../components/Layout'

function StatCard({ icon, label, value, sub, color }) {
  return (
    <div className="card" style={{ borderTop: `4px solid ${color}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: 28, fontWeight: 800, color }}>{value}</div>
          <div style={{ fontWeight: 600, color: '#333', marginTop: 4 }}>{label}</div>
          {sub && <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{sub}</div>}
        </div>
        <div style={{ fontSize: 28 }}>{icon}</div>
      </div>
    </div>
  )
}

function PillarCard({ pillar }) {
  return (
    <Link to="/training" style={{ textDecoration: 'none' }}>
      <div className="card card-hover" style={{ borderLeft: `4px solid ${pillar.color}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontSize: 24 }}>{pillar.icon}</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: pillar.color }}>{pillar.progress}%</span>
        </div>
        <div style={{ fontWeight: 700, fontSize: 14, color: '#222', marginBottom: 6 }}>Pillar {pillar.number}: {pillar.title}</div>
        <div className="progress-bar" style={{ marginBottom: 8 }}>
          <div className="progress-fill" style={{ width: `${pillar.progress}%`, background: pillar.color }} />
        </div>
        <div style={{ fontSize: 12, color: '#888' }}>{pillar.completed}/{pillar.modules} modules</div>
        {pillar.nextSession && (
          <div style={{ marginTop: 8, fontSize: 11, color: pillar.color, fontWeight: 600 }}>
            📅 {pillar.nextSession}
          </div>
        )}
      </div>
    </Link>
  )
}

export default function Dashboard() {
  const { user, tasks, feed, addWin } = useApp()
  const [winText, setWinText] = React.useState('')
  const completedTasks = tasks.filter(t => t.done).length
  const overallProgress = Math.round(pillars.reduce((a, p) => a + p.progress, 0) / pillars.length)
  const upcomingSessions = sessions.filter(s => s.status === 'upcoming').slice(0, 2)

  const handleWin = () => {
    if (winText.trim()) { addWin(winText); setWinText('') }
  }

  return (
    <Layout title="Dashboard">
      {/* Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #BF0000 0%, #8B0000 60%, #1a0000 100%)',
        borderRadius: 16, padding: '28px 32px', marginBottom: 28,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        color: 'white', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', right: -20, top: -20, fontSize: 120, opacity: 0.06 }}>🎙️</div>
        <div>
          <div style={{ fontSize: 13, color: '#D4A017', fontWeight: 600, marginBottom: 6, letterSpacing: 1 }}>
            {user.cohort}
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8 }}>
            Welcome back, {user.name.split(' ')[0]}! 👋
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, maxWidth: 480 }}>
            {user.uvp}
          </p>
          <div style={{ display: 'flex', gap: 20, marginTop: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Flame size={16} color="#D4A017" />
              <span style={{ fontSize: 13, color: '#D4A017', fontWeight: 600 }}>{user.streak} day streak</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Star size={16} color="#D4A017" />
              <span style={{ fontSize: 13, color: '#D4A017', fontWeight: 600 }}>{user.xp.toLocaleString()} XP</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Trophy size={16} color="#D4A017" />
              <span style={{ fontSize: 13, color: '#D4A017', fontWeight: 600 }}>Level {user.level} — {user.levelName}</span>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', flexShrink: 0 }}>
          <div style={{
            width: 90, height: 90, borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            border: '3px solid #D4A017',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 32, fontWeight: 800, color: '#D4A017',
          }}>{overallProgress}%</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 8 }}>Overall Progress</div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid-4" style={{ marginBottom: 28 }}>
        <StatCard icon="🎙️" label="Sessions Attended" value="18" sub="This programme cycle" color="#BF0000" />
        <StatCard icon="✅" label="Tasks Completed" value={`${completedTasks}/${tasks.length}`} sub="30-day action plan" color="#D4A017" />
        <StatCard icon="🤝" label="Mentorship Sessions" value="4" sub="2 as mentor, 2 as mentee" color="#1E90FF" />
        <StatCard icon="🌍" label="Impact Projects" value="1" sub="Girls Leadership Programme" color="#BF0000" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 28 }}>
        {/* Pillars */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontWeight: 700, fontSize: 16 }}>My Training Pillars</h3>
            <Link to="/training" style={{ color: '#BF0000', fontSize: 13, fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {pillars.map(p => <PillarCard key={p.id} pillar={p} />)}
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Progress Chart */}
          <div className="card">
            <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Programme Progress</h3>
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={progressData}>
                <defs>
                  <linearGradient id="redGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#BF0000" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#BF0000" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Area type="monotone" dataKey="sessions" stroke="#BF0000" fill="url(#redGrad)" strokeWidth={2} name="Sessions" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Upcoming Sessions */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontWeight: 700, fontSize: 16 }}>Upcoming Sessions</h3>
              <Link to="/sessions" style={{ color: '#BF0000', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>View All</Link>
            </div>
            {upcomingSessions.map(s => (
              <div key={s.id} style={{
                padding: '12px 0', borderBottom: '1px solid #f5f5f5',
                display: 'flex', gap: 12, alignItems: 'flex-start',
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 8,
                  background: '#fff0f0', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Calendar size={18} color="#BF0000" />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: '#222' }}>{s.title}</div>
                  <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{s.date} · {s.time}</div>
                  <div style={{ fontSize: 11, color: '#BF0000', fontWeight: 600, marginTop: 4 }}>{s.platform} · {s.attendees} attending</div>
                </div>
              </div>
            ))}
          </div>

          {/* 30-Day Action Plan */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontWeight: 700, fontSize: 16 }}>30-Day Action Plan</h3>
              <Link to="/progress" style={{ color: '#BF0000', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>View All</Link>
            </div>
            {tasks.slice(0, 4).map(t => (
              <div key={t.id} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
                {t.done
                  ? <CheckCircle size={18} color="#2d8a2d" style={{ flexShrink: 0, marginTop: 1 }} />
                  : <Clock size={18} color="#D4A017" style={{ flexShrink: 0, marginTop: 1 }} />
                }
                <div>
                  <div style={{ fontSize: 13, color: t.done ? '#888' : '#222', textDecoration: t.done ? 'line-through' : 'none' }}>{t.action}</div>
                  <div style={{ fontSize: 11, color: '#aaa', marginTop: 2 }}>Week {t.week} · Due {t.dueDate}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wins Feed */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ fontWeight: 700, fontSize: 16 }}>🏆 Community Wins</h3>
          <Link to="/community" style={{ color: '#BF0000', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>View All</Link>
        </div>
        {/* Post a win */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
          <div style={{
            width: 38, height: 38, borderRadius: '50%',
            background: 'linear-gradient(135deg, #BF0000, #D4A017)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 700, fontSize: 13, flexShrink: 0,
          }}>BI</div>
          <div style={{ flex: 1, display: 'flex', gap: 8 }}>
            <input
              value={winText}
              onChange={e => setWinText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleWin()}
              placeholder="Share a win with the community... 🎉"
              style={{
                flex: 1, padding: '10px 16px', borderRadius: 8,
                border: '1px solid #eee', fontSize: 14, outline: 'none',
                background: '#f8f8f8',
              }}
            />
            <button onClick={handleWin} className="btn btn-primary" style={{ padding: '10px 16px' }}>Post</button>
          </div>
        </div>
        {/* Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {feed.slice(0, 3).map(w => (
            <div key={w.id} style={{ display: 'flex', gap: 12 }}>
              <div style={{
                width: 38, height: 38, borderRadius: '50%',
                background: 'linear-gradient(135deg, #BF0000, #D4A017)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontWeight: 700, fontSize: 12, flexShrink: 0,
              }}>{w.avatar}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, fontSize: 13 }}>{w.member}</span>
                  <span className="badge badge-red" style={{ fontSize: 10 }}>{w.sphere}</span>
                  <span style={{ fontSize: 11, color: '#aaa', marginLeft: 'auto' }}>{w.date}</span>
                </div>
                <div style={{ fontSize: 13, color: '#333', lineHeight: 1.5 }}>{w.win}</div>
                <div style={{ marginTop: 8, fontSize: 12, color: '#888' }}>❤️ {w.likes} likes</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Announcements preview */}
      {announcements.filter(a => a.urgent).length > 0 && (
        <div style={{
          marginTop: 24,
          background: '#fff8f8',
          border: '1px solid #ffcccc',
          borderLeft: '4px solid #BF0000',
          borderRadius: 12, padding: '16px 20px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <div style={{ fontWeight: 700, color: '#BF0000', fontSize: 14 }}>
              🔔 {announcements.find(a => a.urgent)?.title}
            </div>
            <div style={{ fontSize: 13, color: '#555', marginTop: 4 }}>
              {announcements.find(a => a.urgent)?.body.slice(0, 100)}...
            </div>
          </div>
          <Link to="/announcements" className="btn btn-primary" style={{ flexShrink: 0, marginLeft: 16 }}>
            View <ArrowRight size={14} />
          </Link>
        </div>
      )}
    </Layout>
  )
}