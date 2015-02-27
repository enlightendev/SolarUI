Ext.define('SolarUI.model.CertModel', {
    extend: 'Ext.data.Model',
    alias: 'model.certmodel',

    requires: [
        'Ext.data.field.Field'
    ],

    fields: [
        {
            name: 'case'
        },
        {
            name: 'last_name'
        },
        {
            name: 'first_name'
        },
        {
            name: 'ssn'
        },
        {
            name: 'sex'
        },
        {
            name: 'state_of_residence'
        },
        {
            name: 'state_of_employment'
        },
        {
            name: 'annual_premium'
        },
        {
            name: 'face_amount'
        }
    ]
});