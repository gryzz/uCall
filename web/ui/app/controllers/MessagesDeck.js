Ext.define('uCall.controllers.MessagesDeck', {
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
