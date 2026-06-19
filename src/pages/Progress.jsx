import React from 'react'
import { useApp } from '../context/AppContext'
import { pillars, progressData, actionPlan } from '../data/mockData'
import Layout from '../components/Layout'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis } from 'recharts'
import { CheckCircle, Clock, Target } from 'lucide-react'

const radarData = [
  { subject: 'Communication', A: 85 },
  { subject: 'Branding', A: 100 },
  { subject: 'Leadership', A: 60 },
  { subject: 'Mentorship', A: 75 },
  { subject: 'Community', A: 40 },
]

export default function Progress() {
  const { tasks, toggleTask } = useApp()
  const done = tasks.filter(t => t.done).length
  const pct = Math.round((done / tasks.length) * 100)
  const overallProgress = Math.round(pillars.reduce((a, p) => a + p.progress, 0) / pillars.length)

  return (
    <Layout title="My Progress">
      {/* Overall */}
      <div style={{
        background: 'linear-gradient(135deg, #BF0000, #8B0000)',
        borderRadius: 16, padding: '28px 32px', marginBottom: 28,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white',
      }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: 22, marginBottom: 8 }}>Your VOCI Journey Progress</div>
          <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>
            You are {overallProgress}% through the full VOCI curriculum. Keep going — the best is ahead.
          </div>
          <div style={{ marginTop: 16, display: 'flex', gap: 24 }}>
            {pillars.map(p => (
              <div key={p.id} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 20 }}>{p.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 16, color: '#D4A017' }}>{p.progress}%</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>P{p.number}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ textAlign: 'center', flexShrink: 0 }}>
          <div style={{
            width: 100, height: 100, borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            border: '4px solid #D4A017',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 36, fontWeight: 800, color: '#D4A017',
          }}>{overallProgress}%</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 8 }}>Overall</div>
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: 28 }}>
        {/* Radar Chart */}
        <div className="card">
          <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Skills Radar</h3>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
              <Radar name="Progress" dataKey="A" stroke="#BF0000" fill="#BF0000" fillOpacity={0.25} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Sessions Chart */}
        <div className="card">
          <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Sessions Over Time</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={progressData}>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="sessions" fill="#BF0000" radius={[4, 4, 0, 0]} name="Sessions" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pillar Progress */}
      <div className="card" style={{ marginBottom: 28 }}>
        <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 20 }}>Pillar-by-Pillar Progress</h3>
        {pillars.map(p => (
          <div key={p.id} style={{ marginBottom: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <span style={{ fontSize: 20 }}>{p.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: '#222' }}>Pillar {p.number}: {p.title}</div>
                  <div style={{ fontSize: 12, color: '#888' }}>{p.completed}/{p.modules} modules · {p.currentModule}</div>
                </div>
              </div>
              <span style={{ fontWeight: 800, fontSize: 18, color: p.color }}>{p.progress}%</span>
            </div>
            <div className="progress-bar" style={{ height: 10 }}>
              <div className="progress-fill" style={{ width: `${p.progress}%`, background: p.color }} />
            </div>
          </div>
        ))}
      </div>

      {/* 30-Day Action Plan */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ fontWeight: 700, fontSize: 16 }}>30-Day Action Plan</h3>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div className="progress-bar" style={{ width: 120 }}>
              <div className="progress-fill" style={{ width: `${pct}%` }} />
            </div>
            <span style={{ fontWeight: 700, color: '#BF0000', fontSize: 14 }}>{done}/{tasks.length}</span>
          </div>
        </div>

        {[1, 2, 3, 4].map(week => {
          const weekTasks = tasks.filter(t => t.week === week)
          const weekTheme = weekTasks[0]?.theme
          return (
            <div key={week} style={{ marginBottom: 20 }}>
              <div style={{
                fontWeight: 700, fontSize: 13, color: '#BF0000',
                marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <Target size={14} />
                Week {week} — {weekTheme}
              </div>
              {weekTasks.map(t => (
                <div
                  key={t.id}
                  onClick={() => toggleTask(t.id)}
                  style={{
                    display: 'flex', gap: 12, alignItems: 'flex-start',
                    padding: '10px 12px', borderRadius: 8, marginBottom: 6,
                    background: t.done ? '#f0fff0' : '#f8f8f8',
                    cursor: 'pointer', transition: 'background 0.2s',
                    border: `1px solid ${t.done ? '#c3e6c3' : '#eee'}`,
                  }}
                >
                  {t.done
                    ? <CheckCircle size={18} color="#2d8a2d" style={{ flexShrink: 0, marginTop: 1 }} />
                    : <Clock size={18} color="#D4A017" style={{ flexShrink: 0, marginTop: 1 }} />
                  }
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: 13, color: t.done ? '#888' : '#222',
                      textDecoration: t.done ? 'line-through' : 'none',
                    }}>{t.action}</div>
                    <div style={{ fontSize: 11, color: '#aaa', marginTop: 2 }}>Due: {t.dueDate}</div>
                  </div>
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </Layout>
  )
}