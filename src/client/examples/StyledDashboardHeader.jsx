// Example: Dashboard Header converted to styled-components
// Version: 2024122001 - No more CSS caching issues!

import React from 'react'
import { 
  GlobalStyles, 
  DashboardApp as StyledDashboardApp,
  AppHeader,
  HeaderContent, 
  Logo,
  AppTitle,
  ThemeProvider,
  theme 
} from '../styles/StyledComponents.jsx'

// Example of how your header would look with styled-components
const DashboardHeader = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <StyledDashboardApp>
        <AppHeader>
          <HeaderContent>
            <Logo 
              src="https://www.7-eleven.com/assets/img/header/7e-logo-color.svg" 
              alt="7-Eleven Logo"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'block';
              }}
            />
            <div className="seven-eleven-logo-fallback" style={{display: 'none'}}>
              7-ELEVEn
            </div>
            <AppTitle>
              <h1>New Technology Requests Dashboard</h1>
              <p>Real-time insights into your technology request pipeline and governance workflow</p>
            </AppTitle>
          </HeaderContent>
        </AppHeader>
        
        {/* Rest of your dashboard content would go here */}
        
      </StyledDashboardApp>
    </ThemeProvider>
  )
}

export default DashboardHeader