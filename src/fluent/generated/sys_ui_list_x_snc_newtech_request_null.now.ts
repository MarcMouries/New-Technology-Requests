import { List, default_view } from '@servicenow/sdk/core'

List({
    table: 'x_snc_newtech_request',
    view: default_view,
    columns: [
        'number',
        'priority',
        'x_snc_newtech_priority',
        'short_description',
        'assigned_to',
        'opened_by',
        'x_snc_newtech_phase',
        'x_snc_newtech_status',
        'sys_created_on',
        'sys_created_by',
    ],
})
