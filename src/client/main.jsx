import React from 'react'
import ReactDOM from 'react-dom/client'
import IntakeApp from './IntakeApp.jsx'
import DashboardApp from './DashboardApp.jsx'

// Determine which app to render based on the page
const currentPage = window.location.pathname
let AppComponent

if (currentPage.includes('dashboard')) {
  AppComponent = DashboardApp
} else {
  AppComponent = IntakeApp
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<AppComponent />)