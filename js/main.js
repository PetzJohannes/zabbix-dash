require.config({
    baseUrl: 'js',
    shim: {
        'bootstrap': ['jquery'],
        'bootstrapdialog': ['bootstrap'],
        'bootstraptable': ['bootstrap'],
        'bootstraptablefiltercontrol': ['bootstraptable']
    },
    paths: {
        jquery: 'libs/jquery.min',
        bootstrap: 'libs/bootstrap.min',
        bootstrapdialog: 'libs/bootstrap-dialog.min',
        bootstraptable: 'libs/bootstrap-table.min',
        bootstraptablefiltercontrol: 'libs/bootstrap-table-filter-control',
        domready: 'libs/domReady'
    }
});

require(["libs/nprogress", "bootstrap"], function(nprogress) {
    $(document).ajaxStart(function() {
        nprogress.start();
    });

    $(document).ajaxComplete(function() {
        nprogress.done();
    });
});