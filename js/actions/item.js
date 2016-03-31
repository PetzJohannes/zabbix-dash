define(['jquery', 'zabbix'], function( $, zabbix ) {
    return {
        getApplicationItems: function (params, applicationid) {
            var paramszapi = {
                applicationids: applicationid,
                monitored: true
            };
            zabbix.tableLoad(params, "item.get", paramszapi);
        }
    }
});