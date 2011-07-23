/**
 * @class uCall.App
 * @extends Ext.container.Viewport
 *
 * The main uCall application
 */

Ext.define('uCall.App', {
    requires: [
        'uCall.widgets.MainPanel',
        'uCall.controllers.ChannelController',
        'uCall.controllers.GrowlController',
        'uCall.controllers.MessageController',
        'uCall.controllers.ApplicationWindowController',
        'uCall.l10n.L10n',
        'uCall.controllers.AgentStatusController'
    ],
    
    extend: 'Ext.container.Viewport',
    
    id: 'ucall-app',
    
    config: {
        layout: 'fit',
        items: [{xtype: 'MainPanel', width: "100%", height: "100%"}]
    },

    // Declare members
    applicationWindowController: null,
    growlController: null,

    // Constructor
    constructor: function(){
        
        var that = this;

        // Copy config values to current object
        Ext.applyIf(this, this.config);
        // Call parent constructor
        this.callParent(arguments);

        Ext.onReady(function() {
            Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
            /*
             * Init controllers which depends on widgets
             */
            this.growlController = Ext.create('uCall.controllers.GrowlController');
            this.applicationWindowController = Ext.create('uCall.controllers.ApplicationWindowController');

            /*
             */
            uCall.controllers.ChannelController.stompClientAdapter.performConnect();
        });
    }
});
