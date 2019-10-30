/**
 * MyComponent
 * @constructor
 * @param scene - Reference to MyScene object
 * @param id - Id of the component
 * @param matrix - Transformation matrix of the component
 * @param materials - Materials applied to the component
 * @param texture - texture applied to the component
 * @param childCompList - component children of the component
 * @param childPrimList - primitive children of the component
 * @param ls - scale of the s parameter of the texture
 * @param lt - scale of the t parameter of the texture
 */

class MyComponent extends CGFobject{
    constructor(scene, id, matrix, materials, texture, childCompList, childPrimList, ls, lt) {
        super(scene);
        this.id = id;
        this.transfMat = matrix;
        this.materials = materials;
        this.texture = texture;
        this.childCompList = childCompList;
        this.childPrimList = childPrimList;
        this.lengthS = ls;
        this.lengthT = lt;

        this.currMaterial = 0;
    }

    changeMaterial(){
        this.currMaterial++;
        this.currMaterial = this.currMaterial%this.materials.length;
    }
    
    getCurrentMaterial(){
        return this.materials[this.currMaterial];
    }
}