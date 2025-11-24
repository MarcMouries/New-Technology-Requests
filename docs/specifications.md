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
- [x] **Dashboard & Reporting** - Real-time dashboard with interactive metrics cards, professional Recharts visualization (bar chart for request types, funnel chart for phases), sortable table with 7 columns including Status, and clickable filtering system
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
  - `x_snc_newtech_priority` (Priority lookup table with short/long descriptions)
- [x] **UI Pages**: React-based guided intake form and interactive dashboard
- [x] **Records**: Pre-populated department data (28 departments)
- [x] **Properties**: Cost band configuration system property
- [x] **Dashboard**: Real-time metrics, sortable table, responsive design
- [ ] **Business Rules**: Validation rules, auto-population logic
- [ ] **Roles**: Department-specific roles, approval roles
- [ ] **ACLs**: Field-level security based on roles and phases
- [ ] **Client Scripts**: Additional validation and field interactions

## Dashboard Specifications

### Dashboard Overview
The New Technology Requests Dashboard provides real-time insights into the technology request pipeline and governance workflow. Built with React and styled to match the intake form exactly.

### Dashboard Features
- [x] **Interactive Metrics Cards**: 4 key performance indicators with click-to-filter functionality
- [x] **Professional Charts**: 2 Recharts visualizations (Request Type bar chart, Phase funnel chart)
- [x] **Sortable Data Table**: 7-column table with professional CSS triangle sort indicators  
- [x] **Interactive Filtering**: Click metric cards to filter table data by specific criteria
- [x] **Responsive Design**: Works on desktop, tablet, and mobile devices
- [x] **Professional Styling**: Matches intake form branding exactly with consistent layout

### Metrics Cards
1. **📋 New Requests (Submitted)** - Counts records with status "1.2 - Submitted"
2. **⏸️ Requests On Hold** - Counts records with status "9.1 - On Hold"  
3. **❌ Requests Rejected** - Counts records with status "9.4 - Rejected"
4. **🚀 Requests Fast Track** - Counts records with priority "1- Fast Track"

### Professional Charts
Built using Recharts library for enterprise-grade data visualization:

#### **Chart 1: Requests by Type (Bar Chart)**
- **Interactive Bar Chart** showing distribution of request types (New Technology, SaaS, etc.)
- **Color-coded bars** with different colors for each request type using brand color palette
- **Professional tooltips** with hover information showing exact counts
- **Y-axis optimization** showing only whole numbers (no decimals)
- **Angled labels** on X-axis for better readability of long type names
- **Grid lines** for professional appearance

#### **Chart 2: Requests by Phase (Funnel Chart)**  
- **Workflow Funnel Chart** showing progression through governance phases
- **Sequential visualization** from "1 - New Request" → "5 - Trigger Funding"
- **Color-coded sections** matching phase badge colors for consistency
- **Visual workflow representation** where wider sections indicate more requests
- **Interactive tooltips** showing request counts per phase
- **Brand color mapping** for each phase level

### Chart Layout
- **Same container styling** as metrics container for visual consistency
- **2-column grid** with each chart taking 50% width
- **Same height as metric cards** (280px) for perfect alignment
- **Professional spacing** and hover effects matching metric cards

### Interactive Table Features
- **7 Sortable Columns**: Number, Priority, Short Description, Opened By, Phase, Status, Created Date
- **Professional Sort Indicators**: CSS triangle indicators with hover effects (no emoji)
- **Clickable Rows**: Click any row to open the full request record in new tab
- **Color-coded Status Badges**: Phase and Status fields use branded color coding with proper contrast
- **Interactive Filtering**: Metric cards filter table data when clicked
- **Clear Filter Functionality**: Orange "Clear Filter" button appears when filters are active
- **Filter Description**: Dynamic filter description appears right after the table title showing current filter state (e.g., "All", "Submitted only", "Fast Track priority only")
- **Left-aligned Title**: Table title is positioned left-aligned for professional appearance
- **Responsive Layout**: Horizontal scrolling on mobile devices with 700px minimum width

### Data Sources
- **Primary Table**: `x_snc_newtech_request`
- **API Endpoint**: `/api/now/table/x_snc_newtech_request`
- **Real-time Updates**: Data refreshes on page load
- **Display Values**: Uses `sysparm_display_value=all` for proper field resolution

### User Experience
- **Loading States**: Spinner animation during data fetch
- **Error Handling**: User-friendly error messages with retry functionality
- **Empty States**: Helpful message when no records exist
- **Mobile Responsive**: 90% max-width with adaptive grid layout

## Complete Field Specifications

### 1) Intake Fields (30 fields - Visible on Form)

1. **todays_date** (Date): label "Today's Date". Default to now() on create; make read-only.
2. **email** (Email): label "Email Address". Default to current user's email; editable.
3. **requester_phone** (Phone): label "Requestor Phone Number".
4. **requester_name** (String 100): label "Requestor Name (if different than submitter)".
5. **requester_department** (Reference): label "Requestor Department". Mandatory = true. References x_snc_newtech_department table.
5b. **requester_department_other** (String 100): label "If Other (Department)". Visible when requester_department = "Other".
6. **cost_center** (Integer): label "Funding Cost Center". Length 4; add regex validation for exactly 4 digits. Mandatory = true.
7. **priority** (Reference): label "Priority". Mandatory = true. References x_snc_newtech_priority table:
   - Intake form displays: Long descriptions (e.g., "1- Fast Track - Urgent and critical, requires CIO & President approval")
   - Lists/Tables display: Short descriptions (e.g., "1- Fast Track")
   - Values: 1_fast_track, 2_high, 3_medium, 4_low
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

## Priority Lookup Table

### x_snc_newtech_priority Fields:
- **x_snc_newtech_value** (String): Internal value/key (e.g., "1_fast_track")
- **x_snc_newtech_short_description** (String): Short display name for lists/tables (e.g., "1- Fast Track")
- **x_snc_newtech_long_description** (String): Full description for intake form (e.g., "1- Fast Track - Urgent and critical, requires CIO & President approval")
- **x_snc_newtech_sequence** (Integer): Display order
- **x_snc_newtech_active** (Boolean): Active status for visibility control

### Pre-loaded Priority Levels (4 total):
1. **Fast Track** - Urgent and critical, requires CIO & President approval
2. **High** - Needed within the Years Capital Planning, Requires CIO Approval  
3. **Medium** - Needed within the next year
4. **Low** - Needed when funding and capacity allows

### Priority Display Logic:
- **Intake Form**: Uses `x_snc_newtech_long_description` to help users understand approval requirements
- **Lists/Tables**: Uses `x_snc_newtech_short_description` (table display field) for clean, scannable display
- **Dashboard Metrics**: Counts records by priority level using reference field values

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
- [x] **Dashboard**: Executive reporting and analytics
- [ ] **Integration**: Connection to funding governance systems
- [ ] **Mobile App**: Native mobile interface for approvers

## Dashboard Specifications

### Overview
The New Technology Requests Dashboard provides real-time visibility and analytics for all technology requests submitted through the intake form. It serves as the primary governance and monitoring interface for request administrators, department heads, and executives.

### Dashboard Requirements

#### Visual Design Requirements
- **Consistent Branding**: Maintain exact same styling as intake form for brand consistency
- **Header Layout**: Identical header with 7-Eleven logo, app title, and description
- **Color Scheme**: Use official 7-Eleven brand colors (Spanish Viridian #007A53, Maximum Red #DA291C, Orange-Red #FF6720)
- **Responsive Design**: Support for desktop, tablet, and mobile viewing
- **Professional Layout**: Clean, modern interface with proper spacing and typography

#### Functional Requirements

##### 1. Metrics Cards (Summary Statistics)
Display key performance indicators in a 4-card grid layout:

1. **New Requests (Submitted)** 
   - Count: Records with status = "1.2 - Submitted" 
   - Icon: 📋
   - Color: Default green theme

2. **Requests On Hold**
   - Count: Records with status = "9.1 - On Hold"
   - Icon: ⏸️  
   - Color: Orange theme

3. **Requests Rejected**
   - Count: Records with status = "9.4 - Rejected"
   - Icon: ❌
   - Color: Dark gray theme

4. **Requests Fast Track**
   - Count: Records with priority = "Fast Track – Urgent and critical"
   - Icon: 🚀
   - Color: Red theme (high priority)

##### 2. Request Data Table
Display comprehensive list of all technology requests with the following columns:

1. **Number** - Request number (clickable to open full record)
2. **Priority** - Color-coded priority badges (Fast Track, High, Medium, Low)
3. **Short Description** - Brief description of the request
4. **Opened By** - Name of person who submitted the request
5. **Phase** - Current phase with color-coded badges (New Request, Initial Review, Architecture Review, Proposal, Funding)
6. **Created Date** - Formatted relative date when request was submitted (business days only, excluding weekends)

##### Interactive Features
- **Clickable Rows**: Click any table row to open the full request record in a new tab
- **Real-time Data**: Dashboard loads current data from x_snc_newtech_request table
- **Loading States**: Professional loading indicators while data is fetched
- **Error Handling**: Graceful error messages if data cannot be loaded
- **Responsive Table**: Table adjusts for mobile viewing
- **Business Days Calculation**: Created date column displays relative time using business days only (Monday-Friday), excluding weekends for more accurate business context

#### Technical Requirements

##### Data Source
- **Primary Table**: x_snc_newtech_request (New Technology Request table)
- **API Endpoint**: ServiceNow Table API with display values
- **Query Parameters**: Order by sys_created_on DESC, limit 100 records
- **Authentication**: Use ServiceNow session authentication

##### Date Formatting Algorithm
- **Business Days Only**: Calculate relative dates excluding weekends (Saturday & Sunday)
- **Time Ranges**: 
  - Less than 1 business day: Show hours (e.g., "2h ago") or minutes (e.g., "30m ago")
  - 1-6 business days: Show days (e.g., "3d ago")  
  - 1-4 business weeks: Show weeks (e.g., "2w ago")
  - 1-11 business months: Show months (e.g., "3mo ago")
  - 12+ business months: Show years (e.g., "1y ago")
- **Business Day Conversion**: 5 business days = 1 week, 22 business days = 1 month, 260 business days = 1 year
- **Algorithm**: Iterates through each day from creation date to current date, counting only Monday through Friday

##### Performance Requirements
- **Load Time**: Dashboard should load within 3 seconds
- **Data Refresh**: Real-time data loading on page refresh
- **Browser Support**: Support for modern browsers (Chrome, Firefox, Safari, Edge)
- **Mobile Optimization**: Responsive design for mobile devices

##### Security Requirements
- **Access Control**: Dashboard should respect ServiceNow ACLs for the table
- **Session Management**: Use proper ServiceNow session tokens
- **HTTPS Only**: All API calls must use secure connections
- **Data Validation**: Validate all data before display

#### User Experience Requirements

##### Navigation
- **Header Navigation**: Consistent header with same branding as intake form
- **Footer Attribution**: "Powered by ServiceNow Build Agent – built by Marc.Mouries@ServiceNow.com"
- **Breadcrumbs**: Clear indication of current page location

##### Accessibility
- **Color Contrast**: Meet WCAG 2.1 AA standards for color contrast
- **Keyboard Navigation**: Support for keyboard-only users
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **Alternative Text**: Alt text for all images and icons

##### Error States
- **No Data**: Professional message when no requests exist
- **Loading Errors**: Clear error messages with retry options
- **Network Issues**: Graceful handling of connection problems

#### Content Requirements

##### Header Section
- **Logo**: 7-Eleven official logo with fallback text
- **Title**: "New Technology Requests Dashboard"
- **Subtitle**: "Real-time insights into your technology request pipeline and governance workflow"

##### Metrics Section
- **Section Title**: Key metrics displayed prominently
- **Card Layout**: 4 cards in a single row with consistent spacing
- **Icons**: Relevant emoji icons for each metric type
- **Number Display**: Large, bold numbers with appropriate color coding

##### Table Section
- **Section Title**: "New Technology Requests" (left-aligned, professional appearance)
- **Filter Description**: Dynamic contextual description positioned right after title in parentheses showing current filter state:
  - "(All)" when no filter is applied
  - "(Submitted only)" when filtered by submitted requests
  - "(On Hold only)" when filtered by on-hold requests
  - "(Rejected only)" when filtered by rejected requests
  - "(Fast Track priority only)" when filtered by fast track requests
- **Table Headers**: Clear, descriptive column headers with professional sort indicators
- **Data Formatting**: Consistent date formats using business days only (excludes weekends), proper text truncation
- **Date Calculation**: Relative dates (e.g., "6d ago") calculated using business days only, excluding Saturday and Sunday

#### Implementation Standards

##### CSS Framework
- **Shared Stylesheets**: Reuse CSS variables and classes from intake form
- **CSS Custom Properties**: Use CSS variables for colors and spacing
- **Grid Layout**: Use CSS Grid for responsive card layout
- **Flexbox**: Use Flexbox for internal component alignment

##### JavaScript Requirements
- **Modern ES6+**: Use modern JavaScript features
- **Async/Await**: For API calls and data handling
- **Error Handling**: Try/catch blocks for all async operations
- **Console Logging**: Detailed logging for debugging

##### API Integration
- **Fetch API**: Use native Fetch API for HTTP requests
- **JSON Processing**: Proper JSON parsing and validation
- **Display Values**: Request display values from ServiceNow API
- **Query Optimization**: Efficient queries with proper limits

### Success Criteria

#### Functional Success
- ✅ Dashboard loads within 3 seconds
- ✅ All 4 metrics cards display accurate counts
- ✅ Data table shows all requests with proper formatting
- ✅ Clicking table rows opens request records
- ✅ Dashboard styling matches intake form exactly

#### Technical Success
- ✅ No JavaScript errors in browser console
- ✅ Responsive design works on all device sizes
- ✅ API calls return data successfully
- ✅ Proper error handling for all edge cases
- ✅ Code follows ServiceNow development standards

#### User Experience Success
- ✅ Interface is intuitive and easy to navigate
- ✅ Loading states provide clear feedback
- ✅ Error messages are helpful and actionable
- ✅ Visual hierarchy guides user attention
- ✅ Brand consistency maintained throughout

## Future Enhancements

## BEST PRACTICES

### New Technology Request App Specific Standards
- **7-Eleven Brand Consistency:** Maintain consistent use of official brand colors across all components:
  - Spanish Viridian: `#007A53` (Primary green)
  - Maximum Red: `#DA291C` (Primary red) 
  - Orange-Red: `#FF6720` (Primary orange)
  - White: `#FFFFFF` (Primary white)
- **Application Scope Naming:** Consistently prefix all custom fields and tables with `x_snc_newtech_`
- **Department Reference Integration:** Use the `x_snc_newtech_department` lookup table for all department fields
- **Priority System:** Implement numbered priority system (1-4) with context-appropriate descriptions
- **Multi-choice Field Handling:** Use comma-separated values for strategic drivers and target departments
- **Status Badge Design:** Color-code priority, phase, and status badges using brand colors with proper contrast

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
| 2024-12-19 | Simplified phase values to only 5 main workflow phases | System |
| 2024-12-19 | Updated dashboard table title to left-aligned and added filter description functionality | System |

---
*Last updated: 2024-12-19*