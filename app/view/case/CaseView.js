Ext.define('SolarUI.view.case.CaseView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.caseview',

    requires: [
        'SolarUI.view.case.CaseViewModel',
        'SolarUI.view.case.CaseViewController',
        'Ext.grid.Panel',
        'Ext.grid.filters.filter.String',
        'Ext.grid.filters.filter.List',
        'Ext.grid.filters.filter.Number',
        'Ext.grid.column.Boolean',
        'Ext.grid.filters.Filters',
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.grid.column.Number',
        'Ext.view.Table',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.toolbar.Toolbar'
    ],

    controller: 'casesCtrl',
    viewModel: {
        type: 'casesViewModel'
    },
    controller: 'casesCtrl',
    frame: true,
    height: 250,
    width: '100%',
    title: 'Cases',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'gridpanel',
            flex: 1,
            reference: 'caseGridRef',
            bind: {
                store: '{casemodel}'
            },
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'case',
                    text: 'Case',
                    filter: {
                        type: 'string',
                        emptyText: 'search for case ...'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    width: 300,
                    dataIndex: 'company',
                    text: 'Company',
                    filter: {
                        type: 'string'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'case_admin',
                    text: 'Case Admin',
                    filter: {
                        type: 'list'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'sub_group',
                    text: 'Sub Group',
                    filter: {
                        type: 'number'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        //var out = Ext.util.Format.number(val, '0.00');
                        if (value == 'A') {
                            return '<span style="color:' + "#73b51e" + ';">' + value + '</span>';
                        }
                        return value;
                    },
                    dataIndex: 'group',
                    text: 'Group'
                },
                {
                    xtype: 'booleancolumn',
                    dataIndex: 'mec',
                    text: 'MEC Status',
                    flex: 1
                }
            ],
            listeners: {
                select: 'onGridpanelSelect',
                rowdblclick: 'onGridpanelRowDblClick',
                itemcontextmenu: 'onGridpanelItemContextMenu'
            },
            plugins: [
                {
                    ptype: 'gridfilters'
                }
            ]
        },
        {
            xtype: 'panel',
            flex: 1,
            reference: 'cardDisplayPanel',
            layout: 'card',
            items: [
                {
                    xtype: 'tabpanel',
                    reference: 'detailPnlRef',
                    items: [
                        {
                            xtype: 'panel',
                            title: 'Certs',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    title: 'My Grid Panel',
                                    bind: {
                                        store: '{certmodel}'
                                    },
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'case',
                                            text: 'Cert'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'last_name',
                                            text: 'Last Name'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'first_name',
                                            text: 'First Name'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'ssn',
                                            text: 'SSN'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'sex',
                                            text: 'Sex'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'state_of_residence',
                                            text: 'State Of Residence'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'state_of_employment',
                                            text: 'State Of Employment'
                                        },
                                        {
                                            xtype: 'numbercolumn',
                                            dataIndex: 'annual_premium',
                                            text: 'Annual Premium'
                                        },
                                        {
                                            xtype: 'numbercolumn',
                                            dataIndex: 'face_amount',
                                            text: 'Face AMount',
                                            flex: 1
                                        }
                                    ],
                                    listeners: {
                                        select: 'onCertGridpanelSelect'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'form',
                    reference: 'caseFormRef',
                    bodyPadding: 10,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Case',
                            name: 'case'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Company',
                            name: 'company'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '# of certs',
                            name: 'certs'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Group',
                            name: 'group'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Sub Group',
                            name: 'sub_group'
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Case Admin',
                            name: 'case_admin',
                            displayField: 'user_name',
                            queryMode: 'local',
                            store: 'UserDataStore'
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    text: 'Save',
                                    listeners: {
                                        click: 'btnClickSave'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    text: 'Cancel',
                                    listeners: {
                                        click: 'btnClickCancel'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            flex: 1,
            dock: 'top',
            items: [
                {
                    xtype: 'button',
                    text: 'Add',
                    listeners: {
                        click: 'add'
                    }
                },{
                    xtype: 'button',
                    text: 'Login',
                    listeners: {
                        click: 'login'
                    }
                },{
                    xtype: 'button',
                    text: 'Logout',
                    listeners: {
                        click: 'logout'
                    }
                }
            ]
        }
    ]

});