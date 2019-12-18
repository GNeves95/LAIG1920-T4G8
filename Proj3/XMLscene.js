var DEGREE_TO_RAD = Math.PI / 180;

/**
 * XMLscene class, representing the scene that is to be rendered.
 */
class XMLscene extends CGFscene {
    /**
     * @constructor
     * @param {MyInterface} myinterface 
     */
    constructor(myinterface) {
        super();

        this.interface = myinterface;
        this.cam = "";
        //this.camSec = "";
        this.defaultView = "";
    }

    /**
     * Initializes the scene, setting some WebGL defaults, initializing the camera and the axis.
     * @param {CGFApplication} application
     */
    init(application) {
        this.printed = false;
        super.init(application);
        this.sceneInited = false;

        this.initCameras();

        this.enableTextures(true);

        this.mPressed = false;

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.axis = new CGFaxis(this);
        this.textureCam = new CGFtextureRTT(this, this.gl.canvas.width, this.gl.canvas.height);
        //this.secCam = new MySecurityCamera(this, this.textureCam);

        this.setUpdatePeriod(100);

        this.objectsOnBoard = [];

        var pawnObj = new PawnObj();
        var bishopObj = new BishopObj();

        this.pawn = new ChessPawn(this, "Pawn", false, 2, 0, 0, pawnObj);
        this.bishop = new ChessBishop(this, "Bishop", true, -2, 0, 0, bishopObj);
        this.chessBoard = [];
        for (var i = 0; i < 8 * 8; i++) {
            console.log("X: " + ((i % 8) - 4) + " - Y: " + (((i - (i % 8)) / 8) - 4));
            this.chessBoard.push(new ChessBoardSquare(this, ((i % 2) + ((i - (i % 8)) / 8) - 4) % 2, (i % 8) - 4, ((i - (i % 8)) / 8) - 4));
        }

        this.objectsOnBoard.push(this.bishop);
        this.objectsOnBoard.push(this.pawn);

        this.setPickEnabled(true);
    }

    logPicking() {
        if (this.pickMode == false) {
            if (this.pickResults != null && this.pickResults.length > 0) {
                for (var i = 0; i < this.pickResults.length; i++) {
                    var obj = this.pickResults[i][0];
                    if (obj) {
                        obj.clicked = (!(obj.clicked)) || false;
                        var customId = this.pickResults[i][1];
                        console.log("Picked object: ");
                        console.log(obj);
                        console.log(", with pick id " + customId);
                    }
                }
                this.pickResults.splice(0, this.pickResults.length);
            }
        }
    }

    /**
     * Initializes the scene cameras.
     */
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
        //this.cameraSec = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }
    /**
     * Initializes the scene lights with the values read from the XML file.
     */
    initLights() {
        var i = 0;
        // Lights index.

        // Reads the lights from the scene graph.
        for (var key in this.graph.lights) {
            if (i >= 8)
                break;              // Only eight lights allowed by WebGL.

            if (this.graph.lights.hasOwnProperty(key)) {
                var light = this.graph.lights[key];

                this.lights[i].setPosition(light[2][0], light[2][1], light[2][2], light[2][3]);
                this.lights[i].setAmbient(light[3][0], light[3][1], light[3][2], light[3][3]);
                this.lights[i].setDiffuse(light[4][0], light[4][1], light[4][2], light[4][3]);
                this.lights[i].setSpecular(light[5][0], light[5][1], light[5][2], light[5][3]);

                if (light[1] == "spot") {
                    this.lights[i].setSpotCutOff(light[6]);
                    this.lights[i].setSpotExponent(light[7]);
                    this.lights[i].setSpotDirection(light[8][0], light[8][1], light[8][2]);
                }

                this.lights[i].setVisible(true);
                if (light[0])
                    this.lights[i].enable();
                else
                    this.lights[i].disable();

                this.lights[i].update();

                i++;
            }
        }
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    /** Handler called when the graph is finally loaded. 
     * As loading is asynchronous, this may be called already after the application has started the run loop
     */
    onGraphLoaded() {
        this.axis = new CGFaxis(this, this.graph.referenceLength);

        this.gl.clearColor(this.graph.background[0], this.graph.background[1], this.graph.background[2], this.graph.background[3]);

        this.setGlobalAmbientLight(this.graph.ambient[0], this.graph.ambient[1], this.graph.ambient[2], this.graph.ambient[3]);

        this.initLights();

        this.defaultView = this.graph.defaultView;

        this.camera = this.graph.views[this.defaultView];

        //this.interface.setActiveCamera(this.cameraSec);
        this.interface.setActiveCamera(this.camera);

        this.interface.addLightsGroup(this);
        this.interface.addViewsGroup(this);
        //this.interface.addSecViewsGroup(this);

        this.sceneInited = true;
    }

    update(t) {
        if (this.last > 0) {
            this.delta = (t - this.last) / 1000;

            for (const key in this.graph.animations) {
                this.graph.animations[key].update(this.delta);
            }

        }

        this.last = t;

        //this.secCam.update((t/100)%1000);
    }

    display() {
        this.textureCam.attachToFrameBuffer();
        this.render(true);
        this.textureCam.detachFromFrameBuffer();


        this.render(false);

    }

    printBoard() {
        if (!this.printed) console.log(this.graph.materials);
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                var currSqr = this.chessBoard[i * 8 + j];
                if (!this.printed) console.log(currSqr);
                this.pushMatrix();
                if (currSqr.white) {
                    this.graph.materials["white"].apply();
                } else {
                    this.graph.materials["black"].apply();
                }
                var transfMatrix = mat4.create();
                transfMatrix = mat4.translate(transfMatrix, transfMatrix, [currSqr.x, 0, currSqr.z]);
                transfMatrix = mat4.scale(transfMatrix, transfMatrix, [2, 1, 2]);
                this.multMatrix(transfMatrix);
                currSqr.display();
                this.popMatrix();
            }
        }
        this.printed = true;
    }

    /**
     * Displays the scene.
     */
    render(isRTT) {
        this.clearPickRegistration();
        this.logPicking();

        //if (this.pickResults != null && this.pickResults.length == 0) {
        //    for (var i = 0; i < this.objectsOnBoard.length; i++){
        //        this.registerForPick(i + 1, this.objectsOnBoard[i]);
        //
        //        //this.clearPickRegistration();
        //    }
        //}


        // ---- BEGIN Background, camera and axis setup

        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();

        if (isRTT) {
            //if(this.camSec != "")
            //    this.camera = this.graph.views[this.camSec];
            //else
            if (this.graph.views)
                this.camera = this.graph.views[this.defaultView];
        } else {
            if (this.cam != "")
                this.camera = this.graph.views[this.cam];
            else
                if (this.graph.views)
                    this.camera = this.graph.views[this.defaultView];
        }

        this.interface.setActiveCamera(this.camera);

        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        this.pushMatrix();
        this.axis.display();

        var i = 0;
        for (const key in this.graph.lights) {
            if (this.graph.lights[key][0]) {
                this.lights[i].enable();
            }
            else {
                this.lights[i].disable();
            }
            this.lights[i].update();
            i++;
        }

        if (this.sceneInited) {
            // Draw axis
            this.setDefaultAppearance();
            this.printBoard();

            // Displays the scene (MySceneGraph function).

            if (this.interface.isKeyPressed('KeyM') && this.mPressed == false) {
                this.mPressed = true;
                console.log("Key M Pressed!");
                for (const key in this.graph.components) {
                    this.graph.components[key].changeMaterial();
                }
            }

            if (this.interface.isKeyPressed('KeyM') == false && this.mPressed) {
                this.mPressed = false;
                console.log("Key M no longer Pressed!");
            }


            //this.graph.displayScene();
            //this.secCam.display();

            for (var i = 0; i < this.objectsOnBoard.length; i++) {
                var currObj = this.objectsOnBoard[i];
                if(currObj.clicked && currObj.y < 4){
                    currObj.y += 0.1;
                } else if(!currObj.clicked && currObj.y > 0){
                    currObj.y -= 0.1;
                }
                this.pushMatrix();
                this.registerForPick(i + 1, currObj);
                var transfMatrix = mat4.create();
                transfMatrix = mat4.translate(transfMatrix, transfMatrix, [currObj.x, currObj.y, currObj.z]);
                this.multMatrix(transfMatrix);
                if (currObj.white) {
                    this.graph.materials["white"].apply();
                } else {
                    this.graph.materials["black"].apply();
                }
                currObj.display();
                this.popMatrix();
            }


            //this.pushMatrix();
            //var transfMatrix = mat4.create();
            //transfMatrix = mat4.translate(transfMatrix, transfMatrix, [this.pawn.x, this.pawn.y, this.pawn.z]);
            //this.multMatrix(transfMatrix);
            //if (this.pawn.white) {
            //    this.graph.materials["white"].apply();
            //} else {
            //    this.graph.materials["black"].apply();
            //}
            //this.pawn.display();
            //this.popMatrix();
            //this.pushMatrix();
            //transfMatrix = mat4.create();
            //transfMatrix = mat4.translate(transfMatrix, transfMatrix, [this.bishop.x, this.bishop.y, this.bishop.z]);
            //this.multMatrix(transfMatrix);
            //if (this.bishop.white) {
            //    this.graph.materials["white"].apply();
            //} else {
            //    this.graph.materials["black"].apply();
            //}
            //this.bishop.display();
            //this.popMatrix();
        }

        this.popMatrix();

        if (!isRTT) {
            this.gl.disable(this.gl.DEPTH_TEST);
            //this.secCam.display();
            this.gl.enable(this.gl.DEPTH_TEST);
        }
        // ---- END Background, camera and axis setup
    }
}