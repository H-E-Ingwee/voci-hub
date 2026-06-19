import React, { useState } from 'react'
import { spheres, hubs, members } from '../data/mockData'
import Layout from '../components/Layout'
import { Users, Calendar, ArrowRight } from 'lucide-react'

export default function Spheres() {
  const [tab, setTab] = useState('spheres')
  const [selected, setSelected] = useState(null)

  return (
    <Layout title="Spheres & Hubs">
      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: 'white', padding: 4, borderRadius: 10, width: 'fit-content', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        {[
          { key: 'spheres', label: '🌍 8 Spheres' },
          { key: 'hubs', label: '🏛️ 4 Hubs' },
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

      {tab === 'spheres' && (
        <div>
          <div style={{ marginBottom: 20, padding: '16px 20px', background: '#fff8f8', borderRadius: 10, borderLeft: '4px solid #BF0000' }}>
            <div style={{ fontWeight: 700, color: '#BF0000', marginBottom: 4 }}>🌍 VOCI's Eight Spheres of Influence</div>
            <div style={{ fontSize: 13, color: '#555' }}>
              Every VOCI member is called to transform at least one sphere. Which one is yours? Click a sphere to see its members.
            </div>
          </div>
          <div className="grid-4">
            {spheres.map(s => {
              const sphereMembers = members.filter(m => m.sphere.includes(s.name))
              const isSelected = selected === s.id
              return (
                <div
                  key={s.id}
                  className="card card-hover"
                  onClick={() => setSelected(isSelected ? null : s.id)}
                  style={{
                    borderTop: `4px solid ${s.color}`,
                    background: isSelected ? `${s.color}08` : 'white',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ fontSize: 36, marginBottom: 12 }}>{s.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: '#222', marginBottom: 6 }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: '#888', marginBottom: 12, lineHeight: 1.4 }}>{s.description}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 12, color: s.color, fontWeight: 600 }}>
                      <Users size={12} style={{ display: 'inline', marginRight: 4 }} />
                      {s.members} members
                    </span>
                    <ArrowRight size={14} color={s.color} />
                  </div>
                  {isSelected && sphereMembers.length > 0 && (
                    <div style={{ marginTop: 14, borderTop: '1px solid #f0f0f0', paddingTop: 14 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#888', marginBottom: 8 }}>Members in this sphere:</div>
                      {sphereMembers.slice(0, 4).map(m => (
                        <div key={m.id} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                          <div style={{
                            width: 28, height: 28, borderRadius: '50%',
                            background: `linear-gradient(135deg, ${s.color}, #D4A017)`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: 'white', fontWeight: 700, fontSize: 10, flexShrink: 0,
                          }}>{m.avatar}</div>
                          <div>
                            <div style={{ fontSize: 12, fontWeight: 600, color: '#222' }}>{m.name}</div>
                            <div style={{ fontSize: 10, color: '#888' }}>{m.levelName}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {tab === 'hubs' && (
        <div>
          <div style={{ marginBottom: 20, padding: '16px 20px', background: '#fff8f8', borderRadius: 10, borderLeft: '4px solid #BF0000' }}>
            <div style={{ fontWeight: 700, color: '#BF0000', marginBottom: 4 }}>🏛️ VOCI's Four Specialised Hubs</div>
            <div style={{ fontSize: 13, color: '#555' }}>
              Hubs are sphere-specific communities where VOCI's training meets real-world challenges. Each Hub has its own programming, mentorship connections, and impact projects.
            </div>
          </div>
          <div className="grid-2">
            {hubs.map(h => (
              <div key={h.id} className="card card-hover" style={{ borderTop: `5px solid ${h.color}` }}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 16 }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: 12,
                    background: `${h.color}15`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 28, flexShrink: 0,
                  }}>{h.icon}</div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 18, color: '#222' }}>{h.name}</div>
                    <div style={{ fontSize: 12, color: h.color, fontWeight: 600, marginTop: 2 }}>{h.spheres}</div>
                    <div style={{ fontSize: 13, color: '#666', marginTop: 6, fontStyle: 'italic' }}>"{h.description}"</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#555' }}>
                    <Users size={14} color={h.color} />
                    <span><strong>{h.members}</strong> members</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#555' }}>
                    <Calendar size={14} color={h.color} />
                    <span>{h.nextEvent}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', background: h.color }}>
                    Join Hub
                  </button>
                  <button className="btn btn-secondary" style={{ borderColor: h.color, color: h.color }}>
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cross-Hub */}
          <div className="card" style={{ marginTop: 24, borderTop: '4px solid #D4A017' }}>
            <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 16, color: '#D4A017' }}>🔗 Cross-Hub Collaboration</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
              {[
                { hubs: 'Business + Governance', project: 'Youth Employment Policy Brief', color: '#BF0000' },
                { hubs: 'Creative + Community', project: 'Mental Health Awareness Campaign', color: '#D4A017' },
                { hubs: 'Business + Creative', project: 'Brand Development for NGOs', color: '#1E90FF' },
                { hubs: 'All Four Hubs', project: 'VOCI Annual Summit 2026', color: '#BF0000' },
              ].map((c, i) => (
                <div key={i} style={{
                  padding: '14px 16px', borderRadius: 10,
                  background: `${c.color}08`, border: `1px solid ${c.color}30`,
                }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: c.color, marginBottom: 4 }}>{c.hubs}</div>
                  <div style={{ fontSize: 13, color: '#333' }}>{c.project}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}