/**
 * @class uCall.widgets.UserStatusMenuButton
 * @extends Ext.Button
 *
 * Shows user status menu.
 */

Ext.define('uCall.widgets.UserStatusMenuButton', {
    extend: 'Ext.Button',
    alias: 'widget.UserStatusMenuButton',
    
    onMenuItemClick: function(menu, item, event){
        console.log("TODO: UserStatusMenuButton.onItemClick. Handle!");

        switch(item.id) {
            case 'StatusItemLogout':
                window.location = window.urls.logoutUrl;
                break;
            case 'StatusItemNA':
                Ext.getCmp('ucall-controllers-messagesdeck').add('id', 'message');
                break;
        }
    },

    config: {
        id: 'UserStatusMenuButton',
        text: 'Agent: ' + window.currentUser.agentId,
        menu: {
            xtype: 'menu',
            items: [
                {text: "Available", icon: "/ui/resources/images/user_status/online.png"},
                {text: "Away", icon: "/ui/resources/images/user_status/away.png"},
                {text: "N/A", icon: "/ui/resources/images/user_status/offline.png", id: "StatusItemNA"},
                '-',
                {text: "Logout", icon: "/ui/resources/images/user_status/logout.png", id: "StatusItemLogout"}
            ]
        }
    },
    
    constructor: function(){
        // Initialize
        Ext.applyIf(this, this.config);
        this.callParent(arguments);
	
	this.setIcon("/ui/resources/images/user_status/offline.png");
        // Event Handlers
        this.menu.on("click", this.onMenuItemClick);
    

        console.log("TODO: UserStatusMenuButton(). Pass a 'User' model!");
        console.log("TODO: UserStatusMenuButton(). Create 'real' events and add listeners!");
    }
});