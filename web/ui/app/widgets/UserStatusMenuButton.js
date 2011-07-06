/**
 * @class uCall.widgets.UserStatusMenuButton
 * @extends Ext.Button
 *
 * Shows user status menu.
 */

Ext.define('uCall.widgets.UserStatusMenuButton', {
    requires: ['uCall.controllers.AgentStatusController'],
    extend: 'Ext.Button',
    alias: 'widget.UserStatusMenuButton',

    iconStatusOnline: "/ui/resources/images/user_status/online.png",
    iconStatusAway: "/ui/resources/images/user_status/away.png",
    iconStatusOffline: "/ui/resources/images/user_status/offline.png",

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

    setAvailable: function() {
    	this.setIcon(this.iconStatusOnline);
    },

    setAway: function() {
        this.setIcon(this.iconStatusAway);
    },

    setOffline: function() {
        this.setIcon(this.iconStatusOffline);
    },

    constructor: function(){
        // Initialize
        Ext.applyIf(this, this.config);
        this.callParent(arguments);

        this.setIcon(this.iconStatusOffline);
    }
});
