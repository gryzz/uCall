Ext.define('uCall.controllers.GrowlController', {

    growlContainer: null,

    constructor: function(){
       this.growlMessaging = Ext.getCmp('grows-messaging');
    },
    
    add: function(id, items) {
        
//        var items
        var messageBox = Ext.create('uCall.widgets.GrowlMessage', {items: items, id: id});
//        messageBox.add(items);
		this.growlMessaging.getComponent('GrowlMessagingContainer').add(messageBox);
        messageBox.show();
    },

    remove: function(id) {
        var messageBox = this.growlMessaging.getComponent('GrowlMessagingContainer').getComponent(id);
		this.growlMessaging.getComponent('GrowlMessagingContainer').remove(messageBox, true);
    }
    
});
