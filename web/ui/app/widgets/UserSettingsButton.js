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
    
    activeStatusImageSrc: "/ui/resources/images/channel_status/active.png",
    inactiveStatusImageSrc: "/ui/resources/images/channel_status/inactive.png",
    channelStatusActive: false,
    
    onClick: function(){
		Ext.create("uCall.widgets.UserSettingsWindow");
	},
    config: {
    	id: 'ChannelStatusIndicator',
	handler: this.onClick
    },
    
	constructor: function(){
		Ext.applyIf(this, this.config);
		this.callParent(arguments);
	}    
});