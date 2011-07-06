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
                //Ext.getCmp('UserStatusMenuButton').setOffline();
                break;

            case 'StatusItemOnline':
                data.statusId = 'available';
                //statusController.available();
                //Ext.getCmp('UserStatusMenuButton').setAvailable();
                break;

            case 'StatusItemAway':
                data.statusId = 'away';
                //statusController.away();
                //Ext.getCmp('UserStatusMenuButton').setAway();
                break;
        }
        // TODO: fetch reciver from config
        uCall.controllers.MessageController.sendMessage(data, 'messages/ctrl');
    },
    
    /**
     * Mark agent as available
     */
    available: function() {
        console.log(this.className + '.available() callled, firing event');
        this.fireEvent(uCall.controllers.AgentStatusController.availableEvent);
    },
    
    /**
     * Mark agent as away
     */
    away: function() {
        console.log(this.className + '.away() callled, firing event');
        this.fireEvent(uCall.controllers.AgentStatusController.awayEvent);
    },
    
    /**
     * Mark agent as offline
     */
    offline: function() {
        console.log(this.className + '.offline() callled, firing event');
        this.fireEvent(uCall.controllers.AgentStatusController.offlineEvent);
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
