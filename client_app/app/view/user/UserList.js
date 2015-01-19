Ext.define('UH.view.user.UserList', {
    extend: 'Ext.grid.Panel',
    xtype: 'userlist',
    pageSize: 50,
    viewConfig: {
        markDirty: false,
        stripeRows: false
    },
    initComponent: function () {
        var me = this;
        me.store = Ext.create('UH.store.Users');
        Ext.apply(me, {
            tbar: [{
                    text: 'Добавить',
                    iconCls: 'add',
                    itemId: 'addUserBtn'
                }],
            dockedItems: [{
                    xtype: 'pagingtoolbar',
                    store: me.store,
                    dock: 'bottom',
                    displayInfo: true
                }],
            columns: [
                {
                    xtype: 'rownumberer'
                }, {
                    header: 'id',
                    dataIndex: 'id',
                    flex: 1,
                    hidden: true,
                    hideable: false
                }, {
                    header: "Фамилия",
                    dataIndex: 'lastName',
                    flex: 1,
                    filter: true
                }, {
                    header: "Имя",
                    dataIndex: 'firstName',
                    flex: 1,
                    filter: true
                }, {
                    header: "Дата рождения",
                    dataIndex: 'dob',
                    renderer: Ext.util.Format.dateRenderer('d/m/Y'),
                    flex: 1,
                    filter: true
                }, {
                    header: "Email",
                    dataIndex: 'email',
                    flex: 1,
                    filter: true
                }]
        });
        me.callParent(arguments);
    }
});
