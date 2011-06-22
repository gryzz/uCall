/**
 * @class uCall.App
 * @extends Ext.container.Viewport
 *
 * The main uCall application
 */

Ext.define('uCall.App', {
    requires: [
        'uCall.widgets.MainPanel',
        'uCall.data.stomp.StompClientAdapterFactory',
        'uCall.controllers.ChannelEventController',
        'uCall.controllers.GrowlController',
        'uCall.controllers.MessageController',
        'uCall.l10n.L10n'
    ],
    
    extend: 'Ext.container.Viewport',
    
    id: 'ucall-app',
    
    config: {
        layout: 'fit',
        items: [{xtype: 'MainPanel', width: "100%", height: "100%"}],
        autoReconnectLimit: 3,
        autoReconnectTimeout: 1000,
        reconnectTimeout: 1000
    },
    // Declare members
    messageController: null,
    growlController: null,
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
        // Channel messages controller
        this.growlController = Ext.create('uCall.controllers.GrowlController');
        this.messageController = Ext.create('uCall.controllers.MessageController', {
            onShow: function(id, message) {
                that.growlController.add(id, [ {
                    xtype: 'component',
                    html: message,
                }]);
            },
            onHide: function(id) {
                that.growlController.remove(id);
            }
        });
        
        // Channel status indicator
        this.channelStatusIndicator = Ext.getCmp("ChannelStatusIndicator");

        // Create channel event controller
        this.channelEventController = Ext.create("uCall.controllers.ChannelEventController", {
            onConnect: function(){
                that.channelStatusIndicator.fireEvent(uCall.constants.ChannelEvent.CONNECTED);

                // Unset on click handler for channel status indicator
                // TODO: uncomment
                // that.channelStatusIndicator.un("click", manualChannelReconnect);
                // Hide popup
                uCall.widgets.ChannelStatusInactivePopup.hide();
            },
            
            onMessage: function(message){
                that.messageController.handle(message);
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
                // TODO: uncomment
                // that.channelStatusIndicator.on("click", manualChannelReconnect);
                
                // Show manual reconnect message
                uCall.widgets.ChannelStatusInactivePopup.show({onClickCallback: manualChannelReconnect});
            }
        });
        
        // TODO: move to growl controller
        this.popups = [];
        this.alignPopupsTo = this.channelStatusIndicator.el;
        
        var testTip = function() {
            var v = this;
            var t = new Ext.Tip({
                floating: {
                    shadow: false,
                    shim: false
                },
                width: 200,
                height: 50,
                title: 'Tip ' + v.popups.length,
                html: 'Hello world ' + v.popups.length,
                autoHide: false,
                closable: true,
                closeAction: 'destroy' 
            });
            t.showAt([0,0]); // ensure it's rendered and visible so that it has dimensions for following calc
            t.showAt(t.el.getAlignToXY(this.alignPopupsTo, 'tl-bl', [0, 10]));
            // t.hide();
            // t.el.slideIn('l');
            
            t.on("close", function(event){
                console.log(event);
                console.log(t);
                
                var ti = v.popups.indexOf(this);
                delete v.popups[ti];
                v.alignPopupsTo = v.channelStatusIndicator.el;
                
                for(i in v.popups) {
                    var p = v.popups[i]; 
                    p.showAt(p.el.getAlignToXY(v.alignPopupsTo, 'tl-bl', [0, 10]));
                    v.alignPopupsTo = p.el;       
                }
            }, t);
            
            this.popups.push(t);
            this.alignPopupsTo = t.el;
        }
        
        that.channelStatusIndicator.on("click", testTip, this);
        // TODO: remove code above
                

        // Stomp client adapter factory
        this.stompClientAdapterFactory = Ext.create('uCall.data.stomp.StompClientAdapterFactory', {
            url: window.controlChannel.ws_url,
            login: window.controlChannel.username,
            passcode: window.controlChannel.password,
            destination: '/queue/messages/' + window.currentUser.agentId,
            sendDestination: '/queue/control',
            pingDestination: '/queue/ping',
            pingMessage: window.currentUser.agentId,
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
