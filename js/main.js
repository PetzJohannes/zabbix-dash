require.config({
    baseUrl: 'js',
    shim: {
        'bootstrap': ['jquery'],
        'bootstrapdialog': ['bootstrap'],
        'bootstraptable': ['bootstrap'],
        'bootstraptablefiltercontrol': ['bootstraptable'],
        'bootstrapswitch': ['bootstrap']
    },
    paths: {
        jquery: 'libs/jquery.min',
        bootstrap: 'libs/bootstrap.min',
        bootstrapdialog: 'libs/bootstrap-dialog.min',
        bootstraptable: 'libs/bootstrap-table.min',
        bootstraptablefiltercontrol: 'libs/bootstrap-table-filter-control',
        bootstrapswitch: 'libs/bootstrap-switch.min',
        domready: 'libs/domReady',
        searcher: 'libs/searcher'
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