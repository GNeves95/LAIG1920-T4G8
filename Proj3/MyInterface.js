/**
* MyInterface class, creating a GUI interface.
*/
class MyInterface extends CGFinterface {
    /**
     * @constructor
     */
    constructor() {
        super();
        this.cam = "";
        this.camSec = "";
    }

    /**
     * Initializes the interface.
     * @param {CGFapplication} application
     */
    init(application) {
        super.init(application);
        // init GUI. For more information on the methods, check:
        //  http://workshop.chromeexperiments.com/examples/gui

        this.gui = new dat.GUI();

        // add a group of controls (and open/expand by defult)

        this.initKeys();

        return true;
    }

    /**
     * initKeys
     */
    initKeys() {
        this.scene.gui=this;
        this.processKeyboard=function(){};
        this.activeKeys={};
    }

    processKeyDown(event) {
        this.activeKeys[event.code]=true;
    };

    processKeyUp(event) {
        this.activeKeys[event.code]=false;
    };

    isKeyPressed(keyCode) {
        return this.activeKeys[keyCode] || false;
    }

    addLightsGroup(parent) {
        var group = this.gui.addFolder("Lights");
        group.open();

        for (const key in parent.graph.lights) {
            group.add(parent.graph.lights[key], "0").name(key);
        }
    }

    addViewsGroup(parent) {
        var group = this.gui.addFolder("Views");

        group.open();
        var ids = [];

        for (const key in parent.graph.views) {
            ids.push(key);
            //group.add(parent.graph.views[key], ).name(key);
        }

        var defaultView = {value:parent.defaultView};

        group.add(defaultView, "value", ids).onChange(function(){
                //parent.camera = parent.graph.views[defaultView.value]; /*parent.interface.setActiveCamera(parent.camera);*/
                parent.cam = defaultView.value;
                console.log("View changed")
            }).name("View");

        /*group.add(defaultView, "value", ids).onChange(function(){
                //parent.cameraSec = parent.graph.views[defaultView.value];
                parent.camSec = defaultView.value;
                console.log("security camera changed")
            }).name("Security Camera");*/
    }

    /*addSecViewsGroup(parent) {
        var group = this.gui.addFolder("Security Camera View");

        group.open();
        var ids = [];

        for (const key in parent.graph.views) {
            ids.push(key);
        }

        var defView = {value:parent.defaultView};

        group.add(defView, "value", ids).onChange(function(){
                parent.cameraSec = parent.graph.views[defView.value];
                this.camSec = defView.value;
                parent.interface.setActiveCamera(parent.cameraSec);
                console.log("Security camera changed")
            }).name("Security Camera");
    }*/
}