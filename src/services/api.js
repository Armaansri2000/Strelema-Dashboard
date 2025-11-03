import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://strelema-task.onrender.com'

export async function backendLogin(phone, password){
  try{
    const res = await axios.post(`${API_BASE}/api/auth/login`, { phone, password }, { headers: { 'Content-Type': 'application/json' } })
    return res.data
  } catch (err){
    throw err.response?.data || err
  }
}

export async function fetchEmployees(page=1, limit=10, token){
  const url = `${API_BASE}/api/employees?page=${page}&limit=${limit}`
  const headers = token ? { Authorization: `Bearer ${token}` } : {}
  try{
    const res = await axios.get(url, { headers })
    return res.data
  } catch (err){
    throw err.response?.data || err
  }
}
