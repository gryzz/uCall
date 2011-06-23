/**
 * @class uCall.widgets.UserStatusMenuButton
 * @extends Ext.Button
 *
 * Shows user status menu.
 */

Ext.define('uCall.widgets.UserStatusMenuButton', {
    extend: 'Ext.Button',
    alias: 'widget.UserStatusMenuButton',

    iconStatusOnline: "/ui/resources/images/user_status/online.png",
    iconStatusAway: "/ui/resources/images/user_status/away.png",
    iconStatusOffline: "/ui/resources/images/user_status/offline.png",
    
    onMenuItemClick: function(menu, item, event){
        switch(item.id) {
            case 'StatusItemOffline':
		Ext.getCmp('UserStatusMenuButton').setIcon(this.iconStatusOffline);
                break;

            case 'StatusItemOnline':
		Ext.getCmp('UserStatusMenuButton').setIcon(this.iconStatusOnline);
                break;

            case 'StatusItemAway':
		Ext.getCmp('UserStatusMenuButton').setIcon(this.iconStatusAway);
                break;
        }
    },

    config: {
        id: 'UserStatusMenuButton',
        text: 'Agent: ' + window.currentUser.agentId,
        menu: {
            xtype: 'menu',
            items: [
                {text: "Available", icon: "/ui/resources/images/user_status/online.png", id: "StatusItemOnline"},
                {text: "Away", icon: "/ui/resources/images/user_status/away.png", id: "StatusItemAway"},
                {text: "Offline", icon: "/ui/resources/images/user_status/offline.png", id: "StatusItemOffline"}
            ]
        }
    },
    
    constructor: function(){
        // Initialize
        Ext.applyIf(this, this.config);
        this.callParent(arguments);
	
	this.setIcon(this.iconStatusOffline);
        // Event Handlers
        this.menu.on("click", this.onMenuItemClick, this);
    }
});