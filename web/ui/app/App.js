/**
 * @class uCall.App
 * @extends Ext.container.Viewport
 *
 * The main uCall application
 * 
 * @constructor
 * Create a new uCall app
 * @param {Object} config The config object
 */

Ext.define('uCall.App', {
    requires: [
	'uCall.widgets.MainPanel',
	'uCall.controllers.MessagesDeck'
    ],
    
    extend: 'Ext.container.Viewport',
    
    config: {
        layout: 'fit',
        items: [
        	{
        		xtype: 'MainPanel',
        		width: "100%",
        		height: "100%"
        	}
        ]
    },
    
	constructor: function(){
		Ext.applyIf(this, this.config);
		this.callParent(arguments);
		console.log("TODO: App(). Create 'User' model and keep user's data inside it.");

		Ext.create('uCall.controllers.MessagesDeck');
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