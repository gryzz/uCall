/**
 * @class uCall.widgets.ChannelStatusInactivePopup
 * @extends Ext.window.Window
 *
 * Shows channel status inactive popup.
 */

Ext.define('uCall.widgets.ChannelStatusInactivePopup', {
    alias: 'widget.ChannelStatusInactivePopup',
    
    singleton: true,
    popupWindow: null,
    
    config: {
        title: "Error", 
        height: 150,
        width: 300,
        layout: {
            type: 'fit',
            align: 'center'
        },

        modal: false,
        closable: false,
        resizable: false,
        draggable: false,
        buttonAlign: "center",

        buttons: [{id: "ChannelStatusPopupReconnectButton", text: 'Reconnect'}],
        items: [{
            xtype: 'label',
            text:"You have been disconnected. Try reconnecting manually"
        }]
    },
    
    onClick: function() {
        if(this.onClickCallback) {
            this.onClickCallback();
        }
    },
    
    show: function(config) {
        Ext.apply(this.config, config);
        Ext.applyIf(this, this.config);

        if (!this.popupWindow) {
            this.popupWindow = Ext.create('Ext.window.Window', this.config);
            Ext.getCmp("ChannelStatusPopupReconnectButton").on("click", this.onClick, this);
        }

        this.popupWindow.show();
    },

    hide: function() {
        if (this.popupWindow) {
            this.popupWindow.hide();
        }
    }
});