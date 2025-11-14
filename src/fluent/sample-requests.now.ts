import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

// Sample New Technology Request Records - Various Ages from November 13, 2025

// Record 1 - Today (November 13, 2025)
Record({
    $id: Now.ID['sample_request_1'],
    table: 'x_snc_newtech_request',
    data: {
        number: 'NTR0001001',
        short_description: 'Critical POS System Upgrade',
        x_snc_newtech_priority: '1_fast_track',
        x_snc_newtech_phase: 'one_new_request',
        x_snc_newtech_status: 'one_two_submitted',
        x_snc_newtech_request_type: 'new_technology_capability',
        x_snc_newtech_strategic_driver: 'Deliver Consistently Great Customer Experience, Technology & Data Modernization',
        x_snc_newtech_estimated_cost_band: 'one_to_five_m',
        x_snc_newtech_target_usage_date: '2025-03-15',
        x_snc_newtech_problem_statement: 'Current POS systems are outdated and causing customer delays',
        x_snc_newtech_impact_if_not_done: 'Customer satisfaction will decrease, potential revenue loss',
        x_snc_newtech_as_vp_approval: 'yes',
        x_snc_newtech_vp_name: 'John Smith',
        x_snc_newtech_cic_response: 'no',
        x_snc_newtech_in_current_budget: 'yes',
        x_snc_newtech_target_user_departments: 'Operations, IT',
        x_snc_newtech_estimated_user_count: 'ten_thousand_plus',
        x_snc_newtech_email: 'abel.tuter@7eleven.com',
        x_snc_newtech_cost_center: 1001,
        opened_by: '62826bf03710200044e0bfc8bcbe5df1', // Abel Tuter
        sys_created_on: '2025-11-13 10:00:00'
    }
})

// Record 2 - 1 day old (November 12, 2025)
Record({
    $id: Now.ID['sample_request_2'],
    table: 'x_snc_newtech_request',
    data: {
        number: 'NTR0001002',
        short_description: 'Supply Chain Analytics Platform',
        x_snc_newtech_priority: '2_high',
        x_snc_newtech_phase: 'two_initial_review',
        x_snc_newtech_status: 'two_three_draft_review',
        x_snc_newtech_request_type: 'saas',
        x_snc_newtech_strategic_driver: 'Simplification & Standardization, Cost Leadership',
        x_snc_newtech_estimated_cost_band: 'two_fifty_k_to_one_m',
        x_snc_newtech_target_usage_date: '2025-06-01',
        x_snc_newtech_problem_statement: 'Need better visibility into supply chain operations',
        x_snc_newtech_impact_if_not_done: 'Continued inefficiencies in supply chain management',
        x_snc_newtech_as_vp_approval: 'yes',
        x_snc_newtech_vp_name: 'Sarah Johnson',
        x_snc_newtech_cic_response: 'no',
        x_snc_newtech_in_current_budget: 'no',
        x_snc_newtech_target_user_departments: 'Supply Chain / Logistics, Operations',
        x_snc_newtech_estimated_user_count: 'hundred_to_five_hundred',
        x_snc_newtech_email: 'anna.becker@7eleven.com',
        x_snc_newtech_cost_center: 2002,
        opened_by: '1436cfaf8f976300a3c953ac37bdeeba', // Anna Becker
        sys_created_on: '2025-11-12 14:30:00'
    }
})

// Record 3 - 2 days old (November 11, 2025)
Record({
    $id: Now.ID['sample_request_3'],
    table: 'x_snc_newtech_request',
    data: {
        number: 'NTR0001003',
        short_description: 'Employee Mobile App Enhancement',
        x_snc_newtech_priority: '3_medium',
        x_snc_newtech_phase: 'three_architecture_review',
        x_snc_newtech_status: 'three_two_ar_scheduled',
        x_snc_newtech_request_type: 'adding_capability_existing',
        x_snc_newtech_strategic_driver: 'Accelerate Digital & Delivery, Grow & Enhance Store Network',
        x_snc_newtech_estimated_cost_band: 'fifty_to_two_fifty_k',
        x_snc_newtech_target_usage_date: '2025-08-30',
        x_snc_newtech_problem_statement: 'Current employee app lacks scheduling and communication features',
        x_snc_newtech_impact_if_not_done: 'Reduced employee efficiency and communication gaps',
        x_snc_newtech_as_vp_approval: 'yes',
        x_snc_newtech_vp_name: 'Mike Wilson',
        x_snc_newtech_cic_response: 'no',
        x_snc_newtech_in_current_budget: 'yes',
        x_snc_newtech_target_user_departments: 'HR, Operations',
        x_snc_newtech_estimated_user_count: 'five_to_ten_thousand',
        x_snc_newtech_email: 'danielle.smith@7eleven.com',
        x_snc_newtech_cost_center: 3003,
        opened_by: '50d6fbef8fd76300a3c953ac37bdeef9', // Danielle Smith
        sys_created_on: '2025-11-11 09:15:00'
    }
})

// Record 4 - 3 days old (November 10, 2025)
Record({
    $id: Now.ID['sample_request_4'],
    table: 'x_snc_newtech_request',
    data: {
        number: 'NTR0001004',
        short_description: 'Marketing Campaign Automation Tool',
        x_snc_newtech_priority: '4_low',
        x_snc_newtech_phase: 'four_proposal',
        x_snc_newtech_status: 'four_one_proposal_backlog',
        x_snc_newtech_request_type: 'saas',
        x_snc_newtech_strategic_driver: 'Grow Proprietary Products, Deliver Consistently Great Customer Experience',
        x_snc_newtech_estimated_cost_band: 'fifty_to_two_fifty_k',
        x_snc_newtech_target_usage_date: '2025-12-01',
        x_snc_newtech_problem_statement: 'Manual marketing processes are time-consuming and inefficient',
        x_snc_newtech_impact_if_not_done: 'Continued manual work and reduced marketing effectiveness',
        x_snc_newtech_as_vp_approval: 'yes',
        x_snc_newtech_vp_name: 'Lisa Brown',
        x_snc_newtech_cic_response: 'no',
        x_snc_newtech_in_current_budget: 'no',
        x_snc_newtech_target_user_departments: 'Marketing, Digital',
        x_snc_newtech_estimated_user_count: 'twenty_to_fifty',
        x_snc_newtech_email: 'jeff.clark@7eleven.com',
        x_snc_newtech_cost_center: 4004,
        opened_by: '5cdb7fbf53221010448addeeff7b120e', // Jeff Clark
        sys_created_on: '2025-11-10 16:45:00'
    }
})

// Record 5 - 1 week old (November 6, 2025)
Record({
    $id: Now.ID['sample_request_5'],
    table: 'x_snc_newtech_request',
    data: {
        number: 'NTR0001005',
        short_description: 'Security Incident Response Platform',
        x_snc_newtech_priority: '2_high',
        x_snc_newtech_phase: 'five_trigger_funding',
        x_snc_newtech_status: 'five_three_app_rat_updated',
        x_snc_newtech_request_type: 'on_prem_software',
        x_snc_newtech_strategic_driver: 'InfoSec/Risk/Vulnerability Reduction, Compliance/Regulatory/End of Support',
        x_snc_newtech_estimated_cost_band: 'two_fifty_k_to_one_m',
        x_snc_newtech_target_usage_date: '2025-04-15',
        x_snc_newtech_problem_statement: 'Need centralized security incident management system',
        x_snc_newtech_impact_if_not_done: 'Increased security risk and compliance issues',
        x_snc_newtech_as_vp_approval: 'yes',
        x_snc_newtech_vp_name: 'David Chen',
        x_snc_newtech_cic_response: 'yes',
        x_snc_newtech_cic_explanation: 'Related to recent security incidents requiring immediate response improvements',
        x_snc_newtech_in_current_budget: 'yes',
        x_snc_newtech_target_user_departments: 'IT, Asset Protection',
        x_snc_newtech_estimated_user_count: 'fifty_to_hundred',
        x_snc_newtech_email: 'kristen.goyal@7eleven.com',
        x_snc_newtech_cost_center: 5005,
        opened_by: '91cbd00053b21010448addeeff7b1238', // Kristen Goyal
        sys_created_on: '2025-11-06 11:20:00'
    }
})

// Record 6 - 2 weeks old (October 30, 2025)
Record({
    $id: Now.ID['sample_request_6'],
    table: 'x_snc_newtech_request',
    data: {
        number: 'NTR0001006',
        short_description: 'Store Energy Management System',
        x_snc_newtech_priority: '3_medium',
        x_snc_newtech_phase: 'two_initial_review',
        x_snc_newtech_status: 'two_one_backlog',
        x_snc_newtech_request_type: 'iaas',
        x_snc_newtech_strategic_driver: 'Cost Leadership, Optimize Fuel Business & Grow Alternatives',
        x_snc_newtech_estimated_cost_band: 'one_to_five_m',
        x_snc_newtech_target_usage_date: '2025-09-30',
        x_snc_newtech_problem_statement: 'Energy costs are rising and need better monitoring and control',
        x_snc_newtech_impact_if_not_done: 'Continued high energy costs and environmental impact',
        x_snc_newtech_as_vp_approval: 'yes',
        x_snc_newtech_vp_name: 'Robert Taylor',
        x_snc_newtech_cic_response: 'no',
        x_snc_newtech_in_current_budget: 'no',
        x_snc_newtech_target_user_departments: 'Facilities, Operations',
        x_snc_newtech_estimated_user_count: 'five_hundred_to_thousand',
        x_snc_newtech_email: 'marc.mouries@7eleven.com',
        x_snc_newtech_cost_center: 6006,
        opened_by: 'ac13175b937142102494bcd97bba1041', // Marc Mouries
        sys_created_on: '2025-10-30 13:00:00'
    }
})

// Record 7 - 3 weeks old (October 23, 2025) - On Hold
Record({
    $id: Now.ID['sample_request_7'],
    table: 'x_snc_newtech_request',
    data: {
        number: 'NTR0001007',
        short_description: 'Emergency Communication System',
        x_snc_newtech_priority: '1_fast_track',
        x_snc_newtech_phase: 'two_initial_review',
        x_snc_newtech_status: 'nine_one_on_hold',
        x_snc_newtech_request_type: 'new_technology_capability',
        x_snc_newtech_strategic_driver: 'InfoSec/Risk/Vulnerability Reduction, Deliver Consistently Great Customer Experience',
        x_snc_newtech_estimated_cost_band: 'fifty_to_two_fifty_k',
        x_snc_newtech_target_usage_date: '2025-02-28',
        x_snc_newtech_problem_statement: 'Need emergency communication system for crisis situations',
        x_snc_newtech_impact_if_not_done: 'Unable to communicate effectively during emergencies',
        x_snc_newtech_as_vp_approval: 'yes',
        x_snc_newtech_vp_name: 'Jennifer Lee',
        x_snc_newtech_cic_response: 'yes',
        x_snc_newtech_cic_explanation: 'Required due to recent emergency response gaps identified',
        x_snc_newtech_in_current_budget: 'yes',
        x_snc_newtech_target_user_departments: 'Operations, Asset Protection',
        x_snc_newtech_estimated_user_count: 'one_to_five_thousand',
        x_snc_newtech_email: 'melissa.pena@7eleven.com',
        x_snc_newtech_cost_center: 7007,
        opened_by: 'd999e5fc77e72300454792718a10611d', // Melissa Pena
        sys_created_on: '2025-10-23 08:45:00'
    }
})

// Record 8 - 3 months old (August 13, 2025) - Rejected
Record({
    $id: Now.ID['sample_request_8'],
    table: 'x_snc_newtech_request',
    data: {
        number: 'NTR0001008',
        short_description: 'Learning Management System Upgrade',
        x_snc_newtech_priority: '4_low',
        x_snc_newtech_phase: 'one_new_request',
        x_snc_newtech_status: 'nine_four_rejected',
        x_snc_newtech_request_type: 'correcting_capability_existing',
        x_snc_newtech_strategic_driver: 'Grow & Enhance Store Network, Simplification & Standardization',
        x_snc_newtech_estimated_cost_band: 'under_fifty_k',
        x_snc_newtech_target_usage_date: '2026-01-15',
        x_snc_newtech_problem_statement: 'Current LMS has outdated interface and limited functionality',
        x_snc_newtech_impact_if_not_done: 'Continued poor user experience for training programs',
        x_snc_newtech_as_vp_approval: 'yes',
        x_snc_newtech_vp_name: 'Amanda White',
        x_snc_newtech_cic_response: 'no',
        x_snc_newtech_in_current_budget: 'yes',
        x_snc_newtech_target_user_departments: 'Learning & Development, HR',
        x_snc_newtech_estimated_user_count: 'five_to_ten_thousand',
        x_snc_newtech_email: 'sean.adams@7eleven.com',
        x_snc_newtech_cost_center: 8008,
        opened_by: '79e83b238f1b6300a3c953ac37bdeef6', // Sean Adams
        sys_created_on: '2025-08-13 15:30:00'
    }
})