define(['jquery', 'zabbix', 'libs/formatter'], function( $, zabbix, formatter ) {
    return {
        sumEventsTrigger: function(triggerid, $eventObject, $acknowledgeObject) {
            var params = {
                    objectids: triggerid,
                    select_acknowledges: 'extend',
                    object: 0
                },
                success = function (response, status) {
                    $eventObject.text(response.result.length);
                    $acknowledgeObject.text(response.result[0].acknowledges.length);
                };
            zabbix.zabbixAjax("event.get", params, success);
        },
        appendMessages: function(eventid, $object) {
            var params = {
                eventids: eventid,
                select_acknowledges: 'extend',
                object: 0
                },
                acknowledges = "",
                success = function (response, status) {
                    $.each(response.result[0].acknowledges, function (index, value) {
                        acknowledges += '<li class="list-group-item"><dl class="dl-horizontal">'
                            + '<dt>Reporter</dt><dd>' + value.name + ', ' + value.surname + '</dd>'
                            + '<dt>Date</dt><dd>' + formatter.getHumanTime(value.clock) + '</dd>'
                            + '<dt>Message</dt><dd>' + value.message + '</dd>'
                            + '</dl></li>';
                        //acknowledges += '<li class="list-group-item">'
                        //    + '<p class="no-bottom-buffer">' + value.name + ', ' + value.surname + ' (' + formatter.getHumanTime(value.clock) + '):</p>'
                        //    + '<dl><dt>Message</dt><dd>' + value.message + '</dd></dl>'
                        //    + '</li>';

                    });
                    $object.append(acknowledges);
                };
            zabbix.zabbixAjax("event.get", params, success);
        }
    }
});