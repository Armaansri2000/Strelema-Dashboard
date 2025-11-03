import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { backendLogin } from '../services/api'

export default function LoginPage(){
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('admin123')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (email === 'admin@example.com' && password === 'admin123'){
      try{
        const res = await backendLogin('7768860976', 'Strelema@2026')
        if (res?.token) localStorage.setItem('strelema_token', res.token)
      } catch (e){
        console.warn('backend login attempt failed (server may be asleep)', e)
      }
      login({ email: 'admin@example.com', name: 'Admin' })
      setLoading(false)
      navigate('/admin')
      return
    }

    setError('Invalid credentials (use admin@example.com / admin123)')
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm">Email</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm">Password</label>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="w-full border rounded px-3 py-2" />
          </div>

          {error && <div className="text-red-600">{error}</div>}

          <button disabled={loading} className="w-full bg-indigo-600 text-white py-2 rounded">
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="text-xs text-slate-500 mt-4">
          Use <strong>admin@example.com</strong> / <strong>admin123</strong>
        </div>
      </div>
    </div>
  )
}
