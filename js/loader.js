define(['jquery'], function ( $ ) {
    return {
        siteLoader: function($appendobject, site) {
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
        }
    }
});
