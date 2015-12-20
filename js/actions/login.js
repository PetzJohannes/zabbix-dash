define(['jquery', 'zabbix', 'libs/formatter'], function( $, zabbix, formatter ) {
   return {
       loginHandler: function() {
          $( "#zbxlogin").on('click', function() {
              button = $( this );
              button.prop('disabled', true);
              var usernameField = $( "input[name='username']" ),
                  passwordField = $( "input[name='password']" ),
                  urlField = $( "input[name='url']" ),
                  username = usernameField.val(),
                  password = passwordField.val(),
                  url = urlField.val();
              var usernameok = formatter.inputValidate(usernameField, username);
              var passwordok = formatter.inputValidate(passwordField, password);
              var urlok = formatter.inputValidate(urlField, url);
              if ( urlok === true ) {
                  localStorage.setItem('zbxurl', url);
              }
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
                   '<div class="alert alert-warning" role="alert">URL Format must be <code>https://zabbix.example.com/</code> The last Slash (/) is required!</div>'
           });
       }
   }
});