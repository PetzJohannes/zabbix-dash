define(['jquery', 'zabbix'], function( $, zabbix ) {
    return {
        hostsGet: function (params) {
            order = params.data.order.toUpperCase();
            paramszapi = {
                limit: 100

            };
            zabbix.tableLoad(params, "host.get", paramszapi);
        }
    }
});