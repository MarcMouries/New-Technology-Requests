import '@servicenow/sdk/global'
import { Table, DateColumn, StringColumn, ChoiceColumn, IntegerColumn } from '@servicenow/sdk/core'

// New Technology Request Table - extends Task
export const x_snc_newtech_request = Table({
    name: 'x_snc_newtech_request',
    label: 'New Technology Request',
    extends: 'task',
    schema: {
        // 1) Intake fields

        // 1. Today's Date - auto-populated, read-only
        x_snc_newtech_todays_date: DateColumn({
            label: "Today's Date",
            default: 'javascript:gs.nowDate()',
            readOnly: true,
        }),

        // 2. Email Address - default to current user's email, editable
        x_snc_newtech_email: StringColumn({
            label: 'Email Address',
            maxLength: 100,
            default: 'javascript:gs.getUser().getEmail()',
        }),

        // 3. Requestor Phone Number
        x_snc_newtech_requester_phone: StringColumn({
            label: 'Requestor Phone Number',
            maxLength: 40,
        }),

        // 4. Requestor Name (if different than submitter)
        x_snc_newtech_requester_name: StringColumn({
            label: 'Requestor Name (if different than submitter)',
            maxLength: 100,
        }),

        // 5. Requestor Department - Reference to department table
        x_snc_newtech_requester_department: ChoiceColumn({
            label: 'Requestor Department',
            mandatory: true,
            referenceTable: 'x_snc_newtech_department',
            choices: {
                corporate_pmo: {
                    label: 'Corporate PMO',
                    sequence: 5,
                },
                real_estate: {
                    label: 'Real Estate',
                    sequence: 21,
                },
                finance: {
                    label: 'Finance',
                    sequence: 9,
                },
                technical_support_center: {
                    label: 'Technical Support Center',
                    sequence: 25,
                },
                learning_development: {
                    label: 'Learning & Development',
                    sequence: 13,
                },
                seven_international: {
                    label: '7International',
                    sequence: 1,
                },
                merchandising_business_systems: {
                    label: 'Merchandising Business Systems',
                    sequence: 17,
                },
                delivery: {
                    label: 'Delivery',
                    sequence: 6,
                },
                restaurant: {
                    label: 'Restaurant',
                    sequence: 22,
                },
                franchising: {
                    label: 'Franchising',
                    sequence: 10,
                },
                treasury: {
                    label: 'Treasury',
                    sequence: 26,
                },
                legal: {
                    label: 'Legal',
                    sequence: 14,
                },
                accounting: {
                    label: 'Accounting',
                    sequence: 2,
                },
                merchandising_infrastructure: {
                    label: 'Merchandising Infrastructure',
                    sequence: 18,
                },
                digital: {
                    label: 'Digital',
                    sequence: 7,
                },
                sourcing: {
                    label: 'Sourcing',
                    sequence: 23,
                },
                fuels: {
                    label: 'Fuels',
                    sequence: 11,
                },
                other: {
                    label: 'Other',
                    sequence: 27,
                },
                marketing: {
                    label: 'Marketing',
                    sequence: 15,
                },
                asset_protection: {
                    label: 'Asset Protection',
                    sequence: 3,
                },
                operations: {
                    label: 'Operations',
                    sequence: 19,
                },
                facilities: {
                    label: 'Facilities',
                    sequence: 8,
                },
                supply_chain_logistics: {
                    label: 'Supply Chain / Logistics',
                    sequence: 24,
                },
                hr: {
                    label: 'HR',
                    sequence: 12,
                },
                it: {
                    label: 'IT',
                    sequence: 0,
                },
                merchandising: {
                    label: 'Merchandising',
                    sequence: 16,
                },
                construction: {
                    label: 'Construction',
                    sequence: 4,
                },
                operations_services: {
                    label: 'Operations Services',
                    sequence: 20,
                },
            },
            dropdown: 'dropdown_without_none',
        }),

        // 5b. If Other (Department) - visible when requester_department = "Other"
        x_snc_newtech_requester_department_other: StringColumn({
            label: 'If Other (Department)',
            maxLength: 100,
        }),

        // 6. Funding Cost Center - 4 digit integer, mandatory
        x_snc_newtech_cost_center: IntegerColumn({
            label: 'Funding Cost Center',
            mandatory: true,
            maxLength: 4,
            // Note: Regex validation for exactly 4 digits would need to be implemented via client script
        }),

        // 7. Priority - Mandatory choice field with numbered system
        x_snc_newtech_priority: ChoiceColumn({
            label: 'Priority',
            mandatory: true,
            dropdown: 'dropdown_without_none',
            choices: {
                '1_fast_track': {
                    label: '1- Fast Track - Urgent and critical, requires CIO & President approval',
                    sequence: 0,
                },
                '2_high': {
                    label: '2- High - Needed within the Years Capital Planning, Requires CIO Approval',
                    sequence: 1,
                },
                '3_medium': {
                    label: '3- Medium - Needed within the next year',
                    sequence: 2,
                },
                '4_low': {
                    label: '4- Low - Needed when funding and capacity allows',
                    sequence: 3,
                },
            },
        }),

        // 8. Target Usage Date - Mandatory
        x_snc_newtech_target_usage_date: DateColumn({
            label: [
                {
                    label: 'Newtech target usage date',
                    language: 'en',
                    help: 'When do you need to be able to use the tool?',
                    plural: 'Newtech target usage dates',
                },
            ],
            mandatory: true,
        }),

        // 9. Type of Request - Mandatory choice field
        x_snc_newtech_request_type: ChoiceColumn({
            label: 'Type of Request',
            mandatory: true,
            dropdown: 'dropdown_without_none',
            choices: {
                new_technology_capability: {
                    label: 'New Technology / Capability',
                    sequence: 0,
                },
                adding_capability_existing: {
                    label: 'Adding a capability to an existing platform',
                    sequence: 1,
                },
                correcting_capability_existing: {
                    label: 'Correcting a capability to an existing platform',
                    sequence: 2,
                },
                change_design_architecture: {
                    label: 'Change in Design/Architecture',
                    sequence: 3,
                },
                build_modify_integration: {
                    label: 'Build / Modify Integration(s) / API(s) between software application systems',
                    sequence: 4,
                },
                on_prem_software: {
                    label: 'On Prem Software',
                    sequence: 5,
                },
                saas: {
                    label: 'Software as a Service (SaaS)',
                    sequence: 6,
                },
                paas: {
                    label: 'Platform as a Service (PaaS)',
                    sequence: 7,
                },
                cloud_hyperscaler: {
                    label: 'Cloud Hyperscaler Services (Azure, AWS, OCI, Google, etc.)',
                    sequence: 8,
                },
                iaas: {
                    label: 'Infrastructure as a Service (IaaS)',
                    sequence: 9,
                },
            },
        }),

        // 10. short_description already exists on Task table - no need to define

        // 11. VP Approval - Mandatory Yes/No
        x_snc_newtech_as_vp_approval: ChoiceColumn({
            label: 'Do you have your VP approval to Submit',
            mandatory: true,
            dropdown: 'dropdown_without_none',
            choices: {
                yes: { label: 'Yes', sequence: 0 },
                no: { label: 'No', sequence: 1 },
            },
        }),

        // 12. VP Name - Mandatory string
        x_snc_newtech_vp_name: StringColumn({
            label: 'Enter Name of VP that Approved',
            mandatory: true,
            maxLength: 100,
        }),

        // 13. Problem Statement - Mandatory large text
        x_snc_newtech_problem_statement: StringColumn({
            label: [
                {
                    label: 'Newtech problem statement',
                    language: 'en',
                    help: 'Provide justification of request, opportunity and impacts.',
                    plural: 'Newtech problem statements',
                },
            ],
            mandatory: true,
            maxLength: 4000,
        }),

        // 14. Impacts of NOT doing - Mandatory large text
        x_snc_newtech_impact_if_not_done: StringColumn({
            label: [
                {
                    label: 'Newtech impact if not done',
                    language: 'en',
                    help: "What will happen if we don't do this, and within what timeframe?",
                    plural: 'Newtech impact if not dones',
                },
            ],
            mandatory: true,
            maxLength: 4000,
        }),

        // 15. Strategic Driver - Multi-choice field (using StringColumn with comma-separated values for now)
        x_snc_newtech_strategic_driver: StringColumn({
            label: 'Strategic Driver (select all)',
            mandatory: true,
            maxLength: 1000,
            // Note: Multi-select functionality would need to be implemented via client script or UI policy
            // Choices: Deliver Consistently Great Customer Experience, Grow Proprietary Products, etc.
        }),

        // 16. CIC Response - Mandatory Yes/No
        x_snc_newtech_cic_response: ChoiceColumn({
            label: 'Is this in response to a Critical Incident Command (CIC) Incident?',
            mandatory: true,
            dropdown: 'dropdown_without_none',
            choices: {
                yes: { label: 'Yes', sequence: 0 },
                no: { label: 'No', sequence: 1 },
            },
        }),

        // 17. CIC Explanation - visible when CIC response = Yes
        x_snc_newtech_cic_explanation: StringColumn({
            label: 'If response to CIC, Please Explain',
            maxLength: 4000,
        }),

        // 18. Target User Departments - Multi-choice (using StringColumn for now)
        x_snc_newtech_target_user_departments: StringColumn({
            label: 'Target User Department(s)',
            mandatory: true,
            maxLength: 1000,
            // Note: Multi-select functionality would need to be implemented via client script
        }),

        // 19. Target User Departments Other - visible when "Other" selected
        x_snc_newtech_target_user_departments_other: StringColumn({
            label: 'If Other (Target Dept)',
            maxLength: 100,
        }),

        // 20. Estimated User Count
        x_snc_newtech_estimated_user_count: ChoiceColumn({
            label: 'Estimated number of users',
            choices: {
                ten_thousand_plus: { label: '10,000+', sequence: 0 },
                five_to_ten_thousand: { label: '5,000–10,000', sequence: 1 },
                one_to_five_thousand: { label: '1,000–4,999', sequence: 2 },
                five_hundred_to_thousand: { label: '500–999', sequence: 3 },
                hundred_to_five_hundred: { label: '100–499', sequence: 4 },
                fifty_to_hundred: { label: '50–99', sequence: 5 },
                twenty_to_fifty: { label: '20–49', sequence: 6 },
                five_to_twenty: { label: '5–19', sequence: 7 },
                one_to_five: { label: '1–4', sequence: 8 },
            },
            dropdown: 'dropdown_with_none',
        }),

        // 21. Included in this year's budget - Mandatory Yes/No
        x_snc_newtech_in_current_budget: ChoiceColumn({
            label: "Included in this year's budget?",
            mandatory: true,
            dropdown: 'dropdown_without_none',
            choices: {
                yes: { label: 'Yes', sequence: 0 },
                no: { label: 'No', sequence: 1 },
            },
        }),

        // 22. Estimated Cost Band - Mandatory, managed via system property
        x_snc_newtech_estimated_cost_band: ChoiceColumn({
            label: 'Estimated Cost',
            mandatory: true,
            dropdown: 'dropdown_without_none',
            choices: {
                under_fifty_k: { label: '<$50K', sequence: 0 },
                fifty_to_two_fifty_k: { label: '$50K–$249K', sequence: 1 },
                two_fifty_k_to_one_m: { label: '$250K–$999K', sequence: 2 },
                one_to_five_m: { label: '$1M–$4.9M', sequence: 3 },
                five_m_plus: { label: '$5M+', sequence: 4 },
                unknown: { label: 'Unknown', sequence: 5 },
            },
        }),

        // 23. Through funding governance - Optional Yes/No
        x_snc_newtech_through_funding_governance: ChoiceColumn({
            label: 'Has this request gone through funding governance?',
            choices: {
                yes: { label: 'Yes', sequence: 0 },
                no: { label: 'No', sequence: 1 },
            },
            dropdown: 'dropdown_with_none',
        }),

        // 24. Data Sensitivity
        x_snc_newtech_data_sensitivity: ChoiceColumn({
            label: 'Data Sensitivity (Classification)',
            choices: {
                high: { label: 'High (Restricted – PII/Financials)', sequence: 0 },
                medium: { label: 'Medium (Private – e.g., NPI, org charts, leases)', sequence: 1 },
                low: { label: 'Low (Public)', sequence: 2 },
                unknown: { label: 'Unknown', sequence: 3 },
            },
            dropdown: 'dropdown_with_none',
        }),

        // 25. Touches Financial Reporting
        x_snc_newtech_touches_financial_reporting: ChoiceColumn({
            label: 'Does the system touch financial reporting?',
            choices: {
                yes: { label: 'Yes', sequence: 0 },
                no: { label: 'No', sequence: 1 },
                unknown: { label: 'Unknown', sequence: 2 },
            },
            dropdown: 'dropdown_with_none',
        }),

        // 26. AI Capabilities
        x_snc_newtech_ai_capabilities: ChoiceColumn({
            label: 'AI Capabilities present?',
            choices: {
                yes: { label: 'Yes', sequence: 0 },
                no: { label: 'No', sequence: 1 },
                unknown: { label: 'Unknown', sequence: 2 },
            },
            dropdown: 'dropdown_with_none',
        }),

        // 27. Technology Type
        x_snc_newtech_technology_type: ChoiceColumn({
            label: 'Technology Type (if known)',
            choices: {
                hardware: { label: 'Hardware', sequence: 0 },
                cots_software: { label: 'Commercial off the shelf (COTS) Software', sequence: 1 },
                custom_built_software: { label: 'Custom Built Software', sequence: 2 },
                on_prem_software: { label: 'On Prem Software', sequence: 3 },
                saas: { label: 'Software as a Service (SaaS)', sequence: 4 },
                paas: { label: 'Platform as a Service (PaaS)', sequence: 5 },
                cloud_hyperscaler: { label: 'Cloud Hyperscaler Services', sequence: 6 },
                iaas: { label: 'Infrastructure as a Service (IaaS)', sequence: 7 },
            },
            dropdown: 'dropdown_with_none',
        }),

        // 28. Proposed Vendor Name(s)
        x_snc_newtech_proposed_vendor: StringColumn({
            label: 'Proposed Vendor Name(s) (if known)',
            maxLength: 255,
        }),

        // 29. Assumptions
        x_snc_newtech_assumptions: StringColumn({
            label: 'Assumptions',
            maxLength: 4000,
        }),

        // 30. Risks, Issues and Impacts
        x_snc_newtech_risks_issues_impacts: StringColumn({
            label: 'Risks, Issues and Impacts',
            maxLength: 4000,
        }),

        // 2) Post‑intake tracking fields (same table but not visible on intake form)

        // 31. Phase - Main workflow phases
        x_snc_newtech_phase: ChoiceColumn({
            label: 'Phase',
            choices: {
                new_request_submitted: { label: '1 - New Request Submitted', sequence: 0 },
                initial_review: { label: '2 - Initial Review', sequence: 1 },
                architecture_review: { label: '3 - Architecture Review', sequence: 2 },
                proposal: { label: '4 - Proposal', sequence: 3 },
                trigger_funding_governance: { label: '5 - Trigger Funding Governance', sequence: 4 },
            },
            dropdown: 'dropdown_with_none',
        }),

        // 32. Status - Detailed sub-status tracking
        x_snc_newtech_status: ChoiceColumn({
            label: 'Status',
            choices: {
                one_one_draft: { label: '1.1 - In Draft', sequence: 0 },
                one_two_submitted: { label: '1.2 - Submitted', sequence: 1 },
                two_one_backlog: { label: '2.1 - Backlog', sequence: 2 },
                two_two_initial_draft: { label: '2.2 - Initial Draft', sequence: 3 },
                two_three_draft_review: { label: '2.3 - Draft Review', sequence: 4 },
                two_four_in_revision: { label: '2.4 - In Revision', sequence: 5 },
                two_five_prep_complete: { label: '2.5 - Prep Complete', sequence: 6 },
                three_one_ar_backlog: { label: '3.1 - AR Backlog', sequence: 7 },
                three_two_ar_scheduled: { label: '3.2 - AR Scheduled', sequence: 8 },
                three_three_ar_conducted: { label: '3.3 - AR Conducted', sequence: 9 },
                four_one_proposal_backlog: { label: '4.1 - Proposal Backlog', sequence: 10 },
                four_two_proposal_draft: { label: '4.2 - Proposal Draft', sequence: 11 },
                four_three_proposal_communicated: { label: '4.3 - Proposal Communicated', sequence: 12 },
                four_four_proposal_accepted: { label: '4.4 - Proposal Accepted', sequence: 13 },
                five_one_fg_backlog: { label: '5.1 - FG Backlog', sequence: 14 },
                five_two_planning_updated: { label: '5.2 - Planning Tool Updated', sequence: 15 },
                five_three_app_rat_updated: { label: '5.3 - App Rat Updated', sequence: 16 },
                five_four_cmdb_updated: { label: '5.4 - CMDB Tool Updated', sequence: 17 },
                five_five_trigger_fg: { label: '5.5 - Trigger to FG', sequence: 18 },
                nine_one_on_hold: { label: '9.1 - On Hold', sequence: 19 },
                nine_two_deferred: { label: '9.2 - Deferred', sequence: 20 },
                nine_three_cancelled: { label: '9.3 - Cancelled', sequence: 21 },
                nine_four_rejected: { label: '9.4 - Rejected', sequence: 22 }
            },
            dropdown: 'dropdown_with_none',
        }),

        // 33. Stakeholder Teams - Reference to department table
        x_snc_newtech_stakeholder_teams: StringColumn({
            label: 'Stakeholder Teams',
            maxLength: 1000,
            // Note: Multi-reference would be ideal but using string for comma-separated department sys_ids
        }),

        // 34. Stakeholder Names - Free text list
        x_snc_newtech_stakeholder_names: StringColumn({
            label: 'Stakeholder Names',
            maxLength: 4000,
        }),

        // 35. Complexity / Level of Effort
        x_snc_newtech_effort_complexity: ChoiceColumn({
            label: 'Complexity / Level of Effort',
            choices: {
                high: { label: 'High – >1 year, 100+ users, custom build', sequence: 0 },
                medium: { label: 'Medium – >6 months <1 year, 20–99 users', sequence: 1 },
                low: { label: 'Low – <6 months, <20 users', sequence: 2 },
            },
            dropdown: 'dropdown_with_none',
        }),

        // 36. IT Resource Capacity
        x_snc_newtech_it_capacity: ChoiceColumn({
            label: 'IT Resource Capacity',
            choices: {
                internal_only: { label: 'Internal Only', sequence: 0 },
                external_only: { label: 'External Only', sequence: 1 },
                both: { label: 'Both Internal and External', sequence: 2 },
            },
            dropdown: 'dropdown_with_none',
        }),

        // 37. Comments
        x_snc_newtech_comments: StringColumn({
            label: 'Comments',
            maxLength: 4000,
        }),

        // 38. Follow Up / Action Items
        x_snc_newtech_followups: StringColumn({
            label: 'Follow Up / Action Items',
            maxLength: 4000,
        }),

        // 39. Closing Comments
        x_snc_newtech_closing_comments: StringColumn({
            label: 'Closing Comments',
            maxLength: 4000,
        }),
    },

    // Table configuration
    audit: true,
    extensible: false,
    actions: ['read', 'update', 'create'],
    accessibleFrom: 'package_private',
    allowClientScripts: true,
    allowNewFields: true,
    allowUiActions: true,
    allowWebServiceAccess: true,
})
