define(['zabbix'], function(zabbix) {
    return {
        getHumanTime: function (value) {
            timeval = new Date(value*1000);
            return timeval.getDate() + "." + (timeval.getMonth()+1) + "." + timeval.getFullYear() + " " + timeval.getHours() + ":" + timeval.getMinutes() + ":" + timeval.getSeconds() + "Uhr";
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
            return '<span class="label trigger-label-' + returnval.toLowerCase().replace(/\s/g, '') + ' label-font-color">' + returnval + '</span>';
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
        descriptionMacro: function (value) {
            //TODO: Here is an macro included. I need to fix this.
            //zabbix.zabbixAjax
            return value;
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
        formatInterfaceData: function (value) {
            return null;
        }
    };
});
