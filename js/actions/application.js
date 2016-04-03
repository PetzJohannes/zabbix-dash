define(['jquery', 'zabbix'], function( $, zabbix ) {
    return {
        getHostApplications: function (params, hostid) {
            var paramszapi = {
                output: ["name"],
                hostids: hostid
            };
            zabbix.tableLoad(params, "application.get", paramszapi);
        }
    }
});