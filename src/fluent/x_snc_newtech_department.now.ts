import '@servicenow/sdk/global'
import { 
    Table, 
    StringColumn, 
    BooleanColumn,
    IntegerColumn
} from '@servicenow/sdk/core'

// Departments lookup table
export const x_snc_newtech_department = Table({
    name: 'x_snc_newtech_department',
    label: 'Department',
    schema: {
        x_snc_newtech_name: StringColumn({
            label: 'Department Name',
            maxLength: 100,
            mandatory: true
        }),
        
        x_snc_newtech_code: StringColumn({
            label: 'Department Code',
            maxLength: 50,
            mandatory: true
        }),
        
        x_snc_newtech_active: BooleanColumn({
            label: 'Active',
            default: 'true'
        }),
        
        x_snc_newtech_sequence: IntegerColumn({
            label: 'Display Order',
            default: '0'
        })
    },
    
    display: 'x_snc_newtech_name',
    audit: false,
    extensible: false,
    actions: ['create', 'read', 'update', 'delete'],
    accessible_from: 'public'
})