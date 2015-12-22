define(['jquery', 'zabbix'], function( $, zabbix ) {
    return {
        sumEventsTrigger: function(triggerid, $object) {
            var params = {
                    objectids: triggerid,
                    object: 0,
                    countOutput: true
                },
                success = function (response, status) {
                    $object.text(response.result);
                };
            zabbix.zabbixAjax("event.get", params, success);
        }
    }
});