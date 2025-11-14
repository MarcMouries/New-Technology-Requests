# Project Specifications - New Technology Request Intake

## Overview
This document tracks requirements and specifications for the ServiceNow "New Technology Request Intake" application. A single, easy‑to‑use intake and governance hub that guides every new technology idea from request to decision. Speeding approvals while protecting 7‑Eleven's standards, strategy, and risk posture.

**Application Scope:** `x_snc_newtech`
**Main Table:** `x_snc_newtech_request` (extends Task)
**Department Table:** `x_snc_newtech_department` (lookup table)

## Requirements

### Functional Requirements
- [x] **Technology Request Intake Form** - Comprehensive React-based form for submitting new technology requests
- [ ] **Governance Workflow** - Automated workflow to guide requests through approval process
- [ ] **Dashboard & Reporting** - Real-time visibility into request status and metrics
- [ ] **Approval Routing** - Automated routing based on priority, cost, and department
- [ ] **Strategic Alignment** - Integration with strategic drivers and business objectives

### Technical Requirements
- [x] **Table Structure** - Main table `x_snc_newtech_request` extending Task table
- [x] **Department Management** - Separate `x_snc_newtech_department` table for centralized department data
- [x] **Multi-choice Fields** - Support for strategic drivers and target departments
- [x] **Conditional Fields** - Dynamic field visibility based on user selections
- [x] **Data Validation** - Cost center validation, mandatory field enforcement
- [x] **System Properties** - Centralized management of cost bands and choices
- [x] **UI Page Implementation** - React-based intake form with guided sections

### ServiceNow Metadata Requirements
- [x] **Tables**: 
  - `x_snc_newtech_request` (New Technology Request) - extends Task
  - `x_snc_newtech_department` (Department lookup table)
- [x] **UI Pages**: React-based guided intake form
- [x] **Records**: Pre-populated department data (28 departments)
- [x] **Properties**: Cost band configuration system property
- [ ] **Business Rules**: Validation rules, auto-population logic
- [ ] **Roles**: Department-specific roles, approval roles
- [ ] **ACLs**: Field-level security based on roles and phases
- [ ] **Client Scripts**: Additional validation and field interactions

## Complete Field Specifications

### 1) Intake Fields (30 fields - Visible on Form)

1. **todays_date** (Date): label "Today's Date". Default to now() on create; make read-only.
2. **email** (Email): label "Email Address". Default to current user's email; editable.
3. **requester_phone** (Phone): label "Requestor Phone Number".
4. **requester_name** (String 100): label "Requestor Name (if different than submitter)".
5. **requester_department** (Reference): label "Requestor Department". Mandatory = true. References x_snc_newtech_department table.
5b. **requester_department_other** (String 100): label "If Other (Department)". Visible when requester_department = "Other".
6. **cost_center** (Integer): label "Funding Cost Center". Length 4; add regex validation for exactly 4 digits. Mandatory = true.
7. **priority** (Choice): label "Priority". Mandatory = true. Choices:
   - Fast Track – Urgent and critical (requires CIO & President approval)
   - High – Needed within the Year's Capital Planning (requires CIO approval)
   - Medium – Needed within the next year
   - Low – Needed when funding and capacity allows
8. **target_usage_date** (Date): label "Target Usage Date". Mandatory = true. Help: "When do you need to be able to use the tool?"
9. **request_type** (Choice): label "Type of Request". Mandatory = true. Choices:
   - New Technology / Capability
   - Adding a capability to an existing platform
   - Correcting a capability to an existing platform
   - Change in Design/Architecture
   - Build / Modify Integration(s) / API(s) between software application systems
   - On Prem Software
   - Software as a Service (SaaS)
   - Platform as a Service (PaaS)
   - Cloud Hyperscaler Services (Azure, AWS, OCI, Google, etc.)
   - Infrastructure as a Service (IaaS)
10. **short_description** (already exists on the Task table)
11. **as_VP_approval** (Choice Yes/No): label "Do you have your VP approval to Submit". Mandatory = true.
12. **VP_name** (String): label "Enter Name of VP that Approved". Mandatory = true.
13. **problem_statement** (String 4000): label "Problem Statement". Mandatory = true. Help: "Provide justification of request, opportunity and impacts."
14. **impact_if_not_done** (String 4000): label "Impacts of NOT doing". Mandatory = true. Help: "What will happen if we don't do this, and within what timeframe?"
15. **strategic_driver** (Multi-Choice): label "Strategic Driver (select all)". Mandatory = true. Choices:
    - Deliver Consistently Great Customer Experience
    - Grow Proprietary Products
    - Accelerate Digital & Delivery
    - Generate Synergies from SEI & SPW Integration
    - Grow & Enhance Store Network
    - Optimize Fuel Business & Grow Alternatives
    - Simplification & Standardization
    - Cost Leadership
    - Technology & Data Modernization
    - Compliance/Regulatory/End of Support
    - InfoSec/Risk/Vulnerability Reduction
16. **cic_response** (Choice Yes/No): label "Is this in response to a Critical Incident Command (CIC) Incident?". Mandatory = true.
17. **cic_explanation** (String 4000): label "If response to CIC, Please Explain". Visible when cic_response = Yes.
18. **target_user_departments** (Multi-Choice): label "Target User Department(s)". Mandatory = true. Same choices as requester_department. Include "Other".
19. **target_user_departments_other** (String 100): label "If Other (Target Dept)". Visible when "Other" is selected.
20. **estimated_user_count** (Choice): label "Estimated number of users". Choices:
    - 10,000+
    - 5,000–10,000
    - 1,000–4,999
    - 500–999
    - 100–499
    - 50–99
    - 20–49
    - 5–19
    - 1–4
21. **in_current_budget** (Choice Yes/No): label "Included in this year's budget?". Mandatory = true.
22. **estimated_cost_band** (Choice): label "Estimated Cost". Mandatory = true. Choices:
    - <$50K
    - $50K–$249K
    - $250K–$999K
    - $1M–$4.9M
    - $5M+
    - Unknown
23. **through_funding_governance** (Choice Yes/No): label "Has this request gone through funding governance?". Mandatory = false.
24. **data_sensitivity** (Choice): label "Data Sensitivity (Classification)". Choices:
    - High (Restricted – PII/Financials)
    - Medium (Private – e.g., NPI, org charts, leases)
    - Low (Public)
    - Unknown
25. **touches_financial_reporting** (Choice): label "Does the system touch financial reporting?". Choices: Yes | No | Unknown
26. **ai_capabilities** (Choice): label "AI Capabilities present?". Choices: Yes | No | Unknown
27. **technology_type** (Choice): label "Technology Type (if known)". Choices:
    - Hardware
    - Commercial off the shelf (COTS) Software
    - Custom Built Software
    - On Prem Software
    - Software as a Service (SaaS)
    - Platform as a Service (PaaS)
    - Cloud Hyperscaler Services
    - Infrastructure as a Service (IaaS)
28. **proposed_vendor** (String 255): label "Proposed Vendor Name(s) (if known)".
29. **assumptions** (String 4000): label "Assumptions".
30. **risks_issues_impacts** (String 4000): label "Risks, Issues and Impacts".

### 2) Post‑intake Tracking Fields (9 fields - Same table but not visible on intake form)

31. **phase** (Choice): label "Phase". Choices:
    - 1 - New Request Submitted
    - 2 - Initial Review
    - 3 - Architecture Review
    - 4 - Proposal
    - 5 - Trigger Funding Governance
32. **status** (Choice): label "Status". Choices:
    - 1.1 - In Draft
    - 1.2 - Submitted
    - 2.1 - Backlog
    - 2.2 - Initial Draft
    - 2.3 - Draft Review
    - 2.4 - In Revision
    - 2.5 - Prep Complete
    - 3.1 - AR Backlog
    - 3.2 - AR Scheduled
    - 3.3 - AR Conducted
    - 4.1 - Proposal Backlog
    - 4.2 - Proposal Draft
    - 4.3 - Proposal Communicated
    - 4.4 - Proposal Accepted
    - 5.1 - FG Backlog
    - 5.2 - Planning Tool Updated
    - 5.3 - App Rat Updated
    - 5.4 - CMDB Tool Updated
    - 5.5 - Trigger to FG
    - 9.1 - On Hold
    - 9.2 - Deferred
    - 9.3 - Cancelled
    - 9.4 - Rejected
33. **stakeholder_teams** (Multi-Choice): label "Stakeholder Teams". Same department list as requester_department.
34. **stakeholder_names** (String 4000): label "Stakeholder Names". Free text list.
35. **effort_complexity** (Choice): label "Complexity / Level of Effort". Choices:
    - High – >1 year, 100+ users, custom build
    - Medium – >6 months <1 year, 20–99 users
    - Low – <6 months, <20 users
36. **it_capacity** (Choice): label "IT Resource Capacity". Choices:
    - Internal Only
    - External Only
    - Both Internal and External
37. **comments** (String 4000): label "Comments"
38. **followups** (String 4000): label "Follow Up / Action Items"
39. **closing_comments** (String 4000): label "Closing Comments"

## Department Lookup Table

### x_snc_newtech_department Fields:
- **x_snc_newtech_name** (String): Department display name
- **x_snc_newtech_code** (String): Department code for reference
- **x_snc_newtech_active** (Boolean): Active status for visibility control
- **x_snc_newtech_sequence** (Integer): Display order

### Pre-loaded Departments (28 total):
IT, 7International, Accounting, Asset Protection, Construction, Corporate PMO, Delivery, Digital, Facilities, Finance, Franchising, Fuels, HR, Learning & Development, Legal, Marketing, Merchandising, Merchandising Business Systems, Merchandising Infrastructure, Operations, Operations Services, Real Estate, Restaurant, Sourcing, Supply Chain / Logistics, Technical Support Center, Treasury, Other

## Form Implementation

### Guided Sections:
1. **Requestor Information** - Contact details, department, cost center
2. **Request Details** - Priority, type, target date, description
3. **Approval & Justification** - VP approval, business case, strategic alignment
4. **Target Users & Impact** - User departments, user count estimates
5. **Budget & Funding** - Cost estimates, budget status
6. **Technical Details** - Data sensitivity, technology type, vendors, risks

### Key Features Implemented:
- **Dynamic department loading** from x_snc_newtech_department table
- **Conditional field visibility** (Other department fields, CIC explanation)
- **Multi-select capabilities** for strategic drivers and target departments
- **Real-time validation** with user-friendly error messages
- **Auto-population** of user email and today's date
- **Responsive design** for mobile and desktop usage

## User Stories
1. **As a business user**, I want to easily submit technology requests with clear guidance so that I can get the tools I need efficiently
2. **As a department VP**, I want to review and approve requests from my team so that I can ensure alignment with department goals
3. **As an IT architect**, I want to review technical feasibility so that I can provide accurate effort estimates and identify risks
4. **As a governance team member**, I want to track all requests through the process so that I can ensure compliance and strategic alignment
5. **As a CIO**, I want visibility into all technology requests so that I can make informed strategic decisions
6. **As an administrator**, I want to easily manage department lists without code changes so that I can maintain accurate organizational data

## Acceptance Criteria

### Technology Request Submission
- **Given** a user wants to submit a new technology request
- **When** they fill out the intake form
- **Then** all mandatory fields must be completed with proper validation
- **And** the system should auto-populate user information where possible
- **And** conditional fields should appear based on selections
- **And** departments should load dynamically from the lookup table

### Department Management
- **Given** an administrator wants to update departments
- **When** they modify the x_snc_newtech_department table
- **Then** changes should be immediately reflected in the intake form
- **And** inactive departments should not appear in dropdowns
- **And** department order should follow the sequence field

### Approval Workflow
- **Given** a request is submitted with proper VP approval
- **When** the request enters the governance process
- **Then** it should be automatically routed based on priority and cost
- **And** stakeholders should be notified at each phase
- **And** status should be updated in real-time

## Technical Architecture

### Current Implementation:
- **ServiceNow Fluent DSL** for metadata definition
- **React 18.2.0** for UI components
- **ServiceNow Table API** for CRUD operations
- **Reference fields** for data integrity
- **System properties** for configuration management

### Access Points:
- **Intake Form**: https://marco.service-now.com/x_snc_newtech_intake.do
- **Request Records**: https://marco.service-now.com/x_snc_newtech_request_list.do
- **Department Management**: https://marco.service-now.com/x_snc_newtech_department_list.do

## Dependencies and Constraints
- Extends Task table for workflow capabilities
- Integration with existing user directory for auto-population
- Compliance with 7-Eleven security and data policies
- Support for various approval hierarchies
- Department data managed through ServiceNow interface

## Future Enhancements
- [ ] **Business Rules**: Auto-routing based on priority and cost
- [ ] **Workflow Engine**: Automated approval processes
- [ ] **Notifications**: Email alerts for status changes
- [ ] **Dashboard**: Executive reporting and analytics
- [ ] **Integration**: Connection to funding governance systems
- [ ] **Mobile App**: Native mobile interface for approvers

## BEST PRACTICES

### CSS and Styling Standards
- **Reusable Stylesheets:** Create shared CSS files that can be used across multiple UI Pages instead of duplicating styles in each component
- **7-Eleven Brand Consistency:** Maintain consistent use of official brand colors across all components:
  - Spanish Viridian: `#007A53` (Primary green)
  - Maximum Red: `#DA291C` (Primary red) 
  - Orange-Red: `#FF6720` (Primary orange)
  - White: `#FFFFFF` (Primary white)
- **Component-Based Styling:** Use CSS custom properties (variables) for maintainable color schemes
- **Responsive Design:** Ensure all UI components work across desktop, tablet, and mobile devices
- **Accessibility:** Follow WCAG guidelines for color contrast and keyboard navigation

### ServiceNow Development Standards
- **Fluent API Usage:** Use ServiceNow Fluent DSL for all metadata definitions
- **Naming Conventions:** Consistently prefix custom fields and tables with application scope
- **Data Integrity:** Use reference fields instead of hardcoded choice values where possible
- **Error Handling:** Implement proper error handling in client scripts and UI Pages
- **Performance:** Optimize API calls and limit query results for dashboard performance
- **Reusable Components:** Create shared CSS and JavaScript libraries that can be referenced by multiple UI Pages

### Code Organization
- **File Structure:** Organize code into logical directories (fluent/, client/, server/)
- **Separation of Concerns:** Keep business logic, presentation, and data access layers separate
- **Documentation:** Maintain up-to-date specifications and inline code comments
- **Version Control:** Use consistent commit messages and branching strategies
- **Shared Resources:** Place common CSS, JavaScript, and utility files in reusable locations

## Future Enhancements
- [ ] **Business Rules**: Auto-routing based on priority and cost
- [ ] **Workflow Engine**: Automated approval processes
- [ ] **Notifications**: Email alerts for status changes
- [ ] **Dashboard**: Executive reporting and analytics
- [ ] **Integration**: Connection to funding governance systems
- [ ] **Mobile App**: Native mobile interface for approvers

## Change Log
| Date | Change | Author |
|------|--------|--------|
| 2024-12-19 | Initial specifications document created | System |
| 2024-12-19 | Updated scope to x_snc_newtech | System |
| 2024-12-19 | Added complete field specifications (39 fields) | System |
| 2024-12-19 | Added department lookup table implementation | System |
| 2024-12-19 | Added React UI Page implementation details | System |
| 2024-12-19 | Updated with current architecture and access points | System |

---
*Last updated: 2024-12-19*