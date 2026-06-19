import React, { useState } from 'react'
import { impactProjects } from '../data/mockData'
import Layout from '../components/Layout'
import { Target, Users, Plus, CheckCircle, Clock, Lightbulb } from 'lucide-react'

const statusColors = { 'Active': '#2d8a2d', 'In Progress': '#D4A017', 'Planning': '#1E90FF', 'Completed': '#BF0000' }

function ProjectCard({ project }) {
  const color = statusColors[project.status] || '#888'
  return (
    <div className="card card-hover" style={{ borderTop: `4px solid ${color}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <span className="badge" style={{ background: `${color}15`, color, fontSize: 11 }}>
          {project.status === 'Active' ? <CheckCircle size={10} /> : <Clock size={10} />}
          {project.status}
        </span>
        <span className="badge badge-red" style={{ fontSize: 10 }}>{project.sphere}</span>
      </div>
      <h3 style={{ fontWeight: 700, fontSize: 15, color: '#222', marginBottom: 8 }}>{project.title}</h3>
      <div style={{ fontSize: 13, color: '#666', marginBottom: 12, lineHeight: 1.5 }}>{project.description}</div>
      <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
        <div style={{ fontSize: 12, color: '#888' }}>
          👤 <strong style={{ color: '#333' }}>{project.member}</strong>
        </div>
        <div style={{ fontSize: 12, color: '#888' }}>
          📅 Started: <strong style={{ color: '#333' }}>{project.startDate}</strong>
        </div>
      </div>
      {project.beneficiaries > 0 && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '10px 14px', background: '#f0fff0', borderRadius: 8,
          fontSize: 13, color: '#2d8a2d', fontWeight: 600,
        }}>
          <Users size={14} />
          {project.beneficiaries} people reached
        </div>
      )}
    </div>
  )
}

export default function Impact() {
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', sphere: '', description: '' })

  const active = impactProjects.filter(p => p.status === 'Active' || p.status === 'In Progress')
  const planning = impactProjects.filter(p => p.status === 'Planning')
  const totalBeneficiaries = impactProjects.reduce((a, p) => a + p.beneficiaries, 0)

  return (
    <Layout title="Impact Projects">
      {/* Stats */}
      <div className="grid-4" style={{ marginBottom: 28 }}>
        {[
          { icon: '🌍', label: 'Total Projects', value: impactProjects.length, color: '#BF0000' },
          { icon: '✅', label: 'Active Projects', value: active.length, color: '#2d8a2d' },
          { icon: '👥', label: 'People Reached', value: totalBeneficiaries, color: '#D4A017' },
          { icon: '📋', label: 'In Planning', value: planning.length, color: '#1E90FF' },
        ].map((s, i) => (
          <div key={i} className="card" style={{ borderTop: `4px solid ${s.color}`, textAlign: 'center' }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontWeight: 800, fontSize: 24, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 13, color: '#666', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* VOICE Framework reminder */}
      <div style={{
        background: 'linear-gradient(135deg, #1E90FF15, #1E90FF05)',
        border: '1px solid #1E90FF30',
        borderLeft: '4px solid #1E90FF',
        borderRadius: 12, padding: '16px 20px', marginBottom: 28,
        display: 'flex', gap: 12, alignItems: 'flex-start',
      }}>
        <Lightbulb size={20} color="#1E90FF" style={{ flexShrink: 0, marginTop: 2 }} />
        <div>
          <div style={{ fontWeight: 700, color: '#1E90FF', marginBottom: 4 }}>💡 Use the VOICE Framework for your advocacy campaigns</div>
          <div style={{ fontSize: 13, color: '#555' }}>
            Vision & Issue Clarity → Own Your Audience → Inspire with Message → Choose Your Channels → Engage to Action
          </div>
        </div>
      </div>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h3 style={{ fontWeight: 700, fontSize: 18 }}>Community Impact Projects</h3>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          <Plus size={14} /> New Project
        </button>
      </div>

      {/* New Project Form */}
      {showForm && (
        <div className="card" style={{ marginBottom: 24, borderTop: '4px solid #BF0000' }}>
          <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 16, color: '#BF0000' }}>🌍 Propose a New Impact Project</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#888', display: 'block', marginBottom: 6 }}>Project Title</label>
              <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Youth Financial Literacy Workshop"
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', fontSize: 14, outline: 'none' }} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#888', display: 'block', marginBottom: 6 }}>Sphere of Influence</label>
              <select value={form.sphere} onChange={e => setForm({ ...form, sphere: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', fontSize: 14, outline: 'none', background: 'white' }}>
                <option value="">Select sphere...</option>
                {['Government', 'Economics', 'Science & Technology', 'Church', 'Family', 'Education', 'Communication', 'Arts & Entertainment'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#888', display: 'block', marginBottom: 6 }}>Project Description</label>
              <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                placeholder="Describe your project, its goals, and the community it will serve..."
                rows={3}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', fontSize: 14, outline: 'none', resize: 'vertical', fontFamily: 'inherit' }} />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-primary">
                <Target size={14} /> Submit Project
              </button>
              <button className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid-2">
        {impactProjects.map(p => <ProjectCard key={p.id} project={p} />)}
      </div>

      {/* Impact Vision */}
      <div style={{
        marginTop: 28,
        background: 'linear-gradient(135deg, #BF0000, #8B0000)',
        borderRadius: 14, padding: '24px 28px', color: 'white', textAlign: 'center',
      }}>
        <div style={{ fontSize: 36, marginBottom: 12 }}>🌍</div>
        <h3 style={{ fontWeight: 800, fontSize: 20, marginBottom: 8 }}>VOCI 2030 Impact Target</h3>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, maxWidth: 500, margin: '0 auto 16px' }}>
          500+ community impact projects launched by VOCI members across 10 countries, reaching 100,000+ people by 2030.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 32 }}>
          {[
            { val: '500+', label: 'Projects' },
            { val: '100K+', label: 'People Reached' },
            { val: '10+', label: 'Countries' },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontWeight: 800, fontSize: 24, color: '#D4A017' }}>{s.val}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}