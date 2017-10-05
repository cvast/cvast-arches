require.config({
    paths: {
        'spidergl': '../bower_components/three-d-hop/minimal/js/spidergl',
        'jquery': '../bower_components/three-d-hop/minimal/js/jquery',
        'nexus': '../bower_components/three-d-hop/minimal/js/nexus',
        'presenter': '../bower_components/three-d-hop/minimal/js/presenter',
        'ply': '../bower_components/three-d-hop/minimal/js/ply',
        'trackball_sphere': '../bower_components/three-d-hop/minimal/js/trackball_sphere',
        'trackball_turntable': '../bower_components/three-d-hop/minimal/js/trackball_turntable',
        'trackball_turntable_pan': '../bower_components/three-d-hop/minimal/js/trackball_turntable_pan',
        'trackball_pantilt': '../bower_components/three-d-hop/minimal/js/trackball_pantilt',
        'init': '../bower_components/three-d-hop/minimal/js/init',
        // 'setup': '../bower_components/three-d-hop/js/setup',
        'cvast-3dhop': 'reports/cvast-3dhop'
    },
    shim: {
        'spidergl': {
            exports: 'SpiderGL'
        },
        'jquery': {
            deps: [ 'spidergl' ],
        },
        'presenter': {
            deps: ['jquery'],
            exports: 'Presenter'
        },
        'nexus': {
            deps: ['presenter'],
            exports: 'Nexus'
        },
        'ply': {
            deps: ['nexus'],
        },
        'trackball_sphere': {
            deps: ['ply'],
            exports: 'PanTiltTrackball'
        },
        'trackball_sphere': {
            deps: ['ply'],
            exports: 'PanTiltTrackball'
        },
        'trackball_turntable': {
            deps: ['ply'],
            exports: 'TurnTableTrackball'
        },
        'trackball_turntable_pan': {
            deps: ['ply'],
            exports: 'TurntablePanTrackball'
        },
        'trackball_pantilt': {
            deps: ['ply'],
            exports: 'PanTiltTrackball'
        },
        'init': {
            deps: ['trackball_pantilt']
        },
        'cvast-3dhop': {
            deps: ['init']
        },
    }
});