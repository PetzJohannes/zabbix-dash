define(['jquery', 'zabbix'], function( $, zabbix ) {
    return {
        triggerGet: function (params) {
            order = params.data.order.toUpperCase();
            paramszapi = {
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
        }
    }
});