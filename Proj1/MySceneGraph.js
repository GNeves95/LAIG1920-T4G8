var DEGREE_TO_RAD = Math.PI / 180;

// Order of the groups in the XML document.
var SCENE_INDEX = 0;
var VIEWS_INDEX = 1;
var GLOBALS_INDEX = 2;
var LIGHTS_INDEX = 3;
var TEXTURES_INDEX = 4;
var MATERIALS_INDEX = 5;
var TRANSFORMATIONS_INDEX = 6;
var PRIMITIVES_INDEX = 7;
var COMPONENTS_INDEX = 8;

/**
 * MySceneGraph class, representing the scene graph.
 */
class MySceneGraph {
    /**
     * @constructor
     */
    constructor(filename, scene) {
        this.loadedOk = null;

        // Establish bidirectional references between scene and graph.
        this.scene = scene;
        scene.graph = this;

        this.nodes = [];

        this.idRoot = null;                    // The id of the root element.

        this.axisCoords = [];
        this.axisCoords['x'] = [1, 0, 0];
        this.axisCoords['y'] = [0, 1, 0];
        this.axisCoords['z'] = [0, 0, 1];

        // File reading 
        this.reader = new CGFXMLreader();

        /*
         * Read the contents of the xml file, and refer to this class for loading and error handlers.
         * After the file is read, the reader calls onXMLReady on this object.
         * If any error occurs, the reader calls onXMLError on this object, with an error message
         */
        this.reader.open('scenes/' + filename, this);
    }

    /*
     * Callback to be executed after successful reading
     */
    onXMLReady() {
        this.log("XML Loading finished.");
        var rootElement = this.reader.xmlDoc.documentElement;

        // Here should go the calls for different functions to parse the various blocks
        var error = this.parseXMLFile(rootElement);

        if (error != null) {
            this.onXMLError(error);
            return;
        }

        error = this.updateNode(this.components[this.idRoot]);

        if (error != null) {
            this.onXMLError(error);
            return;
        }

        this.loadedOk = true;

        // As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
        this.scene.onGraphLoaded();
    }

    /**
     * Turns component and primitive IDs into refferences
     * @param {Node to update} currNode
     */
    updateNode(currNode) {
        if (currNode.visited) {
            return "ERROR: There is a loop with component " + currNode.id;
        }
        var compChildren = currNode.childCompList;
        var primChildren = currNode.childPrimList;

        currNode.visited = true;

        for (var i = 0; i < compChildren.length; i++) {
            var currChild = this.components[compChildren[i]];
            if (currChild == null){
                return "ERROR: No child component with ID " + compChildren[i] + " for component " + currNode.id;
            }
            currNode.childCompList[i] = currChild;
            var err = this.updateNode(currChild);
            if (err != null)
                return err;
        }

        for (var i = 0; i < primChildren.length; i++) {
            var currChild = this.primitives[primChildren[i]];
            if (currChild == null){
                return "ERROR: No child primitive with ID " + primChildren[i] + " for component " + currNode.id;
            }
            currNode.childPrimList[i] = currChild;
        }

        currNode.visited = false;
        return ;
    }

    /**
     * Parses the XML file, processing each block.
     * @param {XML root element} rootElement
     */
    parseXMLFile(rootElement) {
        if (rootElement.nodeName != "lxs")
            return "root tag <lxs> missing";

        var nodes = rootElement.children;

        // Reads the names of the nodes to an auxiliary buffer.
        var nodeNames = [];

        for (var i = 0; i < nodes.length; i++) {
            nodeNames.push(nodes[i].nodeName);
        }

        var error;

        // Processes each node, verifying errors.

        // <scene>
        var index;
        if ((index = nodeNames.indexOf("scene")) == -1)
            return "tag <scene> missing";
        else {
            if (index != SCENE_INDEX)
                this.onXMLMinorError("tag <scene> out of order " + index);

            //Parse scene block
            if ((error = this.parseScene(nodes[index])) != null)
                return error;
        }

        // <views>
        if ((index = nodeNames.indexOf("views")) == -1)
            return "tag <views> missing";
        else {
            if (index != VIEWS_INDEX)
                this.onXMLMinorError("tag <views> out of order");

            //Parse views block
            if ((error = this.parseView(nodes[index])) != null)
                return error;
        }

        // <globals>
        if ((index = nodeNames.indexOf("globals")) == -1)
            return "tag <globals> missing";
        else {
            if (index != GLOBALS_INDEX)
                this.onXMLMinorError("tag <globals> out of order");

            //Parse globals block
            if ((error = this.parseGlobals(nodes[index])) != null)
                return error;
        }

        // <lights>
        if ((index = nodeNames.indexOf("lights")) == -1)
            return "tag <lights> missing";
        else {
            if (index != LIGHTS_INDEX)
                this.onXMLMinorError("tag <lights> out of order");

            //Parse lights block
            if ((error = this.parseLights(nodes[index])) != null)
                return error;
        }
        // <textures>
        if ((index = nodeNames.indexOf("textures")) == -1)
            return "tag <textures> missing";
        else {
            if (index != TEXTURES_INDEX)
                this.onXMLMinorError("tag <textures> out of order");

            //Parse textures block
            if ((error = this.parseTextures(nodes[index])) != null)
                return error;
        }

        // <materials>
        if ((index = nodeNames.indexOf("materials")) == -1)
            return "tag <materials> missing";
        else {
            if (index != MATERIALS_INDEX)
                this.onXMLMinorError("tag <materials> out of order");

            //Parse materials block
            if ((error = this.parseMaterials(nodes[index])) != null)
                return error;
        }

        // <transformations>
        if ((index = nodeNames.indexOf("transformations")) == -1)
            return "tag <transformations> missing";
        else {
            if (index != TRANSFORMATIONS_INDEX)
                this.onXMLMinorError("tag <transformations> out of order");

            //Parse transformations block
            if ((error = this.parseTransformations(nodes[index])) != null)
                return error;
        }

        // <primitives>
        if ((index = nodeNames.indexOf("primitives")) == -1)
            return "tag <primitives> missing";
        else {
            if (index != PRIMITIVES_INDEX)
                this.onXMLMinorError("tag <primitives> out of order");

            //Parse primitives block
            if ((error = this.parsePrimitives(nodes[index])) != null)
                return error;
        }

        // <components>
        if ((index = nodeNames.indexOf("components")) == -1)
            return "tag <components> missing";
        else {
            if (index != COMPONENTS_INDEX)
                this.onXMLMinorError("tag <components> out of order");

            //Parse components block
            if ((error = this.parseComponents(nodes[index])) != null)
                return error;
        }
        this.log("all parsed");
    }

    /**
     * Parses the <scene> block. 
     * @param {scene block element} sceneNode
     */
    parseScene(sceneNode) {

        // Get root of the scene.
        var root = this.reader.getString(sceneNode, 'root')
        if (root == null)
            return "no root defined for scene";

        this.idRoot = root;

        // Get axis length        
        var axis_length = this.reader.getFloat(sceneNode, 'axis_length');
        if (axis_length == null)
            this.onXMLMinorError("no axis_length defined for scene; assuming 'length = 1'");

        this.referenceLength = axis_length || 1;

        this.log("Parsed scene");

        return null;
    }

    /**
     * Parses the <views> block.
     * @param {view block element} viewsNode
     */
    parseView(viewsNode) {
        //this.onXMLMinorError("To do: Parse views and create cameras.");
        var children = viewsNode.children;

        this.defaultView = this.reader.getString(viewsNode, 'default');
        if (this.defaultView == null){
            this.onXMLError("no default view defined!");
            return "no default view defined!";
        }

        if (children.length == 0){
            this.onXMLError("no views defined!");
            return "no views defined!";
        }

        this.views = [];
        var numViews = 0;

        var grandChildren = [];
        var nodeNames = [];

        //Any number of views.
        for (var i = 0; i < children.length; i++) {

            //Storing view information
            var child = children[i];

            //Checking tag validity
            if(child.nodeName != 'perspective' && child.nodeName != 'ortho'){
                this.onXMLMinorError("Tag missmatch, expecting either \'perspective\' or \'ortho\', got <" + child.nodeName + ">");
                continue;
            }

            // Get id of the current view.
            var viewId = this.reader.getString(child, 'id');
            if (viewId == null)
                return "no ID defined for view";

            // Checks for repeated IDs.
            if (this.views[viewId] != null)
                return "ID must be unique for each view (conflict: ID = " + viewId + ")";

            grandChildren = child.children;
            for (var j = 0; j < grandChildren.length; j++){
                nodeNames.push(grandChildren[j].nodeName);
            }

            //Reading near component
            var near = this.reader.getFloat(child, 'near');
            if (near == null || isNaN(near)){
                return "Can't read near component of view " + viewId;
            }

            //Reading far component
            var far = this.reader.getFloat(child, 'far');
            if (far == null || isNaN(far)){
                return "Can't read far component of view " + viewId;
            }

            var toIndex = nodeNames.indexOf("to");

            // Retrieves the view to component.
            var toView = [];
            if (toIndex != -1) {
                var aux = this.parseCoordinates3D(grandChildren[toIndex], "to view for ID " + viewId);
                if (!Array.isArray(aux))
                    return aux;
                toView = aux;
            }
            else
                return "view to undefined for ID = " + viewId;

            var fromIndex = nodeNames.indexOf("from");

            // Retrieves the view from component.
            var fromView = [];
            if (fromIndex != -1) {
                var aux = this.parseCoordinates3D(grandChildren[fromIndex], "from view for ID " + viewId);
                if (!Array.isArray(aux))
                    return aux;
                fromView = aux;
            }
            else
                return "view from undefined for ID = " + viewId;
            
            //getting perspective specific attributes
            if (child.nodeName == 'perspective'){

                var angle = this.reader.getFloat(child, 'angle');
                if (angle == null || isNaN(angle)){
                    return "Couldn't read angle value for view " + viewId;
                }

                var thisView = new CGFcamera(angle, near, far, vec3.fromValues(fromView[0], fromView[1], fromView[2]), vec3.fromValues(toView[0], toView[1], toView[2]));
                this.views[viewId] = thisView;

                if (grandChildren.length != 2) {
                    this.onXMLMinorError("Wrong number of attributes for perspective view " + viewId);
                }
            } else {
                //getting ortho specific attributes
                var left = this.reader.getFloat(child, 'left');
                var right = this.reader.getFloat(child, 'right');
                var top = this.reader.getFloat(child, 'top');
                var bottom = this.reader.getFloat(child, 'bottom');

                if (left == null || isNaN(left)){
                    return "Couldn't read left value for view " + viewId;
                }
                if (right == null || isNaN(right)){
                    return "Couldn't read right value for view " + viewId;
                }
                if (top == null || isNaN(top)){
                    return "Couldn't read top value for view " + viewId;
                }
                if (bottom == null || isNaN(bottom)){
                    return "Couldn't read bottom value for view " + viewId;
                }

                var up = [0, 1, 0];
                var upIndex = nodeNames.indexOf("up");

                if(upIndex == -1){
                    this.onXMLMinorError("No up given for ortho view " + viewId + "; assuming (0, 1, 0)");
                } else {
                    up = this.parseCoordinates3D(upIndex, "up component of view with ID " + viewId);
                }

                var thisView = new CGFcameraOrtho(left, right, bottom, top, near, far, vec3.fromValues(fromView[0], fromView[1], fromView[2]), vec3.fromValues(toView[0], toView[1], toView[2]), vec3.fromValues(up[0], up[1], up[2]));
                this.views[viewId] = thisView;

                if ((upIndex == -1 && grandChildren.length != 2) || (upIndex != -1 && grandChildren.length != 3)){
                    this.onXMLMinorError("Wrong number of attributes for perspective view " + viewId);
                }
            }
            numViews++;
        }

        if(numViews == 0){
            return "No views defined!";
        }

        if(this.views[this.defaultView] == null){
            return "Default view " + this.defaultView + " not defined!";
        }

        this.log("Parsed views");

        return null;
    }

    /**
     * Parses the <ambient> node.
     * @param {ambient block element} ambientsNode
     */
    parseGlobals(globalsNode) {

        var children = globalsNode.children;

        this.ambient = [];
        this.background = [];

        var nodeNames = [];

        for (var i = 0; i < children.length; i++)
            nodeNames.push(children[i].nodeName);

        var ambientIndex = nodeNames.indexOf("ambient");
        var backgroundIndex = nodeNames.indexOf("background");

        var color = this.parseColor(children[ambientIndex], "ambient");
        if (!Array.isArray(color))
            return color;
        else
            this.ambient = color;

        color = this.parseColor(children[backgroundIndex], "background");
        if (!Array.isArray(color))
            return color;
        else
            this.background = color;

        this.log("Parsed globals");

        return null;
    }

    /**
     * Parses the <light> node.
     * @param {lights block element} lightsNode
     */
    parseLights(lightsNode) {
        var children = lightsNode.children;

        this.lights = [];
        var numLights = 0;

        var grandChildren = [];
        var nodeNames = [];

        // Any number of lights.
        for (var i = 0; i < children.length; i++) {

            // Storing light information
            var global = [];
            var attributeNames = [];
            var attributeTypes = [];

            //Check type of light
            if (children[i].nodeName != "omni" && children[i].nodeName != "spot") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }
            else {
                attributeNames.push(...["location", "ambient", "diffuse", "specular"]);
                attributeTypes.push(...["position", "color", "color", "color"]);
            }

            // Get id of the current light.
            var lightId = this.reader.getString(children[i], 'id');
            if (lightId == null)
                return "no ID defined for light";

            // Checks for repeated IDs.
            if (this.lights[lightId] != null)
                return "ID must be unique for each light (conflict: ID = " + lightId + ")";

            // Light enable/disable
            var enableLight = true;
            var aux = this.reader.getBoolean(children[i], 'enabled');
            if (!(aux != null && !isNaN(aux) && (aux == true || aux == false)))
                this.onXMLMinorError("unable to parse value component of the 'enable light' field for ID = " + lightId + "; assuming 'value = 1'");

            enableLight = aux || 1;

            //Add enabled boolean and type name to light info
            global.push(enableLight);
            global.push(children[i].nodeName);

            grandChildren = children[i].children;
            // Specifications for the current light.

            nodeNames = [];
            for (var j = 0; j < grandChildren.length; j++) {
                nodeNames.push(grandChildren[j].nodeName);
            }

            for (var j = 0; j < attributeNames.length; j++) {
                var attributeIndex = nodeNames.indexOf(attributeNames[j]);

                if (attributeIndex != -1) {
                    if (attributeTypes[j] == "position")
                        var aux = this.parseCoordinates4D(grandChildren[attributeIndex], "light position for ID" + lightId);
                    else
                        var aux = this.parseColor(grandChildren[attributeIndex], attributeNames[j] + " illumination for ID" + lightId);

                    if (!Array.isArray(aux))
                        return aux;

                    global.push(aux);
                }
                else
                    return "light " + attributeNames[i] + " undefined for ID = " + lightId;
            }

            // Gets the additional attributes of the spot light
            if (children[i].nodeName == "spot") {
                var angle = this.reader.getFloat(children[i], 'angle');
                if (!(angle != null && !isNaN(angle)))
                    return "unable to parse angle of the light for ID = " + lightId;

                var exponent = this.reader.getFloat(children[i], 'exponent');
                if (!(exponent != null && !isNaN(exponent)))
                    return "unable to parse exponent of the light for ID = " + lightId;

                var targetIndex = nodeNames.indexOf("target");

                // Retrieves the light target.
                var targetLight = [];
                if (targetIndex != -1) {
                    var aux = this.parseCoordinates3D(grandChildren[targetIndex], "target light for ID " + lightId);
                    if (!Array.isArray(aux))
                        return aux;

                    targetLight = aux;
                }
                else
                    return "light target undefined for ID = " + lightId;

                global.push(...[angle, exponent, targetLight])
            }

            this.lights[lightId] = global;
            numLights++;
        }

        if (numLights == 0)
            return "at least one light must be defined";
        else if (numLights > 8)
            this.onXMLMinorError("too many lights defined; WebGL imposes a limit of 8 lights");

        this.log("Parsed lights");
        return null;
    }

    /**
     * Parses the <textures> block. 
     * @param {textures block element} texturesNode
     */
    parseTextures(texturesNode) {

        //For each texture in textures block, check ID and file URL
        //this.onXMLMinorError("To do: Parse textures.");

        var children = texturesNode.children;

        this.textures = [];

        var grandChildren = [];
        var nodeNames = [];

        if (children.length == 0){
            return "at least one texture must be defined!";
        }

        var numTextures = 0;

        // Any number of textures.
        for (var i = 0; i < children.length; i++){
            var child = children[i];

            if (child.nodeName != "texture"){
                this.onXMLMinorError("unkown tag <" + child.nodeName + ">");
                continue
            }

            // get Texture id
            var textureID = this.reader.getString(child, 'id');
            if (textureID == null)
                return "You must define an ID for the texture";
            
            if (this.textures[textureID] != null)
                return "ID must be unique for each texture (conflict: ID = " + textureID + ")";
            
            //get image relative path
            var file = this.reader.getString(child, 'file');
            if (file == null){
                this.onXMLMinorError("You must define a file for texture " + textureID);
                continue;
            }
            
            var fileExtension = file.split('.');
            if (fileExtension[fileExtension.length - 1] != "jpg" && fileExtension[fileExtension.length - 1] != "png"){
                this.onXMLMinorError("File extension for texture " + textureID + " is not a recognized image type.");
                continue;
            }

            var texture = new CGFtexture(this.scene, file);
            this.textures[textureID] = texture;
                
            numTextures++;
        }

        if (numTextures == 0){
            return "at least one texture must be defined!";
        }

        this.log("Parsed textures");
        return null;
    }

    /**
     * Parses the <materials> node.
     * @param {materials block element} materialsNode
     */
    parseMaterials(materialsNode) {
        var children = materialsNode.children;

        this.materials = [];

        var grandChildren = [];
        var nodeNames = [];

        var numMaterials = 0;

        // Any number of materials.
        for (var i = 0; i < children.length; i++) {

            if (children[i].nodeName != "material") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            var child = children[i];

            // Get id of the current material.
            var materialID = this.reader.getString(child, 'id');
            if (materialID == null)
                return "no ID defined for material";

            // Checks for repeated IDs.
            if (this.materials[materialID] != null)
                return "ID must be unique for each light (conflict: ID = " + materialID + ")";
            
            // Get shininess for current material
            var shininess = this.reader.getFloat(child, 'shininess');
            if (shininess == null){
                return "No shininess value for " + materialID;
            }

            grandChildren = child.children;

            for (var j = 0; j < grandChildren.length; j++) {
                nodeNames.push(grandChildren[j].nodeName);
            }

            // Verify if every attribute exists
            var emissionIndex = nodeNames.indexOf("emission");
            var ambientIndex = nodeNames.indexOf("ambient");
            var diffuseIndex = nodeNames.indexOf("diffuse");
            var specularIndex = nodeNames.indexOf("specular");

            if (emissionIndex == -1) {
                return "Missing emission values for material " + materialID;
            }
            if (ambientIndex == -1) {
                return "Missing ambient values for material " + materialID;
            }
            if (diffuseIndex == -1) {
                return "Missing diffuse values for material " + materialID;
            }
            if (specularIndex == -1) {
                return "Missing specular values for material " + materialID;
            }

            var emission = this.parseColor(grandChildren[emissionIndex], "emission attribute for material " + materialID);
            var ambient = this.parseColor(grandChildren[ambientIndex], "ambient attribute for material " + materialID);
            var diffuse = this.parseColor(grandChildren[diffuseIndex], "diffuse attribute for material " + materialID);
            var specular = this.parseColor(grandChildren[specularIndex], "specular attribute for material " + materialID);

            var material = new CGFappearance(this.scene);
            material.setShininess(shininess);
            material.setEmission(...emission);
            material.setDiffuse(...diffuse);
            material.setAmbient(...ambient);
            material.setSpecular(...specular);

            this.materials[materialID] = material;
            numMaterials++;

            //Continue here
            //this.onXMLMinorError("To do: Parse materials.");
        }

        if (numMaterials == 0){
            return "at least one material must be defined!";
        }

        this.log("Parsed materials");
        return null;
    }

    /**
     * Parses the <transformations> block.
     * @param {transformations block element} transformationsNode
     */
    parseTransformations(transformationsNode) {
        var children = transformationsNode.children;

        this.transformations = [];

        var grandChildren = [];

        var numTransformations = 0;

        // Any number of transformations.
        for (var i = 0; i < children.length; i++) {

            if (children[i].nodeName != "transformation") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            // Get id of the current transformation.
            var transformationID = this.reader.getString(children[i], 'id');
            if (transformationID == null)
                return "no ID defined for transformation";

            // Checks for repeated IDs.
            if (this.transformations[transformationID] != null)
                return "ID must be unique for each transformation (conflict: ID = " + transformationID + ")";

            grandChildren = children[i].children;
            // Specifications for the current transformation.

            var transfMatrix = mat4.create();

            for (var j = 0; j < grandChildren.length; j++) {
                switch (grandChildren[j].nodeName) {
                    case 'translate':
                        var coordinates = this.parseCoordinates3D(grandChildren[j], "translate transformation for ID " + transformationID);
                        if (!Array.isArray(coordinates))
                            return coordinates;

                        transfMatrix = mat4.translate(transfMatrix, transfMatrix, coordinates);
                        break;
                    case 'scale':                        
                        //this.onXMLMinorError("To do: Parse scale transformations.");
                        var coordinates = this.parseCoordinates3D(grandChildren[j], "scale transformation for ID " + transformationID);
                        if (!Array.isArray(coordinates))
                            return coordinates;

                        transfMatrix = mat4.scale(transfMatrix, transfMatrix, coordinates);
                        break;
                    case 'rotate':
                        // angle
                        //this.onXMLMinorError("To do: Parse rotate transformations.");
                        var angle = this.reader.getFloat(grandChildren[j], 'angle');
                        var axis = this.reader.getString(grandChildren[j], 'axis');

                        if(axis == null || angle == null || isNaN(angle))
                            return "Missing attribute for transformation " + transformationID;

                        if (axis != 'x' && axis != 'y' && axis != 'z' && axis != 'X' && axis != 'Y' && axis != 'Z')
                            return "Axis component for transformation " + transformationID + "must be either x, y or z";

                        switch(axis){
                            case 'x':
                            case 'X':
                                transfMatrix = mat4.rotateX(transfMatrix, transfMatrix, DEGREE_TO_RAD*angle);
                                break;
                            case 'y':
                            case 'Y':
                                transfMatrix = mat4.rotateY(transfMatrix, transfMatrix, DEGREE_TO_RAD*angle);
                                break;
                            case 'z':
                            case 'Z':
                                transfMatrix = mat4.rotateZ(transfMatrix, transfMatrix, DEGREE_TO_RAD*angle);
                                break;
                        }
                        //transfMatrix = mat4.rotate(transfMatrix, transfMatrix, DEGREE_TO_RAD*angle, axis);
                        break;
                }
            }
            this.transformations[transformationID] = transfMatrix;
            numTransformations++;
        }

        if (numTransformations == 0){
            return "at least one transformation must be defined";
        }

        this.log("Parsed transformations");
        return null;
    }

    /**
     * Parses the <primitives> block.
     * @param {primitives block element} primitivesNode
     */
    parsePrimitives(primitivesNode) {
        var children = primitivesNode.children;

        this.primitives = [];

        var grandChildren = [];

        // Any number of primitives.
        for (var i = 0; i < children.length; i++) {

            if (children[i].nodeName != "primitive") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            // Get id of the current primitive.
            var primitiveId = this.reader.getString(children[i], 'id');
            if (primitiveId == null)
                return "no ID defined for texture";

            // Checks for repeated IDs.
            if (this.primitives[primitiveId] != null)
                return "ID must be unique for each primitive (conflict: ID = " + primitiveId + ")";

            grandChildren = children[i].children;

            // Validate the primitive type
            if (grandChildren.length != 1 ||
                (grandChildren[0].nodeName != 'rectangle' && grandChildren[0].nodeName != 'triangle' &&
                    grandChildren[0].nodeName != 'cylinder' && grandChildren[0].nodeName != 'sphere' &&
                    grandChildren[0].nodeName != 'torus')) {
                return "There must be exactly 1 primitive type (rectangle, triangle, cylinder, sphere or torus)"
            }

            // Specifications for the current primitive.
            var primitiveType = grandChildren[0].nodeName;

            // Retrieves the primitive coordinates.
            if (primitiveType == 'rectangle') {
                // x1
                var x1 = this.reader.getFloat(grandChildren[0], 'x1');
                if (!(x1 != null && !isNaN(x1)))
                    return "unable to parse x1 of the primitive coordinates for ID = " + primitiveId;

                // y1
                var y1 = this.reader.getFloat(grandChildren[0], 'y1');
                if (!(y1 != null && !isNaN(y1)))
                    return "unable to parse y1 of the primitive coordinates for ID = " + primitiveId;

                // x2
                var x2 = this.reader.getFloat(grandChildren[0], 'x2');
                if (!(x2 != null && !isNaN(x2) && x2 > x1))
                    return "unable to parse x2 of the primitive coordinates for ID = " + primitiveId;

                // y2
                var y2 = this.reader.getFloat(grandChildren[0], 'y2');
                if (!(y2 != null && !isNaN(y2) && y2 > y1))
                    return "unable to parse y2 of the primitive coordinates for ID = " + primitiveId;

                var rect = new MyRectangle(this.scene, primitiveId, x1, x2, y1, y2);

                this.primitives[primitiveId] = rect;
            } else if (primitiveType == 'cylinder'){
                var base = this.reader.getFloat(grandChildren[0], 'base');
                if(!(base != null && !isNaN(base)))
                    return "unable to parse base of the primitive for ID = " + primitiveId;
                
                var top = this.reader.getFloat(grandChildren[0], 'top');
                if(!(top != null && !isNaN(top)))
                    return "unable to parse top of the primitive for ID = " + primitiveId;
                
                var height = this.reader.getFloat(grandChildren[0], 'height');
                    if(!(height != null && !isNaN(height)))
                    return "unable to parse height of the primitive for ID = " + primitiveId;
                
                var slices = this.reader.getInteger(grandChildren[0], 'slices');
                if(!(slices != null && !isNaN(slices)))
                    return "unable to parse slices of the primitive for ID = " + primitiveId;
                 
                var stacks = this.reader.getInteger(grandChildren[0], 'stacks');
                if(!(stacks != null && !isNaN(stacks)))
                    return "unable to parse stacks of the primitive for ID = " + primitiveId;
                
                var cyl = new MyCylinder(this.scene, primitiveId, slices, stacks, height, base, top);
                
                this.primitives[primitiveId] = cyl;
            } else if (primitiveType == 'triangle'){
                // x1
                var x1 = this.reader.getFloat(grandChildren[0], 'x1');
                if (!(x1 != null && !isNaN(x1)))
                    return "unable to parse x1 of the primitive coordinates for ID = " + primitiveId;

                // y1
                var y1 = this.reader.getFloat(grandChildren[0], 'y1');
                if (!(y1 != null && !isNaN(y1)))
                    return "unable to parse y1 of the primitive coordinates for ID = " + primitiveId;

                // z1
                var z1 = this.reader.getFloat(grandChildren[0], 'z1');
                if (!(z1 != null && !isNaN(z1)))
                    return "unable to parse z1 of the primitive coordinates for ID = " + primitiveId;

                // x2
                var x2 = this.reader.getFloat(grandChildren[0], 'x2');
                if (!(x2 != null && !isNaN(x2)))
                    return "unable to parse x2 of the primitive coordinates for ID = " + primitiveId;

                // y2
                var y2 = this.reader.getFloat(grandChildren[0], 'y2');
                if (!(y2 != null && !isNaN(y2)))
                    return "unable to parse y2 of the primitive coordinates for ID = " + primitiveId;

                // z2
                var z2 = this.reader.getFloat(grandChildren[0], 'z2');
                if (!(z2 != null && !isNaN(z2)))
                    return "unable to parse z2 of the primitive coordinates for ID = " + primitiveId;

                // x3
                var x3 = this.reader.getFloat(grandChildren[0], 'x3');
                if (!(x3 != null && !isNaN(x3)))
                    return "unable to parse x3 of the primitive coordinates for ID = " + primitiveId;

                // y3
                var y3 = this.reader.getFloat(grandChildren[0], 'y3');
                if (!(y3 != null && !isNaN(y3)))
                    return "unable to parse y3 of the primitive coordinates for ID = " + primitiveId;

                // z3
                var z3 = this.reader.getFloat(grandChildren[0], 'z3');
                if (!(z3 != null && !isNaN(z3)))
                    return "unable to parse z3 of the primitive coordinates for ID = " + primitiveId;

                var tri = new MyTriangle(this.scene, primitiveId, x1, x2, x3, y1, y2, y3, z1, z2, z3);

                this.primitives[primitiveId] = tri;
                
            } else if (primitiveType == 'sphere'){
                var radius = this.reader.getFloat(grandChildren[0], 'radius');
                if(!(radius != null && !isNaN(radius)))
                    return "unable to parse radius of the primitive " + primitiveId;
                
                var slices = this.reader.getInteger(grandChildren[0], 'slices');
                if(!(slices != null && !isNaN(slices)))
                    return "unable to parse slices of the primitive " + primitiveId;
                
                
                var stacks = this.reader.getFloat(grandChildren[0], 'stacks');
                if(!(stacks != null && !isNaN(stacks)))
                    return "unable to parse stacks of the primitive " + primitiveId;
                
                var sphere = new MySphere(this.scene, primitiveId, slices, stacks, radius);

                this.primitives[primitiveId] = sphere;
            } else if (primitiveType == 'torus'){
                //<torus inner="ff" outer="ff" slices="ii" loops="ii" />
                var inner = this.reader.getFloat(grandChildren[0], 'inner');
                if(!(inner != null && !isNaN(inner)))
                    return "unable to parse inner radius of the primitive " + primitiveId;
                
                var outer = this.reader.getFloat(grandChildren[0], 'outer');
                if(!(outer != null && !isNaN(outer)))
                    return "unable to parse outer radius of the primitive " + primitiveId;
                
                var slices = this.reader.getInteger(grandChildren[0], 'slices');
                if(!(slices != null && !isNaN(slices)))
                    return "unable to parse slices of the primitive " + primitiveId;
                
                var loops = this.reader.getInteger(grandChildren[0], 'loops');
                if(!(loops != null && !isNaN(loops)))
                    return "unable to parse loops of the primitive " + primitiveId;
                
                var torus = new MyTorus(this.scene, primitiveId, inner, outer, slices, loops);

                this.primitives[primitiveId] = torus;
            }
            else {
                this.onXMLMinorError(primitiveType + " is not a valid primitive type, for ID = " + primitiveId);
                //console.warn("To do: Parse other primitives.");
            }
        }

        this.log("Parsed primitives");
        return null;
    }

    /**
   * Parses the <components> block.
   * @param {components block element} componentsNode
   */
    parseComponents(componentsNode) {
        var children = componentsNode.children;

        this.components = [];

        var grandChildren = [];
        var grandgrandChildren = [];
        var nodeNames = [];

        var Material = null;
        var Texture = null;

        // Any number of components.
        for (var i = 0; i < children.length; i++) {

            if (children[i].nodeName != "component") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            // Get id of the current component.
            var componentID = this.reader.getString(children[i], 'id');
            if (componentID == null)
                return "no ID defined for componentID";

            // Checks for repeated IDs.
            if (this.components[componentID] != null)
                return "ID must be unique for each component (conflict: ID = " + componentID + ")";

            grandChildren = children[i].children;

            nodeNames = [];
            for (var j = 0; j < grandChildren.length; j++) {
                nodeNames.push(grandChildren[j].nodeName);
            }

            var transformationIndex = nodeNames.indexOf("transformation");
            var materialsIndex = nodeNames.indexOf("materials");
            var textureIndex = nodeNames.indexOf("texture");
            var childrenIndex = nodeNames.indexOf("children");

            //this.onXMLMinorError("To do: Parse components.");
            // Transformations
            grandgrandChildren = grandChildren[transformationIndex].children;
            var transfMatrix = mat4.create();
            if (grandgrandChildren.length == 0){
                transfMatrix = mat4.create();
            } else if (grandgrandChildren[0].nodeName == "transformationref") {
                var transformationID = this.reader.getString(grandgrandChildren[0], 'id');
                transfMatrix = this.transformations[transformationID];
                if(transfMatrix == null)
                    return "Transformation " + transformationID + " not defined for component " + componentID;
            } else {
                for (var j = 0; j < grandgrandChildren.length; j++) {
                    switch (grandgrandChildren[j].nodeName) {
                        case 'translate':
                            var coordinates = this.parseCoordinates3D(grandgrandChildren[j], "translate transformation for ID " + transformationID);
                            if (!Array.isArray(coordinates))
                                return coordinates;
    
                            transfMatrix = mat4.translate(transfMatrix, transfMatrix, coordinates);
                            break;
                        case 'scale':                        
                            //this.onXMLMinorError("To do: Parse scale transformations.");
                            var coordinates = this.parseCoordinates3D(grandgrandChildren[j], "scale transformation for ID " + transformationID);
                            if (!Array.isArray(coordinates))
                                return coordinates;
    
                            transfMatrix = mat4.scale(transfMatrix, transfMatrix, coordinates);
                            break;
                        case 'rotate':
                            // angle
                            //this.onXMLMinorError("To do: Parse rotate transformations.");
                            var angle = this.reader.getFloat(grandgrandChildren[j], 'angle');
                            var axis = this.reader.getString(grandgrandChildren[j], 'axis');
    
                            if(axis == null || angle == null || isNaN(angle))
                                return "Missing attribute for transformation " + transformationID;
    
                            if (axis != 'x' && axis != 'y' && axis != 'z' && axis != 'X' && axis != 'Y' && axis != 'Z')
                                return "Axis component for transformation " + transformationID + "must be either x, y or z";
    
                            //transfMatrix = mat4.rotate(transfMatrix, transfMatrix, DEGREE_TO_RAD*angle, axis);

                            switch(axis){
                                case 'x':
                                case 'X':
                                    transfMatrix = mat4.rotateX(transfMatrix, transfMatrix, DEGREE_TO_RAD*angle);
                                    break;
                                case 'y':
                                case 'Y':
                                    transfMatrix = mat4.rotateY(transfMatrix, transfMatrix, DEGREE_TO_RAD*angle);
                                    break;
                                case 'z':
                                case 'Z':
                                    transfMatrix = mat4.rotateZ(transfMatrix, transfMatrix, DEGREE_TO_RAD*angle);
                                    break;
                            }
                            break;
                    }
                }
            }

            // Materials
            var materials = [];
            grandgrandChildren = grandChildren[materialsIndex].children;

            for (var j = 0; j < grandgrandChildren.length; j++) {
                if(this.reader.getString(grandgrandChildren[j], "id") == "inherit"){
                    if(Material == null){
                        return "No material defined for parent component " + componentID;
                    }
                    materials.push(Material);
                    continue;
                }
                var aux = this.materials[this.reader.getString(grandgrandChildren[j], "id")];
                if(aux == null){
                    this.onXMLMinorError("No material " + this.reader.getString(grandgrandChildren[j], "id") + " defined!");
                    continue;
                }
                Material = aux;
                materials.push(aux);
            }

            // Texture
            var texture = this.reader.getString(grandChildren[textureIndex], "id");
            if (texture == "inherit"){
                texture = Texture;
            }
            else if (texture == "none"){
                texture = null;
            }
            else {
                texture = this.textures[texture];
            }
            Texture = texture;
            var length_s = 1;
            var length_t = 1;
            if (this.reader.hasAttribute(grandChildren[textureIndex], "length_s"))
                length_s = this.reader.getFloat(grandChildren[textureIndex], "length_s");
            if (this.reader.hasAttribute(grandChildren[textureIndex], "length_t"))
                length_t = this.reader.getFloat(grandChildren[textureIndex], "length_t");

            if (length_s == null || isNaN(length_s))
                length_s = 1;
                
            if (length_t == null || isNaN(length_t))
                length_t = 1;

            // Children
            var childPrimList = [];
            var childCompList = [];

            var numChildren = 0;
            grandgrandChildren = grandChildren[childrenIndex].children;
            for (var j = 0; j < grandgrandChildren.length; j++) {
                var child = grandgrandChildren[j];
                var childId = this.reader.getString(child, "id");

                if (child.nodeName == "componentref"){
                    childCompList.push(childId);
                } else if (child.nodeName == "primitiveref"){
                    childPrimList.push(childId);
                } else {
                    this.onXMLMinorError("Attribute " + child.nodeName + " isn't a primitive or a component, in component " + componentID);
                    continue;
                }
                numChildren++;

            }
            if (numChildren == 0){
                return "at least one child must be defined";
            }

            var comp = new MyComponent(this.scene, componentID, transfMatrix, materials, texture, childCompList, childPrimList, length_s, length_t);

            this.components[componentID] = comp;

            //this.onXMLMinorError("To do: Save components.");
        }
    }


    /**
     * Parse the coordinates from a node with ID = id
     * @param {block element} node
     * @param {message to be displayed in case of error} messageError
     */
    parseCoordinates3D(node, messageError) {
        var position = [];

        // x
        var x = this.reader.getFloat(node, 'x');
        if (!(x != null && !isNaN(x)))
            return "unable to parse x-coordinate of the " + messageError;

        // y
        var y = this.reader.getFloat(node, 'y');
        if (!(y != null && !isNaN(y)))
            return "unable to parse y-coordinate of the " + messageError;

        // z
        var z = this.reader.getFloat(node, 'z');
        if (!(z != null && !isNaN(z)))
            return "unable to parse z-coordinate of the " + messageError;

        position.push(...[x, y, z]);

        return position;
    }

    /**
     * Parse the coordinates from a node with ID = id
     * @param {block element} node
     * @param {message to be displayed in case of error} messageError
     */
    parseCoordinates4D(node, messageError) {
        var position = [];

        //Get x, y, z
        position = this.parseCoordinates3D(node, messageError);

        if (!Array.isArray(position))
            return position;


        // w
        var w = this.reader.getFloat(node, 'w');
        if (!(w != null && !isNaN(w)))
            return "unable to parse w-coordinate of the " + messageError;

        position.push(w);

        return position;
    }

    /**
     * Parse the color components from a node
     * @param {block element} node
     * @param {message to be displayed in case of error} messageError
     */
    parseColor(node, messageError) {
        var color = [];

        // R
        var r = this.reader.getFloat(node, 'r');
        if (!(r != null && !isNaN(r) && r >= 0 && r <= 1))
            return "unable to parse R component of the " + messageError;

        // G
        var g = this.reader.getFloat(node, 'g');
        if (!(g != null && !isNaN(g) && g >= 0 && g <= 1))
            return "unable to parse G component of the " + messageError;

        // B
        var b = this.reader.getFloat(node, 'b');
        if (!(b != null && !isNaN(b) && b >= 0 && b <= 1))
            return "unable to parse B component of the " + messageError;

        // A
        var a = this.reader.getFloat(node, 'a');
        if (!(a != null && !isNaN(a) && a >= 0 && a <= 1))
            return "unable to parse A component of the " + messageError;

        color.push(...[r, g, b, a]);

        return color;
    }

    /*
     * Callback to be executed on any read error, showing an error on the console.
     * @param {string} message
     */
    onXMLError(message) {
        console.error("XML Loading Error: " + message);
        this.loadedOk = false;
    }

    /**
     * Callback to be executed on any minor error, showing a warning on the console.
     * @param {string} message
     */
    onXMLMinorError(message) {
        console.warn("Warning: " + message);
    }

    /**
     * Callback to be executed on any message.
     * @param {string} message
     */
    log(message) {
        console.log("   " + message);
    }

    /**
     * Traverses the scene graph processing nodes and displaying primitives
     * @param {Current node to be processed} component 
     */
    processNode(component) {

        this.scene.multMatrix(component.transfMat);

        for (var i = 0; i < component.childCompList.length; i++) {
            component.getCurrentMaterial().apply();
            if (component.texture) component.texture.bind();
            this.scene.pushMatrix();
            this.processNode(component.childCompList[i]);
            this.scene.popMatrix();
        }

        for (var i = 0; i < component.childPrimList.length; i++) {
            component.getCurrentMaterial().apply();
            if (component.texture) component.texture.bind();
            this.scene.pushMatrix();
            component.childPrimList[i].display();
            this.scene.popMatrix();
        }
    }

    /**
     * Displays the scene, processing each node, starting in the root node.
     */
    displayScene() {
        //To do: Create display loop for transversing the scene graph

        //To test the parsing/creation of the primitives, call the display function directly
        //this.primitives['boxFace'].display();

        this.processNode(this.components[this.idRoot]);

        /*for (const key in this.primitives) {
            this.primitives[key].display();
        }*/
    }
}