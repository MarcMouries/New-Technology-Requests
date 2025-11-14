import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

// Create department records individually for better reliability

Record({
    $id: Now.ID['dept_it'],
    table: 'x_snc_newtech_department',
    data: {
        x_snc_newtech_name: 'IT',
        x_snc_newtech_code: 'it',
        x_snc_newtech_active: true,
        x_snc_newtech_sequence: 0
    }
})

Record({
    $id: Now.ID['dept_accounting'],
    table: 'x_snc_newtech_department',
    data: {
        x_snc_newtech_name: 'Accounting',
        x_snc_newtech_code: 'accounting',
        x_snc_newtech_active: true,
        x_snc_newtech_sequence: 2
    }
})

Record({
    $id: Now.ID['dept_asset_protection'],
    table: 'x_snc_newtech_department',
    data: {
        x_snc_newtech_name: 'Asset Protection',
        x_snc_newtech_code: 'asset_protection',
        x_snc_newtech_active: true,
        x_snc_newtech_sequence: 3
    }
})

Record({
    $id: Now.ID['dept_construction'],
    table: 'x_snc_newtech_department',
    data: {
        x_snc_newtech_name: 'Construction',
        x_snc_newtech_code: 'construction',
        x_snc_newtech_active: true,
        x_snc_newtech_sequence: 4
    }
})

Record({
    $id: Now.ID['dept_corporate_pmo'],
    table: 'x_snc_newtech_department',
    data: {
        x_snc_newtech_name: 'Corporate PMO',
        x_snc_newtech_code: 'corporate_pmo',
        x_snc_newtech_active: true,
        x_snc_newtech_sequence: 5
    }
})

Record({
    $id: Now.ID['dept_delivery'],
    table: 'x_snc_newtech_department',
    data: {
        x_snc_newtech_name: 'Delivery',
        x_snc_newtech_code: 'delivery',
        x_snc_newtech_active: true,
        x_snc_newtech_sequence: 6
    }
})

Record({
    $id: Now.ID['dept_digital'],
    table: 'x_snc_newtech_department',
    data: {
        x_snc_newtech_name: 'Digital',
        x_snc_newtech_code: 'digital',
        x_snc_newtech_active: true,
        x_snc_newtech_sequence: 7
    }
})

Record({
    $id: Now.ID['dept_facilities'],
    table: 'x_snc_newtech_department',
    data: {
        x_snc_newtech_name: 'Facilities',
        x_snc_newtech_code: 'facilities',
        x_snc_newtech_active: true,
        x_snc_newtech_sequence: 8
    }
})

Record({
    $id: Now.ID['dept_finance'],
    table: 'x_snc_newtech_department',
    data: {
        x_snc_newtech_name: 'Finance',
        x_snc_newtech_code: 'finance',
        x_snc_newtech_active: true,
        x_snc_newtech_sequence: 9
    }
})

Record({
    $id: Now.ID['dept_franchising'],
    table: 'x_snc_newtech_department',
    data: {
        x_snc_newtech_name: 'Franchising',
        x_snc_newtech_code: 'franchising',
        x_snc_newtech_active: true,
        x_snc_newtech_sequence: 10
    }
})

Record({
    $id: Now.ID['dept_fuels'],
    table: 'x_snc_newtech_department',
    data: {
        x_snc_newtech_name: 'Fuels',
        x_snc_newtech_code: 'fuels',
        x_snc_newtech_active: true,
        x_snc_newtech_sequence: 11
    }
})

Record({
    $id: Now.ID['dept_hr'],
    table: 'x_snc_newtech_department',
    data: {
        x_snc_newtech_name: 'HR',
        x_snc_newtech_code: 'hr',
        x_snc_newtech_active: true,
        x_snc_newtech_sequence: 12
    }
})

Record({
    $id: Now.ID['dept_learning_development'],
    table: 'x_snc_newtech_department',
    data: {
        x_snc_newtech_name: 'Learning & Development',
        x_snc_newtech_code: 'learning_development',
        x_snc_newtech_active: true,
        x_snc_newtech_sequence: 13
    }
})

Record({
    $id: Now.ID['dept_legal'],
    table: 'x_snc_newtech_department',
    data: {
        x_snc_newtech_name: 'Legal',
        x_snc_newtech_code: 'legal',
        x_snc_newtech_active: true,
        x_snc_newtech_sequence: 14
    }
})

Record({
    $id: Now.ID['dept_marketing'],
    table: 'x_snc_newtech_department',
    data: {
        x_snc_newtech_name: 'Marketing',
        x_snc_newtech_code: 'marketing',
        x_snc_newtech_active: true,
        x_snc_newtech_sequence: 15
    }
})

Record({
    $id: Now.ID['dept_merchandising'],
    table: 'x_snc_newtech_department',
    data: {
        x_snc_newtech_name: 'Merchandising',
        x_snc_newtech_code: 'merchandising',
        x_snc_newtech_active: true,
        x_snc_newtech_sequence: 16
    }
})

Record({
    $id: Now.ID['dept_merchandising_business_systems'],
    table: 'x_snc_newtech_department',
    data: {
        x_snc_newtech_name: 'Merchandising Business Systems',
        x_snc_newtech_code: 'merchandising_business_systems',
        x_snc_newtech_active: true,
        x_snc_newtech_sequence: 17
    }
})

Record({
    $id: Now.ID['dept_merchandising_infrastructure'],
    table: 'x_snc_newtech_department',
    data: {
        x_snc_newtech_name: 'Merchandising Infrastructure',
        x_snc_newtech_code: 'merchandising_infrastructure',
        x_snc_newtech_active: true,
        x_snc_newtech_sequence: 18
    }
})

Record({
    $id: Now.ID['dept_operations'],
    table: 'x_snc_newtech_department',
    data: {
        x_snc_newtech_name: 'Operations',
        x_snc_newtech_code: 'operations',
        x_snc_newtech_active: true,
        x_snc_newtech_sequence: 19
    }
})

Record({
    $id: Now.ID['dept_operations_services'],
    table: 'x_snc_newtech_department',
    data: {
        x_snc_newtech_name: 'Operations Services',
        x_snc_newtech_code: 'operations_services',
        x_snc_newtech_active: true,
        x_snc_newtech_sequence: 20
    }
})

Record({
    $id: Now.ID['dept_real_estate'],
    table: 'x_snc_newtech_department',
    data: {
        x_snc_newtech_name: 'Real Estate',
        x_snc_newtech_code: 'real_estate',
        x_snc_newtech_active: true,
        x_snc_newtech_sequence: 21
    }
})

Record({
    $id: Now.ID['dept_restaurant'],
    table: 'x_snc_newtech_department',
    data: {
        x_snc_newtech_name: 'Restaurant',
        x_snc_newtech_code: 'restaurant',
        x_snc_newtech_active: true,
        x_snc_newtech_sequence: 22
    }
})

Record({
    $id: Now.ID['dept_sourcing'],
    table: 'x_snc_newtech_department',
    data: {
        x_snc_newtech_name: 'Sourcing',
        x_snc_newtech_code: 'sourcing',
        x_snc_newtech_active: true,
        x_snc_newtech_sequence: 23
    }
})

Record({
    $id: Now.ID['dept_supply_chain_logistics'],
    table: 'x_snc_newtech_department',
    data: {
        x_snc_newtech_name: 'Supply Chain / Logistics',
        x_snc_newtech_code: 'supply_chain_logistics',
        x_snc_newtech_active: true,
        x_snc_newtech_sequence: 24
    }
})

Record({
    $id: Now.ID['dept_technical_support_center'],
    table: 'x_snc_newtech_department',
    data: {
        x_snc_newtech_name: 'Technical Support Center',
        x_snc_newtech_code: 'technical_support_center',
        x_snc_newtech_active: true,
        x_snc_newtech_sequence: 25
    }
})

Record({
    $id: Now.ID['dept_treasury'],
    table: 'x_snc_newtech_department',
    data: {
        x_snc_newtech_name: 'Treasury',
        x_snc_newtech_code: 'treasury',
        x_snc_newtech_active: true,
        x_snc_newtech_sequence: 26
    }
})

Record({
    $id: Now.ID['dept_other'],
    table: 'x_snc_newtech_department',
    data: {
        x_snc_newtech_name: 'Other',
        x_snc_newtech_code: 'other',
        x_snc_newtech_active: true,
        x_snc_newtech_sequence: 27
    }
})