Ext.define('uCall.controllers.MessagesDeck', {

    requires: [
	'uCall.controllers.AbstractController'
    ],

    extend: 'uCall.controllers.AbstractController',

    add: function(id, message) {
	alert(message);
    },

    remove: function(id) {
	alert(id);
    }
    
});
