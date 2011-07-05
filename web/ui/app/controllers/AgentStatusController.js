/**
 * @class uCall.controllers.AgentStatusController
 * @extends Ext.util.Observable
 *
 * Agent Status Controller
 */

Ext.define('uCall.controllers.AgentStatusController', {
    extend: 'Ext.util.Observable',
    className: 'uCall.controllers.AgentStatusController',
    singleton: true,
    
    availableEvent: 'available',
    awayEvent: 'away',
    offlineEvent: 'offline',
    
    config: {
    	
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
