// Complete Dashboard Styled Components - No More CSS Caching Issues!
// Version: 2024122001

import styled, { createGlobalStyle, css } from 'styled-components'
import { theme, mediaQuery } from './theme.js'

// Global Styles
export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: ${props => props.theme.typography.fontFamily};
    background: linear-gradient(135deg, ${props => props.theme.colors.gray.light} 0%, ${props => props.theme.colors.primary.white} 100%);
    margin: 0;
    padding: 0;
    color: ${props => props.theme.colors.gray.dark};
    line-height: ${props => props.theme.typography.lineHeight.normal};
    font-size: 16px;
  }
`

// Main App Container
export const DashboardApp = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${props => props.theme.colors.gray.light} 0%, ${props => props.theme.colors.primary.white} 100%);
`
DashboardApp.displayName = 'DashboardApp'

// Header Components
export const AppHeader = styled.header`
  background: ${props => props.theme.colors.primary.viridian};
  color: ${props => props.theme.colors.primary.white};
  padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.default};
  position: sticky;
  top: 0;
  z-index: ${props => props.theme.zIndex.header};

  ${mediaQuery('mobile')} {
    padding: ${props => props.theme.spacing.md};
  }
`

export const HeaderContent = styled.div`
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};

  ${mediaQuery('mobile')} {
    flex-direction: column;
    text-align: center;
    gap: ${props => props.theme.spacing.sm};
  }
`

export const Logo = styled.img`
  height: 2.5rem;
  width: auto;
  background: ${props => props.theme.colors.primary.white};
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.medium};
  border: 2px solid ${props => props.theme.colors.primary.white};
  box-shadow: ${props => props.theme.shadows.card};

  ${mediaQuery('mobile')} {
    font-size: ${props => props.theme.typography.fontSize['5xl']};
  }
`

export const LogoFallback = styled.div`
  font-size: ${props => props.theme.typography.fontSize['7xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  background: ${props => props.theme.colors.primary.white};
  color: ${props => props.theme.colors.primary.red};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.medium};
  border: 2px solid ${props => props.theme.colors.primary.white};
  box-shadow: ${props => props.theme.shadows.card};
  display: none;
`

export const AppTitle = styled.div`
  flex: 1;

  h1 {
    margin: 0;
    font-size: ${props => props.theme.typography.fontSize['5xl']};
    font-weight: ${props => props.theme.typography.fontWeight.semibold};
    color: ${props => props.theme.colors.primary.white};

    ${mediaQuery('mobile')} {
      font-size: ${props => props.theme.typography.fontSize['4xl']};
    }
  }

  p {
    margin: 0.25rem 0 0 0;
    opacity: 0.95;
    font-size: ${props => props.theme.typography.fontSize.lg};
    color: ${props => props.theme.colors.primary.white};
  }
`

// Main Container
export const MainContainer = styled.main`
  max-width: 100%;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};

  ${mediaQuery('mobile')} {
    padding: ${props => props.theme.spacing.md};
  }
`

// Metrics Container (simplified - no background)
export const MetricsContainer = styled.div`
  border-radius: ${props => props.theme.borderRadius.large};
  margin-bottom: ${props => props.theme.spacing.md};
`

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${props => props.theme.spacing.md};

  ${mediaQuery('mobile')} {
    grid-template-columns: repeat(2, 1fr);
    gap: ${props => props.theme.spacing.sm};
  }
`

// Metric Cards with Dynamic Styling
export const MetricCard = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary.white} 0%, ${props => props.theme.colors.gray.light} 100%);
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.sm};
  text-align: center;
  border: 2px solid ${props => props.theme.colors.gray.medium};
  transition: ${props => props.theme.transitions.normal};
  position: relative;
  overflow: hidden;
  cursor: pointer;
  user-select: none;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.hover};
    border-color: ${props => props.theme.colors.primary.viridian};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${props => {
      if (props.$variant === 'fast-track') return props.theme.colors.primary.red
      if (props.$variant === 'on-hold') return props.theme.colors.primary.orange
      if (props.$variant === 'rejected') return props.theme.colors.gray.dark
      return props.theme.colors.primary.viridian
    }};
  }

  ${props => props.$active && css`
    background: linear-gradient(135deg, ${props.theme.colors.primary.viridian} 0%, #005a3d 100%);
    border-color: ${props.theme.colors.primary.viridian};
    color: ${props.theme.colors.primary.white};
    transform: translateY(-2px);
    box-shadow: ${props.theme.shadows.hover};
  `}

  ${mediaQuery('mobile')} {
    padding: ${props => props.theme.spacing.md};
  }
`

export const MetricIcon = styled.span`
  font-size: 1.5rem;
  margin-bottom: ${props => props.theme.spacing.sm};
  display: block;
`

export const MetricValue = styled.div`
  font-size: ${props => props.theme.typography.fontSize['7xl']};
  font-weight: ${props => props.theme.typography.fontWeight.extrabold};
  color: ${props => {
    if (props.$active) return props.theme.colors.primary.white + ' !important'
    if (props.$variant === 'fast-track') return props.theme.colors.primary.red
    if (props.$variant === 'on-hold') return props.theme.colors.primary.orange
    if (props.$variant === 'rejected') return props.theme.colors.gray.dark
    return props.theme.colors.primary.viridian
  }};
  line-height: 1;
  margin-bottom: ${props => props.theme.spacing.sm};

  ${mediaQuery('mobile')} {
    font-size: ${props => props.theme.typography.fontSize['6xl']};
  }
`

export const MetricLabel = styled.div`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.$active ? props.theme.colors.primary.white : props.theme.colors.gray.dark};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  line-height: ${props => props.theme.typography.lineHeight.tight};
`

// Chart Container (simplified - no background/padding like metrics)
export const ChartContainer = styled.div`
  margin-bottom: ${props => props.theme.spacing.md};
`

export const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.theme.spacing.md};

  ${mediaQuery('mobile')} {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.sm};
  }
`

export const ChartCard = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary.white} 0%, ${props => props.theme.colors.gray.light} 100%);
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: 0.25rem;
  text-align: center;
  border: 2px solid ${props => props.theme.colors.gray.medium};
  transition: ${props => props.theme.transitions.normal};
  position: relative;
  overflow: hidden;
  height: 280px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.hover};
    border-color: ${props => props.theme.colors.primary.viridian};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${props => props.theme.colors.primary.viridian};
  }

  ${mediaQuery('mobile')} {
    height: 220px;
    padding: 0.25rem;
  }
`

export const ChartHeader = styled.div`
  border-bottom: 3px solid ${props => props.theme.colors.primary.viridian};
  background: linear-gradient(135deg, ${props => props.theme.colors.gray.light} 0%, ${props => props.theme.colors.primary.white} 100%);
  border-radius: ${props => props.theme.borderRadius.medium};
`

export const ChartTitle = styled.h3`
  color: ${props => props.theme.colors.primary.red};
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  margin: 0;
  padding: ${props => props.theme.spacing.sm};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  justify-content: center;

  span {
    font-size: ${props => props.theme.typography.fontSize.xl};
  }
`

export const ChartContent = styled.div`
  height: calc(100% - 50px);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 200px;
`

export const LoadingChart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${props => props.theme.colors.gray.dark};
  font-size: ${props => props.theme.typography.fontSize.xl};
  text-align: center;
`

export const EmptyChart = styled(LoadingChart)`
  padding: ${props => props.theme.spacing.xl};
`

export const SpinnerSmall = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid ${props => props.theme.colors.gray.medium};
  border-top: 2px solid ${props => props.theme.colors.primary.viridian};
  border-radius: ${props => props.theme.borderRadius.pill};
  animation: spin 1s linear infinite;
  margin-bottom: ${props => props.theme.spacing.sm};

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

// Table Components
export const TableContainer = styled.div`
  background: ${props => props.theme.colors.primary.white};
  border-radius: ${props => props.theme.borderRadius.large};
  padding: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.md};
  box-shadow: ${props => props.theme.shadows.default};
  border: 1px solid ${props => props.theme.colors.gray.medium};
`

export const TableHeader = styled.div`
  border-bottom: 3px solid ${props => props.theme.colors.primary.viridian};
  padding-bottom: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
  background: linear-gradient(135deg, ${props => props.theme.colors.gray.light} 0%, ${props => props.theme.colors.primary.white} 100%);
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.medium};
  margin: -${props => props.theme.spacing.sm} -${props => props.theme.spacing.sm} ${props => props.theme.spacing.md} -${props => props.theme.spacing.sm};
`

export const TableTitle = styled.h2`
  color: ${props => props.theme.colors.primary.red};
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  margin: 0 0 ${props => props.theme.spacing.sm} 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;

  ${mediaQuery('mobile')} {
    flex-direction: column;
    align-items: flex-start;
    gap: ${props => props.theme.spacing.sm};
  }
`

export const ClearFilterBtn = styled.button`
  background: ${props => props.theme.colors.primary.orange};
  color: ${props => props.theme.colors.primary.white};
  border: none;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.button};
  font-size: ${props => props.theme.typography.fontSize.md};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};

  &:hover {
    background: #e55a1c;
    transform: translateY(-1px);
  }

  ${mediaQuery('mobile')} {
    font-size: ${props => props.theme.typography.fontSize.base};
    padding: 0.4rem 0.8rem;
  }
`

export const TableWrapper = styled.div`
  overflow-x: auto;
  margin: 0 -${props => props.theme.spacing.md};
  padding: 0 ${props => props.theme.spacing.md};
`

export const RequestsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${props => props.theme.typography.fontSize.sm};

  ${mediaQuery('mobile')} {
    font-size: ${props => props.theme.typography.fontSize.xs};
    min-width: 700px;
  }
`

export const TableTh = styled.th`
  background: linear-gradient(135deg, ${props => props.theme.colors.gray.light} 0%, ${props => props.theme.colors.primary.white} 100%);
  padding: 0.6rem 0.8rem;
  text-align: left;
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  font-size: ${props => props.theme.typography.fontSize.base};
  color: ${props => props.theme.colors.gray.dark};
  border-bottom: 2px solid ${props => props.theme.colors.primary.viridian};
  position: relative;

  &.sortable-header {
    cursor: pointer;
    user-select: none;
    transition: ${props => props.theme.transitions.fast};
    padding-right: 2.5rem !important;

    &:hover {
      background: linear-gradient(135deg, ${props => props.theme.colors.primary.viridian} 0%, #005a3d 100%);
      color: ${props => props.theme.colors.primary.white};
      transform: translateY(-1px);
    }

    ${mediaQuery('mobile')} {
      padding-right: 2rem !important;
    }
  }

  ${mediaQuery('mobile')} {
    padding: 0.6rem 0.8rem;
  }
`

export const SortIndicator = styled.span`
  position: absolute;
  right: ${props => props.theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;

  .sort-triangle {
    width: 0;
    height: 0;
    transition: all 0.2s ease;
  }

  &.sort-neutral {
    .sort-triangle-up {
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 6px solid #ccc;
    }
    .sort-triangle-down {
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 6px solid #ccc;
    }
  }

  &.sort-asc {
    .sort-triangle-up {
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 6px solid ${props => props.theme.colors.primary.viridian};
    }
    .sort-triangle-down {
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 6px solid #eee;
    }
  }

  &.sort-desc {
    .sort-triangle-up {
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 6px solid #eee;
    }
    .sort-triangle-down {
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 6px solid ${props => props.theme.colors.primary.viridian};
    }
  }

  ${mediaQuery('mobile')} {
    .sort-triangle {
      border-width: 4px !important;
    }
  }
`

export const TableTd = styled.td`
  padding: 0.25rem 0.25rem 0.5rem 0.25rem;
  border-bottom: 1px solid ${props => props.theme.colors.gray.medium};
  vertical-align: middle;

  &.description-cell {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 30%;
    min-width: 200px;
    max-width: 300px;

    ${mediaQuery('mobile')} {
      width: 25%;
      min-width: 150px;
      max-width: 200px;
    }
  }

  &.phase-column {
    width: auto;
    max-width: fit-content;
    text-align: left;
  }

  &.status-column {
    width: auto;
    max-width: fit-content;
    text-align: left;
  }

  &.created-column {
    width: 80px;
    min-width: 80px;
    text-align: center;

    ${mediaQuery('mobile')} {
      width: 70px;
      min-width: 70px;
    }
  }
`

export const TableRow = styled.tr`
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background: linear-gradient(135deg, rgba(0, 122, 83, 0.02) 0%, rgba(0, 122, 83, 0.05) 100%);
    transform: translateY(-1px);
  }
`

export const RequestNumber = styled.span`
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.primary.viridian};
  font-family: 'Monaco', 'Menlo', monospace;
`

// Status Badge Component with Variants
export const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.375rem 0.75rem;
  border-radius: ${props => props.theme.borderRadius.pill};
  font-size: ${props => props.theme.typography.fontSize.xs};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: ${props => props.theme.transitions.fast};

  ${props => {
    switch(props.$variant) {
      case 'priority-fast-track':
        return css`
          background: ${props.theme.colors.primary.red};
          color: ${props.theme.colors.primary.white};
        `
      case 'priority-high':
        return css`
          background: ${props.theme.colors.primary.orange};
          color: ${props.theme.colors.primary.white};
        `
      case 'priority-medium':
        return css`
          background: ${props.theme.colors.primary.viridian};
          color: ${props.theme.colors.primary.white};
        `
      case 'priority-low':
      case 'priority-unknown':
        return css`
          background: ${props.theme.colors.gray.medium};
          color: ${props.theme.colors.gray.dark};
        `
      case 'phase-new':
        return css`
          background: rgba(218, 41, 28, 0.1);
          color: ${props.theme.colors.primary.red};
        `
      case 'phase-review':
        return css`
          background: rgba(255, 103, 32, 0.1);
          color: ${props.theme.colors.primary.orange};
        `
      case 'phase-architecture':
        return css`
          background: rgba(0, 122, 83, 0.1);
          color: ${props.theme.colors.primary.viridian};
        `
      case 'phase-proposal':
        return css`
          background: rgba(0, 122, 83, 0.15);
          color: ${props.theme.colors.primary.viridian};
        `
      case 'phase-funding':
        return css`
          background: rgba(0, 122, 83, 0.2);
          color: ${props.theme.colors.primary.viridian};
        `
      case 'status-draft':
        return css`
          background: rgba(218, 41, 28, 0.1);
          color: ${props.theme.colors.primary.red};
        `
      case 'status-submitted':
        return css`
          background: rgba(218, 41, 28, 0.15);
          color: ${props.theme.colors.primary.red};
        `
      case 'status-backlog':
        return css`
          background: rgba(255, 103, 32, 0.1);
          color: ${props.theme.colors.primary.orange};
        `
      case 'status-review':
        return css`
          background: rgba(255, 103, 32, 0.15);
          color: ${props.theme.colors.primary.orange};
        `
      case 'status-prep':
        return css`
          background: rgba(255, 103, 32, 0.2);
          color: ${props.theme.colors.primary.orange};
        `
      case 'status-architecture':
        return css`
          background: rgba(52, 152, 219, 0.1);
          color: #2980b9;
        `
      case 'status-proposal':
        return css`
          background: rgba(0, 122, 83, 0.1);
          color: ${props.theme.colors.primary.viridian};
        `
      case 'status-funding':
        return css`
          background: rgba(155, 89, 182, 0.1);
          color: #8e44ad;
        `
      case 'status-hold':
        return css`
          background: rgba(255, 103, 32, 0.2);
          color: ${props.theme.colors.primary.orange};
        `
      case 'status-deferred':
        return css`
          background: rgba(149, 165, 166, 0.2);
          color: #7f8c8d;
        `
      case 'status-cancelled':
        return css`
          background: rgba(127, 140, 141, 0.2);
          color: ${props.theme.colors.gray.dark};
        `
      case 'status-rejected':
        return css`
          background: rgba(231, 76, 60, 0.2);
          color: #c0392b;
        `
      default:
        return css`
          background: ${props.theme.colors.gray.medium};
          color: ${props.theme.colors.gray.dark};
        `
    }
  }}
`

// Loading and Error States
export const Loading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  color: ${props => props.theme.colors.gray.dark};
`

export const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${props => props.theme.colors.gray.medium};
  border-top: 4px solid ${props => props.theme.colors.primary.viridian};
  border-radius: ${props => props.theme.borderRadius.pill};
  animation: spin 1s linear infinite;
  margin-bottom: ${props => props.theme.spacing.md};

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

export const EmptyState = styled.div`
  text-align: center;
  padding: 4rem;
  color: ${props => props.theme.colors.gray.dark};

  h3 {
    font-size: 1.5rem;
    margin-bottom: ${props => props.theme.spacing.md};
    color: ${props => props.theme.colors.primary.red};
  }

  a {
    color: ${props => props.theme.colors.primary.viridian};
    text-decoration: none;
    font-weight: ${props => props.theme.typography.fontWeight.semibold};

    &:hover {
      text-decoration: underline;
    }
  }
`

export const ErrorContainer = styled.div`
  background: rgba(218, 41, 28, 0.1);
  border: 2px solid ${props => props.theme.colors.primary.red};
  border-radius: ${props => props.theme.borderRadius.large};
  padding: ${props => props.theme.spacing.xl};
  margin: ${props => props.theme.spacing.xl} 0;
  color: ${props => props.theme.colors.primary.red};
  text-align: center;

  h3 {
    margin-top: 0;
  }
`

export const RetryButton = styled.button`
  margin-top: ${props => props.theme.spacing.md};
  padding: 0.75rem 1.5rem;
  background: ${props => props.theme.colors.primary.viridian};
  color: ${props => props.theme.colors.primary.white};
  border: none;
  border-radius: ${props => props.theme.borderRadius.medium};
  cursor: pointer;
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  transition: ${props => props.theme.transitions.fast};

  &:hover {
    background: #005a3d;
    transform: translateY(-2px);
  }
`

// Footer
export const DashboardFooter = styled.footer`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  margin-top: ${props => props.theme.spacing.xl};
  background: ${props => props.theme.colors.primary.white};
`

export const FooterText = styled.div`
  font-size: 0.8rem;
  color: #1f4e79;
  font-style: italic;
`

// Export theme and ThemeProvider
export { theme } from './theme.js'
export { ThemeProvider } from 'styled-components'