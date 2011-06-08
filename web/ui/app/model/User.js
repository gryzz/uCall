/**
 * @class uCall.model.User
 * @extends Ext.data.Model
 *
 * User model.
 */

Ext.define('uCall.model.User', {
    extend: 'Ext.data.Model',
    fields: ['username', 'firstName', 'lastName', 'agentId', 'is_admin']
});
