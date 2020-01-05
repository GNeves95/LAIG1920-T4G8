class ObjFile {
    constructor() { }

    parseObj(obj) {
        console.log("");
        this.vertices = [];
        var auxVert = [];
        this.indices = [];
        this.normals = [];
        var auxNorm = [];
        this.texCoords = [];
        var auxText = [];
        var lines = obj.split('\n');
        var index = 0;
        for (var i = 0; i < lines.length; i++) {
            var currLine = lines[i];
            if (currLine[0] == 'v') {
                if (currLine[1] == ' ') {
                    var points = currLine.split(' ');
                    auxVert.push([parseFloat(points[1]), parseFloat(points[2]), parseFloat(points[3])]);
                }
                else if (currLine[1] == 't' && currLine[2] == ' ') {
                    var points = currLine.split(' ');
                    auxText.push([parseFloat(points[1]), parseFloat(points[2])]);
                }
                else if (currLine[1] == 'n' && currLine[2] == ' ') {
                    var points = currLine.split(' ');
                    auxNorm.push([parseFloat(points[1]), parseFloat(points[2]), parseFloat(points[3])]);
                }
            } else if (currLine[0] == 'f' && currLine[1] == ' ') {
                var faces = currLine.split(' ');
                //this.indices.push(parseInt(faces[1].split('/')[0])-1,parseInt(faces[2].split('/')[0])-1,parseInt(faces[3].split('/')[0])-1);
                if (faces.length > 4) {
                    var facePoints = faces[1].split('/');

                    if (!isNaN(facePoints[0])) {
                        //console.log(facePoints[0]);
                        //console.log(...auxVert[parseInt(facePoints[0]) - 1]);
                        this.vertices.push(...auxVert[Math.abs(parseInt(facePoints[0])) - 1]);
                    }

                    if (facePoints[1]) {
                        this.texCoords.push(...auxText[Math.abs(parseInt(facePoints[1])) - 1]);
                    }

                    if (facePoints[2]) {
                        this.normals.push(...auxNorm[Math.abs(parseInt(facePoints[2])) - 1]);
                    } else {
                        if (auxNorm.length)
                            this.normals.push(...parseInt(auxNorm[i]) - 1);
                        else
                            this.normals.push(...auxVert[Math.abs(parseInt(facePoints[0])) - 1]);
                    }

                    this.indices.push(index);
                    index++;

                    var facePoints = faces[2].split('/');

                    if (!isNaN(facePoints[0])) {
                        this.vertices.push(...auxVert[Math.abs(parseInt(facePoints[0])) - 1]);
                    }

                    if (facePoints[1]) {
                        this.texCoords.push(...auxText[Math.abs(parseInt(facePoints[1])) - 1]);
                    }

                    if (facePoints[2]) {
                        this.normals.push(...auxNorm[Math.abs(parseInt(facePoints[2])) - 1]);
                    } else {
                        if (auxNorm.length)
                            this.normals.push(...parseInt(auxNorm[i]) - 1);
                        else
                            this.normals.push(...auxVert[Math.abs(parseInt(facePoints[0])) - 1]);
                    }

                    this.indices.push(index);
                    index++;

                    var facePoints = faces[3].split('/');

                    if (!isNaN(facePoints[0])) {
                        this.vertices.push(...auxVert[Math.abs(parseInt(facePoints[0])) - 1]);
                    }

                    if (facePoints[1]) {
                        this.texCoords.push(...auxText[Math.abs(parseInt(facePoints[1])) - 1]);
                    }

                    if (facePoints[2]) {
                        this.normals.push(...auxNorm[Math.abs(parseInt(facePoints[2])) - 1]);
                    } else {
                        if (auxNorm.length)
                            this.normals.push(...parseInt(auxNorm[i]) - 1);
                        else
                            this.normals.push(...auxVert[Math.abs(parseInt(facePoints[0])) - 1]);
                    }

                    this.indices.push(index);
                    index++;

                    var facePoints = faces[1].split('/');

                    if (!isNaN(facePoints[0])) {
                        this.vertices.push(...auxVert[Math.abs(parseInt(facePoints[0])) - 1]);
                    }

                    if (facePoints[1]) {
                        this.texCoords.push(...auxText[Math.abs(parseInt(facePoints[1])) - 1]);
                    }

                    if (facePoints[2]) {
                        this.normals.push(...auxNorm[Math.abs(parseInt(facePoints[2])) - 1]);
                    } else {
                        if (auxNorm.length)
                            this.normals.push(...parseInt(auxNorm[i]) - 1);
                        else
                            this.normals.push(...auxVert[Math.abs(parseInt(facePoints[0])) - 1]);
                    }

                    this.indices.push(index);
                    index++;

                    var facePoints = faces[3].split('/');

                    if (!isNaN(facePoints[0])) {
                        this.vertices.push(...auxVert[Math.abs(parseInt(facePoints[0])) - 1]);
                    }

                    if (facePoints[1]) {
                        this.texCoords.push(...auxText[Math.abs(parseInt(facePoints[1])) - 1]);
                    }

                    if (facePoints[2]) {
                        this.normals.push(...auxNorm[Math.abs(parseInt(facePoints[2])) - 1]);
                    } else {
                        if (auxNorm.length)
                            this.normals.push(...parseInt(auxNorm[i]) - 1);
                        else
                            this.normals.push(...auxVert[Math.abs(parseInt(facePoints[0])) - 1]);
                    }

                    this.indices.push(index);
                    index++;

                    var facePoints = faces[4].split('/');

                    if (!isNaN(facePoints[0])) {
                        //console.log(facePoints[0]);
                        this.vertices.push(...auxVert[Math.abs(parseInt(facePoints[0])) - 1]);
                    }

                    if (facePoints[1]) {
                        this.texCoords.push(...auxText[Math.abs(parseInt(facePoints[1])) - 1]);
                    }

                    if (facePoints[2]) {
                        this.normals.push(...auxNorm[Math.abs(parseInt(facePoints[2])) - 1]);
                    } else {
                        if (auxNorm.length)
                            this.normals.push(...parseInt(auxNorm[i]) - 1);
                        else
                            this.normals.push(...auxVert[Math.abs(parseInt(facePoints[0])) - 1]);
                    }

                    this.indices.push(index);
                    index++;
                } else {
                    for (var j = 1; j < faces.length; j++) {

                        var facePoints = faces[j].split('/');

                        if (!isNaN(facePoints[0])) {
                            this.vertices.push(...auxVert[Math.abs(parseInt(facePoints[0])) - 1]);
                        }

                        if (facePoints[1]) {
                            this.texCoords.push(...auxText[Math.abs(parseInt(facePoints[1])) - 1]);
                        }

                        if (facePoints[2]) {
                            this.normals.push(...auxNorm[Math.abs(parseInt(facePoints[2])) - 1]);
                        } else {
                            if (auxNorm.length)
                                this.normals.push(...parseInt(auxNorm[i]) - 1);
                            else
                                this.normals.push(...auxVert[Math.abs(parseInt(facePoints[0])) - 1]);
                        }

                        this.indices.push(index);
                        index++;
                    }
                    //this.indices.push(parseInt(facePoints[0])-1/*, parseInt(facePoints[1]), parseInt(facePoints[2]));
                }
            }
        }
        if (this.normals.length == 0) {
            for (var i = 0; i < this.vertices.length; i++) {
                if (auxNorm.length)
                    this.normals.push(parseInt(auxNorm[i]) - 1);
                else
                    this.normals.push(i);
            }
        }

        if (this.texCoords.length == 0)
            this.texCoords = null;
        //console.log("");
        //console.log(this.normals);
        //console.log(this.indices);
        //console.log(this.vertices);
        //console.log(this.texCoords);

        //for (var j = this.normals.length; j < this.vertices.length; j++){
        //    this.normals.push(0.0,1.0,0.0);
        //}
        //while(this.normals.length > this.vertices.length){
        //    this.normals.pop();
        //}
    }
}