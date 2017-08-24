require.config({
    paths: {
        'spidergl': '../bower_components/cvast-3dhop/3DHOP_4.1/minimal/js/spidergl',
        'jquery': '../bower_components/cvast-3dhop/3DHOP_4.1/minimal/js/jquery',
        'presenterCVAST': '../bower_components/cvast-3dhop/CVAST/js/presenterCVAST',
        'nexus': '../bower_components/cvast-3dhop/3DHOP_4.1/minimal/js/nexus',
        'ply': '../bower_components/cvast-3dhop/3DHOP_4.1/minimal/js/ply',
        'trackball_sphere': '../bower_components/cvast-3dhop/3DHOP_4.1/minimal/js/trackball_sphere',
        'trackball_turntable': '../bower_components/cvast-3dhop/3DHOP_4.1/minimal/js/trackball_turntable',
        'trackball_turntable_pan': '../bower_components/cvast-3dhop/3DHOP_4.1/minimal/js/trackball_turntable_pan',
        'trackball_pantilt': '../bower_components/cvast-3dhop/3DHOP_4.1/minimal/js/trackball_pantilt',
        'initCVAST': '../bower_components/cvast-3dhop/CVAST/js/initCVAST',
        'setupCVAST': '../bower_components/cvast-3dhop/CVAST/js/setupCVAST'
    },
    shim: {
        'spidergl': {
            exports: 'SpiderGL'
        },
        'presenterCVAST': {
            deps: ['spidergl'],
            exports: 'Presenter'
        },
        'nexus': {
            deps: ['spidergl'],
            exports: 'Nexus'
        },
        'ply': {
            deps: ['spidergl'],
        },
        'trackball_sphere': {
            deps: ['presenterCVAST'],
            exports: 'PanTiltTrackball'
        },
        'trackball_sphere': {
            deps: ['presenterCVAST'],
            exports: 'PanTiltTrackball'
        },
        'trackball_turntable': {
            deps: ['presenterCVAST'],
            exports: 'TurnTableTrackball'
        },
        'trackball_turntable_pan': {
            deps: ['presenterCVAST'],
            exports: 'TurntablePanTrackball'
        },
        'trackball_pantilt': {
            deps: ['presenterCVAST'],
            exports: 'PanTiltTrackball'
        },
    }
});

define([
    'underscore',
    'knockout',
    'viewmodels/report',
    'arches',
    'spidergl',
    'jquery',
    'presenterCVAST',
    'nexus',
    'trackball_sphere',
    'trackball_turntable',
    'trackball_turntable_pan',
    'trackball_pantilt',
    'initCVAST',
    'setupCVAST',
    'ply',
    'plugins/knockstrap',
    'bindings/chosen',
], function (_, ko, ReportViewModel, arches, spidergl, $, presenterCVAST, nexus, trackball_sphere, trackball_turntable, trackball_turntable_pan, trackball_pantilt, initCVAST, setupCVAST) {
    return ko.components.register('file-report', {
        viewModel: function (params) {
            var self = this;
            params.configKeys = ['nodes'];
            ReportViewModel.apply(this, [params]);

            self.imgs = ko.observableArray([]);
            self.threeDHopFiles = ko.observableArray([]);

            if (self.report.get('tiles')) {
                var imgs = [];
                var threeDHopFiles = [];
                var nodes = self.nodes();
                self.report.get('tiles').forEach(function (tile) {
                    _.each(tile.data, function (val, key) {
                        if (Array.isArray(val)) {
                            val.forEach(function (item) {
                                
                                if (item.status &&
                                    item.type &&
                                    item.status === 'uploaded' &&
                                    item.type.indexOf('image') > -1 &&
                                    _.contains(nodes, key)
                                ) {
                                    imgs.push({
                                        src: item.url,
                                        alt: item.name
                                    });
                                }

                                if (item.status &&
                                    item.status === 'uploaded' &&
                                    item.name.split('.').pop() == 'ply'
                                ) {
                                    threeDHopFiles.push({
                                        src: item.url,
                                        alt: item.name
                                    });
                                }
                            });
                        }
                    }, self);
                }, self);

                if (imgs.length > 0) {
                    self.imgs(imgs);
                }

                if (threeDHopFiles.length > 0) {
                    self.threeDHopFiles(threeDHopFiles);
                    var filepath = threeDHopFiles[0].src;
                    init3dhop();
                    setupURL(filepath);
                }
            }


            var widgets = [];
            self.report.forms().forEach(function (form) {
                form.cards.forEach(function (card) {
                    widgets = widgets.concat(card.get('widgets')());
                    card.get('cards')().forEach(function (card) {
                        widgets = widgets.concat(card.get('widgets')());
                    });
                });
            });

            this.nodeOptions = ko.observableArray(
                widgets.map(function (widget) {
                    return widget.node
                }).filter(function (node) {
                    return ko.unwrap(node.datatype) === 'file-list';
                })
            );
        },
        template: {
            require: 'text!report-templates/file'
        }
    });
});
