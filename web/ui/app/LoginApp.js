/**
 * @class uCall.App
 * @extends Ext.container.Viewport
 *
 * The main uCall application
 * 
 * @constructor
 * Create a new uCall app
 * @param {Object} config The config object
 */

Ext.define('uCall.LoginApp', {
    requires: [
    	'uCall.widgets.LoginWindow'
    ],
    extend: 'Ext.container.Viewport',
    
    config: {
        layout: 'fit',
        items: [
        	{
        		xtype: 'LoginWindow',
        	}
        ]
    },
    
	constructor: function(){
		Ext.applyIf(this, this.config);
		this.callParent(arguments);
		console.log("TODO: App(). Create 'User' model and keep user's data inside it.");
	}    
});
