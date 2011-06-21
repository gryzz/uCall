/**
 * @class uCall.widgets.UserServiceMenuButton
 * @extends Ext.Button
 *
 * Shows user service menu.
 */

Ext.define('uCall.widgets.UserServiceMenuButton', {
    extend: 'Ext.Button',
    alias: 'widget.UserServiceMenuButton',

    requires: "uCall.widgets.UserSettingsWindow",

    iconSrc: "/ui/resources/images/user_settings/gear.png",
    
    onMenuItemClick: function(menu, item, event){
        console.log("TODO: UserStatusMenuButton.onItemClick. Handle!");

        switch(item.id) {
            case 'UserServiceMenuProfile':
    		var userSettingsWindow = Ext.getCmp("UserSettingsWindow");
    		if (userSettingsWindow == undefined) {
        	    userSettingsWindow = Ext.create("uCall.widgets.UserSettingsWindow");
    		}
    		userSettingsWindow.show();
                break;
        }
    },

    config: {
        id: 'UserServiceMenuButton',
        handler: this.onClick,
	text: window.currentUser.firstName + ' ' + window.currentUser.lastName,
        menu: {
            xtype: 'menu',
            items: [
                {text: "Edit profile", id: "UserServiceMenuProfile", icon: "/ui/resources/images/user_settings/settings.png"}
            ]
        }


    },
    
    constructor: function(){
        // Initialize
        Ext.applyIf(this, this.config);
        this.callParent(arguments);

        // Event Handlers
        this.menu.on("click", this.onMenuItemClick);

        this.setIcon(this.iconSrc);

        console.log("TODO: UserServiceMenuButton(). Implement!");
    }
});