Ext.define('UH.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: ['Ext.layout.container.Fit', 'UH.view.user.ManageUsers'],
    layout: {
        type: 'fit'
    },
    items: [{
            xtype: 'manageusers'
        }]
});
