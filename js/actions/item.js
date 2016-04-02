define(['jquery', 'zabbix'], function( $, zabbix ) {
    return {
        getApplicationItems: function (params, applicationid) {
            var paramszapi = {
                applicationids: applicationid,
                monitored: true
            };
            zabbix.tableLoad(params, "item.get", paramszapi);
        },
        formatItemName: function (value, key) {
            if (/\$[0-9]*/.test(value)) {
                var position = (/\$[0-9]*/.exec(value))[0].substr(1),
                    keyvalues = key.match(/\[(.*?)\]/)[1].split(",");
                value = value.replace("$" + position, keyvalues[position-1]);
            }
            return value;
        },
        formatItemState: function (value, message) {
            if (value == "1") {
                var state = '<div class="alert alert-danger itemInfo" role="alert">' +
                    '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true" title="' + message + '" data-toggle="tooltip" data-placement="top"></span>' +
                    '</div>';
            }
            return state;
        },
        formatItemValue: function (value, unit, valuemapping) {
            var lastvalue = value + " " + unit;
            if (valuemapping !== "0") {
                var paramszapi = {
                        valuemapids: valuemapping,
                        selectMappings: "extend"
                    },
                    success = function (response, status) {
                        var mappings = response.result[0]["mappings"];
                        for (var i in mappings) {
                            if (mappings[i]["value"] === value) {
                                return mappings[i]["newvalue"];
                                break;
                            }
                        }
                    };
                zabbix.zabbixAjax("valuemap.get", paramszapi, success);
            }
            return lastvalue;
        }
    }
});
