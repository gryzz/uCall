Ext.define('uCall.controllers.MessagesDeck', {

    requires: [
	'uCall.controllers.AbstractController'
    ],

    extend: 'uCall.controllers.AbstractController',

    id: 'ucall-controllers-messagesdeck',

    counter: 0,

    add: function(id, message) {
	this.counter++;

	alert(this.counter);
    },

    remove: function(id) {
	alert(id);
    }
    
});
