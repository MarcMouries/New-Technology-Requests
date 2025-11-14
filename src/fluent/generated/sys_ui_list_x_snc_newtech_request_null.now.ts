import { List, default_view } from '@servicenow/sdk/core'

List({
    table: 'x_snc_newtech_request',
    view: default_view,
    columns: [
        'number',
        'priority',
        'x_snc_newtech_priority',
        'x_snc_newtech_request_type',
        'short_description',
        'assigned_to',
        'opened_by',
        'x_snc_newtech_phase',
        'x_snc_newtech_status',
        'sys_created_by',
        'x_snc_newtech_requester_department',
        'impact',
        'x_snc_newtech_problem_statement',
        'x_snc_newtech_strategic_driver',
        'sys_created_on',
        'x_snc_newtech_target_user_departments',
        'x_snc_newtech_estimated_user_count',
    ],
})
