import React, { useState } from 'react'
import { pillars, frameworks } from '../data/mockData'
import Layout from '../components/Layout'
import { BookOpen, ChevronDown, ChevronUp, CheckCircle, Lock, Play } from 'lucide-react'

function FrameworkCard({ fw }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="card" style={{ borderTop: `4px solid ${fw.color}`, cursor: 'pointer' }} onClick={() => setOpen(!open)}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: 20, color: fw.color, letterSpacing: 1 }}>{fw.name}</div>
          <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{fw.tagline}</div>
          <span className="badge badge-red" style={{ marginTop: 8, fontSize: 10 }}>{fw.pillar}</span>
        </div>
        {open ? <ChevronUp size={18} color="#888" /> : <ChevronDown size={18} color="#888" />}
      </div>
      {open && (
        <div style={{ marginTop: 16, borderTop: '1px solid #f0f0f0', paddingTop: 16 }}>
          {fw.steps.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start' }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: fw.color, color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, fontSize: 14, flexShrink: 0,
              }}>{s.letter}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13, color: '#222' }}>{s.label}</div>
                <div style={{ fontSize: 12, color: '#666', marginTop: 2 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function PillarDetail({ pillar }) {
  const [open, setOpen] = useState(false)
  const modules = Array.from({ length: pillar.modules }, (_, i) => ({
    num: i + 1,
    done: i < pillar.completed,
    active: i === pillar.completed,
    locked: i > pillar.completed,
  }))

  return (
    <div className="card" style={{ borderLeft: `5px solid ${pillar.color}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', cursor: 'pointer' }} onClick={() => setOpen(!open)}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <span style={{ fontSize: 32 }}>{pillar.icon}</span>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16, color: '#222' }}>Pillar {pillar.number}: {pillar.title}</div>
            <div style={{ fontSize: 13, color: '#666', marginTop: 4, maxWidth: 400 }}>{pillar.description}</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
              {pillar.frameworks.map(f => (
                <span key={f} className="badge badge-red" style={{ fontSize: 10 }}>{f}</span>
              ))}
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 16 }}>
          <div style={{ fontWeight: 800, fontSize: 22, color: pillar.color }}>{pillar.progress}%</div>
          <div style={{ fontSize: 12, color: '#888' }}>{pillar.completed}/{pillar.modules} modules</div>
          <div style={{ marginTop: 8 }}>
            {open ? <ChevronUp size={18} color="#888" /> : <ChevronDown size={18} color="#888" />}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="progress-bar" style={{ marginTop: 16 }}>
        <div className="progress-fill" style={{ width: `${pillar.progress}%`, background: pillar.color }} />
      </div>

      {open && (
        <div style={{ marginTop: 20, borderTop: '1px solid #f0f0f0', paddingTop: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
            {modules.map(m => (
              <div key={m.num} style={{
                padding: '14px 16px', borderRadius: 10,
                background: m.done ? '#f0fff0' : m.active ? '#fff8f8' : '#f8f8f8',
                border: `1px solid ${m.done ? '#c3e6c3' : m.active ? '#ffcccc' : '#eee'}`,
                display: 'flex', gap: 10, alignItems: 'center',
              }}>
                {m.done
                  ? <CheckCircle size={18} color="#2d8a2d" />
                  : m.active
                    ? <Play size={18} color="#BF0000" />
                    : <Lock size={18} color="#ccc" />
                }
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: m.locked ? '#aaa' : '#222' }}>
                    Module {m.num}
                  </div>
                  <div style={{ fontSize: 11, color: m.done ? '#2d8a2d' : m.active ? '#BF0000' : '#aaa' }}>
                    {m.done ? 'Completed' : m.active ? 'In Progress' : 'Locked'}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {pillar.nextSession && (
            <div style={{
              marginTop: 16, padding: '12px 16px',
              background: '#fff8f8', borderRadius: 8,
              border: '1px solid #ffcccc',
              fontSize: 13, color: '#BF0000', fontWeight: 600,
            }}>
              📅 Next Session: {pillar.nextSession}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function Training() {
  const [tab, setTab] = useState('pillars')
  const overallProgress = Math.round(pillars.reduce((a, p) => a + p.progress, 0) / pillars.length)

  return (
    <Layout title="Training Library">
      {/* Header stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginBottom: 28 }}>
        {pillars.map(p => (
          <div key={p.id} style={{
            background: 'white', borderRadius: 10, padding: '14px 16px',
            borderTop: `4px solid ${p.color}`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}>
            <div style={{ fontSize: 20, marginBottom: 6 }}>{p.icon}</div>
            <div style={{ fontWeight: 700, fontSize: 13, color: '#222', marginBottom: 4 }}>Pillar {p.number}</div>
            <div className="progress-bar" style={{ marginBottom: 4 }}>
              <div className="progress-fill" style={{ width: `${p.progress}%`, background: p.color }} />
            </div>
            <div style={{ fontSize: 11, color: '#888' }}>{p.progress}% complete</div>
          </div>
        ))}
      </div>

      {/* Overall */}
      <div style={{
        background: 'linear-gradient(135deg, #BF0000, #8B0000)',
        borderRadius: 12, padding: '20px 24px', marginBottom: 28,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white',
      }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: 18 }}>Overall Curriculum Progress</div>
          <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 4 }}>
            Keep going — you are {overallProgress}% through the full VOCI curriculum
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: 40, color: '#D4A017' }}>{overallProgress}%</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Complete</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: 'white', padding: 4, borderRadius: 10, width: 'fit-content', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        {[
          { key: 'pillars', label: '📚 Training Pillars' },
          { key: 'frameworks', label: '⚡ Frameworks' },
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

      {tab === 'pillars' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {pillars.map(p => <PillarDetail key={p.id} pillar={p} />)}
        </div>
      )}

      {tab === 'frameworks' && (
        <div>
          <div style={{ marginBottom: 20, padding: '16px 20px', background: '#fff8f8', borderRadius: 10, borderLeft: '4px solid #BF0000' }}>
            <div style={{ fontWeight: 700, color: '#BF0000', marginBottom: 4 }}>⚡ VOCI's 6 Proprietary Frameworks</div>
            <div style={{ fontSize: 13, color: '#555' }}>Click any framework to expand and see the full breakdown. These are your tools — know them cold.</div>
          </div>
          <div className="grid-2" style={{ gap: 16 }}>
            {frameworks.map(fw => <FrameworkCard key={fw.id} fw={fw} />)}
          </div>
        </div>
      )}
    </Layout>
  )
}