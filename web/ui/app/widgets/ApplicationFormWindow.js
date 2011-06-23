Ext.define('uCall.widgets.ApplicationFormWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.ApplicationFormWindow',

    config: {
        id: null,
    	title: 'Application Form',
	    layout: 'fit',
	    height: 270,
	    width: 400,
        formItems: [],
        onSubmit: Ext.emptyFn
    },

    modal: false,
    closable: true,
    maximizable: true,
    
    constructor: function(config){
	    Ext.apply(this.config, config);
	    Ext.apply(this, this.config);
	    
	    this.items = {
            xtype: 'form',
            standardSubmit : false,
            layout: 'anchor',
            height: '100%',
            width: '100%',
            border: false,
            bodyPadding: 10,
            items: this.formItems,

            api: {
                // The server-side must mark the submit handler as a 'formHandler'
                submit: Forms.saveForm
            },

            buttons: [{
                xtype: 'button',
                text: 'Save',
                handler: this.onSubmit
            }]
        };
	    
	    this.callParent(arguments);
	    this.show();
    }

});
