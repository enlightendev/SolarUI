Ext.define('SolarUI.view.detail.EntityDetailViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.detailentitydetail',

    updateDetailView: function(entityType, entity) {
        console.log("Updating Detail View with entityType: " + entityType + " entity: " + entity);

        var detailPanel = "";

        switch(entityType){
            case 'case':
                detailPanel = 'caseDetailPanel';
                break;
            case 'cert':
                detailPanel = 'certDetailPanel';
                break;
            default:
                detailPanel = 'caseDetailPanel';
                break;
        }

        var detailPanelRef = this.lookupReference(detailPanel);

        // update the detailPanel with data - this will trigger the tpl to become updates
        detailPanelRef.update(entity.data);

        // Show form
        this.showView(detailPanel);

    },

    init: function() {
        this.listen({
            controller: {
                '*': {
                    updateDetailView: 'updateDetailView'
                }
            }
        });
    },

    showView: function(view) {
        //var references = this.getReferences();

        //var display = references.cardPanel;
        var layout = this.getView().getLayout();

        var viewRef = this.lookupReference(view);

        layout.setActiveItem(viewRef);
    }

});
