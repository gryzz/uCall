Ext.application({
    name: 'uCall',
    appFolder: 'app',

    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [
                {
                    xtype: 'panel',
                    title: 'uCall',
                    html : 'Application will go here'
                }
            ]
        });
    }
});