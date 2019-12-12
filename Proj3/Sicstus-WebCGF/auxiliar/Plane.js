
/** Represents a plane with nrDivs divisions along both axis, with center at (0,0) */
class Plane extends CGFobject{
	constructor(scene, nPartsU, nPartsV) {
		super(scene);
		this.nPartsU = nPartsU;
		this.nPartsV = nPartsV;

		this.makeSurface();
	}

	makeSurface()
    {
        
        this.controlPoints =[[  [0.5, 0,-0.5,1],
                                [0.5, 0, 0.5, 1]
                            ],
                            [   [-0.5, 0, -0.5,1],
                                [-0.5, 0, 0.5, 1]
                            ]];


        this.surface = new CGFnurbsSurface(1, 1, this.controlPoints);

        this.obj = new CGFnurbsObject(this.scene, this.nPartsU, this.nPartsV, this.surface);
                            
    }

    display()
    {
        this.obj.display();
    }

}


