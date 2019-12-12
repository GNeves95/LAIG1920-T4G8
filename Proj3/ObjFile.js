class ObjFile {
    constructor() { }

    parseObj(obj) {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
        var lines = obj.split('\n');
        for (var i = 0; i < lines.length; i++) {
            var currLine = lines[i];
            if (currLine[0] == 'v') {
                if (currLine[1] == ' ') {
                    var points = currLine.split(' ');
                    this.vertices.push(parseFloat(points[1]), parseFloat(points[2]), parseFloat(points[3]));
                }
                else if (currLine[1] == 't'){
                    var points = currLine.split(' ');
                    this.texCoords.push(parseFloat(points[1]), parseFloat(points[2]));
                }
                else if (currLine[1] == 'n'){
                    var points = currLine.split(' ');
                    this.normals.push(parseFloat(points[1]), parseFloat(points[2]), parseFloat(points[3]));
                }
            } else if(currLine[0] == 'f'){
                var faces = currLine.split(' ');
                for (var j = 1; j < faces.length; j++){
                    var facePoints = faces[j].split('/');
                    this.indices.push(parseInt(facePoints[0])/*, parseInt(facePoints[1]), parseInt(facePoints[2])*/);
                }
            }
        }
    }
}