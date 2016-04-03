define(['jquery', 'zabbix'], function( $, zabbix ) {
    return {
        expandRow: function (index, row, $detail) {
            $detail.html('<table id="' + row.applicationid + '" ' +
                'data-side-pagination="server" ' +
                'data-classes="table table-no-bordered" ' +
                'data-id-field="itemid" ' +
                'data-unique-id="itemid"' +
                '>' +
                '<thead><tr>' +
                '<th data-field="name" data-formatter="formatItemName">Name</th>' +
                '<th data-field="lastclock">Last Check</th>' +
                '<th data-field="lastvalue" data-formatter="formatItemValue">Last Value</th>' +
                '<th data-field="state" data-width="2%" data-align="center" data-formatter="formatItemState">Status</th>' +
                '</tr></thead></table>');
            var $table = $('#' + row.applicationid);
            $table.bootstrapTable({
                ajax: "getApplicationItems",
                ajaxOptions: {applicationid: row.applicationid}
            });
        }
    }
});
