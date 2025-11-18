# Styled Components Reference Guide
## Dashboard Component Mapping & Update Instructions

### 🎯 **How to Reference Components for Updates**

When requesting style changes, use this reference to identify the exact component:

---

## **📊 MAIN LAYOUT COMPONENTS**

### **Page Structure:**
- **`DashboardApp`** - Main page wrapper (full height, background gradient)
- **`MainContainer`** - Content wrapper (padding, centering)

### **Header:**
- **`AppHeader`** - Green header bar with logo and title
- **`HeaderContent`** - Header content wrapper (flex layout)
- **`Logo`** - 7-Eleven logo image
- **`AppTitle`** - Title and subtitle text container

---

## **📈 METRICS SECTION**

### **Metrics Container:**
- **`MetricsContainer`** - Wrapper for all metric cards (no background/border)
- **`MetricsGrid`** - 4-column grid layout for metric cards

### **Individual Metric Cards:**
- **`MetricCard`** - Individual metric card (white background, shadow, clickable)
  - **Props:** `$variant` ("fast-track", "on-hold", "rejected"), `$active` (true/false)
- **`MetricIcon`** - Emoji icon (📋, ⏸️, ❌, 🚀)
- **`MetricValue`** - Large number display (2rem font, bold)
- **`MetricLabel`** - Small text label below number

---

## **📊 CHARTS SECTION**

### **Chart Container:**
- **`ChartContainer`** - Wrapper for both charts (minimal styling, no background)
- **`ChartsGrid`** - 2-column grid layout for chart cards

### **Individual Chart Cards:**
- **`ChartCard`** - Individual chart card (white background, border, hover effects)
- **`ChartHeader`** - Chart title area (green bottom border, gradient background)
- **`ChartTitle`** - Chart title text with emoji icon
- **`ChartContent`** - Chart content area (contains Recharts components)

### **Chart Loading States:**
- **`LoadingChart`** - Loading spinner and text
- **`EmptyChart`** - Empty state message
- **`SpinnerSmall`** - Small loading spinner

---

## **🗂️ TABLE SECTION**

### **Table Container:**
- **`TableContainer`** - Main table wrapper (white background, shadow, border)
- **`TableHeader`** - Table title area (green bottom border, gradient background)
- **`TableTitle`** - Table title with clear filter button
- **`ClearFilterBtn`** - Orange "Clear Filter" button

### **Table Structure:**
- **`TableWrapper`** - Scrollable wrapper for responsive table
- **`RequestsTable`** - Main table element
- **`TableTh`** - Table header cells (sortable, hover effects)
- **`SortIndicator`** - Triangle sort indicators
- **`TableTd`** - Table data cells
- **`TableRow`** - Table rows (hover effects, clickable)

### **Table Content:**
- **`RequestNumber`** - Request number (green, monospace font)
- **`StatusBadge`** - Colored badges for priority/phase/status
  - **Props:** `$variant` (priority-fast-track, phase-new, status-submitted, etc.)

---

## **🔧 UTILITY COMPONENTS**

### **Loading States:**
- **`Loading`** - Full loading screen
- **`Spinner`** - Large loading spinner
- **`EmptyState`** - No data message
- **`ErrorContainer`** - Error message container
- **`RetryButton`** - Retry action button

### **Footer:**
- **`DashboardFooter`** - Footer wrapper
- **`FooterText`** - Footer text styling

---

## **💬 HOW TO REQUEST UPDATES**

### **✅ Good Update Requests:**

**Example 1:** "Update the `MetricCard` component to have rounded corners instead of sharp corners"

**Example 2:** "Change the `TableContainer` background to light gray instead of white"

**Example 3:** "Make the `ChartCard` components have no shadow"

**Example 4:** "Update the `StatusBadge` with variant `priority-fast-track` to use white text instead of red text"

### **❌ Vague Requests to Avoid:**

~~"Make the table look different"~~ ❌
~~"Change the card colors"~~ ❌
~~"Update the layout"~~ ❌

### **🎯 Specific Component Targeting:**

**For the table that contains the records:**
- **Container:** `TableContainer`
- **Table:** `RequestsTable` 
- **Rows:** `TableRow`
- **Cells:** `TableTd`
- **Headers:** `TableTh`

**For metric cards:**
- **Container:** `MetricsContainer`
- **Individual cards:** `MetricCard`
- **Numbers:** `MetricValue`
- **Labels:** `MetricLabel`

**For charts:**
- **Container:** `ChartContainer`  ← This is what you're asking about!
- **Individual charts:** `ChartCard`
- **Titles:** `ChartTitle`

---

## **🔍 FINDING COMPONENTS**

All styled components are defined in:
**`src/client/styles/StyledComponents.jsx`**

Use Ctrl+F to find any component name in that file.

---

## **📝 COMPONENT PROPS REFERENCE**

### **Dynamic Styling Props:**

- **`$variant`** - Changes color/style based on type:
  - MetricCard: "fast-track", "on-hold", "rejected" 
  - StatusBadge: "priority-fast-track", "phase-new", "status-submitted", etc.

- **`$active`** - Boolean for active/selected state:
  - MetricCard: `$active={true}` changes to selected styling
  - MetricValue: `$active={true}` changes text color to white

### **Usage Examples:**
```jsx
<MetricCard $variant="fast-track" $active={isActive}>
<StatusBadge $variant="priority-high">High</StatusBadge>
<MetricValue $variant="on-hold" $active={false}>5</MetricValue>
```