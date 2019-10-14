/**
* MyInterface class, creating a GUI interface.
*/
class MyInterface extends CGFinterface {
    /**
     * @constructor
     */
    constructor() {
        super();
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

        var defaultView = {value:""};

        group.add(defaultView, "value", ids).onChange(this.setActiveCamera(parent.graph.views[defaultView.value])).name("View");
    }
}