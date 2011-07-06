/**
 * @class uCall.controllers.AgentStatusController
 * @extends Ext.util.Observable
 *
 * Agent Status Controller
 */

Ext.define('uCall.controllers.AgentStatusController', {
    className: 'uCall.controllers.AgentStatusController',
    singleton: true,

    availableEvent: 'available',
    awayEvent: 'away',
    offlineEvent: 'offline',

    config: {

    },

    /**
     *
     * @param {} menu
     * @param {} item
     * @param {} event
     */
    onWidgetMenuItemClick: function(menu, item, event){
        var data = {
            agentId: currentUser.agentId
        };
        switch(item.id) {
            case 'StatusItemOffline':
                data.statusId = 'offline';
                //statusController.offline();
                break;

            case 'StatusItemOnline':
                data.statusId = 'available';
                //statusController.available();
                break;

            case 'StatusItemAway':
                data.statusId = 'away';
                //statusController.away();
                break;
        }
        // TODO: fetch reciver from config
        uCall.controllers.MessageController.sendMessage(data, 'messages/ctrl');
    },

    /**
     * Mark agent as available
     */
    available: function() {
        Ext.getCmp('UserStatusMenuButton').setAvailable();
    },

    /**
     * Mark agent as away
     */
    away: function() {
        Ext.getCmp('UserStatusMenuButton').setAway();
    },

    /**
     * Mark agent as offline
     */
    offline: function() {
        Ext.getCmp('UserStatusMenuButton').setOffline();
    },

    constructor: function(config) {
        // Merge configs
        Ext.apply(this.config, config);
        Ext.apply(this, this.config);

        // Parent
        this.callParent(arguments);

        // Event Handlers
        Ext.onReady(function() {
            var menu = Ext.getCmp('UserStatusMenuButton');
            menu.on(
                "click",
                uCall.controllers.AgentStatusController.onWidgetMenuItemClick,
                menu
            );

            uCall.controllers.MessageController.on(
                uCall.constants.MessageEvent.STATUS_ONLINE,
                function() {
                    uCall.controllers.AgentStatusController.available();
                }
            );

            uCall.controllers.MessageController.on(
                uCall.constants.MessageEvent.STATUS_OFFLINE,
                function() {
                    uCall.controllers.AgentStatusController.offline();
                }
            );

            uCall.controllers.MessageController.on(
                uCall.constants.MessageEvent.STATUS_AWAY,
                function() {
                    uCall.controllers.AgentStatusController.away();
                }
            );
        });


        /**
         * This appears to not be required... ivan
         */
/*        // Register events
        this.addEvents(
            uCall.controllers.AgentStatusController.availableEvent,
            uCall.controllers.AgentStatusController.awayEvent,
            uCall.controllers.AgentStatusController.offlineEvent
        );*/
    }
});
