/**
 * @class uCall.widgets.ChannelStatusIndicator
 * @extends Ext.Button
 *
 * Shows channel status indicator.
 *
 * @constructor
 * Create a new Channel Status Indicator
 * @param {Object} config The config object
 */

Ext.define('uCall.widgets.ChannelStatusIndicator', {
	requires: "uCall.widgets.ChannelStatusInactivePopup",
    extend: 'Ext.Button',
    alias: 'widget.ChannelStatusIndicator',
    
    activeStatusImageSrc: "/ui/resources/images/channel_status/active.png",
    inactiveStatusImageSrc: "/ui/resources/images/channel_status/inactive.png",
    channelStatusActive: false,
    
    onClick: function(){
		if(!this.isChannelStatusActive()) {
			this.channelReconnect();
		}
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
		this.setIcon(this.inactiveStatusImageSrc);
		
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
		this.setIcon(this.activeStatusImageSrc);
		this.delayedFakeDisconnect();
	},
	
	isChannelStatusActive: function() {
		console.log("TODO: ChannelStatusIndicator.isChannelStatusActive. Bind to provider!");
		return this.channelStatusActive;
	}
    
});