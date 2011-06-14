/**
 * @class uCall.widgets.ChannelStatusInactivePopup
 * @extends Ext.window.Window
 *
 * Shows channel status inactive popup.
 */

Ext.define('uCall.widgets.ChannelStatusInactivePopup', {
    alias: 'widget.ChannelStatusInactivePopup',
    
    config: {
    	title: "Warning", 
    	msg: "You have been disconnected.",
    	modal: false
    },
    
	constructor: function(config){
		// Initialize
		Ext.applyIf(this, this.config);
	},
	
	show: function() {
		Ext.Msg.alert(this.config);
		console.log("TODO: ChannelStatusInactivePopup.show(). Create a popup container to render to.");
		console.log("TODO: ChannelStatusInactivePopup.show(). Create a popup extending window, not aggregating message box.");
	}
});