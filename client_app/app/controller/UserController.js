Ext.define('UH.controller.UserController', {
     extend: 'Ext.app.Controller',
    views: ['user.ManageUsers'], //массив вьюшек(представлений), которые находятся в каталоге view
    //устанавливаем массив ссылок на элементы с помощью селекторов
    refs: [{
            ref: 'userList',
            selector: 'manageusers userlist'
        }, {
            ref: 'userCard',
            selector: 'manageusers usercard'
        }, {
            ref: 'userFieldset',
            selector: 'manageusers usercard fieldset'
        }, {
            ref: 'deleteUserBtn',
            selector: 'manageusers usercard #deleteUserBtn'
        }],
    //инициализация обработчика событий, которые возникают в представлениях
    init: function (application) {
        this.control({
            'manageusers #addUserBtn': {
                click: this.addUser
            },
            'userlist': {
                itemclick: this.onSelectUser
            },
            'manageusers usercard #saveUserBtn': {
                click: this.saveUser
            },
            'manageusers usercard #deleteUserBtn': {
                click: this.deleteUser
            },
            'manageusers usercard': {
                afterrender: this.addUser
            }
        });
    },
    /**
     * создания новой записи
     */
    addUser: function () {
        var me = this;
        me.getUserFieldset().enable();
        me.getUserFieldset().setTitle('Создание пользователя');
        //создание нового объекта в модели
        var newUser = Ext.create('UH.model.User');
        //поля модели отображаются на форме путем сопоставления атрибутов name
        me.getUserCard().loadRecord(newUser);
        //блокировка кнопки
        me.getDeleteUserBtn().disable();
    },
     /**
     * метод загружает на форму данные из модели
     */
    onSelectUser: function (grid, record) {
        var me = this;
        me.getUserFieldset().enable();
        me.getUserFieldset().setTitle("Редактирование пользователя");
        me.getUserCard().loadRecord(record);
    },
    /**
     * метод вызывает сохранение объекта на сервере
     */
    saveUser: function () {
        var me = this;
        var userCard = me.getUserCard();
        var user = userCard.getRecord();
        var values = userCard.getValues();
        var store = me.getUserList().getStore();
        if (user !== null) {
	         //валидация данных
            if (user.isValid()) {
	            //инициализация полей в модели
                user.set(values);
                if (!user.dirty) {
                    me.showInfo('Нет изменений!');
                    return;
                }
                var callbacks;
                callbacks = {
                    success: function (records, operation) {
                        me.showInfo("Данные успешно сохранены!");
                        store.reload();//перезагрузка хранилища
                        me.getUserFieldset().disable();
                        me.getUserFieldset().setTitle("Форма пользователя");
                    },
                    failure: function (response, operation) {
                        var result = operation.request.scope.reader.jsonData;
                        me.showError(result.message);
                    }
                };
                  //сохранения данных на сервере
                user.save(callbacks);
            } else {
                me.showError('Форма заполнена с ошибками');
            }
        }
    },
     /**
     *метод удаления объекта 
     */
    deleteUser: function () {
        var me = this;
        var userCard = me.getUserCard();
        var user = userCard.getRecord();
        Ext.Msg.confirm('Подтверждение ', 'Вы действительно хотите удалить пользователя ' + user.get('lastName') + ' ' + user.get('firstName') + '?',
                function (btn) {
                    if (btn === 'yes') {
                        user.destroy({
                            success: function (records, operation) {
                                me.showInfo("Данные успешно удаленны!");
                                userCard.getForm().reset();
                                me.getUserFieldset().disable();
                                me.getUserFieldset().setTitle("Форма пользователя");
                            },
                            failure: function (response, operation) {
                                console.log(operation.request.scope.reader.jsonData)
                                var result = operation.request.scope.reader.jsonData;
                                console.log(result)
                                me.showError(result.message);
                            }
                        });
                    }
                });
    },
    showInfo: function (msg) {
        Ext.MessageBox.show({
            title: 'Информационное сообщение',
            msg: msg,
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.INFO
        });
    },
    showError: function (msg) {
        Ext.MessageBox.show({
            title: 'Сообщение об ошибке',
            msg: msg,
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
    }
});


