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
        setActiveMenu: function () {
            var view = loader.urlGetter("view");
            $( '#zbxdashmenu').find( '#' + view).addClass("active");
        }
    }
});