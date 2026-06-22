import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import DashboardPage from './pages/DashboardPage'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import { registerRequestsChangeListener } from './api/authApi'

function LoadingBar() {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    return registerRequestsChangeListener((inFlight) => {
      setLoading(inFlight)
      if (inFlight) {
        setProgress(25)
      }
    })
  }, [])

  useEffect(() => {
    let timer
    if (loading) {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return 90
          return prev + Math.random() * 5
        })
      }, 150)
    } else {
      if (progress > 0) {
        setProgress(100)
        timer = setTimeout(() => {
          setProgress(0)
        }, 300)
      }
    }
    return () => {
      clearInterval(timer)
      clearTimeout(timer)
    }
  }, [loading, progress])

  if (progress === 0) return null

  return (
    <div
      className="fixed top-0 left-0 h-[3px] bg-orange-500 z-[99999] transition-all duration-300 ease-out"
      style={{ width: `${progress}%` }}
    />
  )
}

function App() {
  return (
    <AuthProvider>
      <LoadingBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
