/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
        /**
         * @Task1 : Implement the draw function for the SceneNode class.
         */
        
        var Mpvval = MatrixMult(mvp, this.trs.getTransformationMatrix());
        var viewer = MatrixMult(modelView, this.trs.getTransformationMatrix());
        var transnorm = getNormalMatrix(viewer);
        var transmod = MatrixMult(modelMatrix, this.trs.getTransformationMatrix());

        // Draw the MeshDrawer
        if (this.meshDrawer)
		{
            this.meshDrawer.draw(Mpvval, viewer, transnorm, transmod);
        }
		for (var k = 0; k < this.children.length; k++)
		{
            this.children[k].draw(Mpvval, viewer, transnorm, transmod);
        }
    }

    

}