define(['jquery'], function () {
    return {
        zabbixLogin: function (username, password, url) {
            var params = {};
            params = $.extend({
                extendoutput: true,
                limit: 10,
                user: username,
                password: password,
                userData: true
            }, params);
            var success = function(response, status) {
                if ( response.error !== undefined ) {
                    $( "#failmessage").text(response.error.data);
                    $( "#faillogin" ).modal("show");
                    $( '#zbxlogin' ).prop('disabled', false);
                } else {
                    localStorage.setItem('zbxusername', response.result.name);
                    localStorage.setItem('zbxusersurname', response.result.surname);
                    localStorage.setItem('zbxauth', response.result.sessionid);
                    location.reload();
                }
            };
            var error = function(response, status) {
                if ( status === "error" ) {
                    status = '<p>If your Zabbix Frontend certificate is self signed, you may have to import it to your browser first.</p>' +
                                '<a target="_blank" href="'+ url + '">' + url + '</a>';
                }
                $( "#failmessage").html(status);
                $( "#faillogin" ).modal("show");
                $( '#zbxlogin' ).prop('disabled', false);
            };
            this.zabbixAjax("user.login", params, success, error, false);
        },
        tableLoad: function (tableObject, method, params) {
            var success = function (response, status) {
                console.log(response);
                tableObject.success({
                    rows: response.result
                });
                tableObject.complete();
            };
            this.zabbixAjax(method, params, success);
        },
        zabbixAjax: function (method, params, success, error, global) {
            success = typeof success !== 'undefined' ? success : function (response, status) { console.log(response) };
            error = typeof error !== 'undefined' ? error : function (response, status) { console.log(response) };
            global = typeof global !== 'undefined' ? global : true;

            var rpcid = 0;
            // Require Zabbix API Parameter
            params = $.extend({
                editable: true,
                extendoutput: true
            }, params);

            $.ajax({
                contentType: 'application/json-rpc',
                dataType: 'json',
                crossDomain: true,
                type: 'POST',
                async: true,
                cache: false,
                processData: false,
                timeout: 5000,
                global: global,
                url: localStorage.getItem('zbxurl') + 'api_jsonrpc.php',
                data: JSON.stringify({
                    jsonrpc: '2.0',
                    id: ++rpcid,
                    auth: localStorage.getItem('zbxauth'),
                    method: method,
                    params: params
                }),
                success: success,
                error: error
            });
        }
   }
});
