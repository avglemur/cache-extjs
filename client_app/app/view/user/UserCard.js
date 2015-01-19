Ext.define('UH.view.user.UserCard', {
    extend: 'Ext.form.Panel',
    xtype: 'usercard',
    layout: {
        type: 'anchor'
    },
    bodyPadding: 10,
    border: false,
    autoScroll: true,
    initComponent: function () {
        var me = this;
        Ext.apply(me, {
            items: [{
                    xtype: 'fieldset',
                    padding: 10,
                    defaults: {
                        anchor: '100%',
                        xtype: 'textfield',
                        labelAlign: 'top',
                        msgTarget: 'under',
                        afterLabelTextTpl: '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>',
                        allowBlank: false
                    },
                    fieldDefaults: {
                    },
                    title: 'Форма пользователя',
                    items: [{
                            name: 'id',
                            xtype: 'hiddenfield'
                        }, {
                            name: 'lastName',
                            fieldLabel: 'Фамилия'
                        }, {
                            name: 'firstName',
                            fieldLabel: 'Имя'
                        }, {
                            xtype: 'datefield',
                            fieldLabel: 'Дата рождения',
                            name: 'dob',
                            format: 'd/m/Y'
                        }, {
                            name: 'email',
                            fieldLabel: 'Email',
                            vtype: 'email'
                        }, {
                            xtype: 'toolbar',
                            ui: 'footer',
                            layout: {
                                pack: 'end',
                                type: 'hbox'
                            },
                            items: [{
                                    xtype: 'button',
                                    formBind: true,
                                    itemId: 'deleteUserBtn',
                                    iconCls: 'delete',
                                    text: 'Удалить'
                                }, {
                                    xtype: 'button',
                                    formBind: true,
                                    itemId: 'saveUserBtn',
                                    iconCls: 'save',
                                    text: 'Сохранить'
                                }]
                        }]
                }]
        });
        me.callParent(arguments);
    }
});


