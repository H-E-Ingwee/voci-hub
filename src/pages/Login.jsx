import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Eye, EyeOff, Loader } from 'lucide-react'

export default function Login() {
  const { signIn, error } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [localError, setLocalError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLocalError('')
    setLoading(true)
    const { error } = await signIn(form)
    setLoading(false)
    if (error) { setLocalError(error.message || 'Sign in failed'); return }
    navigate('/')
  }

  return (
    <div style={{
      minHeight: '100vh', background: 'linear-gradient(135deg, #1a0000 0%, #2d0000 50%, #1a0000 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
    }}>
      {/* Background pattern */}
      <div style={{ position: 'fixed', inset: 0, opacity: 0.04, fontSize: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>🎙️</div>

      <div style={{ width: '100%', maxWidth: 420 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🎙️</div>
          <div style={{ color: '#BF0000', fontWeight: 800, fontSize: 28, letterSpacing: 2 }}>VOCI</div>
          <div style={{ color: '#D4A017', fontSize: 12, letterSpacing: 4, marginTop: 4 }}>THE HUB</div>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, marginTop: 12, fontStyle: 'italic' }}>
            "Your voice is your power."
          </div>
        </div>

        {/* Card */}
        <div style={{
          background: 'white', borderRadius: 20, padding: '36px 32px',
          boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
        }}>
          <h2 style={{ fontWeight: 800, fontSize: 22, color: '#222', marginBottom: 6 }}>Welcome back</h2>
          <p style={{ color: '#888', fontSize: 14, marginBottom: 28 }}>Sign in to your VOCI Hub account</p>

          {(localError || error) && (
            <div style={{
              background: '#fff0f0', border: '1px solid #ffcccc', borderRadius: 8,
              padding: '12px 16px', marginBottom: 20, fontSize: 13, color: '#BF0000',
            }}>
              {localError || error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#555', display: 'block', marginBottom: 6 }}>Email</label>
              <input
                type="email" required
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                style={{
                  width: '100%', padding: '12px 14px', borderRadius: 10,
                  border: '1.5px solid #eee', fontSize: 14, outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = '#BF0000'}
                onBlur={e => e.target.style.borderColor = '#eee'}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#555', display: 'block', marginBottom: 6 }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPw ? 'text' : 'password'} required
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  style={{
                    width: '100%', padding: '12px 44px 12px 14px', borderRadius: 10,
                    border: '1.5px solid #eee', fontSize: 14, outline: 'none',
                  }}
                  onFocus={e => e.target.style.borderColor = '#BF0000'}
                  onBlur={e => e.target.style.borderColor = '#eee'}
                />
                <button type="button" onClick={() => setShowPw(!showPw)} style={{
                  position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', color: '#888',
                }}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '14px', borderRadius: 10, border: 'none',
              background: loading ? '#888' : '#BF0000', color: 'white',
              fontWeight: 700, fontSize: 15, cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              transition: 'background 0.2s',
            }}>
              {loading ? <><Loader size={16} className="pulse" /> Signing in...</> : 'Sign In to VOCI Hub'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: '#888' }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: '#BF0000', fontWeight: 700, textDecoration: 'none' }}>
              Join VOCI
            </Link>
          </div>
        </div>

        {/* Demo note */}
        <div style={{
          marginTop: 20, padding: '14px 20px', background: 'rgba(212,160,23,0.15)',
          borderRadius: 10, border: '1px solid rgba(212,160,23,0.3)', textAlign: 'center',
        }}>
          <div style={{ color: '#D4A017', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>
            🔧 Demo Mode
          </div>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>
            No Supabase configured yet. The app runs with mock data.{' '}
            <Link to="/" style={{ color: '#D4A017', textDecoration: 'none', fontWeight: 600 }}>
              Enter Hub →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}