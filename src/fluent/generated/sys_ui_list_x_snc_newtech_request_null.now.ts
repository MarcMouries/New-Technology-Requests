import { List, default_view } from '@servicenow/sdk/core'

List({
    table: 'x_snc_newtech_request',
    view: default_view,
    columns: [
        'number',
        'priority',
        'short_description',
        'assigned_to',
        'opened_by',
        'x_snc_newtech_phase',
        'x_snc_newtech_status',
    ],
})
