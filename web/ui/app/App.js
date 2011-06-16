/**
 * @class uCall.App
 * @extends Ext.container.Viewport
 *
 * The main uCall application
 */

Ext.define('uCall.App', {
    requires: [
	'uCall.widgets.MainPanel',
	'uCall.controllers.MessagesDeck'
    ],
    
    extend: 'Ext.container.Viewport',
    
    config: {
        layout: 'fit',
        items: [
        	{
        		xtype: 'MainPanel',
        		width: "100%",
        		height: "100%"
        	}
        ]
    },
    
	constructor: function(){
		Ext.applyIf(this, this.config);
		this.callParent(arguments);
		console.log("TODO: App(). Create 'User' model and keep user's data inside it.");

		this.messageDeck = Ext.create('uCall.controllers.MessagesDeck');
	}    
});
