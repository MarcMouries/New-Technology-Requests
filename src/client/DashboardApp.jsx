import React, { useState, useEffect } from 'react'
import './DashboardApp.css'
import { display, value } from './utils/fields.js'

export default function DashboardApp() {
  const [dashboardData, setDashboardData] = useState({
    requests: [],
    phaseData: {},
    strategicDriverData: {},
    averageAgeByPhase: {},
    priorityDepartmentMatrix: {},
    loading: true,
    error: null
  })

  const [departments, setDepartments] = useState([])

  useEffect(() => {
    fetchDashboardData()
    fetchDepartments()
  }, [])

  const fetchDepartments = async () => {
    try {
      const response = await fetch('/api/now/table/x_snc_newtech_department?sysparm_display_value=all&sysparm_query=x_snc_newtech_active=true^ORDERBYx_snc_newtech_name', {
        headers: {
          'Accept': 'application/json',
          'X-UserToken': window.g_ck
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setDepartments(data.result || [])
      }
    } catch (error) {
      console.error('Error fetching departments:', error)
    }
  }

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/now/table/x_snc_newtech_request?sysparm_display_value=all&sysparm_limit=100', {
        headers: {
          'Accept': 'application/json',
          'X-UserToken': window.g_ck
        }
      })

      if (response.ok) {
        const data = await response.json()
        const requests = data.result || []
        
        // Process data for charts
        const processedData = processRequestsData(requests)
        
        setDashboardData({
          requests,
          ...processedData,
          loading: false,
          error: null
        })
      } else {
        throw new Error('Failed to fetch dashboard data')
      }
    } catch (error) {
      setDashboardData(prev => ({
        ...prev,
        loading: false,
        error: error.message
      }))
    }
  }

  const processRequestsData = (requests) => {
    // Process requests by phase
    const phaseMap = {
      '1': 'New Request',
      '2': 'Initial Review', 
      '3': 'Architecture Review',
      '4': 'Proposal',
      '5': 'Funding Governance'
    }
    
    const phaseData = {}
    requests.forEach(req => {
      const phase = display(req.x_snc_newtech_phase) || 'Unknown'
      const phaseName = phaseMap[phase] || `Phase ${phase}`
      phaseData[phaseName] = (phaseData[phaseName] || 0) + 1
    })

    // Process strategic drivers
    const strategicDriverData = {}
    requests.forEach(req => {
      const drivers = display(req.x_snc_newtech_strategic_driver) || ''
      if (drivers) {
        drivers.split(',').forEach(driver => {
          const trimmedDriver = driver.trim()
          if (trimmedDriver) {
            strategicDriverData[trimmedDriver] = (strategicDriverData[trimmedDriver] || 0) + 1
          }
        })
      }
    })

    // Calculate average age by phase
    const today = new Date()
    const ageByPhase = {}
    const countByPhase = {}
    
    requests.forEach(req => {
      const phase = display(req.x_snc_newtech_phase) || 'Unknown'
      const phaseName = phaseMap[phase] || `Phase ${phase}`
      const createdDate = new Date(display(req.sys_created_on))
      const ageInDays = Math.floor((today - createdDate) / (1000 * 60 * 60 * 24))
      
      if (!ageByPhase[phaseName]) {
        ageByPhase[phaseName] = 0
        countByPhase[phaseName] = 0
      }
      
      ageByPhase[phaseName] += ageInDays
      countByPhase[phaseName] += 1
    })

    const averageAgeByPhase = {}
    Object.keys(ageByPhase).forEach(phase => {
      averageAgeByPhase[phase] = Math.round(ageByPhase[phase] / countByPhase[phase])
    })

    // Priority x Department matrix
    const priorityMap = {
      'fast_track': 'Fast Track',
      'high': 'High',
      'medium': 'Medium', 
      'low': 'Low'
    }
    
    const priorityDepartmentMatrix = {}
    requests.forEach(req => {
      const priority = display(req.x_snc_newtech_priority) || 'Unknown'
      const priorityName = priorityMap[priority] || priority
      const targetDepts = display(req.x_snc_newtech_target_user_departments) || ''
      
      if (!priorityDepartmentMatrix[priorityName]) {
        priorityDepartmentMatrix[priorityName] = {}
      }
      
      if (targetDepts) {
        targetDepts.split(',').forEach(dept => {
          const trimmedDept = dept.trim()
          if (trimmedDept) {
            priorityDepartmentMatrix[priorityName][trimmedDept] = (priorityDepartmentMatrix[priorityName][trimmedDept] || 0) + 1
          }
        })
      }
    })

    return {
      phaseData,
      strategicDriverData,
      averageAgeByPhase,
      priorityDepartmentMatrix
    }
  }

  const getPhaseDisplayName = (phase) => {
    const phaseMap = {
      '1': 'New Request',
      '2': 'Initial Review',
      '3': 'Architecture Review', 
      '4': 'Proposal',
      '5': 'Funding Governance'
    }
    return phaseMap[phase] || `Phase ${phase}`
  }

  const getPriorityDisplayName = (priority) => {
    const priorityMap = {
      'fast_track': 'Fast Track',
      'high': 'High',
      'medium': 'Medium',
      'low': 'Low'
    }
    return priorityMap[priority] || priority
  }

  const renderBarChart = (data, title) => {
    const maxValue = Math.max(...Object.values(data))
    const entries = Object.entries(data)
    
    if (entries.length === 0) {
      return <div className="chart-placeholder">No data available</div>
    }
    
    return (
      <div className="bar-chart">
        {entries.map(([label, value]) => (
          <div key={label} className="bar" style={{ height: `${(value / maxValue) * 80}%` }}>
            <div className="bar-value">{value}</div>
            <div className="bar-label">{label}</div>
          </div>
        ))}
      </div>
    )
  }

  const renderPieChart = (data, title) => {
    const entries = Object.entries(data)
    const total = entries.reduce((sum, [, value]) => sum + value, 0)
    
    if (entries.length === 0 || total === 0) {
      return <div className="chart-placeholder">No data available</div>
    }

    const colors = ['#007A53', '#DA291C', '#FF6720', '#6C757D', '#17A2B8', '#28A745', '#FFC107', '#DC3545']
    let currentAngle = 0
    
    const pieSlices = entries.map(([label, value], index) => {
      const percentage = (value / total) * 100
      const angle = (value / total) * 360
      const largeArcFlag = angle > 180 ? 1 : 0
      
      const x1 = 100 + 80 * Math.cos((currentAngle * Math.PI) / 180)
      const y1 = 100 + 80 * Math.sin((currentAngle * Math.PI) / 180)
      
      currentAngle += angle
      
      const x2 = 100 + 80 * Math.cos((currentAngle * Math.PI) / 180)
      const y2 = 100 + 80 * Math.sin((currentAngle * Math.PI) / 180)
      
      const pathData = `M 100,100 L ${x1},${y1} A 80,80 0 ${largeArcFlag},1 ${x2},${y2} z`
      
      return {
        path: pathData,
        color: colors[index % colors.length],
        label,
        value,
        percentage: percentage.toFixed(1)
      }
    })
    
    return (
      <div className="pie-chart">
        <svg className="pie-chart-svg" viewBox="0 0 200 200">
          {pieSlices.map((slice, index) => (
            <path
              key={index}
              d={slice.path}
              fill={slice.color}
              stroke="white"
              strokeWidth="2"
            />
          ))}
        </svg>
        <div className="pie-legend">
          {pieSlices.map((slice, index) => (
            <div key={index} className="legend-item">
              <div
                className="legend-color"
                style={{ backgroundColor: slice.color }}
              />
              <span>{slice.label}: {slice.value} ({slice.percentage}%)</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderMatrixChart = (data) => {
    const priorities = Object.keys(data)
    const allDepartments = new Set()
    
    priorities.forEach(priority => {
      Object.keys(data[priority] || {}).forEach(dept => allDepartments.add(dept))
    })
    
    const departments = Array.from(allDepartments).sort()
    
    if (priorities.length === 0 || departments.length === 0) {
      return <div className="chart-placeholder">No data available</div>
    }
    
    return (
      <div className="matrix-chart">
        <table className="matrix-table">
          <thead>
            <tr>
              <th>Priority / Department</th>
              {departments.map(dept => (
                <th key={dept}>{dept}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {priorities.map(priority => (
              <tr key={priority}>
                <td style={{ fontWeight: 'bold' }}>{priority}</td>
                {departments.map(dept => (
                  <td key={dept}>
                    {data[priority]?.[dept] || 0}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  const renderRequestList = (requests) => {
    const topFields = ['short_description', 'x_snc_newtech_phase', 'x_snc_newtech_priority', 'x_snc_newtech_estimated_cost_band', 'sys_created_on']
    
    return (
      <div className="request-list">
        <h3>Recent Technology Requests</h3>
        <div style={{ overflowX: 'auto' }}>
          <table className="request-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Phase</th>
                <th>Priority</th>
                <th>Cost Band</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {requests.slice(0, 10).map((request, index) => (
                <tr key={index}>
                  <td>{display(request.short_description) || 'N/A'}</td>
                  <td>
                    <span className={`status-badge phase-${display(request.x_snc_newtech_phase) || 'unknown'}`}>
                      {getPhaseDisplayName(display(request.x_snc_newtech_phase))}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge priority-${display(request.x_snc_newtech_priority) || 'unknown'}`}>
                      {getPriorityDisplayName(display(request.x_snc_newtech_priority))}
                    </span>
                  </td>
                  <td>{display(request.x_snc_newtech_estimated_cost_band) || 'N/A'}</td>
                  <td>{new Date(display(request.sys_created_on)).toLocaleDateString() || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  if (dashboardData.loading) {
    return (
      <div className="dashboard-app">
        <header className="dashboard-header">
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
            <div className="dashboard-title">
              <h1>New Technology Requests Dashboard</h1>
              <p>Real-time insights into technology request pipeline and governance</p>
            </div>
          </div>
        </header>
        <div className="dashboard-container">
          <div className="loading">
            <div className="spinner" />
            Loading dashboard data...
          </div>
        </div>
      </div>
    )
  }

  if (dashboardData.error) {
    return (
      <div className="dashboard-app">
        <header className="dashboard-header">
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
            <div className="dashboard-title">
              <h1>New Technology Requests Dashboard</h1>
              <p>Real-time insights into technology request pipeline and governance</p>
            </div>
          </div>
        </header>
        <div className="dashboard-container">
          <div className="error-message">
            Error loading dashboard: {dashboardData.error}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-app">
      <header className="dashboard-header">
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
          <div className="dashboard-title">
            <h1>New Technology Requests Dashboard</h1>
            <p>Real-time insights into technology request pipeline and governance</p>
          </div>
        </div>
      </header>

      <div className="dashboard-container">
        {/* Summary Metrics */}
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-value">{dashboardData.requests.length}</div>
            <div className="metric-label">Total Requests</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">
              {dashboardData.requests.filter(r => display(r.x_snc_newtech_priority) === 'fast_track').length}
            </div>
            <div className="metric-label">Fast Track</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">
              {dashboardData.requests.filter(r => display(r.x_snc_newtech_phase) === '5').length}
            </div>
            <div className="metric-label">In Funding</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">
              {Math.round(Object.values(dashboardData.averageAgeByPhase).reduce((a, b) => a + b, 0) / Object.keys(dashboardData.averageAgeByPhase).length) || 0}
            </div>
            <div className="metric-label">Avg Age (Days)</div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="dashboard-grid">
          <div className="dashboard-item">
            <h3>Requests by Phase</h3>
            <div className="chart-container">
              {renderBarChart(dashboardData.phaseData, 'Requests by Phase')}
            </div>
          </div>

          <div className="dashboard-item">
            <h3>Requests by Strategic Driver</h3>
            <div className="chart-container">
              {renderPieChart(dashboardData.strategicDriverData, 'Strategic Drivers')}
            </div>
          </div>

          <div className="dashboard-item">
            <h3>Average Age by Phase (Days)</h3>
            <div className="chart-container">
              {renderBarChart(dashboardData.averageAgeByPhase, 'Average Age by Phase')}
            </div>
          </div>

          <div className="dashboard-item">
            <h3>Priority × Target Department Matrix</h3>
            <div className="chart-container">
              {renderMatrixChart(dashboardData.priorityDepartmentMatrix)}
            </div>
          </div>
        </div>

        {/* Request List */}
        {renderRequestList(dashboardData.requests)}
      </div>
    </div>
  )
}