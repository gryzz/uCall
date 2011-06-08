/**
 * @class uCall.widgets.UserStatusMenuButton
 * @extends Ext.Button
 *
 * Shows user status menu.
 *
 * @constructor
 * Create a new User Status Menu Button
 * @param {Object} config The config object
 */

Ext.define('uCall.widgets.UserStatusMenuButton', {
    extend: 'Ext.Button',
    alias: 'widget.UserStatusMenuButton',
    
    onMenuItemClick: function(){
		console.log("TODO: UserStatusMenuButton.onItemClick. Handle!");
	},
	
    config: {
    	id: 'UserStatusMenuButton',
		text: "Status Menu",
		menu: {
			xtype: 'menu',
			items: [
				{text: "Available"},
				{text: "Away"},
				{text: "N/A"},
				'-',
				{text: "Logout"}
			]

		}
    },
    
	constructor: function(){
		// Initialize
		Ext.applyIf(this, this.config);
		this.callParent(arguments);
		
		// Event Handlers
		this.menu.on("click", this.onMenuItemClick);

		console.log("TODO: UserStatusMenuButton(). Pass a 'User' model!");
		console.log("TODO: UserStatusMenuButton(). Create 'real' events and add listeners!");
	}
});