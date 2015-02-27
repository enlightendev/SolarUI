Ext.define('SolarUI.view.detail.EntityDetail', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.detailentitydetail',

    requires: [
        'SolarUI.view.detail.EntityDetailViewModel',
        'SolarUI.view.detail.EntityDetailViewController',
        'Ext.panel.Panel',
        'Ext.XTemplate'
    ],

    controller: 'detailentitydetail',
    viewModel: {
        type: 'detailentitydetail'
    },
    height: 250,
    width: 400,
    layout: 'card',
    title: 'Details',

    items: [
        {
            xtype: 'panel',
            reference: 'caseDetailPanel',
            tpl: [
                '<table>',
                '  <tr>',
                '    <td style="text-align: right"><b>Case:</b></td>',
                '    <td>{case}</td>',
                '  </tr>',
                '  <tr>',
                '    <td style="text-align: right"><b>Company:</b></td>',
                '    <td>{company}</td>',
                '  </tr>',
                '  <tr>',
                '    <td style="text-align: right"><b>Number of Lives:</b></td>',
                '    <td>{certs}</td>',
                '  </tr>',
                '  <tr>',
                '  <tr>',
                '    <td style="text-align: right"><b>Case Admin:</b></td>',
                '    <td>{case_admin}</td>',
                '  </tr>',
                '  <tr>',
                '    <td style="text-align: right"><b>MEC Status:</b></td>',
                '    <td>{mec}</td>',
                '  </tr>',
                '</table>'
            ],
            title: 'Case Detail'
        },
        {
            xtype: 'panel',
            reference: 'certDetailPanel',
            tpl: [
                '<table>',
                '  <tr>',
                '    <td style="text-align: right"><b>First Name:</b></td>',
                '    <td>{first_name}</td>',
                '  </tr>',
                '  <tr>',
                '    <td style="text-align: right"><b>Last Name:</b></td>',
                '    <td>{last_name}</td>',
                '  </tr>',
                '  <tr>',
                '    <td style="text-align: right"><b>SSN:</b></td>',
                '    <td>{ssn}</td>',
                '  </tr>',
                '</table>'
            ],
            title: 'Cert Detail'
        }
    ]

});