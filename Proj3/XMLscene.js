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
        var rookObj = new RookObj();
        var knightObj = new KnightObj();
        var queenObj = new QueenObj();
        var kingObj = new KingObj();
        //console.log(rookObj);

        this.background = new MyRectangle(this, "bg", 100, -100, -100, 100);

        this.chessBoard = [];
        this.board2D = [];
        for (var i = 0; i < 8 * 8; i++) {
            //console.log("X: " + ((i % 8) - 4) + " - Y: " + (((i - (i % 8)) / 8) - 4));
            //console.log(i + ": (" + (i % 8) + ", " + ((i - (i % 8)) / 8) + ")");
            this.chessBoard.push(new ChessBoardSquare(this, ((i % 2) + ((i - (i % 8)) / 8) + 1) % 2, (i % 8), ((i - (i % 8)) / 8)));
            this.board2D.push('  ');
        }

        for (var i = 0; i < 16; i++) {
            if (i < 8) {
                if (i == 0 || i == 7) {
                    var newRook = new ChessRook(this, "Rook" + i + "w", true, i, 0, 0, rookObj);
                    newRook.scale = [0.3, 0.3, 0.3];
                    newRook.rotate = [0, 0, 0];
                    this.objectsOnBoard.push(newRook);
                    this.board2D[i] = 'rw';
                } else if (i == 2 || i == 5) {
                    var newBishop = new ChessBishop(this, "Bishop" + i + "w", true, i, 0, 0, bishopObj);
                    newBishop.scale = [0.3, 0.3, 0.3];
                    newBishop.rotate = [0, -90, 0];
                    this.objectsOnBoard.push(newBishop);
                    this.board2D[i] = 'bw';
                } else if (i == 1 || i == 6) {
                    var newKnight = new ChessKnight(this, "Knight" + i + "w", true, i, 0, 0, knightObj);
                    newKnight.scale = [0.3, 0.3, 0.3];
                    newKnight.rotate = [0, 0, 0];
                    this.objectsOnBoard.push(newKnight);
                    this.board2D[i] = 'kw';
                } else if (i == 4) {
                    var newQueen = new ChessQueen(this, "Queen" + i + "w", true, i, 0, 0, queenObj);
                    newQueen.scale = [0.3, 0.3, 0.3];
                    newQueen.rotate = [0, 0, 0];
                    this.objectsOnBoard.push(newQueen);
                    this.board2D[i] = 'qw';
                } else {
                    var newKing = new ChessKing(this, "King" + i + "w", true, i, 0, 0, kingObj);
                    newKing.scale = [0.1, 0.1, 0.1];
                    newKing.rotate = [0, 0, 0];
                    this.objectsOnBoard.push(newKing);
                    this.board2D[i] = 'Kw';
                }
            } else {
                var newPawn = new ChessPawn(this, "Pawn" + i + "w", true, i - 8, 0, 1, pawnObj);
                newPawn.scale = [0.3, 0.3, 0.3];
                newPawn.rotate = [0, 0, 0];
                this.objectsOnBoard.push(newPawn);
                this.board2D[i] = 'pw';
            }
        }

        for (var i = 0; i < 16; i++) {
            if (i < 8) {
                if (i == 0 || i == 7) {
                    var newRook = new ChessRook(this, "Rook" + i + "b", false, i, 0, 7, rookObj);
                    newRook.scale = [0.3, 0.3, 0.3];
                    newRook.rotate = [0, 0, 0];
                    this.objectsOnBoard.push(newRook);
                    this.board2D[i + 56] = 'rb';
                } else if (i == 2 || i == 5) {
                    var newBishop = new ChessRook(this, "Bishop" + i + "b", false, i, 0, 7, bishopObj);
                    newBishop.scale = [0.3, 0.3, 0.3];
                    newBishop.rotate = [0, 90, 0];
                    this.objectsOnBoard.push(newBishop);
                    this.board2D[i + 56] = 'bb';
                } else if (i == 1 || i == 6) {
                    var newKnight = new ChessKnight(this, "Knight" + i + "b", false, i, 0, 7, knightObj);
                    newKnight.scale = [0.3, 0.3, 0.3];
                    newKnight.rotate = [0, 180, 0];
                    this.objectsOnBoard.push(newKnight);
                    this.board2D[i + 56] = 'kb';
                } else if (i == 4) {
                    var newQueen = new ChessQueen(this, "Queen" + i + "b", false, i, 0, 7, queenObj);
                    newQueen.scale = [0.3, 0.3, 0.3];
                    newQueen.rotate = [0, 0, 0];
                    this.objectsOnBoard.push(newQueen);
                    this.board2D[i + 56] = 'qb';
                } else {
                    var newKing = new ChessKing(this, "King" + i + "b", false, i, 0, 7, kingObj);
                    newKing.scale = [0.1, 0.1, 0.1];
                    newKing.rotate = [0, 0, 0];
                    this.objectsOnBoard.push(newKing);
                    this.board2D[i + 56] = 'Kb';
                }
            } else {
                var newPawn = new ChessPawn(this, "Pawn" + i + "b", false, i - 8, 0, 6, pawnObj);
                newPawn.scale = [0.3, 0.3, 0.3];
                newPawn.rotate = [0, 0, 0];
                this.objectsOnBoard.push(newPawn);
                this.board2D[i + 40] = 'pb';
            }
        }

        var coord1 = this.toChessCoord(0,0);
        var coord2 = this.toChessCoord(3,5);
        var coord3 = coord1 + coord2;

        console.log(coord3);

        this.fromChessCoord(coord3);

        var string = "";
        for (var i = 0; i < 8 * 8; i++) {
            //if ((i % 8) == 0) { console.log(string); string = ""; }
            string += (this.board2D[i]);
            string += ("|");
        }
        console.log(string);


        this.setPickEnabled(true);

        this.clickedObj = [];

        this.commChannel = new Comms();

        //this.commChannel.makeRequest("player:" + 1 + "-" + "level:" + 1 + string);
        this.sendBoard(1,1);
    }

    sendBoard(player,level){
        var string = "";
        for (var i = 0; i < 8 * 8; i++) {
            string += (this.board2D[i]);
            string += ("|");
        }

        this.commChannel.makeRequest("player:" + player + "-" + "level:" + level + "-" + string);
    }

    logPicking() {
        if (this.pickMode == false) {
            if (this.pickResults != null && this.pickResults.length > 0) {
                for (var i = 0; i < this.pickResults.length; i++) {
                    var obj = this.pickResults[i][0];
                    if (obj) {
                        var customId = this.pickResults[i][1];
                        //console.log(customId);
                        //console.log(obj);
                        if (customId > 100) {
                            this.clickedObj[0].destx = obj.x;
                            this.clickedObj[0].destz = obj.z;

                        }
                        obj.clicked = (!(obj.clicked)) || false;
                        if (obj.clicked)
                            this.clickedObj.push(obj);
                        else
                            this.clickedObj = [];
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
        //if (!this.printed) console.log(this.graph.materials);
        var dest = [];

        if (this.clickedObj.length) {
            dest = this.clickedObj[0].getPossibleMoves();
            //console.log(dest);
        }

        for (var k = 0; k < dest.length;k++){
            var makeSelectable = this.chessBoard[dest[k][0]+(dest[k][1]*8)];
            this.chessBoard[dest[k][0]+(dest[k][1]*8)].selectable = true;
            makeSelectable.selectable = true;
            //if (!this.printed)
            //console.log(makeSelectable);
        }

        //this.printed = true;

        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                var currSqr = this.chessBoard[i * 8 + j];
                //if (this.clickedObj.length == 0) currSqr.selectable = false;
                //if (!this.printed && this.clickedObj.length){
                //    //console.log(this.clickedObj);
                //
                //    this.printed=true;
                //}
                this.pushMatrix();
                if (this.clickedObj.length) {
                    //console.log("Clicked Object");
                    //console.log(this.clickedObj);
                    var dist = Math.sqrt(((this.clickedObj[0].x - currSqr.x) * (this.clickedObj[0].x - currSqr.x) * 1.0) + (((this.clickedObj[0].z) - currSqr.z) * ((this.clickedObj[0].z) - currSqr.z) * 1.0)) * 1.0;
                    if (!this.printed) {
                        //console.log(dist + ": (" + this.clickedObj[0].x + "," + this.clickedObj[0].z + ") - (" + currSqr.x + "," + currSqr.z + ")");
                    }
                    if (currSqr.selectable) {
                        if (!this.printed && this.clickedObj.length) {
                            //console.log("Inside print board");
                            //console.log(this.clickedObj);
                            //console.log(currSqr);
                            //console.log(dist);
                            //console.log("\nid: " + (i * 8 + j + 100) + "\n");

                            //this.printed=true;
                        }

                        this.registerForPick(i * 8 + j + 100, currSqr);
                        currSqr.registered = true;
                        currSqr.selectable = false;

                        if (currSqr.white) {
                            this.graph.materials["white_selected"].apply();
                        } else {
                            this.graph.materials["black_selected"].apply();
                        }
                    } else {
                        if (currSqr.white) {
                            this.graph.materials["white"].apply();
                        } else {
                            this.graph.materials["black"].apply();
                        }
                    }
                } else {
                    if (currSqr.white) {
                        this.graph.materials["white"].apply();
                    } else {
                        this.graph.materials["black"].apply();
                    }
                }
                //var transfMatrix = mat4.create();
                //transfMatrix = mat4.translate(transfMatrix, transfMatrix, [currSqr.x, 0, currSqr.z]);
                //if (this.clickedObj.length != 0) {
                //    this.registerForPick(i + 100, currSqr);
                //    currSqr.registered = true;
                //}
                //this.multMatrix(transfMatrix);
                currSqr.display();
                this.popMatrix();
                if (currSqr.registered)
                    this.clearPickRegistration();
                //this.clearPickRegistration();
            }
        }
        if (this.clickedObj.length) this.printed = true;
        //this.printed = true;
    }

    /**
     * Displays the scene.
     */
    render(isRTT) {
        this.clearPickRegistration();
        this.logPicking();

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


            this.pushMatrix();
            var transfMatrix = mat4.create();
            transfMatrix = mat4.translate(transfMatrix, transfMatrix, [0, 0, 30]);
            this.multMatrix(transfMatrix);
            this.background.display();
            this.popMatrix();


            this.printBoard();

            // Displays the scene (MySceneGraph function).

            if (this.interface.isKeyPressed('KeyM') && this.mPressed == false) {
                this.mPressed = true;
                //console.log("Key M Pressed!");
                for (const key in this.graph.components) {
                    this.graph.components[key].changeMaterial();
                }
            }

            if (this.interface.isKeyPressed('KeyM') == false && this.mPressed) {
                this.mPressed = false;
                //console.log("Key M no longer Pressed!");
            }

            for (var i = 0; i < this.objectsOnBoard.length; i++) {
                var currObj = this.objectsOnBoard[i];
                if (currObj.x != currObj.destx || currObj.z != currObj.destz) {
                    this.clickedObj.splice(0, this.clickedObj.length);
                    //console.log("Curr coord: (" + currObj.x + ", " + currObj.z + ")\nDest coord: (" + currObj.destx + ", " + currObj.destz + ")\n\n");
                    currObj.clicked = false;
                    var auxX = currObj.destx - currObj.x;
                    var auxZ = currObj.destz - currObj.z;
                    //currObj.x += (currObj.destx - currObj.x) / (Math.abs(currObj.destx - currObj.x)*10.0);
                    //currObj.z += (currObj.destz - currObj.z) / (Math.abs(currObj.destz - currObj.z)*10.0);
                    currObj.x += (auxX / (Math.sqrt(auxX * auxX + auxZ * auxZ) * 10));
                    currObj.z += (auxZ / (Math.sqrt(auxX * auxX + auxZ * auxZ) * 10));
                    if (Math.abs(currObj.destx - currObj.x) < 0.1)
                        currObj.x = currObj.destx;
                    if (Math.abs(currObj.destz - currObj.z) < 0.1)
                        currObj.z = currObj.destz;
                } else {
                    if (currObj.clicked && currObj.y < 1) {
                        currObj.y += 0.1;
                    } else if (!currObj.clicked && currObj.y > 0.1) {
                        currObj.y -= 0.1;
                    } else if (!currObj.clicked && currObj.y < 0.1) {
                        currObj.y = 0;
                    }
                }
                this.pushMatrix();
                if (this.clickedObj.length == 0)
                    this.registerForPick(i + 1, currObj);
                else if (this.clickedObj[0].id == currObj.id)
                    this.registerForPick(i + 1, currObj);
                var transfMatrix = mat4.create();
                transfMatrix = mat4.translate(transfMatrix, transfMatrix, [currObj.x + 0.5, currObj.y, currObj.z + 0.5]);
                transfMatrix = mat4.scale(transfMatrix, transfMatrix, currObj.scale);
                transfMatrix = mat4.rotateX(transfMatrix, transfMatrix, DEGREE_TO_RAD * currObj.rotate[0]);
                transfMatrix = mat4.rotateY(transfMatrix, transfMatrix, DEGREE_TO_RAD * currObj.rotate[1]);
                transfMatrix = mat4.rotateZ(transfMatrix, transfMatrix, DEGREE_TO_RAD * currObj.rotate[2]);
                this.multMatrix(transfMatrix);
                if (currObj.white) {
                    this.graph.materials["white"].apply();
                } else {
                    this.graph.materials["black"].apply();
                }
                this.pushMatrix();
                if (this.clickedObj.length == 0) {
                    if (currObj.white) {
                        this.graph.materials["white"].apply();
                    } else {
                        this.graph.materials["black"].apply();
                    }
                } else if (this.clickedObj[0].id == currObj.id) {
                    if (currObj.white) {
                        this.graph.materials["white_selected"].apply();
                    } else {
                        this.graph.materials["black_selected"].apply();
                    }
                }
                this.popMatrix();
                currObj.display();
                if (currObj.white) {
                    this.graph.materials["white"].apply();
                } else {
                    this.graph.materials["black"].apply();
                }
                if (this.clickedObj.length == 0)
                    this.clearPickRegistration();
                else if (this.clickedObj[0].id == currObj.id)
                    this.clearPickRegistration();
                this.popMatrix();
            }
        }

        this.popMatrix();

        if (!isRTT) {
            this.gl.disable(this.gl.DEPTH_TEST);
            //this.secCam.display();
            this.gl.enable(this.gl.DEPTH_TEST);
        }
        // ---- END Background, camera and axis setup
    }

    toChessCoord(x,z){
        var chessCoords = '';
        chessCoords += String.fromCharCode((7 - x)+'a'.charCodeAt(0)) + (z+1);
        console.log(chessCoords);
        return chessCoords;
    }

    fromChessCoord(chessCoords){
        var coords = [];
        if (chessCoords.length == 2){
            coords.push([7-(chessCoords.charCodeAt(0)-'a'.charCodeAt(0)),parseInt(chessCoords[1])-1]);
        } else if (chessCoords.length == 4){
            coords.push([7-(chessCoords.charCodeAt(0)-'a'.charCodeAt(0)),parseInt(chessCoords[1])-1]);
            coords.push([7-(chessCoords.charCodeAt(2)-'a'.charCodeAt(0)),parseInt(chessCoords[3])-1]);
        }
        console.log(coords);
        return coords;
    }
}