import React, { useState, useEffect } from 'react'
import './DashboardApp.css'

export default function DashboardApp() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [metrics, setMetrics] = useState({
    submitted: 0,
    onHold: 0,
    rejected: 0,
    fastTrack: 0
  })
  const [sortConfig, setSortConfig] = useState({
    key: 'sys_created_on',
    direction: 'desc'
  })
  const [activeFilter, setActiveFilter] = useState(null)

  useEffect(() => {
    loadRequests()
  }, [])

  const loadRequests = async () => {
    console.log('📡 Loading requests from x_snc_newtech_request table...')
    setLoading(true)
    
    try {
      const response = await fetch('/api/now/table/x_snc_newtech_request?sysparm_display_value=all&sysparm_limit=100&sysparm_query=ORDERBYDESCsys_created_on', {
        headers: {
          'Accept': 'application/json',
          'X-UserToken': window.g_ck
        }
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      const data = await response.json()
      const requestsData = data.result || []
      setRequests(requestsData)
      
      // Calculate metrics with detailed debugging
      console.log('🔍 Calculating metrics from', requestsData.length, 'records...')
      
      const submittedCount = requestsData.filter(r => {
        const status = getValue(r.x_snc_newtech_status)
        console.log('Status value:', status)
        return status === '1.2 - Submitted' || status === 'one_two_submitted'
      }).length
      
      const onHoldCount = requestsData.filter(r => {
        const status = getValue(r.x_snc_newtech_status)
        return status === '9.1 - On Hold' || status === 'nine_one_on_hold'
      }).length
      
      const rejectedCount = requestsData.filter(r => {
        const status = getValue(r.x_snc_newtech_status)
        return status === '9.4 - Rejected' || status === 'nine_four_rejected'
      }).length
      
      const fastTrackCount = requestsData.filter(r => {
        const priority = getValue(r.x_snc_newtech_priority)
        console.log('Priority value for metrics:', priority)
        return priority && (
          priority.includes('Fast Track') || 
          priority.includes('urgent') ||
          priority.includes('critical') ||
          priority.includes('1-') ||
          priority === '1- Fast Track' ||
          priority === '1_fast_track' ||
          priority === 'fast_track_urgent_critical'
        )
      }).length

      console.log('📊 Metrics calculated:', { submittedCount, onHoldCount, rejectedCount, fastTrackCount })

      setMetrics({
        submitted: submittedCount,
        onHold: onHoldCount,
        rejected: rejectedCount,
        fastTrack: fastTrackCount
      })

      console.log(`✅ Successfully loaded ${requestsData.length} requests`)
      
    } catch (error) {
      console.error('❌ Error loading requests:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const getValue = (field) => {
    if (!field) return ''
    if (typeof field === 'string') return field
    if (field.display_value !== undefined) return field.display_value
    if (field.value !== undefined) return field.value
    return String(field)
  }

  const getPriorityDisplay = (priority) => {
    console.log('🎯 Priority field value:', priority)
    
    // Handle both display values and internal values for priority
    const priorityValue = getValue(priority)
    
    // Create comprehensive mapping for all possible priority values
    const priorityMap = {
      // New numbered format (display values from choice field)
      '1- Fast Track - Urgent and critical, requires CIO & President approval': '1- Fast Track',
      '2- High - Needed within the Years Capital Planning, Requires CIO Approval': '2- High',  
      '3- Medium - Needed within the next year': '3- Medium',
      '4- Low - Needed when funding and capacity allows': '4- Low',
      
      // New numbered format (internal values)
      '1_fast_track': '1- Fast Track',
      '2_high': '2- High',
      '3_medium': '3- Medium', 
      '4_low': '4- Low',
      
      // Legacy format (for backward compatibility)
      'fast_track_urgent_critical': '1- Fast Track',
      'high_capital_planning': '2- High',
      'medium_next_year': '3- Medium',
      'low_funding_capacity': '4- Low',
      
      // Additional string matching for flexibility
      'Fast Track': '1- Fast Track',
      'High': '2- High',
      'Medium': '3- Medium',
      'Low': '4- Low'
    }
    
    // Try direct mapping first
    if (priorityMap[priorityValue]) {
      return priorityMap[priorityValue]
    }
    
    // Fallback: intelligent string matching
    const lowerPriority = String(priorityValue).toLowerCase()
    if (lowerPriority.includes('fast') || lowerPriority.includes('urgent') || lowerPriority.includes('critical') || lowerPriority.includes('1-') || lowerPriority.includes('1_')) {
      return '1- Fast Track'
    } else if (lowerPriority.includes('high') || lowerPriority.includes('capital') || lowerPriority.includes('2-') || lowerPriority.includes('2_')) {
      return '2- High'  
    } else if (lowerPriority.includes('medium') || lowerPriority.includes('next year') || lowerPriority.includes('3-') || lowerPriority.includes('3_')) {
      return '3- Medium'
    } else if (lowerPriority.includes('low') || lowerPriority.includes('funding') || lowerPriority.includes('4-') || lowerPriority.includes('4_')) {
      return '4- Low'
    }
    
    console.warn('⚠️ Unknown priority value:', priorityValue)
    return priorityValue || 'Unknown'
  }

  const getPhaseDisplay = (phase) => {
    const phaseMap = {
      'one_new_request': '1 - New Request',
      '1 - New Request Submitted': '1 - New Request',
      'two_initial_review': '2 - Initial Review',
      '2 - Initial Review': '2 - Initial Review',
      'three_architecture_review': '3 - Architecture Review',
      '3 - Architecture Review': '3 - Architecture Review',
      'four_proposal': '4 - Proposal',
      '4 - Proposal': '4 - Proposal',
      'five_trigger_funding': '5 - Trigger Funding',
      '5 - Trigger Funding Governance': '5 - Trigger Funding'
    }
    return phaseMap[phase] || phase || 'Unknown'
  }

  const getStatusDisplay = (status) => {
    const statusMap = {
      // Phase 1 - New Request
      'one_one_draft': '1.1 - In Draft',
      '1.1 - In Draft': '1.1 - In Draft',
      'one_two_submitted': '1.2 - Submitted',
      '1.2 - Submitted': '1.2 - Submitted',
      
      // Phase 2 - Initial Review
      'two_one_backlog': '2.1 - Backlog',
      '2.1 - Backlog': '2.1 - Backlog',
      'two_two_initial_draft': '2.2 - Initial Draft',
      '2.2 - Initial Draft': '2.2 - Initial Draft',
      'two_three_draft_review': '2.3 - Draft Review',
      '2.3 - Draft Review': '2.3 - Draft Review',
      'two_four_in_revision': '2.4 - In Revision',
      '2.4 - In Revision': '2.4 - In Revision',
      'two_five_prep_complete': '2.5 - Prep Complete',
      '2.5 - Prep Complete': '2.5 - Prep Complete',
      
      // Phase 3 - Architecture Review
      'three_one_ar_backlog': '3.1 - AR Backlog',
      '3.1 - AR Backlog': '3.1 - AR Backlog',
      'three_two_ar_scheduled': '3.2 - AR Scheduled',
      '3.2 - AR Scheduled': '3.2 - AR Scheduled',
      'three_three_ar_conducted': '3.3 - AR Conducted',
      '3.3 - AR Conducted': '3.3 - AR Conducted',
      
      // Phase 4 - Proposal
      'four_one_proposal_backlog': '4.1 - Proposal Backlog',
      '4.1 - Proposal Backlog': '4.1 - Proposal Backlog',
      'four_two_proposal_draft': '4.2 - Proposal Draft',
      '4.2 - Proposal Draft': '4.2 - Proposal Draft',
      'four_three_proposal_communicated': '4.3 - Proposal Communicated',
      '4.3 - Proposal Communicated': '4.3 - Proposal Communicated',
      'four_four_proposal_accepted': '4.4 - Proposal Accepted',
      '4.4 - Proposal Accepted': '4.4 - Proposal Accepted',
      
      // Phase 5 - Funding Governance
      'five_one_fg_backlog': '5.1 - FG Backlog',
      '5.1 - FG Backlog': '5.1 - FG Backlog',
      'five_two_planning_updated': '5.2 - Planning Tool Updated',
      '5.2 - Planning Tool Updated': '5.2 - Planning Tool Updated',
      'five_three_app_rat_updated': '5.3 - App Rat Updated',
      '5.3 - App Rat Updated': '5.3 - App Rat Updated',
      'five_four_cmdb_updated': '5.4 - CMDB Tool Updated',
      '5.4 - CMDB Tool Updated': '5.4 - CMDB Tool Updated',
      'five_five_trigger_fg': '5.5 - Trigger to FG',
      '5.5 - Trigger to FG': '5.5 - Trigger to FG',
      
      // Phase 9 - Final States
      'nine_one_on_hold': '9.1 - On Hold',
      '9.1 - On Hold': '9.1 - On Hold',
      'nine_two_deferred': '9.2 - Deferred',
      '9.2 - Deferred': '9.2 - Deferred',
      'nine_three_cancelled': '9.3 - Cancelled',
      '9.3 - Cancelled': '9.3 - Cancelled',
      'nine_four_rejected': '9.4 - Rejected',
      '9.4 - Rejected': '9.4 - Rejected'
    }
    return statusMap[status] || status || 'Unknown'
  }

  const getPriorityClass = (priority) => {
    if (!priority) return 'badge-priority-unknown'
    
    // Handle reference field display values (short descriptions)
    const lowerPriority = priority.toLowerCase()
    if (lowerPriority.includes('fast') || lowerPriority.includes('1')) {
      return 'badge-priority-fast-track'
    } else if (lowerPriority.includes('high') || lowerPriority.includes('2')) {
      return 'badge-priority-high'
    } else if (lowerPriority.includes('medium') || lowerPriority.includes('3')) {
      return 'badge-priority-medium'
    } else if (lowerPriority.includes('low') || lowerPriority.includes('4')) {
      return 'badge-priority-low'
    }
    
    return 'badge-priority-unknown'
  }

  const getPhaseClass = (phase) => {
    if (!phase) return 'badge-phase-new'
    
    const lowerPhase = phase.toLowerCase()
    if (lowerPhase.includes('new') || lowerPhase.includes('1')) {
      return 'badge-phase-new'
    } else if (lowerPhase.includes('initial') || lowerPhase.includes('2')) {
      return 'badge-phase-review'
    } else if (lowerPhase.includes('architecture') || lowerPhase.includes('3')) {
      return 'badge-phase-architecture'
    } else if (lowerPhase.includes('proposal') || lowerPhase.includes('4')) {
      return 'badge-phase-proposal'
    } else if (lowerPhase.includes('funding') || lowerPhase.includes('5')) {
      return 'badge-phase-funding'
    }
    
    return 'badge-phase-new'
  }

  const getStatusClass = (status) => {
    if (!status) return 'badge-status-draft'
    
    const lowerStatus = status.toLowerCase()
    
    // Phase 1 - New Request (Red tones)
    if (lowerStatus.includes('draft') || lowerStatus.includes('1.1')) {
      return 'badge-status-draft'
    } else if (lowerStatus.includes('submitted') || lowerStatus.includes('1.2')) {
      return 'badge-status-submitted'
    }
    
    // Phase 2 - Initial Review (Orange tones)
    else if (lowerStatus.includes('backlog') || lowerStatus.includes('2.1')) {
      return 'badge-status-backlog'
    } else if (lowerStatus.includes('initial') || lowerStatus.includes('2.2') || lowerStatus.includes('2.3') || lowerStatus.includes('2.4')) {
      return 'badge-status-review'
    } else if (lowerStatus.includes('prep') || lowerStatus.includes('2.5')) {
      return 'badge-status-prep'
    }
    
    // Phase 3 - Architecture Review (Blue tones)
    else if (lowerStatus.includes('ar') || lowerStatus.includes('3.')) {
      return 'badge-status-architecture'
    }
    
    // Phase 4 - Proposal (Green tones)
    else if (lowerStatus.includes('proposal') || lowerStatus.includes('4.')) {
      return 'badge-status-proposal'
    }
    
    // Phase 5 - Funding Governance (Purple tones)
    else if (lowerStatus.includes('fg') || lowerStatus.includes('planning') || lowerStatus.includes('5.')) {
      return 'badge-status-funding'
    }
    
    // Phase 9 - Final States (Special colors)
    else if (lowerStatus.includes('hold') || lowerStatus.includes('9.1')) {
      return 'badge-status-hold'
    } else if (lowerStatus.includes('deferred') || lowerStatus.includes('9.2')) {
      return 'badge-status-deferred'
    } else if (lowerStatus.includes('cancelled') || lowerStatus.includes('9.3')) {
      return 'badge-status-cancelled'
    } else if (lowerStatus.includes('rejected') || lowerStatus.includes('9.4')) {
      return 'badge-status-rejected'
    }
    
    return 'badge-status-draft'
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const openRequest = (sysId) => {
    window.open(`/x_snc_newtech_request.do?sys_id=${sysId}`, '_blank')
  }

  const handleSort = (key) => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const getSortedRequests = () => {
    let filteredRequests = [...requests]
    
    // Apply active filter first
    if (activeFilter) {
      filteredRequests = filteredRequests.filter(request => {
        switch (activeFilter) {
          case 'submitted':
            const status = getValue(request.x_snc_newtech_status)
            return status === '1.2 - Submitted' || status === 'one_two_submitted'
          
          case 'onHold':
            const holdStatus = getValue(request.x_snc_newtech_status)
            return holdStatus === '9.1 - On Hold' || holdStatus === 'nine_one_on_hold'
          
          case 'rejected':
            const rejStatus = getValue(request.x_snc_newtech_status)
            return rejStatus === '9.4 - Rejected' || rejStatus === 'nine_four_rejected'
          
          case 'fastTrack':
            const priority = getValue(request.x_snc_newtech_priority)
            return priority && (
              priority.includes('Fast Track') || 
              priority.includes('urgent') ||
              priority.includes('critical') ||
              priority.includes('1-') ||
              priority === '1- Fast Track' ||
              priority === '1_fast_track' ||
              priority === 'fast_track_urgent_critical'
            )
          
          default:
            return true
        }
      })
    }
    
    // Then apply sorting
    filteredRequests.sort((a, b) => {
      let aValue, bValue
      
      switch (sortConfig.key) {
        case 'number':
          aValue = getValue(a.number) || ''
          bValue = getValue(b.number) || ''
          break
        case 'priority':
          aValue = getValue(a.x_snc_newtech_priority) || ''
          bValue = getValue(b.x_snc_newtech_priority) || ''
          break
        case 'short_description':
          aValue = getValue(a.short_description) || ''
          bValue = getValue(b.short_description) || ''
          break
        case 'opened_by':
          aValue = getValue(a.opened_by) || ''
          bValue = getValue(b.opened_by) || ''
          break
        case 'phase':
          aValue = getValue(a.x_snc_newtech_phase) || ''
          bValue = getValue(b.x_snc_newtech_phase) || ''
          break
        case 'status':
          aValue = getValue(a.x_snc_newtech_status) || ''
          bValue = getValue(b.x_snc_newtech_status) || ''
          break
        case 'sys_created_on':
          aValue = new Date(getValue(a.sys_created_on) || 0)
          bValue = new Date(getValue(b.sys_created_on) || 0)
          break
        default:
          return 0
      }

      if (sortConfig.key === 'sys_created_on') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1
      }
      return 0
    })

    return filteredRequests
  }

  const getSortIndicator = (columnKey) => {
    let sortClass = 'sort-neutral'
    
    if (sortConfig.key === columnKey) {
      sortClass = sortConfig.direction === 'asc' ? 'sort-asc' : 'sort-desc'
    }
    
    return (
      <span className={`sort-indicator ${sortClass}`}>
        <div className="sort-triangle sort-triangle-up"></div>
        <div className="sort-triangle sort-triangle-down"></div>
      </span>
    )
  }

  const handleMetricClick = (filterType) => {
    // Toggle filter - if same filter is clicked, clear it
    if (activeFilter === filterType) {
      setActiveFilter(null)
    } else {
      setActiveFilter(filterType)
    }
  }

  const getFilteredCount = () => {
    if (!activeFilter) return requests.length
    return getSortedRequests().length
  }

  const getFilterDescription = () => {
    if (!activeFilter) return 'All technology request submissions'
    
    const filterMap = {
      submitted: 'Requests with status "1.2 - Submitted"',
      onHold: 'Requests with status "9.1 - On Hold"',
      rejected: 'Requests with status "9.4 - Rejected"',
      fastTrack: 'Requests with priority "Fast Track"'
    }
    
    return filterMap[activeFilter] || 'Filtered technology requests'
  }

  if (error) {
    return (
      <div className="dashboard-app">
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
              <h1>New Technology Requests Dashboard</h1>
              <p>Real-time insights into your technology request pipeline and governance workflow</p>
            </div>
          </div>
        </header>

        <main className="main-container">
          <div className="error-container">
            <h3>⚠️ Dashboard Error</h3>
            <p><strong>Unable to load dashboard data:</strong></p>
            <p>{error}</p>
            <button onClick={loadRequests} className="retry-button">
              🔄 Reload Dashboard
            </button>
          </div>
        </main>
      </div>
    )
  }

  const sortedRequests = getSortedRequests()

  return (
    <div className="dashboard-app">
      {/* Header - EXACT Same as Intake Form */}
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
            <h1>New Technology Requests Dashboard</h1>
            <p>Real-time insights into your technology request pipeline and governance workflow</p>
          </div>
        </div>
      </header>

      <main className="main-container">
        {/* Metrics Cards */}
        <div className="metrics-container">
          <div className="metrics-grid">
            <div 
              className={`metric-card ${activeFilter === 'submitted' ? 'active' : ''}`}
              onClick={() => handleMetricClick('submitted')}
            >
              <span className="metric-icon">📋</span>
              <div className="metric-value">{metrics.submitted}</div>
              <div className="metric-label"># of New Requests<br/>(Submitted)</div>
            </div>
            <div 
              className={`metric-card on-hold ${activeFilter === 'onHold' ? 'active' : ''}`}
              onClick={() => handleMetricClick('onHold')}
            >
              <span className="metric-icon">⏸️</span>
              <div className="metric-value">{metrics.onHold}</div>
              <div className="metric-label"># of Requests<br/>On Hold</div>
            </div>
            <div 
              className={`metric-card rejected ${activeFilter === 'rejected' ? 'active' : ''}`}
              onClick={() => handleMetricClick('rejected')}
            >
              <span className="metric-icon">❌</span>
              <div className="metric-value">{metrics.rejected}</div>
              <div className="metric-label"># of Requests<br/>Rejected</div>
            </div>
            <div 
              className={`metric-card fast-track ${activeFilter === 'fastTrack' ? 'active' : ''}`}
              onClick={() => handleMetricClick('fastTrack')}
            >
              <span className="metric-icon">🚀</span>
              <div className="metric-value">{metrics.fastTrack}</div>
              <div className="metric-label"># of Requests<br/>Fast Track</div>
            </div>
          </div>
        </div>

        {/* Request Table */}
        <div className="table-container">
          <div className="table-header">
            <h2 className="table-title">
              <span>📊</span>
              New Technology Requests
              {activeFilter && (
                <button 
                  className="clear-filter-btn"
                  onClick={() => setActiveFilter(null)}
                  title="Clear filter"
                >
                  ✕ Clear Filter
                </button>
              )}
            </h2>
            <p className="table-subtitle">
              {getFilterDescription()} 
              {activeFilter && (
                <span className="filter-count"> • Showing {getFilteredCount()} of {requests.length} records</span>
              )}
              {!activeFilter && <span> with current status and priority</span>}
            </p>
          </div>
          
          <div className="table-content">
            {loading ? (
              <div className="loading">
                <div className="spinner"></div>
                <div>Loading request data...</div>
              </div>
            ) : requests.length === 0 ? (
              <div className="empty-state">
                <h3>No Requests Found</h3>
                <p>No technology requests have been submitted yet. <a href="/x_snc_newtech_intake.do">Submit your first request</a></p>
              </div>
            ) : (
              <div className="table-wrapper">
                <table className="requests-table">
                <thead>
                  <tr>
                    <th onClick={() => handleSort('number')} className="sortable-header">
                      Number {getSortIndicator('number')}
                    </th>
                    <th onClick={() => handleSort('priority')} className="sortable-header">
                      Priority {getSortIndicator('priority')}
                    </th>
                    <th onClick={() => handleSort('short_description')} className="sortable-header">
                      Short Description {getSortIndicator('short_description')}
                    </th>
                    <th onClick={() => handleSort('opened_by')} className="sortable-header">
                      Opened By {getSortIndicator('opened_by')}
                    </th>
                    <th onClick={() => handleSort('phase')} className="sortable-header">
                      Phase {getSortIndicator('phase')}
                    </th>
                    <th onClick={() => handleSort('status')} className="sortable-header">
                      Status {getSortIndicator('status')}
                    </th>
                    <th onClick={() => handleSort('sys_created_on')} className="sortable-header">
                      Created Date {getSortIndicator('sys_created_on')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedRequests.map((request) => {
                    const number = getValue(request.number) || 'N/A'
                    const priority = getValue(request.x_snc_newtech_priority)
                    const description = getValue(request.short_description) || 'No description provided'
                    const openedBy = getValue(request.opened_by) || 'Unknown'
                    const phase = getValue(request.x_snc_newtech_phase)
                    const status = getValue(request.x_snc_newtech_status)
                    const createdDate = getValue(request.sys_created_on)
                    const sysId = getValue(request.sys_id)

                    return (
                      <tr 
                        key={sysId} 
                        onClick={() => openRequest(sysId)}
                        className="table-row"
                      >
                        <td><span className="request-number">{number}</span></td>
                        <td>
                          <span className={`status-badge ${getPriorityClass(priority)}`}>
                            {getPriorityDisplay(priority)}
                          </span>
                        </td>
                        <td className="description-cell">{description}</td>
                        <td><strong>{openedBy}</strong></td>
                        <td>
                          <span className={`status-badge ${getPhaseClass(phase)}`}>
                            {getPhaseDisplay(phase)}
                          </span>
                        </td>
                        <td>
                          <span className={`status-badge ${getStatusClass(status)}`}>
                            {getStatusDisplay(status)}
                          </span>
                        </td>
                        <td>{formatDate(createdDate)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        <div className="footer-text">
          Powered by ServiceNow Build Agent – built by Marc.Mouries@ServiceNow.com
        </div>
      </footer>
    </div>
  )
}