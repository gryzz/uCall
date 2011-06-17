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
        text: "Status Menu",
        menu: {
            xtype: 'menu',
            items: [
                {text: "Available"},
                {text: "Away"},
                {text: "N/A", id: "StatusItemNA"},
                '-',
                {text: "Logout", id: "StatusItemLogout"}
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