Ext.define('UH.store.Users', {
    extend: 'Ext.data.Store',
    model: 'UH.model.User',
    //подгружать данные автоматически
    autoLoad: true,
    //порция данных из 50 записей
    pageSize: 50,
    //автоматически синхронизировать store c сервером, после каждого редактирования записи
    autoSync: false
});
