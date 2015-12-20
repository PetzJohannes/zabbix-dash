define(['jquery', 'zabbix', 'libs/formatter'], function( $, zabbix, formatter ) {
   return {
       loginHandler: function() {
          $( "#zbxlogin").on('click', function() {
              button = $( this );
              button.prop('disabled', true);
              var usernameField = $( "input[name='username']" ),
                  passwordField = $( "input[name='password']" ),
                  url = $( "input[name='url']").val(),
                  username = usernameField.val(),
                  password = passwordField.val(),
                  usernameok = formatter.inputValidate(usernameField, username),
                  passwordok = formatter.inputValidate(passwordField, password);
              if ( usernameok === true && passwordok === true ) {
                 zabbix.zabbixLogin(username, password, url)
              } else {
                  button.prop('disabled', false);
              }
          });
       },
       urlFiller: function() {
          var url = localStorage.getItem("zbxurl");
          if ( url !== null ) {
             $( "input[name='url']").val(url);
          }
       },
       help: function () {
           var popover = $( '#loginhelp');
           popover.popover({
               placement: "right",
               trigger: "focus",
               title: "Zabbix Dash help",
               html: true,
               content: '<p>Log in with your Zabbix Frontend username and password.</p>' +
                   '<div class="alert alert-info" role="alert">Username is case sensitiv!</div>' +
                   '<div class="alert alert-warning" role="alert">URL Format must be <code>https://zabbix.example.com/</code> The last Slash (/) is required!</div>' +
                   '<p>Zabbix API Version:' +
                   '<ul>' +
                       '<li>Green: all is okay</li>' +
                       '<li>Yellow: API version is not tested</li>' +
                       '<li>Red: No API detected</li>' +
                       '<li>Grey: Not detected yet</li>' +
                   '</ul></p>'
           });
       },
       apiversion: function () {
           var urlField = $( "input[name='url']"),
               urlFieldSpan = $( "#zabbix-version" ),
               loginButton = $( '#zbxlogin' );
               success = function ( response, status ) {
                   urlFieldSpan.removeAttr('class');
                   if ( response.result === "2.4.6" ) {
                       urlFieldSpan.addClass("label label-success");
                   } else {
                       urlFieldSpan.addClass("label label-warning");
                   }
                   loginButton.prop('disabled', false);
                   urlFieldSpan.text(response.result);
               },
               error = function ( response, status ) {
                   urlFieldSpan.removeAttr('class').addClass("label label-danger");
                   urlFieldSpan.text("No valid url");
                   loginButton.prop('disabled', true);
               },
               getVersion = function () {
                   zabbix.zabbixAjax("apiinfo.version", [], success, error, false);
               };
           if ( localStorage.getItem('zbxurl') !== undefined ) {
               getVersion();
           }
           urlField.on('blur', function () {
               var url = urlField.val(),
                   urlok = formatter.inputValidate(urlField, url);
               if ( urlok === true ) {
                   localStorage.setItem('zbxurl', url);
                   getVersion();
               } else {
                   error();
               }
           });
       }
   }
});