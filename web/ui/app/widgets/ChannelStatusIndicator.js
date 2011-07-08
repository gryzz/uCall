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
    
    setActive: function() {
        // Set channel starus flag
        this.channelStatusActive = true;

        // Set icon
        this.setIcon(this.activeStatusImageSrc);
    },

    setInactive: function() {
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
    }
});