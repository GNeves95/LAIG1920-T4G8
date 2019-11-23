/**
 * Patch
 * @constructor
 * @param scene - Reference to MyScene object
 * @param npointsU - Number of U control points
 * @param npointsV - Number of V control points
 * @param npartsU - Number of divisions in U
 * @param npartsV - Number of divisions in V
 * @param points - Control points
 */
class Patch extends CGFobject 
{
    constructor(scene, npointsU, npointsV, npartsU, npartsV, points){
        super(scene);
        this.npointsU = npointsU;
        this.npointsV = npointsV;
        this.npartsU = npartsU;
        this.npartsV = npartsV;
        this.points = points;

        this.makeSurface();
    }

    makeSurface(){
        this.controlPoints = [];

        for(var i = 0; i < this.npointsU; i++){
            var pointsInU = [];
            for (var j = 0; j < this.npointsV; j++){
                pointsInU.push(this.points[i*this.npointsV + j]);
            }
            this.controlPoints.push(pointsInU);
        }

        this.surface = new CGFnurbsSurface(this.npointsU - 1, this.npointsV - 1, this.controlPoints);
        this.obj = new CGFnurbsObject(this.scene, this.npartsU, this.npartsV, this.surface);
    }

    display(){
        this.obj.display();
    }
}