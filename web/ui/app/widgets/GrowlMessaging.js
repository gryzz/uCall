Ext.define('uCall.widgets.GrowlMessaging', {

    extend: 'Ext.container.Container',
	alias: 'widget.GrowlMessaging',
    
	requires: [
		'uCall.widgets.GrowlMessage'
	],
	
    config: {
		id: 'GrowlMessaging',
		width: 250,
		layout: 'border'
    },

    constructor: function(){
		var that = this;
		this.config.items = [{
			region: 'south',
			
			xtype: 'toolbar',
			items: {
				xtype: 'button',
				text: 'add',
				handler: function(){
					that.createMessage()
				}
			}
		}, {
			region: 'north',
			height: '100%',
			xtype: 'container',
//			layout: 'vbox',
			id: 'GrowlMessagingContainer',
			border: 0,
		}, {
			region: 'center'
		}]

		Ext.applyIf(this, this.config);
		this.callParent(arguments);
		this.show();
    },

	createMessage: function(){
        var growl = Ext.create('uCall.widgets.GrowlMessage');
//        console.log(growl);
        this.getComponent('GrowlMessagingContainer').add(growl);
        growl.show();
//        growl.renderTo(this.getComponent('GrowlMessagingContainer'));
//        growl.show();
		//this.getComponent('GrowlMessagingContainer').add();
	}
});