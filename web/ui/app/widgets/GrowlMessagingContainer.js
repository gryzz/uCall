Ext.define('uCall.widgets.GrowlMessagingContainer', {

    extend: 'Ext.container.Container',
	alias: 'widget.GrowlMessagingContainer',
    
    id: 'growl-messaging-container',
    
	requires: [
		'uCall.widgets.GrowlMessage'
	],

    config: {
		id: 'GrowlMessaging',
		width: 250
    },

    constructor: function(){
		var that = this;

		Ext.applyIf(this, this.config);
		this.callParent(arguments);
		this.show();
    },

	createMessage: function(){
        var growl = Ext.create('uCall.widgets.GrowlMessage');
        this.add(growl);
        growl.show();
	}
});

