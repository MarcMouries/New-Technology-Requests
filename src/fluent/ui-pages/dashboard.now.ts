import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'
import dashboardPage from '../../client/dashboard.html'

export const newtech_dashboard_page = UiPage({
    $id: Now.ID['newtech-dashboard-page'],
    endpoint: 'x_snc_newtech_dashboard.do',
    html: dashboardPage,
    direct: true
})