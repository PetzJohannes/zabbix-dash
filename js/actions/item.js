define(['jquery', 'zabbix'], function( $, zabbix ) {
    return {
        getApplicationItems: function (params, applicationid) {
            var paramszapi = {
                applicationids: applicationid,
                monitored: true
            };
            zabbix.tableLoad(params, "item.get", paramszapi);
        },
        formatItemValue: function (value, key) {
            if (/\$[0-9]*/.test(value)) {
                var position = (/\$[0-9]*/.exec(value))[0].substr(1);
                //var keyvalues = (/\[([^\]]+)\]/.exec(key))[0];
                var keyvalues = key.match(/\[(.*?)\]/)[1].split(",");
                console.log(position);
                console.log(keyvalues);
                value = value.replace("$" + position, keyvalues[position-1]);
            }
            return value;
        }
    }
});