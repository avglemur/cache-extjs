Ext.define('UH.view.user.ManageUsers', {
    extend: 'Ext.panel.Panel',
    xtype: 'manageusers',
    requires: ['UH.view.user.UserList', 'UH.view.user.UserCard'],
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    initComponent: function () {
        var me = this;
        Ext.apply(me, {
            items: [{
                    xtype: 'userlist',
                    flex: 2,
                    margin: 1
                }, {
                    xtype: 'usercard',
                    flex: 1
                }]
        });
        me.callParent(arguments);
    }
});
