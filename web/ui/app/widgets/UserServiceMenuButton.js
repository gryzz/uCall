/**
 * @class uCall.widgets.UserServiceMenuButton
 * @extends Ext.Button
 *
 * Shows user service menu.
 *
 * @constructor
 * Create a new User Service Menu Button
 * @param {Object} config The config object
 */

Ext.define('uCall.widgets.UserServiceMenuButton', {
    extend: 'Ext.Button',
    alias: 'widget.UserServiceMenuButton',
    
    onMenuItemClick: function(){
		console.log("TODO: UserServiceMenuButton.onClick. Handle!");
	},
	
    config: {
    	id: 'UserServiceMenuButton',
		handler: this.onClick,
		text: "Service Menu",
		menu: {
			xtype: 'menu',
			items: [
				{text: "Not Implemented"}
			]
		}
    },
    
	constructor: function(){
		// Initialize
		Ext.applyIf(this, this.config);
		this.callParent(arguments);
		
		// Event Handlers
		this.menu.on("click", this.onMenuItemClick);

		console.log("TODO: UserServiceMenuButton(). Implement!");
		console.log("TODO: UserServiceMenuButton(). Pass a 'User' model!");
		console.log("TODO: UserServiceMenuButton(). Create 'real' events and add listeners!");
	}
});