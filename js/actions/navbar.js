define(['jquery', 'zabbix', 'loader'], function( $, zabbix, loader ) {
    return {
        logout: function () {
            $( "#logout").on('click', function () {
                localStorage.removeItem("zbxauth");
                localStorage.removeItem("zbxusername");
                localStorage.removeItem("zbxusersurname");
                location.reload();
            })
        },
        userInformation: function () {
            $( '#usermenu').prepend(localStorage.getItem("zbxusername") + ", " + localStorage.getItem("zbxusersurname") + " ");
        },
        contentSwichter: function () {
            $( '#zbxdashmenu .contentSwitch' ).on('click', function() {
                var listElement = $( this );
                $( '#zabbix-dash-menu li' ).removeClass("active");
                listElement.addClass("active");
                loader.siteLoader($( "#content" ), listElement.find('a').text().toLowerCase());
            });
        }
    }
});