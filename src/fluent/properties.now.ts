import '@servicenow/sdk/global'
import { Property } from '@servicenow/sdk/core'

// System property to manage cost bands centrally
Property({
    $id: Now.ID['cost_bands_prop'],
    name: 'x_snc_newtech.u_newtech_request.cost_bands',
    type: 'string',
    value: '<$50K,$50K–$249K,$250K–$999K,$1M–$4.9M,$5M+,Unknown',
    description: 'Centrally managed cost band values for New Technology Request table. Comma-separated list of cost ranges.'
})