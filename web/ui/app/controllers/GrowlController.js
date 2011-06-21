Ext.define('uCall.controllers.GrowlController', {

    growlContainer: null,

    constructor: function(){
       this.growlMessaging = Ext.getCmp('growl-messaging-container');
    },
    
    add: function(id, items) {
        var messageBox = Ext.create('uCall.widgets.GrowlMessage', {items: items, id: this.generateId(id)});
		this.growlMessaging.add(messageBox);
        messageBox.show();
    },
    
    remove: function(id) {
        var messageBox = this.growlMessaging.getComponent('GrowlMessagingContainer').getComponent(this.generateId(id));
		this.growlMessaging.remove(messageBox, true);
    },
    
    generateId: function(str){
        return str ? 'growl_messaging_' + str : '';
    }
});
