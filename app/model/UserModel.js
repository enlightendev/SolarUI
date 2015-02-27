Ext.define('SolarUI.model.UserModel', {
    extend: 'Ext.data.Model',
    alias: 'model.user',

    requires: [
        'Ext.data.field.Field'
    ],

    fields: [
        {
            name: 'user_name'
        }
    ]
});