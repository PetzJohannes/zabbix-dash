define(function() {
    return {
        getHumanTime: function (value) {
            timeval = new Date(value*1000);
            return timeval.getDate() + "." + timeval.getMonth() + "." + timeval.getFullYear() + " " + timeval.getHours() + ":" + timeval.getMinutes() + ":" + timeval.getSeconds() + "Uhr";
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
            return '<span class="label label-' + returnval.toLowerCase() + ' label-font-color">' + returnval.replace(/\s/g, '') + '</span>';
        },
        acknowledgeState: function (value) {
            type = "success";
            text = "Acknowledged";
            // TODO eventid
            eventid = "eventidtodo";
            if ( parseInt(value) === 0 ) {
                type = "danger";
                text = "Acknowledge";
            }
            return '<a href="#' + eventid + '" class="eventAcknowledge"><span class="label label-' + type + '">' + text + '</span></a>';
        },
        inputValidate: function(field, value) {
            if ( value === "" ) {
                field.parent().addClass("has-error");
                ok = false;
            } else {
                field.parent().removeClass("has-error");
                ok = true;
            }
            return ok;
        }
    };
});
