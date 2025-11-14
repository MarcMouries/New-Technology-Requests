import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

// Sample New Technology Request Records for Dashboard Testing

// Record 1 - Fast Track Priority, Phase 1
Record({
    $id: Now.ID['sample_request_1'],
    table: 'x_snc_newtech_request',
    data: {
        number: 'NTR0001001',
        short_description: 'Critical POS System Upgrade',
        x_snc_newtech_priority: 'fast_track',
        x_snc_newtech_phase: 'one_new_request',
        x_snc_newtech_status: 'one_two_submitted',
        x_snc_newtech_request_type: 'new_technology_capability',
        x_snc_newtech_strategic_driver: 'Deliver Consistently Great Customer Experience, Technology & Data Modernization',
        x_snc_newtech_estimated_cost_band: 'one_to_five_m',
        x_snc_newtech_target_usage_date: '2024-03-15',
        x_snc_newtech_problem_statement: 'Current POS systems are outdated and causing customer delays',
        x_snc_newtech_impact_if_not_done: 'Customer satisfaction will decrease, potential revenue loss',
        x_snc_newtech_as_vp_approval: 'yes',
        x_snc_newtech_vp_name: 'John Smith',
        x_snc_newtech_cic_response: 'no',
        x_snc_newtech_in_current_budget: 'yes',
        x_snc_newtech_target_user_departments: 'Operations, IT',
        x_snc_newtech_estimated_user_count: 'ten_thousand_plus',
        x_snc_newtech_email: 'john.doe@7eleven.com',
        x_snc_newtech_cost_center: 1001
    }
})

// Record 2 - High Priority, Phase 2
Record({
    $id: Now.ID['sample_request_2'],
    table: 'x_snc_newtech_request',
    data: {
        number: 'NTR0001002',
        short_description: 'Supply Chain Analytics Platform',
        x_snc_newtech_priority: 'high',
        x_snc_newtech_phase: 'two_initial_review',
        x_snc_newtech_status: 'two_three_draft_review',
        x_snc_newtech_request_type: 'saas',
        x_snc_newtech_strategic_driver: 'Simplification & Standardization, Cost Leadership',
        x_snc_newtech_estimated_cost_band: 'two_fifty_k_to_one_m',
        x_snc_newtech_target_usage_date: '2024-06-01',
        x_snc_newtech_problem_statement: 'Need better visibility into supply chain operations',
        x_snc_newtech_impact_if_not_done: 'Continued inefficiencies in supply chain management',
        x_snc_newtech_as_vp_approval: 'yes',
        x_snc_newtech_vp_name: 'Sarah Johnson',
        x_snc_newtech_cic_response: 'no',
        x_snc_newtech_in_current_budget: 'no',
        x_snc_newtech_target_user_departments: 'Supply Chain / Logistics, Operations',
        x_snc_newtech_estimated_user_count: 'hundred_to_five_hundred',
        x_snc_newtech_email: 'supply.manager@7eleven.com',
        x_snc_newtech_cost_center: 2002
    }
})

// Record 3 - Medium Priority, Phase 3
Record({
    $id: Now.ID['sample_request_3'],
    table: 'x_snc_newtech_request',
    data: {
        number: 'NTR0001003',
        short_description: 'Employee Mobile App Enhancement',
        x_snc_newtech_priority: 'medium',
        x_snc_newtech_phase: 'three_architecture_review',
        x_snc_newtech_status: 'three_two_ar_scheduled',
        x_snc_newtech_request_type: 'adding_capability_existing',
        x_snc_newtech_strategic_driver: 'Accelerate Digital & Delivery, Grow & Enhance Store Network',
        x_snc_newtech_estimated_cost_band: 'fifty_to_two_fifty_k',
        x_snc_newtech_target_usage_date: '2024-08-30',
        x_snc_newtech_problem_statement: 'Current employee app lacks scheduling and communication features',
        x_snc_newtech_impact_if_not_done: 'Reduced employee efficiency and communication gaps',
        x_snc_newtech_as_vp_approval: 'yes',
        x_snc_newtech_vp_name: 'Mike Wilson',
        x_snc_newtech_cic_response: 'no',
        x_snc_newtech_in_current_budget: 'yes',
        x_snc_newtech_target_user_departments: 'HR, Operations',
        x_snc_newtech_estimated_user_count: 'five_to_ten_thousand',
        x_snc_newtech_email: 'hr.manager@7eleven.com',
        x_snc_newtech_cost_center: 3003
    }
})

// Record 4 - Low Priority, Phase 4
Record({
    $id: Now.ID['sample_request_4'],
    table: 'x_snc_newtech_request',
    data: {
        number: 'NTR0001004',
        short_description: 'Marketing Campaign Automation Tool',
        x_snc_newtech_priority: 'low',
        x_snc_newtech_phase: 'four_proposal',
        x_snc_newtech_status: 'four_one_proposal_backlog',
        x_snc_newtech_request_type: 'saas',
        x_snc_newtech_strategic_driver: 'Grow Proprietary Products, Deliver Consistently Great Customer Experience',
        x_snc_newtech_estimated_cost_band: 'fifty_to_two_fifty_k',
        x_snc_newtech_target_usage_date: '2024-12-01',
        x_snc_newtech_problem_statement: 'Manual marketing processes are time-consuming and inefficient',
        x_snc_newtech_impact_if_not_done: 'Continued manual work and reduced marketing effectiveness',
        x_snc_newtech_as_vp_approval: 'yes',
        x_snc_newtech_vp_name: 'Lisa Brown',
        x_snc_newtech_cic_response: 'no',
        x_snc_newtech_in_current_budget: 'no',
        x_snc_newtech_target_user_departments: 'Marketing, Digital',
        x_snc_newtech_estimated_user_count: 'twenty_to_fifty',
        x_snc_newtech_email: 'marketing@7eleven.com',
        x_snc_newtech_cost_center: 4004
    }
})

// Record 5 - High Priority, Phase 5
Record({
    $id: Now.ID['sample_request_5'],
    table: 'x_snc_newtech_request',
    data: {
        number: 'NTR0001005',
        short_description: 'Security Incident Response Platform',
        x_snc_newtech_priority: 'high',
        x_snc_newtech_phase: 'five_trigger_funding',
        x_snc_newtech_status: 'five_three_app_rat_updated',
        x_snc_newtech_request_type: 'on_prem_software',
        x_snc_newtech_strategic_driver: 'InfoSec/Risk/Vulnerability Reduction, Compliance/Regulatory/End of Support',
        x_snc_newtech_estimated_cost_band: 'two_fifty_k_to_one_m',
        x_snc_newtech_target_usage_date: '2024-04-15',
        x_snc_newtech_problem_statement: 'Need centralized security incident management system',
        x_snc_newtech_impact_if_not_done: 'Increased security risk and compliance issues',
        x_snc_newtech_as_vp_approval: 'yes',
        x_snc_newtech_vp_name: 'David Chen',
        x_snc_newtech_cic_response: 'yes',
        x_snc_newtech_cic_explanation: 'Related to recent security incidents requiring immediate response improvements',
        x_snc_newtech_in_current_budget: 'yes',
        x_snc_newtech_target_user_departments: 'IT, Asset Protection',
        x_snc_newtech_estimated_user_count: 'fifty_to_hundred',
        x_snc_newtech_email: 'security@7eleven.com',
        x_snc_newtech_cost_center: 5005
    }
})

// Record 6 - Medium Priority, Phase 2
Record({
    $id: Now.ID['sample_request_6'],
    table: 'x_snc_newtech_request',
    data: {
        number: 'NTR0001006',
        short_description: 'Store Energy Management System',
        x_snc_newtech_priority: 'medium',
        x_snc_newtech_phase: 'two_initial_review',
        x_snc_newtech_status: 'two_one_backlog',
        x_snc_newtech_request_type: 'iaas',
        x_snc_newtech_strategic_driver: 'Cost Leadership, Optimize Fuel Business & Grow Alternatives',
        x_snc_newtech_estimated_cost_band: 'one_to_five_m',
        x_snc_newtech_target_usage_date: '2024-09-30',
        x_snc_newtech_problem_statement: 'Energy costs are rising and need better monitoring and control',
        x_snc_newtech_impact_if_not_done: 'Continued high energy costs and environmental impact',
        x_snc_newtech_as_vp_approval: 'yes',
        x_snc_newtech_vp_name: 'Robert Taylor',
        x_snc_newtech_cic_response: 'no',
        x_snc_newtech_in_current_budget: 'no',
        x_snc_newtech_target_user_departments: 'Facilities, Operations',
        x_snc_newtech_estimated_user_count: 'five_hundred_to_thousand',
        x_snc_newtech_email: 'facilities@7eleven.com',
        x_snc_newtech_cost_center: 6006
    }
})

// Record 7 - Fast Track Priority, On Hold Status
Record({
    $id: Now.ID['sample_request_7'],
    table: 'x_snc_newtech_request',
    data: {
        number: 'NTR0001007',
        short_description: 'Emergency Communication System',
        x_snc_newtech_priority: 'fast_track',
        x_snc_newtech_phase: 'two_initial_review',
        x_snc_newtech_status: 'nine_one_on_hold',
        x_snc_newtech_request_type: 'new_technology_capability',
        x_snc_newtech_strategic_driver: 'InfoSec/Risk/Vulnerability Reduction, Deliver Consistently Great Customer Experience',
        x_snc_newtech_estimated_cost_band: 'fifty_to_two_fifty_k',
        x_snc_newtech_target_usage_date: '2024-02-28',
        x_snc_newtech_problem_statement: 'Need emergency communication system for crisis situations',
        x_snc_newtech_impact_if_not_done: 'Unable to communicate effectively during emergencies',
        x_snc_newtech_as_vp_approval: 'yes',
        x_snc_newtech_vp_name: 'Jennifer Lee',
        x_snc_newtech_cic_response: 'yes',
        x_snc_newtech_cic_explanation: 'Required due to recent emergency response gaps identified',
        x_snc_newtech_in_current_budget: 'yes',
        x_snc_newtech_target_user_departments: 'Operations, Asset Protection',
        x_snc_newtech_estimated_user_count: 'one_to_five_thousand',
        x_snc_newtech_email: 'emergency@7eleven.com',
        x_snc_newtech_cost_center: 7007
    }
})

// Record 8 - Low Priority, Phase 1
Record({
    $id: Now.ID['sample_request_8'],
    table: 'x_snc_newtech_request',
    data: {
        number: 'NTR0001008',
        short_description: 'Learning Management System Upgrade',
        x_snc_newtech_priority: 'low',
        x_snc_newtech_phase: 'one_new_request',
        x_snc_newtech_status: 'one_one_draft',
        x_snc_newtech_request_type: 'correcting_capability_existing',
        x_snc_newtech_strategic_driver: 'Grow & Enhance Store Network, Simplification & Standardization',
        x_snc_newtech_estimated_cost_band: 'under_fifty_k',
        x_snc_newtech_target_usage_date: '2025-01-15',
        x_snc_newtech_problem_statement: 'Current LMS has outdated interface and limited functionality',
        x_snc_newtech_impact_if_not_done: 'Continued poor user experience for training programs',
        x_snc_newtech_as_vp_approval: 'yes',
        x_snc_newtech_vp_name: 'Amanda White',
        x_snc_newtech_cic_response: 'no',
        x_snc_newtech_in_current_budget: 'yes',
        x_snc_newtech_target_user_departments: 'Learning & Development, HR',
        x_snc_newtech_estimated_user_count: 'five_to_ten_thousand',
        x_snc_newtech_email: 'training@7eleven.com',
        x_snc_newtech_cost_center: 8008
    }
})