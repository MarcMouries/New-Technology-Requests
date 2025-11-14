import React from 'react'
import { display, value } from '../utils/fields.js'

export default function SuccessMessage({ record, onStartNew }) {
  return (
    <div className="success-container">
      <div className="success-icon">
        ✓
      </div>
      
      <h2>Request Submitted Successfully!</h2>
      
      <p>
        Your technology request has been submitted and is now in the governance process. 
        You will receive updates as it progresses through each phase.
      </p>
      
      <div className="success-details">
        <p><strong>Request Number:</strong> {display(record.number)}</p>
        <p><strong>Short Description:</strong> {display(record.short_description)}</p>
        <p><strong>Priority:</strong> {display(record.x_snc_newtech_priority)}</p>
        <p><strong>Target Usage Date:</strong> {display(record.x_snc_newtech_target_usage_date)}</p>
        <p><strong>Estimated Cost:</strong> {display(record.x_snc_newtech_estimated_cost_band)}</p>
      </div>
      
      <div style={{ marginTop: '30px' }}>
        <p>
          <strong>What happens next?</strong>
        </p>
        <ul style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
          <li>Your request will undergo initial review by the governance team</li>
          <li>Architecture review will be scheduled for technical evaluation</li>
          <li>You'll receive notifications at each major milestone</li>
          <li>Track progress by searching for request number: <strong>{display(record.number)}</strong></li>
        </ul>
      </div>
      
      <div style={{ marginTop: '30px' }}>
        <button 
          className="btn btn-primary"
          onClick={onStartNew}
        >
          Submit Another Request
        </button>
        
        <a 
          href={`/x_snc_newtech_request.do?sys_id=${value(record.sys_id)}`}
          className="btn btn-secondary"
          style={{ marginLeft: '10px' }}
        >
          View Full Request
        </a>
      </div>
    </div>
  )
}