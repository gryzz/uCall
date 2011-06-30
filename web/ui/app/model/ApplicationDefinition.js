Ext.define('uCall.model.ApplicationDefinition', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'integer'},
        {name: 'slug', type: 'string'},
        {name: 'application_form', type: 'auto'}
    ],

    proxy: {
        type: 'direct',
        api: {
            read: Forms.getForm
        },
        listeners: {
            exception: function(/* Object */ response, /* Ext.data.Operation */ operation, /* Object */ options ){
                console.log("[ERROR] " + this.model.$className + ": " + operation.result.msg);
            }
        }
    }
});

