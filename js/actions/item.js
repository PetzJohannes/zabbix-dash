define(['jquery', 'zabbix', 'libs/formatter'], function( $, zabbix, formatter ) {
    return {
        getApplicationItems: function (params, applicationid) {
            var paramszapi = {
                output: [
                    "name",
                    "key_",
                    "lastvalue",
                    "state",
                    "error",
                    "lastclock",
                    "prevvalue",
                    "units",
                    "valuemapid",
                    "value_type"
                ],
                applicationids: applicationid,
                monitored: true
            };
            zabbix.tableLoad(params, "item.get", paramszapi);
        },
        formatItemName: function (value, key) {
            if (/\[(.*?)\]/.test(key)) {
                var keyvalues = key.match(/\[(.*?)\]/)[1].split(",");
            }
            while (/\$[0-9]*/.test(value)) {
                value = this.changeParameterToHumanRead(value, keyvalues);
            }
            return value;
        },
        changeParameterToHumanRead: function (string, keyvalues) {
            var position = (/\$[0-9]*/.exec(string))[0].substr(1);
            return string.replace("$" + position, keyvalues[position-1]);
        },
        formatItemState: function (value, message) {
            if (value == "1") {
                var state = '<div class="alert alert-danger itemInfo" role="alert">' +
                    '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true" title="' + message + '" data-toggle="tooltip" data-placement="top"></span>' +
                    '</div>';
            }
            return state;
        },
        formatItemValue: function (value, unit, valuemapping, valuetype, itemid, rowid) {
            var byteunits = ["", "K", "M", "G", "T"];
            switch (unit) {
                case "B":
                    for (var helper in byteunits) {
                        if (parseFloat(value) > 1024) {
                            value = value / 1024;
                        } else {
                            unit = byteunits[helper] + "B";
                            break;
                        }
                    }
                    value = Math.round(value * 100) / 100;
                    break;
                case "unixtime":
                    value = formatter.getHumanTime(value);
                    unit = "";
            }
            var filler = (unit === "") ? "" : " ",
                lastvalue = value + filler + unit;
            if (valuemapping !== "0") {
                this.resolvValueMapping(value, valuemapping, lastvalue, itemid, rowid);
            }
            return lastvalue;
        },
        formatPrevItemValue: function (prevvalue, lastvalue, valtype) {
            if ( prevvalue !== lastvalue) {
                if (valtype === "0") {
                    return prevvalue;
                } else if (valtype === "3") {
                    // TODO: changeval
                    return prevvalue;
                }
                return prevvalue;
            } else {
                return "-";
            }
        },
        resolvValueMapping: function (value, valuemapping, lastvalue, itemid, rowid) {
            var paramszapi = {
                    valuemapids: valuemapping,
                    selectMappings: "extend"
                },
                success = function (response) {
                    var mappings = response.result[0]["mappings"];
                    for (var i in mappings) {
                        if (mappings[i]["value"] === value) {
                            var $table = $( 'tr[data-uniqueid="' + itemid + '"]').closest('table');
                            $table.bootstrapTable('updateCell', {
                                index: rowid,
                                field: "lastvalue",
                                value: mappings[i]["newvalue"] + " (" + lastvalue + ")"
                            });
                            break;
                        }
                    }
                };
            zabbix.zabbixAjax("valuemap.get", paramszapi, success);
        }
    }
});
