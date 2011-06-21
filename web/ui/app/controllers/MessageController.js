/**
 * @class uCall.controllers.MessageController
 * @extends Ext.util.Observable
 *
 * Message controller.
 */

Ext.define('uCall.controllers.MessageController', {
    requires: ['uCall.constants.MessageEvent'],
    extend: 'Ext.util.Observable',

    constants: {
        RING: 'r',
        UNLINK: 'u'
    },

    parseMessage: function(m) {
        var message = Ext.JSON.decode(m.message.data.body);
        switch(message.e){
            case this.constants.RING:
                this.fireEvent(uCall.constants.MessageEvent.SHOW, message.u, 'User ' + message.u + ' is waiting ...'); 
            break;
            case this.constants.UNLINK:
                this.fireEvent(uCall.constants.MessageEvent.HIDE, message.u);
            break;
        }
    },
    
    config: {
        onShow: Ext.emptyFn,
        onHide: Ext.emptyFn
    },

    constructor: function(config) {
        // Parent
        this.callParent(arguments);
        // Merge configs
        Ext.apply(this.config, config);
        Ext.applyIf(this, this.config);
        // Register events
        this.addEvents(
            uCall.constants.MessageEvent.SHOW,
            uCall.constants.MessageEvent.HIDE
        );
        // Add listeners
        this.on(uCall.constants.MessageEvent.SHOW, this.onShow, this);
        this.on(uCall.constants.MessageEvent.HIDE, this.onHide, this);
    }
});
