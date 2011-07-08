/**
 * @class uCall.controllers.ApplicationWindowController
 * @extends Ext.util.Observable
 *
 * Application Window controller.
 */

Ext.define('uCall.controllers.ApplicationWindowController', {
    requires: [
        'uCall.constants.MessageEvent',
        'uCall.model.ApplicationDefinition',
        'uCall.widgets.ApplicationFormWindow',
        'uCall.widgets.GrowlMessage'
    ],
    
    extend: 'Ext.util.Observable',
    
    onShow: function(message){

        alert('!!');

        uCall.model.ApplicationDefinition.load(message.e, {
            scope: this,
            failure: function(record, operation) {
                var messageBox = Ext.create('uCall.widgets.GrowlMessage', {
                   items: {
                       xtype: 'component',
                       html: 'Unknown customer number: ' + message.e
                   },
                   floating: true,
                   closable: true
               });
                
                messageBox.show();
            },
            callback: function(record, operation) {
                // void
            },
            success: function(record, operation) {
                var applicationDefinition = record.data;
                var applicationFormItems = applicationDefinition.application_form;

                // FIXME: Brutal hack!
                // ExtJS serializer is too old and sets the wrong attribute to hide a field
                for (var i in applicationFormItems) {
                    if (applicationFormItems[i].fieldHidden) {
                        applicationFormItems[i].hidden = true;
                        // TODO: try setting it on server-side
                        applicationFormItems[i].allowBlank = true;
                    }
                }

                applicationFormItems.push({
                    xtype: 'hiddenfield',
                    name: 'application_definition_id',
                    value: applicationDefinition.id
                });

                // TODO: Do something with this!
                for (var item in applicationFormItems) {
                    applicationFormItems[item].labelWidth = 200;
                    applicationFormItems[item].labelAlign = "right";
                }

                Ext.create('uCall.widgets.ApplicationFormWindow', {
                    title: applicationDefinition.slug, // TODO: use app.def. title!
                    formItems: applicationFormItems,
                    onSubmit: function() {
                        // TODO: Implement! (Copy-Paste from update profile)

                     var form = this.up('form').getForm();
                        if (form.isValid()) {
                            that = this;
                            form.submit({
                                waitMsg: 'Submitting your data...',
                                success: function(form, action){
                                    //TODO: Add messageBox that exdent common one
                                    that.up('form').getForm().reset();
                                    that.up('window').hide();
                                    Ext.MessageBox.alert('Thank you!', 'Your application has been saved.');
                                },
                                failure: function(form, action){
                                     var messageBox = Ext.create('uCall.widgets.GrowlMessage', {
                                        items: {
                                            xtype: 'component',
                                            html: 'Something went wrong'
                                        },
                                        floating: true,
                                        closable: true,
                                        id: 'id'}
                                     );

                                     messageBox.show();
                                }
                            });
                     }
                    }
                });
            }
        });
    },
    
    constructor: function(config) {
        // Parent
        this.callParent(arguments);
        
        // Merge configs
        Ext.apply(this.config, config);
        Ext.apply(this, this.config);

        this.on(uCall.constants.MessageEvent.INCOMING_CALL_LINK, this.onShow, this);
    }
});