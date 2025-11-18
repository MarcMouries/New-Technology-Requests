/*
 * New Technology Request Intake App
 * Version: 2024122001
 * Last Updated: 2024-12-20
 */
import React, { useState, useEffect } from 'react'
import './IntakeApp.css'
import { display, value } from './utils/fields.js'
import IntakeForm from './components/IntakeForm.jsx'
import SuccessMessage from './components/SuccessMessage.jsx'
import { APP_VERSION, getVersionInfo } from './utils/version.js'

export default function IntakeApp() {
  const [currentUser, setCurrentUser] = useState(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedData, setSubmittedData] = useState(null)

  useEffect(() => {
    console.log('📝 Intake App Loading - Version:', APP_VERSION)
    console.log('ℹ️ Version Info:', getVersionInfo())
    
    // Get current user information from ServiceNow
    if (window.g_user) {
      setCurrentUser({
        name: display(window.g_user.userName) || 'User',
        email: display(window.g_user.email) || ''
      })
    }
  }, [])

  const handleSubmitSuccess = (result) => {
    setSubmittedData(result)
    setIsSubmitted(true)
  }

  const handleStartNew = () => {
    setIsSubmitted(false)
    setSubmittedData(null)
  }

  return (
    <div className="intake-app">
      {/* 7-Eleven Branded Header */}
      <header className="app-header">
        <div className="header-content">
          <img 
            src="https://www.7-eleven.com/assets/img/header/7e-logo-color.svg" 
            alt="7-Eleven Logo" 
            className="seven-eleven-logo"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'block';
            }}
          />
          <div className="seven-eleven-logo-fallback" style={{display: 'none'}}>
            7-ELEVEn
          </div>
          <div className="app-title">
            <h1>New Technology Request</h1>
            <p>Use this form when you have a need for new technology at 7-Eleven.</p>
          </div>
        </div>
      </header>

      <main className="main-container">
        {!isSubmitted ? (
          <IntakeForm 
            currentUser={currentUser} 
            onSubmitSuccess={handleSubmitSuccess}
          />
        ) : (
          <SuccessMessage 
            submittedData={submittedData}
            onStartNew={handleStartNew}
          />
        )}
      </main>
    </div>
  )
}