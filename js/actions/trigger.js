define(['jquery', 'zabbix', 'actions/event', 'bootstraptable'], function( $, zabbix, event ) {
    return {
        triggerGet: function (params) {
            order = params.data.order.toUpperCase();
            paramszapi = {
                limit: 100,
                selectHosts: "extend",
                // withLastEventUnacknowledged: true,
                selectLastEvent: true,
                only_true: true,
                sortorder: order,
                active: true,
                sortfield: params.data.sort,
                search: {
                    description: params.data.search
                }
            };
            zabbix.tableLoad(params, "trigger.get", paramszapi);
        },
        triggerCount: function ( object, severity) {
            var params = {
                    output: "triggerids",
                    limit: 1000,
                    withLastEventUnacknowledged: true,
                    only_true: true,
                    active: true,
                    filter: {
                        priority: severity
                    },
                    countOutput: true
                },
                success = function (response, status) {
                    object.text(response.result);
                    var parent = object.parent();
                    parent.removeAttr('class');
                    if ( response.result === 0 ) {
                        parent.addClass("color-swatch brand-success");
                    } else {
                        parent.addClass("color-swatch brand-danger");
                    }
                };

            zabbix.zabbixAjax("trigger.get", params, success)
        },
        eventAcknowledge: function () {
            $('#content').on('click', '#triggertable .eventAcknowledge', function() {
                // Make Modular open
                var $modal = $( '#acknowledge-modal'),
                    $triggerdata = $( this ).closest('tr'),
                    eventid = $triggerdata.find( 'a.eventAcknowledge').attr('id'),
                    cell = {
                        index: $triggerdata.attr('data-index'),
                        field: "lastEvent",
                        value: {
                            eventid: eventid
                        }
                    },
                    $triggerhead = $( '#acknowledge-trigger-header'),
                    triggerdescription = $triggerdata.find( 'td.description' ).text(),
                    triggerhostname = $triggerdata.find( 'td.hostname').text(),
                    triggerid = $triggerdata.find( 'td.triggerid').text();
                // Generate modal data
                $modal.find('#acknowledge-event-trigger-description').text(triggerdescription);
                $modal.find('#acknowledge-hostname').text(triggerhostname);
                event.sumEventsTrigger(triggerid, $modal.find('#events-sum'), $modal.find('#acknowledge-sum'));
                $modal.modal('show');

                $( '#acknowledge-event' ).on('click', function () {
                    var $acknowledgebutton = $( this),
                        message = $modal.find( '#acknowledge-comment').val(),
                        success = function (response, status) {
                            $modal.modal('hide');
                            $triggerhead.removeClass('panel-danger').addClass('panel-primary');
                            cell.value = $.extend({
                                acknowledged: 1
                            }, cell);
                            // TODO: This is maybe a bug
                            // Try console.log(cell) to determine if this json is ok
                            $('#triggertable').bootstrapTable('updateCell', cell);
                            $acknowledgebutton.prop('disabled', false);
                        },
                        error = function (response, status) {
                            $triggerhead.removeClass('panel-primary').addClass('panel-danger');
                            $acknowledgebutton.prop('disabled', false);
                        };
                    params = {
                        eventids: eventid,
                        message: message
                    };
                    if ( message.length <= 4 ) {

                    } else {
                        zabbix.zabbixAjax("event.acknowledge", params, success, error);
                    }
                });
                $modal.on('shown.bs.modal', function () {
                    $('#acknowledge-comment').focus()
                });
                $modal.on('click', '#expand-acknowledge', function () {
                    var $list = $( '#acknowledge-list' ),
                        $listItems = $list.find( 'li');
                    if ( $listItems.length === 0 ) {
                        event.appendMessages(eventid, $list);
                    } else {
                        $listItems.remove();
                    }
                });
            });
        }
    }
});