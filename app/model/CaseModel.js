Ext.define('SolarUI.model.CaseModel', {
    extend: 'Ext.data.Model',
    alias: 'model.case',

    requires: [
        'Ext.data.field.Boolean'
    ],

    fields: [
        {
            name: 'case'
        },
        {
            name: 'company'
        },
        {
            name: 'certs'
        },
        {
            name: 'case_admin'
        },
        {
            name: 'group'
        },
        {
            name: 'sub_group'
        },
        {
            type: 'boolean',
            name: 'mec'
        }
    ]
});