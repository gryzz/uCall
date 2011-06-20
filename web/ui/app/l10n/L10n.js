/**
 * Localization support
 */

Ext.define('uCall.l10n.L10n', {
    singleton: true,
    
    /**
     * Localization
     */
    constructor: function() {
        // make translation _() function global
        window._ = function(str, params) {
            if (arguments.length > 2) {
                params = Array.prototype.slice.call(arguments);
                str = params.shift();
            }
            return uCall.l10n.L10n._(str, params);
        }
    },
    
    /**
     * Translates given string if possible
     * 
     * params can be passed as array of function arguments:
     * - translate("Some %s string %s!", var1, var2);
     * - translate("Some %s string %s!", [var1, var2]);
     * 
     * @param {String} str
     * @param {mixed|Array} params
     * @return {String}
     */
    translate: function(str, params) {
        /**
         * Checks for invocation type and fixes params
         * if needed to contain substitution array
         */
        if (arguments.length > 2) {
            params = Array.prototype.slice.call(arguments);
            str = params.shift();
        }
        console.log('translate: ', str);
        return str;
    },
    
    /**
     * translate() shortcut
     * 
     * @param {String} str
     * @param {mixed|Array} params
     * @return {String}
     */
    _: function(str, params) {
        if (arguments.length > 2) {
            params = Array.prototype.slice.call(arguments);
            str = params.shift();
        }
        return this.translate(str, params);
    }
});
