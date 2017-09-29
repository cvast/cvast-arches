
define([
    'spidergl',
    'jquery',
    'presenter',
    'nexus',
    'trackball_sphere',
    'trackball_turntable',
    'trackball_turntable_pan',
    'trackball_pantilt',
    'ply',
    'init',
], function (spidergl, $, presenter, nexus, trackball_sphere, trackball_turntable, trackball_turntable_pan, trackball_pantilt, ply, init) {

    window.actionsToolbar = function actionsToolbar(action) {
        if (action == 'home') presenter.resetTrackball();
        else if (action == 'zoomin') presenter.zoomIn();
        else if (action == 'zoomout') presenter.zoomOut();
        else if (action == 'light' || action == 'light_on') { presenter.enableLightTrackball(!presenter.isLightTrackballEnabled()); lightSwitch(); }
        else if (action == 'sections' || action == 'sections_on') { sectiontoolReset(); sectiontoolSwitch(); }
        else if (action == 'full' || action == 'full_on') fullscreenSwitch();
    }


    return {

        setupURL: function (source) {

            window.presenter = new Presenter("draw-canvas");

            window.presenter.setScene({
                meshes: {
                    // The path in which the model to be loaded in the viewer is stored
                    "mesh1": { url: source }
                },
                modelInstances: {
                    "Inst1": {
                        mesh: "mesh1"
                    }
                },
                trackball: {
                    type: SphereTrackball,
                    trackOptions: {
                        startDistance: 2.5,
                        minMaxDist: [0.01, 5.0]
                    }
                },
                space: {
                    centerMode: "scene",
                    radiusMode: "scene"
                }
            });
        }
    }
});