define(['jquery'], function ( $ ) {
    return {
        siteLoader: function ($appendobject, site) {
            $.ajax({
                dataType: 'html',
                type: 'GET',
                async: true,
                cache: false,
                processData: false,
                timeout: 5000,
                url: "views/" + site + ".html",
                success: function(response, status) {
                    $appendobject.html( response );
                }
            });
        },
        urlGetter: function (name) {
            var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
            if (results==null){
                return "dashboard";
            }
            else{
                return results[1] || 0;
            }
        }
    }
});
