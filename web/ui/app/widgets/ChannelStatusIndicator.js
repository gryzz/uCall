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
    }
});