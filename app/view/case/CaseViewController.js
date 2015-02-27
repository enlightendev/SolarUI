Ext.define('SolarUI.view.case.CaseViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.casesCtrl',

    /**
     * convenience method that encapsulates the logic for displaying a specific view from a container using
     * the cardlayout layout type.
     * @param view
     */
    showView: function(view) {
        var references = this.getReferences();

        var display = references.cardDisplayPanel;
        var layout = display.getLayout();

        var viewRef = this.lookupReference(view);

        layout.setActiveItem(viewRef);

    },

    select: function(rowmodel, record, index, eOpts) {
        // Set selected record
        var viewModel = this.getViewModel();
        viewModel.set('record', record);

        // Show details
        this.showView('detailPnlRef');
    },

    showContextMenu: function(dataview, record, item, index, e, eOpts) {
        var menu = new Ext.menu.Menu({
            items: [
                {
                    text: 'Edit',
                    handler: function(){
                        this.loadEditForm();
                    },
                    scope: this
                },
                {
                    text: 'MEC',
                    handler: function(){
                        record.set('mec',true);
                        record.commit();
                        Ext.Msg.alert('changed mec status ' + record.get('case'));
                    }
                },{
                    text: 'Non-MEC',
                    handler: function(){
                        record.set('mec',false);
                        record.commit();
                        Ext.Msg.alert('changed mec status ' + record.get('case'));
                    }
                }]
        }).showAt(e.getXY());
    },

    loadDetailView: function(record) {
        console.log(record.get('case'));

        var store = this.getStore('certmodel');
        store.clearFilter(true);

        store.filter('case', record.get('case'));


        // Set selected record
        this.getViewModel().set('record', record);

        // grab a reference to the detailPanel
        // http://www.sencha.com/blog/using-viewcontrollers-in-ext-js-5

        var detailPanel = this.lookupReference('detailPnlRef');

        // update the detailPanel with data - this will trigger the tpl to become updates
        detailPanel.update(record.data);

        // Show form
        this.showView('detailPnlRef');

        this.fireEvent('updateDetailView','case',record);

    },

    loadEditForm: function() {
        var formPanel = this.getReferences().caseFormRef,
            form = formPanel.getForm(),
            record = this.getViewModel().get('record');

        // Load record model into form
        form.loadRecord(record);

        // Set title
        formPanel.setTitle('Edit Case');

        // Show form
        this.showView('caseFormRef');
    },

    onGridpanelSelect: function(rowmodel, record, index, eOpts) {
        this.loadDetailView(record);
    },

    onGridpanelRowDblClick: function(tableview, record, tr, rowIndex, e, eOpts) {

        this.loadEditForm();
    },

    onGridpanelItemContextMenu: function(dataview, record, item, index, e, eOpts) {
        e.stopEvent();
        this.showContextMenu(dataview, record, item, index, e, eOpts);

    },

    onCertGridpanelSelect: function(rowmodel, record, index, eOpts) {
        this.fireEvent('updateDetailView','cert',record);
    },

    btnClickSave: function(button, e, eOpts) {

        var form = this.getReferences().caseFormRef.getForm(),
            record = form.getRecord(),
            store = this.getStore('casemodel'),
            now = new Date();

        // Valid
        if (form.isValid()) {

            // Update associated record with values
            form.updateRecord();

            // Set updated date/time
            //record.set('updatedAt', now);

            // Add to store if new record
            if (record.phantom) {

                // Set created date/time
                //record.set('createdAt', now);

                // TODO: Assign the record's ID from data source
                // Normally, this value would be auto-generated,
                // or returned from the server
                var id = store.count() + 1;
                record.set('id', id);

                // Add to store
                store.add(record);

            }

            // Commit changes
            store.commitChanges();

            // Display record
            this.select(this, record);

        }
    },

    btnClickCancel: function(button, e, eOpts) {
        // Show details
        this.showView('detailPnlRef');
    },

    add: function(button, e, eOpts) {
        var references = this.getReferences(),
            formPanel = this.getReferences().caseFormRef,
            form = formPanel.getForm();

        //create a new model using alias
        var newRecord = Ext.create('model.case');

        // Clear form
        form.reset();

        // Set record
        form.loadRecord(newRecord);

        // Set title
        formPanel.setTitle('Add Case');

        // Show form
        this.showView('caseFormRef');
    },

    login: function(e){
        // Initialize Auth0Lock with your `clientID` and `domain`
        var lock = new Auth0Lock('', 'philafin.auth0.com');

        //e.preventDefault();
        lock.show(function onLogin(err, profile, id_token) {

            if (err) {
                // There was an error logging the user in
                return alert(err.message);
            }

            console.log('logged in');
        });

    },

    logout: function(e){
        // Initialize Auth0Lock with your `clientID` and `domain`
        var lock = new Auth0Lock('', 'philafin.auth0.com');
        lock.logout({ ref: window.location.href });

    },

    onStoreLoad: function(store, records, successful, eOpts) {
        store.data.each(function(data){
            console.log('Case:' + data.data['case']);
        });
    }

});
