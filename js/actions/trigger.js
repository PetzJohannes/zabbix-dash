define(['jquery', 'zabbix'], function( $, zabbix ) {
    return {
        triggerGet: function (params) {
            order = params.data.order.toUpperCase();
            paramszapi = {
                limit: 100,
                selectHosts: "extend",
                // withLastEventUnacknowledged: true,
                selectLastEvent: true,
                only_true: true,
                sortorder: order,
                active: true,
                sortfield: params.data.sort,
                search: {
                    description: params.data.search
                }
            };
            zabbix.tableLoad(params, "trigger.get", paramszapi);
        },
        triggerCount: function ( object, severity) {
            var params = {
                    output: "triggerids",
                    limit: 1000,
                    withLastEventUnacknowledged: true,
                    only_true: true,
                    active: true,
                    filter: {
                        priority: severity
                    },
                    countOutput: true
                },
                success = function (response, status) {
                    object.text(response.result);
                    var parent = object.parent();
                    parent.removeAttr('class');
                    if ( response.result === 0 ) {
                        parent.addClass("color-swatch brand-success");
                    } else {
                        parent.addClass("color-swatch brand-danger");
                    }
                };

            zabbix.zabbixAjax("trigger.get", params, success)
        },
        eventAcknowledge: function () {
            $( 'a .eventAcknowledge' ).on('click', function () {
                // Make Modular open
            });
        }
    }
});