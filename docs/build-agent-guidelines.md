# Build Agent Guidelines

## General Development Standards

### Code Quality Standards
- **Clean Code**: Remove unnecessary comments and annotations from production code
- **No Inline Comments**: Avoid explanatory comments like `/* Reduced from 1.8rem */` or `/* Same height as metric cards */` in CSS and JavaScript
- **Self-Documenting Code**: Write code that is self-explanatory through proper naming and structure
- **Minimal Annotations**: Only include comments when business logic is complex or non-obvious

### CSS Best Practices
- **Professional UI Elements**: Use CSS-based icons, triangles, or Unicode symbols instead of emoji in production interfaces
- **Consistent Spacing**: Maintain consistent padding, margins, and grid gaps throughout components
- **Responsive Design**: Ensure all components work seamlessly across desktop, tablet, and mobile devices
- **Color Variables**: Use CSS custom properties for maintainable color schemes and brand consistency

### React Component Standards
- **Functional Components**: Use React hooks and functional components over class components
- **State Management**: Use useState and useEffect appropriately for component state and side effects
- **Error Handling**: Implement comprehensive try/catch blocks and user-friendly error states
- **Performance**: Optimize re-renders and API calls for better user experience

### ServiceNow Development Standards
- **Fluent API Usage**: Use ServiceNow Fluent DSL for all metadata definitions
- **Naming Conventions**: Consistently prefix custom fields and tables with application scope
- **Data Integrity**: Use proper field types and validation rules
- **API Integration**: Use ServiceNow Table API with proper authentication and error handling

### Visual Design Standards
- **Brand Consistency**: Maintain consistent use of brand colors, fonts, and spacing
- **Professional Layout**: Use grid systems and flexbox for consistent, professional layouts
- **Interactive Elements**: Provide clear visual feedback for all clickable elements
- **Loading States**: Implement professional loading indicators and progress feedback
- **Status Indicators**: Use color-coded badges and indicators for clear visual communication

### Documentation Standards
- **Specification Updates**: Keep specifications.md updated with all implemented features
- **Architecture Documentation**: Document technical decisions and implementation patterns
- **User Experience Documentation**: Document interactive features and user workflows
- **Best Practices**: Maintain guidelines for consistent development approaches

### Font and Typography Guidelines
- **Base Font Size**: Use smaller base font sizes (0.85rem) for dashboard applications to fit more content
- **Responsive Typography**: Scale font sizes appropriately for mobile devices
- **Hierarchy**: Maintain clear visual hierarchy with consistent font size relationships
- **Readability**: Ensure text remains readable at all zoom levels and screen sizes

### Chart and Data Visualization Standards
- **Professional Charts**: Use established charting libraries like Recharts for data visualization
- **Y-axis Configuration**: Set `allowDecimals={false}` for count-based charts to show only whole numbers
- **Color Consistency**: Use brand colors consistently across all charts and visualizations
- **Responsive Charts**: Ensure charts adapt properly to different screen sizes
- **Clean Design**: Remove unnecessary subtitles and labels that don't add value

### Container and Layout Standards
- **Consistent Containers**: Copy existing container styles rather than creating new ones from scratch
- **Grid Layouts**: Use CSS Grid with `grid-template-columns: repeat(n, 1fr)` for equal-width layouts
- **Padding Consistency**: Use consistent padding values (0.5rem, 1rem, 1.5rem) across similar components
- **Hover Effects**: Apply consistent hover effects and transitions across interactive elements

### Styled-Components Standards
- **displayName Property**: Always add `displayName` to styled-components for better debugging and React DevTools visibility
- **Example**: 
  ```jsx
  const MyComponent = styled.div`
    // styles
  `
  MyComponent.displayName = 'MyComponent'
  ```
- **Benefits**: 
  - **Better Debugging**: Components show up with meaningful names in React DevTools instead of generic names
  - **Development Experience**: Easier to identify components during inspection
  - **Component Tracking**: Clearer component hierarchy in debugging tools
  - **Professional Code**: Follows React best practices for component naming
- **Cache Elimination**: styled-components completely eliminates CSS caching issues by injecting styles as JavaScript at runtime
- **Dynamic Styling**: Use props with `$` prefix for conditional styling (e.g., `$variant`, `$active`)
- **Theme Integration**: Always use ThemeProvider and centralized theme for consistent design tokens

---
*Guidelines for ServiceNow Build Agent development - Last updated: 2024-12-19*