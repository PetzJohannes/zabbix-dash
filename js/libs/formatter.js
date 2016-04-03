define(['zabbix'], function(zabbix) {
    return {
        getHumanTime: function (value) {
            var timeval = new Date(value*1000);
            return this.leadingZero(timeval.getDate()) + "." +
                this.leadingZero((timeval.getMonth()+1)) + "." +
                timeval.getFullYear() + " " +
                this.leadingZero(timeval.getHours()) + ":" +
                this.leadingZero(timeval.getMinutes()) + ":" +
                this.leadingZero(timeval.getSeconds());
        },
        leadingZero: function (value) {
            return ('0' + value).slice(-2);
        },
        priority: function (value) {
            var returnval = 'Not classified';
            switch(parseInt(value)) {
                case 5:
                    returnval = 'Disaster';
                    break;
                case 4:
                    returnval = 'High';
                    break;
                case 3:
                    returnval = 'Average';
                    break;
                case 2:
                    returnval = 'Warning';
                    break;
                case 1:
                    returnval = 'Information';
                    break;
                default:
                    returnval = 'Not classified';
                    break;
            }
            return '<span class="label trigger-label-' + returnval.toLowerCase().replace(/\s/g, '') + ' trigger-label-font-color">' + returnval + '</span>';
        },
        acknowledgeState: function (value) {
            var type = "success",
            text = "Acknowledged",
            eventid = value.eventid;
            if ( parseInt(value.acknowledged) === 0 ) {
                type = "danger";
                text = "Acknowledge";
            }
            return '<a href="#" class="eventAcknowledge" id="' + eventid + '"><span class="label label-' + type + '">' + text + '</span></a>';
        },
        inputValidate: function ($field, value) {
            if ( value === "" ) {
                $field.parent().addClass("has-error");
                ok = false;
            } else {
                $field.parent().removeClass("has-error");
                ok = true;
            }
            return ok;
        },
        hostElement: function (value) {
            return '<a href="#" id="' + value.hostid + '">' + value.host + '</a>';
        },
        formatStatus: function (value) {
            value = parseInt(value);
            var status = "success",
                label = "Enabled";
            if ( value === 1 ) {
                status = "danger";
                label = "Disabled";
            }
            return '<span class="label label-' + status + '">' + label + '</span>';
        },
        formatNumWithText: function (value, text) {
            return '<a href="#">' + text + ' <span class="badge">' + value + '</span></a>';
        },
        formatLatestData: function (value) {
            return '<a href="?view=latestdata&hostid=' + value + '">Latest data</a>';
        },
        formatInterfaceData: function (value) {
            var interfaces = {
                    agent: {
                        interface: null,
                        name: "Z",
                        lable: "default"
                        },
                    snmp: {
                        interface: null,
                        name: "S",
                        lable: "default"
                        },
                    jmx: {
                        interface: null,
                        name: "J",
                        lable: "default"
                        },
                    ipmi: {
                        interface: null,
                        name: "I",
                        lable: "default"
                        }
                },
                interfaceReturn = "";
            for (var i = 0; i < value.length; i++) {
                var type = parseInt(value[i]['type']),
                    defaultInt = parseInt(value[i].main);
                if ( type === 1 && defaultInt === 1 ) {
                    interfaces['agent']['interface'] = value[i];
                    interfaces['agent']['lable'] = "success";
                } else if ( type === 2 && defaultInt === 1 ) {
                    interfaces['snmp']['interface'] = value[i];
                    interfaces['snmp']['lable'] = "success";
                } else if ( type === 3 && defaultInt === 1) {
                    interfaces['ipmi']['interface'] = value[i];
                    interfaces['ipmi']['lable'] = "success";
                } else if ( type === 4 && defaultInt === 1 ) {
                    interfaces['jmx']['interface'] = value[i];
                    interfaces['jmx']['lable'] = "success";
                } else {
                    // TODO
                    //console.log("second interfce not yet supported");
                };
            };

            for (var i in interfaces) {
                interfaceReturn += ' <span class="label label-' + interfaces[i]['lable'] + '">' + interfaces[i]['name'] + '</span>';
            }
            return interfaceReturn;
        }
    };
});
