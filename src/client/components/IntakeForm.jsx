import React, { useState, useEffect } from 'react'
import { display, value } from '../utils/fields.js'

const STEPS = [
  { id: 1, title: 'Contact Info', icon: '👤', description: 'Tell us about yourself' },
  { id: 2, title: 'Request Details', icon: '📋', description: 'Describe your technology need' },
  { id: 3, title: 'Business Case', icon: '💼', description: 'Justify the business value' },
  { id: 4, title: 'Impact & Users', icon: '👥', description: 'Who will be affected' },
  { id: 5, title: 'Budget & Technical', icon: '💰', description: 'Cost and technical details' },
  { id: 6, title: 'Review & Submit', icon: '✅', description: 'Confirm your request' }
]

const STRATEGIC_DRIVERS = [
  'Deliver Consistently Great Customer Experience',
  'Grow Proprietary Products',
  'Accelerate Digital & Delivery',
  'Generate Synergies from SEI & SPW Integration',
  'Grow & Enhance Store Network',
  'Optimize Fuel Business & Grow Alternatives',
  'Simplification & Standardization',
  'Cost Leadership',
  'Technology & Data Modernization',
  'Compliance/Regulatory/End of Support',
  'InfoSec/Risk/Vulnerability Reduction'
]

export default function IntakeForm({ currentUser, onSubmitSuccess }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Auto-populated fields
    x_snc_newtech_todays_date: new Date().toISOString().split('T')[0],
    x_snc_newtech_email: '',
    
    // User input fields
    x_snc_newtech_requester_phone: '',
    x_snc_newtech_requester_name: '',
    x_snc_newtech_requester_department: '',
    x_snc_newtech_requester_department_other: '',
    x_snc_newtech_cost_center: '',
    x_snc_newtech_priority: '',
    x_snc_newtech_target_usage_date: '',
    x_snc_newtech_request_type: '',
    short_description: '',
    x_snc_newtech_as_vp_approval: '',
    x_snc_newtech_vp_name: '',
    x_snc_newtech_problem_statement: '',
    x_snc_newtech_impact_if_not_done: '',
    x_snc_newtech_strategic_driver: '',
    x_snc_newtech_cic_response: '',
    x_snc_newtech_cic_explanation: '',
    x_snc_newtech_target_user_departments: '',
    x_snc_newtech_target_user_departments_other: '',
    x_snc_newtech_estimated_user_count: '',
    x_snc_newtech_in_current_budget: '',
    x_snc_newtech_estimated_cost_band: '',
    x_snc_newtech_through_funding_governance: '',
    x_snc_newtech_data_sensitivity: '',
    x_snc_newtech_touches_financial_reporting: '',
    x_snc_newtech_ai_capabilities: '',
    x_snc_newtech_technology_type: '',
    x_snc_newtech_proposed_vendor: '',
    x_snc_newtech_assumptions: '',
    x_snc_newtech_risks_issues_impacts: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedStrategicDrivers, setSelectedStrategicDrivers] = useState([])
  const [selectedTargetDepartments, setSelectedTargetDepartments] = useState([])
  const [departments, setDepartments] = useState([])
  const [departmentsLoading, setDepartmentsLoading] = useState(true)

  // Set user email when currentUser is available
  useEffect(() => {
    if (currentUser && currentUser.email) {
      setFormData(prev => ({
        ...prev,
        x_snc_newtech_email: display(currentUser.email)
      }))
    }
  }, [currentUser])

  // Fetch departments from API
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setDepartmentsLoading(true)
        const response = await fetch('/api/now/table/x_snc_newtech_department?sysparm_display_value=all&sysparm_query=x_snc_newtech_active=true^ORDERBYx_snc_newtech_name', {
          headers: {
            'Accept': 'application/json',
            'X-UserToken': window.g_ck
          }
        })
        
        if (response.ok) {
          const data = await response.json()
          setDepartments(data.result || [])
        } else {
          console.error('Failed to fetch departments:', response.status, response.statusText)
          setDepartments([])
        }
      } catch (error) {
        console.error('Error fetching departments:', error)
        setDepartments([])
      } finally {
        setDepartmentsLoading(false)
      }
    }

    fetchDepartments()
  }, [])

  const handleInputChange = (field, newValue) => {
    setFormData(prev => ({ ...prev, [field]: newValue }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }))
    }
  }

  const handleStrategicDriverChange = (driver, isChecked) => {
    let newDrivers
    if (isChecked) {
      newDrivers = [...selectedStrategicDrivers, driver]
    } else {
      newDrivers = selectedStrategicDrivers.filter(d => d !== driver)
    }
    setSelectedStrategicDrivers(newDrivers)
    handleInputChange('x_snc_newtech_strategic_driver', newDrivers.join(', '))
  }

  const handleTargetDepartmentChange = (department, isChecked) => {
    let newDepartments
    if (isChecked) {
      newDepartments = [...selectedTargetDepartments, department]
    } else {
      newDepartments = selectedTargetDepartments.filter(d => d !== department)
    }
    setSelectedTargetDepartments(newDepartments)
    handleInputChange('x_snc_newtech_target_user_departments', newDepartments.join(', '))
  }

  const validateStep = (step) => {
    const stepErrors = {}
    
    switch (step) {
      case 1: // Contact Info
        if (!formData.x_snc_newtech_requester_department) {
          stepErrors.x_snc_newtech_requester_department = 'Department is required'
        }
        if (!formData.x_snc_newtech_cost_center) {
          stepErrors.x_snc_newtech_cost_center = 'Cost center is required'
        } else if (!/^\d{4}$/.test(formData.x_snc_newtech_cost_center.toString())) {
          stepErrors.x_snc_newtech_cost_center = 'Cost center must be exactly 4 digits'
        }
        break
        
      case 2: // Request Details
        if (!formData.x_snc_newtech_priority) stepErrors.x_snc_newtech_priority = 'Priority is required'
        if (!formData.x_snc_newtech_target_usage_date) stepErrors.x_snc_newtech_target_usage_date = 'Target usage date is required'
        if (!formData.x_snc_newtech_request_type) stepErrors.x_snc_newtech_request_type = 'Request type is required'
        if (!formData.short_description) stepErrors.short_description = 'Short description is required'
        break
        
      case 3: // Business Case
        if (!formData.x_snc_newtech_as_vp_approval) stepErrors.x_snc_newtech_as_vp_approval = 'VP approval status is required'
        if (!formData.x_snc_newtech_vp_name) stepErrors.x_snc_newtech_vp_name = 'VP name is required'
        if (!formData.x_snc_newtech_problem_statement) stepErrors.x_snc_newtech_problem_statement = 'Problem statement is required'
        if (!formData.x_snc_newtech_impact_if_not_done) stepErrors.x_snc_newtech_impact_if_not_done = 'Impact analysis is required'
        if (!formData.x_snc_newtech_strategic_driver) stepErrors.x_snc_newtech_strategic_driver = 'Strategic driver is required'
        if (!formData.x_snc_newtech_cic_response) stepErrors.x_snc_newtech_cic_response = 'CIC response is required'
        break
        
      case 4: // Impact & Users
        if (!formData.x_snc_newtech_target_user_departments) stepErrors.x_snc_newtech_target_user_departments = 'Target departments are required'
        break
        
      case 5: // Budget & Technical
        if (!formData.x_snc_newtech_in_current_budget) stepErrors.x_snc_newtech_in_current_budget = 'Budget status is required'
        if (!formData.x_snc_newtech_estimated_cost_band) stepErrors.x_snc_newtech_estimated_cost_band = 'Cost estimate is required'
        break
    }
    
    return stepErrors
  }

  const handleNext = () => {
    const stepErrors = validateStep(currentStep)
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      return
    }
    
    setErrors({})
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    const allErrors = {}
    for (let step = 1; step <= 5; step++) {
      const stepErrors = validateStep(step)
      Object.assign(allErrors, stepErrors)
    }
    
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors)
      return
    }

    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/now/table/x_snc_newtech_request?sysparm_display_value=all', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-UserToken': window.g_ck
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const result = await response.json()
        onSubmitSuccess(result.result)
      } else {
        const error = await response.json()
        throw new Error(error.error?.message || 'Failed to submit request')
      }
    } catch (error) {
      console.error('Submission error:', error)
      setErrors({ submit: error.message })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getProgressPercentage = () => {
    return ((currentStep - 1) / (STEPS.length - 1)) * 100
  }

  const findDepartmentByName = (name) => {
    return departments.find(dept => display(dept.x_snc_newtech_name) === name)
  }

  const otherDept = findDepartmentByName('Other')
  const showOtherDepartmentField = otherDept && formData.x_snc_newtech_requester_department === value(otherDept.sys_id)
  const showCicExplanation = formData.x_snc_newtech_cic_response === 'yes'
  const showOtherTargetDept = selectedTargetDepartments.includes('Other')

  return (
    <>
      {/* Progress Indicator */}
      <div className="progress-container">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${getProgressPercentage()}%` }}
          />
          {STEPS.map((step) => (
            <div
              key={step.id}
              className={`progress-step ${
                step.id < currentStep ? 'completed' : 
                step.id === currentStep ? 'active' : ''
              }`}
            >
              {step.id < currentStep ? '✓' : step.id}
            </div>
          ))}
        </div>
        <div className="progress-labels">
          {STEPS.map((step) => (
            <div
              key={step.id}
              className={`progress-label ${
                step.id < currentStep ? 'completed' : 
                step.id === currentStep ? 'active' : ''
              }`}
            >
              {step.title}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="form-container">
        <div className="step-content">
          <div className="step-header">
            <h2 className="step-title">
              <span className="step-icon">{STEPS[currentStep - 1].icon}</span>
              {STEPS[currentStep - 1].title}
            </h2>
            <p className="step-description">{STEPS[currentStep - 1].description}</p>
          </div>

          {currentStep === 1 && (
            <div className="form-section">
              <div className="form-row">
                <div className="form-group">
                  <label>Today's Date</label>
                  <input
                    type="date"
                    value={formData.x_snc_newtech_todays_date}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={formData.x_snc_newtech_email}
                    onChange={(e) => handleInputChange('x_snc_newtech_email', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Requestor Phone Number</label>
                  <input
                    type="tel"
                    value={formData.x_snc_newtech_requester_phone}
                    onChange={(e) => handleInputChange('x_snc_newtech_requester_phone', e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div className="form-group">
                  <label>Requestor Name (if different than submitter)</label>
                  <input
                    type="text"
                    value={formData.x_snc_newtech_requester_name}
                    onChange={(e) => handleInputChange('x_snc_newtech_requester_name', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="required">Requestor Department</label>
                <select
                  value={formData.x_snc_newtech_requester_department}
                  onChange={(e) => handleInputChange('x_snc_newtech_requester_department', e.target.value)}
                  className={errors.x_snc_newtech_requester_department ? 'error' : ''}
                  disabled={departmentsLoading}
                >
                  <option value="">
                    {departmentsLoading ? '-- Loading Departments --' : '-- Select Department --'}
                  </option>
                  {departments.map(dept => (
                    <option key={value(dept.sys_id)} value={value(dept.sys_id)}>
                      {display(dept.x_snc_newtech_name)}
                    </option>
                  ))}
                </select>
                {errors.x_snc_newtech_requester_department && (
                  <div className="error-message">{errors.x_snc_newtech_requester_department}</div>
                )}
              </div>

              {showOtherDepartmentField && (
                <div className="conditional-field">
                  <div className="form-group">
                    <label>If Other (Department)</label>
                    <input
                      type="text"
                      value={formData.x_snc_newtech_requester_department_other}
                      onChange={(e) => handleInputChange('x_snc_newtech_requester_department_other', e.target.value)}
                      placeholder="Please specify department"
                    />
                  </div>
                </div>
              )}

              <div className="form-group">
                <label className="required">Funding Cost Center</label>
                <input
                  type="number"
                  value={formData.x_snc_newtech_cost_center}
                  onChange={(e) => handleInputChange('x_snc_newtech_cost_center', e.target.value)}
                  placeholder="4-digit cost center"
                  className={errors.x_snc_newtech_cost_center ? 'error' : ''}
                />
                <div className="help-text">Enter exactly 4 digits</div>
                {errors.x_snc_newtech_cost_center && (
                  <div className="error-message">{errors.x_snc_newtech_cost_center}</div>
                )}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="form-section">
              <div className="form-group">
                <label className="required">Priority</label>
                <select
                  value={formData.x_snc_newtech_priority}
                  onChange={(e) => handleInputChange('x_snc_newtech_priority', e.target.value)}
                  className={errors.x_snc_newtech_priority ? 'error' : ''}
                >
                  <option value="">-- Select Priority --</option>
                  <option value="fast_track">Fast Track – Urgent and critical (requires CIO & President approval)</option>
                  <option value="high">High – Needed within the Year's Capital Planning (requires CIO approval)</option>
                  <option value="medium">Medium – Needed within the next year</option>
                  <option value="low">Low – Needed when funding and capacity allows</option>
                </select>
                {errors.x_snc_newtech_priority && (
                  <div className="error-message">{errors.x_snc_newtech_priority}</div>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="required">Target Usage Date</label>
                  <input
                    type="date"
                    value={formData.x_snc_newtech_target_usage_date}
                    onChange={(e) => handleInputChange('x_snc_newtech_target_usage_date', e.target.value)}
                    className={errors.x_snc_newtech_target_usage_date ? 'error' : ''}
                  />
                  <div className="help-text">When do you need to be able to use the tool?</div>
                  {errors.x_snc_newtech_target_usage_date && (
                    <div className="error-message">{errors.x_snc_newtech_target_usage_date}</div>
                  )}
                </div>
                <div className="form-group">
                  <label className="required">Type of Request</label>
                  <select
                    value={formData.x_snc_newtech_request_type}
                    onChange={(e) => handleInputChange('x_snc_newtech_request_type', e.target.value)}
                    className={errors.x_snc_newtech_request_type ? 'error' : ''}
                  >
                    <option value="">-- Select Request Type --</option>
                    <option value="new_technology_capability">New Technology / Capability</option>
                    <option value="adding_capability_existing">Adding a capability to an existing platform</option>
                    <option value="correcting_capability_existing">Correcting a capability to an existing platform</option>
                    <option value="change_design_architecture">Change in Design/Architecture</option>
                    <option value="build_modify_integration">Build / Modify Integration(s) / API(s) between software application systems</option>
                    <option value="on_prem_software">On Prem Software</option>
                    <option value="saas">Software as a Service (SaaS)</option>
                    <option value="paas">Platform as a Service (PaaS)</option>
                    <option value="cloud_hyperscaler">Cloud Hyperscaler Services (Azure, AWS, OCI, Google, etc.)</option>
                    <option value="iaas">Infrastructure as a Service (IaaS)</option>
                  </select>
                  {errors.x_snc_newtech_request_type && (
                    <div className="error-message">{errors.x_snc_newtech_request_type}</div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label className="required">Short Description</label>
                <input
                  type="text"
                  value={formData.short_description}
                  onChange={(e) => handleInputChange('short_description', e.target.value)}
                  placeholder="Brief summary of your request"
                  className={errors.short_description ? 'error' : ''}
                />
                {errors.short_description && (
                  <div className="error-message">{errors.short_description}</div>
                )}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="form-section">
              <div className="form-row">
                <div className="form-group">
                  <label className="required">Do you have your VP approval to Submit?</label>
                  <select
                    value={formData.x_snc_newtech_as_vp_approval}
                    onChange={(e) => handleInputChange('x_snc_newtech_as_vp_approval', e.target.value)}
                    className={errors.x_snc_newtech_as_vp_approval ? 'error' : ''}
                  >
                    <option value="">-- Select --</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                  {errors.x_snc_newtech_as_vp_approval && (
                    <div className="error-message">{errors.x_snc_newtech_as_vp_approval}</div>
                  )}
                </div>
                <div className="form-group">
                  <label className="required">Enter Name of VP that Approved</label>
                  <input
                    type="text"
                    value={formData.x_snc_newtech_vp_name}
                    onChange={(e) => handleInputChange('x_snc_newtech_vp_name', e.target.value)}
                    placeholder="VP Name"
                    className={errors.x_snc_newtech_vp_name ? 'error' : ''}
                  />
                  {errors.x_snc_newtech_vp_name && (
                    <div className="error-message">{errors.x_snc_newtech_vp_name}</div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label className="required">Problem Statement</label>
                <textarea
                  value={formData.x_snc_newtech_problem_statement}
                  onChange={(e) => handleInputChange('x_snc_newtech_problem_statement', e.target.value)}
                  placeholder="Provide justification of request, opportunity and impacts..."
                  className={errors.x_snc_newtech_problem_statement ? 'error' : ''}
                />
                <div className="help-text">Provide justification of request, opportunity and impacts.</div>
                {errors.x_snc_newtech_problem_statement && (
                  <div className="error-message">{errors.x_snc_newtech_problem_statement}</div>
                )}
              </div>

              <div className="form-group">
                <label className="required">Impacts of NOT doing</label>
                <textarea
                  value={formData.x_snc_newtech_impact_if_not_done}
                  onChange={(e) => handleInputChange('x_snc_newtech_impact_if_not_done', e.target.value)}
                  placeholder="What will happen if we don't do this, and within what timeframe?"
                  className={errors.x_snc_newtech_impact_if_not_done ? 'error' : ''}
                />
                <div className="help-text">What will happen if we don't do this, and within what timeframe?</div>
                {errors.x_snc_newtech_impact_if_not_done && (
                  <div className="error-message">{errors.x_snc_newtech_impact_if_not_done}</div>
                )}
              </div>

              <div className="form-group">
                <label className="required">Strategic Driver (select all that apply)</label>
                <div className={`multi-select-container ${errors.x_snc_newtech_strategic_driver ? 'error' : ''}`}>
                  {STRATEGIC_DRIVERS.map(driver => (
                    <div key={driver} className="multi-select-item">
                      <input
                        type="checkbox"
                        id={`driver-${driver}`}
                        checked={selectedStrategicDrivers.includes(driver)}
                        onChange={(e) => handleStrategicDriverChange(driver, e.target.checked)}
                      />
                      <label htmlFor={`driver-${driver}`}>{driver}</label>
                    </div>
                  ))}
                </div>
                {errors.x_snc_newtech_strategic_driver && (
                  <div className="error-message">{errors.x_snc_newtech_strategic_driver}</div>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="required">Is this in response to a Critical Incident Command (CIC) Incident?</label>
                  <select
                    value={formData.x_snc_newtech_cic_response}
                    onChange={(e) => handleInputChange('x_snc_newtech_cic_response', e.target.value)}
                    className={errors.x_snc_newtech_cic_response ? 'error' : ''}
                  >
                    <option value="">-- Select --</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                  {errors.x_snc_newtech_cic_response && (
                    <div className="error-message">{errors.x_snc_newtech_cic_response}</div>
                  )}
                </div>
              </div>

              {showCicExplanation && (
                <div className="conditional-field">
                  <div className="form-group">
                    <label>If response to CIC, Please Explain</label>
                    <textarea
                      value={formData.x_snc_newtech_cic_explanation}
                      onChange={(e) => handleInputChange('x_snc_newtech_cic_explanation', e.target.value)}
                      placeholder="Explain the CIC incident relationship..."
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {currentStep === 4 && (
            <div className="form-section">
              <div className="form-group">
                <label className="required">Target User Department(s)</label>
                <div className={`multi-select-container ${errors.x_snc_newtech_target_user_departments ? 'error' : ''}`}>
                  {departmentsLoading ? (
                    <div className="multi-select-item">Loading departments...</div>
                  ) : (
                    departments.map(dept => {
                      const deptName = display(dept.x_snc_newtech_name)
                      return (
                        <div key={value(dept.sys_id)} className="multi-select-item">
                          <input
                            type="checkbox"
                            id={`target-${value(dept.sys_id)}`}
                            checked={selectedTargetDepartments.includes(deptName)}
                            onChange={(e) => handleTargetDepartmentChange(deptName, e.target.checked)}
                          />
                          <label htmlFor={`target-${value(dept.sys_id)}`}>{deptName}</label>
                        </div>
                      )
                    })
                  )}
                </div>
                {errors.x_snc_newtech_target_user_departments && (
                  <div className="error-message">{errors.x_snc_newtech_target_user_departments}</div>
                )}
              </div>

              {showOtherTargetDept && (
                <div className="conditional-field">
                  <div className="form-group">
                    <label>If Other (Target Dept)</label>
                    <input
                      type="text"
                      value={formData.x_snc_newtech_target_user_departments_other}
                      onChange={(e) => handleInputChange('x_snc_newtech_target_user_departments_other', e.target.value)}
                      placeholder="Please specify target department"
                    />
                  </div>
                </div>
              )}

              <div className="form-group">
                <label>Estimated number of users</label>
                <select
                  value={formData.x_snc_newtech_estimated_user_count}
                  onChange={(e) => handleInputChange('x_snc_newtech_estimated_user_count', e.target.value)}
                >
                  <option value="">-- Select User Count --</option>
                  <option value="ten_thousand_plus">10,000+</option>
                  <option value="five_to_ten_thousand">5,000–10,000</option>
                  <option value="one_to_five_thousand">1,000–4,999</option>
                  <option value="five_hundred_to_thousand">500–999</option>
                  <option value="hundred_to_five_hundred">100–499</option>
                  <option value="fifty_to_hundred">50–99</option>
                  <option value="twenty_to_fifty">20–49</option>
                  <option value="five_to_twenty">5–19</option>
                  <option value="one_to_five">1–4</option>
                </select>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="form-section">
              <div className="form-row">
                <div className="form-group">
                  <label className="required">Included in this year's budget?</label>
                  <select
                    value={formData.x_snc_newtech_in_current_budget}
                    onChange={(e) => handleInputChange('x_snc_newtech_in_current_budget', e.target.value)}
                    className={errors.x_snc_newtech_in_current_budget ? 'error' : ''}
                  >
                    <option value="">-- Select --</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                  {errors.x_snc_newtech_in_current_budget && (
                    <div className="error-message">{errors.x_snc_newtech_in_current_budget}</div>
                  )}
                </div>
                <div className="form-group">
                  <label className="required">Estimated Cost</label>
                  <select
                    value={formData.x_snc_newtech_estimated_cost_band}
                    onChange={(e) => handleInputChange('x_snc_newtech_estimated_cost_band', e.target.value)}
                    className={errors.x_snc_newtech_estimated_cost_band ? 'error' : ''}
                  >
                    <option value="">-- Select Cost Band --</option>
                    <option value="under_fifty_k">&lt;$50K</option>
                    <option value="fifty_to_two_fifty_k">$50K–$249K</option>
                    <option value="two_fifty_k_to_one_m">$250K–$999K</option>
                    <option value="one_to_five_m">$1M–$4.9M</option>
                    <option value="five_m_plus">$5M+</option>
                    <option value="unknown">Unknown</option>
                  </select>
                  {errors.x_snc_newtech_estimated_cost_band && (
                    <div className="error-message">{errors.x_snc_newtech_estimated_cost_band}</div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Has this request gone through funding governance?</label>
                <select
                  value={formData.x_snc_newtech_through_funding_governance}
                  onChange={(e) => handleInputChange('x_snc_newtech_through_funding_governance', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Data Sensitivity (Classification)</label>
                  <select
                    value={formData.x_snc_newtech_data_sensitivity}
                    onChange={(e) => handleInputChange('x_snc_newtech_data_sensitivity', e.target.value)}
                  >
                    <option value="">-- Select --</option>
                    <option value="high">High (Restricted – PII/Financials)</option>
                    <option value="medium">Medium (Private – e.g., NPI, org charts, leases)</option>
                    <option value="low">Low (Public)</option>
                    <option value="unknown">Unknown</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Does the system touch financial reporting?</label>
                  <select
                    value={formData.x_snc_newtech_touches_financial_reporting}
                    onChange={(e) => handleInputChange('x_snc_newtech_touches_financial_reporting', e.target.value)}
                  >
                    <option value="">-- Select --</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    <option value="unknown">Unknown</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>AI Capabilities present?</label>
                  <select
                    value={formData.x_snc_newtech_ai_capabilities}
                    onChange={(e) => handleInputChange('x_snc_newtech_ai_capabilities', e.target.value)}
                  >
                    <option value="">-- Select --</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    <option value="unknown">Unknown</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Technology Type (if known)</label>
                  <select
                    value={formData.x_snc_newtech_technology_type}
                    onChange={(e) => handleInputChange('x_snc_newtech_technology_type', e.target.value)}
                  >
                    <option value="">-- Select --</option>
                    <option value="hardware">Hardware</option>
                    <option value="cots_software">Commercial off the shelf (COTS) Software</option>
                    <option value="custom_built_software">Custom Built Software</option>
                    <option value="on_prem_software">On Prem Software</option>
                    <option value="saas">Software as a Service (SaaS)</option>
                    <option value="paas">Platform as a Service (PaaS)</option>
                    <option value="cloud_hyperscaler">Cloud Hyperscaler Services</option>
                    <option value="iaas">Infrastructure as a Service (IaaS)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Proposed Vendor Name(s) (if known)</label>
                <input
                  type="text"
                  value={formData.x_snc_newtech_proposed_vendor}
                  onChange={(e) => handleInputChange('x_snc_newtech_proposed_vendor', e.target.value)}
                  placeholder="e.g., Microsoft, Salesforce, Oracle"
                />
              </div>

              <div className="form-group">
                <label>Assumptions</label>
                <textarea
                  value={formData.x_snc_newtech_assumptions}
                  onChange={(e) => handleInputChange('x_snc_newtech_assumptions', e.target.value)}
                  placeholder="List any assumptions about the request..."
                />
              </div>

              <div className="form-group">
                <label>Risks, Issues and Impacts</label>
                <textarea
                  value={formData.x_snc_newtech_risks_issues_impacts}
                  onChange={(e) => handleInputChange('x_snc_newtech_risks_issues_impacts', e.target.value)}
                  placeholder="Identify potential risks and their impacts..."
                />
              </div>
            </div>
          )}

          {currentStep === 6 && (
            <div className="form-section">
              <h3>Review Your Request</h3>
              <p>Please review the information below and submit your technology request.</p>
              
              <div style={{background: 'var(--seven-eleven-gray-light)', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem'}}>
                <h4 style={{color: 'var(--seven-eleven-red)', margin: '0 0 1rem 0'}}>Summary</h4>
                <dl style={{margin: 0}}>
                  <dt style={{fontWeight: 'bold', color: 'var(--seven-eleven-gray-dark)'}}>Department:</dt>
                  <dd style={{margin: '0 0 0.5rem 1rem'}}>{
                    formData.x_snc_newtech_requester_department ? 
                    departments.find(d => value(d.sys_id) === formData.x_snc_newtech_requester_department)?.x_snc_newtech_name?.display_value || formData.x_snc_newtech_requester_department
                    : 'Not specified'
                  }</dd>
                  
                  <dt style={{fontWeight: 'bold', color: 'var(--seven-eleven-gray-dark)'}}>Priority:</dt>
                  <dd style={{margin: '0 0 0.5rem 1rem'}}>{
                    formData.x_snc_newtech_priority === 'fast_track' ? 'Fast Track – Urgent and critical' :
                    formData.x_snc_newtech_priority === 'high' ? 'High – Needed within the Year\'s Capital Planning' :
                    formData.x_snc_newtech_priority === 'medium' ? 'Medium – Needed within the next year' :
                    formData.x_snc_newtech_priority === 'low' ? 'Low – Needed when funding and capacity allows' :
                    'Not specified'
                  }</dd>
                  
                  <dt style={{fontWeight: 'bold', color: 'var(--seven-eleven-gray-dark)'}}>Short Description:</dt>
                  <dd style={{margin: '0 0 0.5rem 1rem'}}>{formData.short_description || 'Not provided'}</dd>
                  
                  <dt style={{fontWeight: 'bold', color: 'var(--seven-eleven-gray-dark)'}}>Target Usage Date:</dt>
                  <dd style={{margin: '0 0 0.5rem 1rem'}}>{formData.x_snc_newtech_target_usage_date || 'Not specified'}</dd>
                  
                  <dt style={{fontWeight: 'bold', color: 'var(--seven-eleven-gray-dark)'}}>Estimated Cost:</dt>
                  <dd style={{margin: '0 0 0.5rem 1rem'}}>{
                    formData.x_snc_newtech_estimated_cost_band === 'under_fifty_k' ? '<$50K' :
                    formData.x_snc_newtech_estimated_cost_band === 'fifty_to_two_fifty_k' ? '$50K–$249K' :
                    formData.x_snc_newtech_estimated_cost_band === 'two_fifty_k_to_one_m' ? '$250K–$999K' :
                    formData.x_snc_newtech_estimated_cost_band === 'one_to_five_m' ? '$1M–$4.9M' :
                    formData.x_snc_newtech_estimated_cost_band === 'five_m_plus' ? '$5M+' :
                    formData.x_snc_newtech_estimated_cost_band === 'unknown' ? 'Unknown' :
                    'Not specified'
                  }</dd>
                </dl>
              </div>

              {errors.submit && (
                <div className="error-message" style={{marginBottom: '20px', padding: '1rem', backgroundColor: 'rgba(200, 16, 46, 0.1)', borderRadius: '8px'}}>
                  Error submitting request: {errors.submit}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="form-navigation">
        <div className="nav-buttons">
          <button 
            type="button"
            className="btn btn-secondary"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            ← Previous
          </button>
          
          {currentStep < 6 ? (
            <button 
              type="button"
              className="btn btn-primary"
              onClick={handleNext}
            >
              Next →
            </button>
          ) : (
            <button 
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="loading">
                  <span className="spinner"></span>
                  Submitting...
                </span>
              ) : (
                'Submit Request ✓'
              )}
            </button>
          )}
        </div>
      </div>
    </>
  )
}