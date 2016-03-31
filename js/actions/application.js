define(['jquery', 'zabbix'], function( $, zabbix ) {
    return {
        getHostApplications: function (params, hostid) {
            var paramszapi = {
                hostids: hostid
            };
            zabbix.tableLoad(params, "application.get", paramszapi);
        }
    }
});