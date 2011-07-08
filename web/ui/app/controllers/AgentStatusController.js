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
            agent: currentUser.agentId,
            type: 'agent_status'
        };

        switch(item.id) {
            case 'StatusItemOffline':
                data.statusId = 'offline';
                break;

            case 'StatusItemOnline':
                data.statusId = 'available';
                break;

            case 'StatusItemAway':
                data.statusId = 'away';
                break;
        }

        uCall.controllers.ChannelEventController.sendMessage(data, controlChannel.ctrl_channel);
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
            Ext.getCmp('UserStatusMenuButton').menu.on(
                'click',
                uCall.controllers.AgentStatusController.onWidgetMenuItemClick,
                this
            );

            // why define handlers for other controller????
            uCall.controllers.MessageController.on(
                uCall.constants.MessageEvent.STATUS_ONLINE,
                function() {
                    uCall.controllers.AgentStatusController.available();
                }
            );

            // why define handlers for other controller????
            uCall.controllers.MessageController.on(
                uCall.constants.MessageEvent.STATUS_OFFLINE,
                function() {
                    uCall.controllers.AgentStatusController.offline();
                }
            );

            // why define handlers for other controller????
            uCall.controllers.MessageController.on(
                uCall.constants.MessageEvent.STATUS_AWAY,
                function() {
                    uCall.controllers.AgentStatusController.away();
                }
            );
        });
    }
});
