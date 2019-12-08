/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 * @param base - Base radius
 * @param top - Top radius
 * @param height - Height
 * @param slices - Number of divisions around
 * @param stacks - Number of divisions along height
 */

class MyCylinder2 extends CGFobject
{
    constructor(scene, base, top, height, slices, stacks)
	{
        super(scene);

        this.base = base;
        this.top = top;
        this.height = height;
        this.slices = slices;
        this.stacks = stacks;

        this.makeSurface();
    }

    makeSurface()
    {
        
        this.controlPoints =[[   [-this.base,0,0,1],
                                [-this.base, (4/3)*this.base, 0, 1],
                                [this.base, (4/3)*this.base, 0, 1],
                                [this.base, 0, 0, 1]
                            ],
                            [   [-this.top,0,this.height,1],
                                [-this.top, (4/3)*this.top, this.height, 1],
                                [this.top, (4/3)*this.top, this.height, 1],
                                [this.top, 0, this.height, 1]
                            ]];


        this.surface = new CGFnurbsSurface(1, 3, this.controlPoints);

        this.obj = new CGFnurbsObject(this.scene, this.slices/2, this.stacks, this.surface);
                            
    }

    display()
    {
        this.obj.display();
        this.scene.pushMatrix();

        var ident = mat4.create()

        mat4.rotateZ(ident, ident, Math.PI);

        this.scene.multMatrix(ident);
        this.obj.display();

        this.scene.popMatrix();
    }
}

