define(['jquery', 'zabbix'], function( $, zabbix ) {
    return {
        hostsGet: function (params) {
            order = params.data.order.toUpperCase();
            paramszapi = {
            	selectApplications: 'count',
            	selectItems: 'count',
            	selectTriggers: 'count',
            	selectDiscoveries: 'count',
                selectHttpTests: 'count',
            	selectInterfaces: 'extend',
            	sortfield: params.data.sort,
            	sortorder: order,
            	limit: 1000
            };
            zabbix.tableLoad(params, "host.get", paramszapi);
        }
    }
});