/**
 * @class uCall.App
 * @extends Ext.container.Viewport
 *
 * The main uCall application
 */

Ext.define('uCall.App', {
    requires: [
        'uCall.widgets.MainPanel',
        'uCall.controllers.MessagesDeck',
        'uCall.data.stomp.StompClientAdapterFactory',
        'uCall.controllers.ChannelEventController'
    ],
    
    extend: 'Ext.container.Viewport',
    
    config: {
        layout: 'fit',
        items: [{xtype: 'MainPanel', width: "100%", height: "100%"}]
        ,autoReconnectLimit: 3
        ,autoReconnectTimeout: 1000
        ,reconnectTimeout: 1000
    },
    // Declare members
    messageDeck: null,
    stompClientAdapterFactory: null,
    stompClientAdapter: null,
    channelEventController: null,
    channelStatusIndicator: null,
    autoReconnectCount: 0,
    
    // Constructor
    constructor: function(){
        var that = this;

        var manualChannelReconnect = function() {
            if (!that.stompClientAdapter.isConnected) {
                // Wait before reconnecting
                Ext.defer(that.stompClientAdapter.performConnect, that.reconnectTimeout, that.stompClientAdapter);
            }
        }

        // Copy config values to current object
        Ext.applyIf(this, this.config);
        // Call parent constructor
        this.callParent(arguments);

        /*
         * Init app components
         */
        // Message deck
        this.messageDeck = Ext.create('uCall.controllers.MessagesDeck');

        // performChannelReconnect
        this.channelStatusIndicator = Ext.getCmp("ChannelStatusIndicator");

        // Create channel event controller
        this.channelEventController = Ext.create("uCall.controllers.ChannelEventController", {
            onConnect: function(){
                that.channelStatusIndicator.fireEvent(uCall.constants.ChannelEvent.CONNECTED);

                // Undset on click handler for channel status indicator
                that.channelStatusIndicator.un("click", manualChannelReconnect);
                // Hide popup
                uCall.widgets.ChannelStatusInactivePopup.hide();
            },
            onMessage: function(){
                console.log("onMessage");
            },
            onDisconnect: function(){
                // Propagate event to channel status indicator
                that.channelStatusIndicator.fireEvent(uCall.constants.ChannelEvent.DISCONNECTED);

                // Try reconnecting automatically
                if (that.autoReconnectCount < that.autoReconnectLimit) {
                    that.autoReconnectCount++;
                    Ext.defer(that.stompClientAdapter.performConnect, that.autoReconnectTimeout, that.stompClientAdapter);
                    return;
                }

                // Define on click handler for channel status indicator
                that.channelStatusIndicator.on("click", manualChannelReconnect);
                // Show manual reconnect message
                uCall.widgets.ChannelStatusInactivePopup.show({onClickCallback: manualChannelReconnect});
            },
        });

        // Stomp client adapter factory
        this.stompClientAdapterFactory = Ext.create('uCall.data.stomp.StompClientAdapterFactory', {
            url: window.controlChannel.url,
            login: 'guest',
            passcode: 'password',
            destination: '/queue/messages/SIP/1001',
            sendDestination: '/queue/control',
            pingDestination: '/queue/ping',
            pingMessage: 'SIP/1001',
            debug: true, 

            onConnectCallback: function(){
                // Reset reconnect counter
                that.autoReconnectCount = 0;
                // Propagate channel connect event
                that.channelEventController.fireEvent(uCall.constants.ChannelEvent.CONNECTED);
            },
            onDisconnectCallback: function(){
                // Propagate channel disconnect event
                that.channelEventController.fireEvent(uCall.constants.ChannelEvent.DISCONNECTED);
            },
            onMessageCallback: function(data){
                // Propagate channel message event
                that.channelEventController.fireEvent(uCall.constants.ChannelEvent.MESSAGE, {message: data});
            }
        });

        // Stomp client adapter
        this.stompClientAdapter = this.stompClientAdapterFactory.getAdapter();

        // Do connect
        this.stompClientAdapter.performConnect();
    }    
});
Ext.example = function(){
    var msgCt;

    function createBox(t, s){
       // return ['<div class="msg">',
       //         '<div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>',
       //         '<div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc"><h3>', t, '</h3>', s, '</div></div></div>',
       //         '<div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>',
       //         '</div>'].join('');
       return '<div class="msg"><h3>' + t + '</h3><p>' + s + '</p></div>';
    }
    return {
        msg : function(title, format){
            if(!msgCt){
                msgCt = Ext.core.DomHelper.insertFirst(document.body, {id:'msg-div'}, true);
            }
            var s = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1));
            var m = Ext.core.DomHelper.append(msgCt, createBox(title, s), true);
            m.hide();
            m.slideIn('t').ghost("t", { delay: 1000, remove: true});
        },

        init : function(){
//            var t = Ext.get('exttheme');
//            if(!t){ // run locally?
//                return;
//            }
//            var theme = Cookies.get('exttheme') || 'aero';
//            if(theme){
//                t.dom.value = theme;
//                Ext.getBody().addClass('x-'+theme);
//            }
//            t.on('change', function(){
//                Cookies.set('exttheme', t.getValue());
//                setTimeout(function(){
//                    window.location.reload();
//                }, 250);
//            });
//
//            var lb = Ext.get('lib-bar');
//            if(lb){
//                lb.show();
//            }
        }
    };
}();
