/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('SolarUI.Application', {
    extend: 'Ext.app.Application',
    
    name: 'SolarUI',

    models: [
        'CaseModel',
        'CertModel',
        'UserModel'
    ],
    stores: [
        'CertDataStore',
        'UserDataStore'
    ],
    views: [
        'case.CaseView',
        'SolarUIViewPort',
        'detail.EntityDetail'
    ],
    
    launch: function () {
        Ext.create('SolarUI.view.SolarUIViewPort');
    }
});
