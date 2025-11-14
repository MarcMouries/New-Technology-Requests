import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'
import intakePage from '../../client/index.html'

export const newtech_intake_page = UiPage({
    $id: Now.ID['newtech-intake-page'],
    endpoint: 'x_snc_newtech_intake.do',
    html: intakePage,
    direct: true
})