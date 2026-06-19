import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Eye, EyeOff, Loader, CheckCircle } from 'lucide-react'

const spheres = [
  'Government', 'Economics', 'Science & Technology',
  'Church', 'Family', 'Education', 'Communication', 'Arts & Entertainment',
]

export default function Signup() {
  const { signUp, error } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ name: '', email: '', password: '', sphere: '', campus: '' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [localError, setLocalError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleStep1 = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) return
    setStep(2)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLocalError('')
    setLoading(true)
    const { error } = await signUp(form)
    setLoading(false)
    if (error) { setLocalError(error.message || 'Sign up failed'); return }
    setSuccess(true)
    setTimeout(() => navigate('/'), 2000)
  }

  if (success) {
    return (
      <div style={{
        minHeight: '100vh', background: 'linear-gradient(135deg, #1a0000, #2d0000)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <CheckCircle size={64} color="#D4A017" style={{ marginBottom: 20 }} />
          <h2 style={{ fontWeight: 800, fontSize: 24, marginBottom: 8 }}>Welcome to VOCI! 🎙️</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)' }}>Your account has been created. Redirecting to the Hub...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh', background: 'linear-gradient(135deg, #1a0000 0%, #2d0000 50%, #1a0000 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
    }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 6 }}>🎙️</div>
          <div style={{ color: '#BF0000', fontWeight: 800, fontSize: 24, letterSpacing: 2 }}>VOCI HUB</div>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, marginTop: 8, fontStyle: 'italic' }}>
            Join the movement. Find your voice.
          </div>
        </div>

        {/* Step indicator */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, justifyContent: 'center' }}>
          {[1, 2].map(s => (
            <div key={s} style={{
              width: 32, height: 4, borderRadius: 2,
              background: s <= step ? '#BF0000' : 'rgba(255,255,255,0.2)',
              transition: 'background 0.3s',
            }} />
          ))}
        </div>

        <div style={{ background: 'white', borderRadius: 20, padding: '36px 32px', boxShadow: '0 24px 64px rgba(0,0,0,0.4)' }}>
          {step === 1 ? (
            <>
              <h2 style={{ fontWeight: 800, fontSize: 22, color: '#222', marginBottom: 6 }}>Create your account</h2>
              <p style={{ color: '#888', fontSize: 14, marginBottom: 28 }}>Step 1 of 2 — Your basic details</p>

              {(localError || error) && (
                <div style={{ background: '#fff0f0', border: '1px solid #ffcccc', borderRadius: 8, padding: '12px 16px', marginBottom: 20, fontSize: 13, color: '#BF0000' }}>
                  {localError || error}
                </div>
              )}

              <form onSubmit={handleStep1}>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: '#555', display: 'block', marginBottom: 6 }}>Full Name</label>
                  <input type="text" required value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Brian Ingwee"
                    style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #eee', fontSize: 14, outline: 'none' }}
                    onFocus={e => e.target.style.borderColor = '#BF0000'}
                    onBlur={e => e.target.style.borderColor = '#eee'}
                  />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: '#555', display: 'block', marginBottom: 6 }}>Email</label>
                  <input type="email" required value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #eee', fontSize: 14, outline: 'none' }}
                    onFocus={e => e.target.style.borderColor = '#BF0000'}
                    onBlur={e => e.target.style.borderColor = '#eee'}
                  />
                </div>
                <div style={{ marginBottom: 28 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: '#555', display: 'block', marginBottom: 6 }}>Password</label>
                  <div style={{ position: 'relative' }}>
                    <input type={showPw ? 'text' : 'password'} required value={form.password}
                      onChange={e => setForm({ ...form, password: e.target.value })}
                      placeholder="Min. 8 characters"
                      minLength={8}
                      style={{ width: '100%', padding: '12px 44px 12px 14px', borderRadius: 10, border: '1.5px solid #eee', fontSize: 14, outline: 'none' }}
                      onFocus={e => e.target.style.borderColor = '#BF0000'}
                      onBlur={e => e.target.style.borderColor = '#eee'}
                    />
                    <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}>
                      {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <button type="submit" style={{ width: '100%', padding: '14px', borderRadius: 10, border: 'none', background: '#BF0000', color: 'white', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
                  Continue →
                </button>
              </form>
            </>
          ) : (
            <>
              <h2 style={{ fontWeight: 800, fontSize: 22, color: '#222', marginBottom: 6 }}>Your sphere & campus</h2>
              <p style={{ color: '#888', fontSize: 14, marginBottom: 28 }}>Step 2 of 2 — Tell us about your calling</p>

              {(localError || error) && (
                <div style={{ background: '#fff0f0', border: '1px solid #ffcccc', borderRadius: 8, padding: '12px 16px', marginBottom: 20, fontSize: 13, color: '#BF0000' }}>
                  {localError || error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: '#555', display: 'block', marginBottom: 8 }}>Primary Sphere of Influence</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {spheres.map(s => (
                      <button key={s} type="button" onClick={() => setForm({ ...form, sphere: s })} style={{
                        padding: '10px 12px', borderRadius: 8, border: `2px solid ${form.sphere === s ? '#BF0000' : '#eee'}`,
                        background: form.sphere === s ? '#fff0f0' : 'white',
                        color: form.sphere === s ? '#BF0000' : '#555',
                        fontWeight: form.sphere === s ? 700 : 400,
                        fontSize: 12, cursor: 'pointer', textAlign: 'left',
                        transition: 'all 0.2s',
                      }}>{s}</button>
                    ))}
                  </div>
                </div>
                <div style={{ marginBottom: 28 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: '#555', display: 'block', marginBottom: 6 }}>Campus / Institution</label>
                  <input type="text" value={form.campus}
                    onChange={e => setForm({ ...form, campus: e.target.value })}
                    placeholder="e.g. Murang'a University of Technology"
                    style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #eee', fontSize: 14, outline: 'none' }}
                    onFocus={e => e.target.style.borderColor = '#BF0000'}
                    onBlur={e => e.target.style.borderColor = '#eee'}
                  />
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button type="button" onClick={() => setStep(1)} style={{ padding: '14px 20px', borderRadius: 10, border: '2px solid #eee', background: 'white', color: '#555', fontWeight: 600, cursor: 'pointer' }}>
                    ← Back
                  </button>
                  <button type="submit" disabled={loading || !form.sphere} style={{
                    flex: 1, padding: '14px', borderRadius: 10, border: 'none',
                    background: loading || !form.sphere ? '#ccc' : '#BF0000',
                    color: 'white', fontWeight: 700, fontSize: 15,
                    cursor: loading || !form.sphere ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  }}>
                    {loading ? <><Loader size={16} /> Creating account...</> : 'Join VOCI 🎙️'}
                  </button>
                </div>
              </form>
            </>
          )}

          <div style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: '#888' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#BF0000', fontWeight: 700, textDecoration: 'none' }}>Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  )
}