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
		Ext.create("uCall.widgets.UserSettingsWindow");
	},
	
	onChannelStatusActive: function() {
		// TODO: Implement
	},
	
	onChannelStatusInactive: function() {
		// TODO: Implement
	},
	
    config: {
    	id: 'ChannelStatusIndicator',
		handler: this.onClick
    },
    
	constructor: function(){
		Ext.applyIf(this, this.config);
		this.callParent(arguments);
		this.setIcon(this.iconSrc);
		
		console.log("TODO: ChannelStatusIndicator(). Pass a provider!");
		console.log("TODO: ChannelStatusIndicator(). Create 'real' events and add listeners!");
	},
	
	showPopup: function() {
		Ext.create("uCall.widgets.ChannelStatusInactivePopup").show();
	},
	
	delayedFakeDisconnect: function() {
		console.log("TODO: ChannelStatusIndicator.delayedFakeDisconnect. Remove!");
		
		setTimeout(function(that) {
			that.channelStatusActive = false;
			that.setIcon(that.inactiveStatusImageSrc);
			
			that.showPopup();
		}, 5000, this);		

	},
	
	channelReconnect: function() {
		console.log("TODO: ChannelStatusIndicator.channelReconnect. Bind to provider!");
		this.channelStatusActive = true;
		this.setIcon(this.iconSrc);
		this.delayedFakeDisconnect();
	},
	
	isChannelStatusActive: function() {
		console.log("TODO: ChannelStatusIndicator.isChannelStatusActive. Bind to provider!");
		return this.channelStatusActive;
	}
    
});