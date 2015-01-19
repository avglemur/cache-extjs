Ext.define('UH.model.User', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        }, {
            name: 'firstName',
            type: 'string'
        }, {
            name: 'lastName',
            type: 'string'
        }, {
            name: 'dob',
            type: 'date',
            dateFormat: 'd/m/Y'
        }, {
            name: 'email',
            type: 'string'
        }],
    proxy: {
        type: 'ajax', // указываем модели, какой тип прокси использовать
        method: 'POST', //все делаем через POST - запросы
        actionMethods: {
            create: 'POST',
            read: 'POST',
            update: 'POST',
            destroy: 'POST'
        },
        //дополнительный параметр
        extraParams: {
            classname: 'User'
        },
        //url-адреса для обработки запросов на сервере
        api: {
            read: 'http://localhost:57775/csp/user/uh.web.UserHandler.cls?action=read',
            create: 'http://localhost:57775/csp/user/uh.web.UserHandler.cls?action=create',
            update: 'http://localhost:57775/csp/user/uh.web.UserHandler.cls?action=update',
            destroy: 'http://localhost:57775/csp/user/uh.web.UserHandler.cls?action=destroy'
        },
        /*
         * reader  расшифровует  json-формат. 
         * root: 'data' указывает ридеру на то, что корневой узел с данными имеет ключ «data».
         * данные об общем колличестве записей в бд приходят в свойстве total
         * 
         */
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'total',
            successProperty: 'success'
        },
        writer: {
            type: 'json',
            encode: true,
            writeAllFields: true,
            root: 'data',
            record: 'row'
        }
    }

});
