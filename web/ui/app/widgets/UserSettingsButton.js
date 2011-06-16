/**
 * @class uCall.widgets.ChannelStatusIndicator
 * @extends Ext.Button
 *
 * Shows channel status indicator.
 */

Ext.define('uCall.widgets.UserSettingsButton', {
	requires: "uCall.widgets.UserSettingsWindow",
    extend: 'Ext.Button',
    alias: 'widget.UserSettingsButton',

    iconSrc: "/ui/resources/images/user_settings/gear.png",

    onClick: function(){
        var userSettingsWindow = Ext.getCmp("UserSettingsWindow");
        if (userSettingsWindow == undefined) {
            userSettingsWindow = Ext.create("uCall.widgets.UserSettingsWindow");
        }
		userSettingsWindow.show();
	},
    config: {
    	id: 'UserSettingsButton',
		handler: this.onClick
    },

	constructor: function(){
		Ext.applyIf(this, this.config);
		this.callParent(arguments);
		this.setIcon(this.iconSrc);
	}
});
