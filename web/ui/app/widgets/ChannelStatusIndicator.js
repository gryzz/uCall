/**
 * @class uCall.widgets.ChannelStatusIndicator
 * @extends Ext.Button
 *
 * Shows channel status indicator.
 */

Ext.define('uCall.widgets.ChannelStatusIndicator', {
	requires: [
		"uCall.widgets.ChannelStatusInactivePopup",
		'uCall.constants.ChannelEvent'
	],
    extend: 'Ext.Button',
    alias: 'widget.ChannelStatusIndicator',
    
    activeStatusImageSrc: "/ui/resources/images/channel_status/active.png",
    inactiveStatusImageSrc: "/ui/resources/images/channel_status/inactive.png",
    channelStatusActive: false,
    
    onClick: function(){
		if(!this.channelStatusActive) {
			this.performChannelReconnect();
		}
	},
	
	onChannelStatusActive: function() {
		// Set channel starus flag
		this.channelStatusActive = true;
		// Set icon
		this.setIcon(this.activeStatusImageSrc);
	},
	
	onChannelStatusInactive: function() {
		// Set channel starus flag
		this.channelStatusActive = false;
		// Set icon
		this.setIcon(this.inactiveStatusImageSrc);
		
		// Auto reconnect
		this.performChannelReconnect();
	},
	
    config: {
    	id: 'ChannelStatusIndicator'
    },
    
	constructor: function(){
		Ext.applyIf(this, this.config);
		this.callParent(arguments);
		
		// Set channel starus flag
		this.channelStatusActive = false;
		// Set icon
		this.setIcon(this.inactiveStatusImageSrc);
		
		this.addEvents(uCall.constants.ChannelEvent.CONNECTED, uCall.constants.ChannelEvent.DISCONNECTED);
		
		this.on(uCall.constants.ChannelEvent.CONNECTED, this.onChannelStatusActive, this);
		this.on(uCall.constants.ChannelEvent.DISCONNECTED, this.onChannelStatusInactive, this);
		this.on("click", this.onClick, this);
	},
	
	showPopup: function() {
		Ext.create("uCall.widgets.ChannelStatusInactivePopup").show();
	},
	
	performChannelReconnect: Ext.emptyFn
});