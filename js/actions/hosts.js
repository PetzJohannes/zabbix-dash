define(['jquery', 'zabbix'], function( $, zabbix ) {
    return {
        hostsGet: function (params) {
            var order = params.data.order.toUpperCase(),
                paramszapi = {
                	selectApplications: 'count',
                	selectItems: 'count',
                	selectTriggers: 'count',
                	selectDiscoveries: 'count',
                    selectHttpTests: 'count',
                	selectInterfaces: 'extend',
                	sortfield: params.data.sort,
                	sortorder: order,
                	limit: 1000,
                    search: {
                        name: params.data.search
                    }
                };
            zabbix.tableLoad(params, "host.get", paramszapi);
        }
    }
});