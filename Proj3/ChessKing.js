class ChessKing extends ChessPiece {
    constructor(scene, id, white, x, y, z, obj) {
        super(scene, id, white, x, y, z, obj);
    }

    getPossibleMoves(){
        var moves = [];
        var temp_x = this.x;
        var temp_z = this.z;

        if(temp_x <=7 && temp_x >=0 && temp_z <=7 && temp_z >=0){
            moves.push([this.x+1, this.z]);
            temp_x = this.x;
            temp_z = this.z;
        }
        if(temp_x <=7 && temp_x >=0 && temp_z <=7 && temp_z >=0){
            moves.push([this.x-1, this.z]);
            temp_x = this.x;
            temp_z = this.z;
        }
        if(temp_x <=7 && temp_x >=0 && temp_z <=7 && temp_z >=0){
            moves.push([this.x, this.z+1]);
            temp_x = this.x;
            temp_z = this.z;
        }
        if(temp_x <=7 && temp_x >=0 && temp_z <=7 && temp_z >=0){
            moves.push([this.x, this.z-1]);
            temp_x = this.x;
            temp_z = this.z;
        }
        if(temp_x <=7 && temp_x >=0 && temp_z <=7 && temp_z >=0){
            moves.push([this.x+1, this.z-1]);
            temp_x = this.x;
            temp_z = this.z;
        }
        if(temp_x <=7 && temp_x >=0 && temp_z <=7 && temp_z >=0){
            moves.push([this.x+1, this.z+1]);
            temp_x = this.x;
            temp_z = this.z;
        }
        if(temp_x <=7 && temp_x >=0 && temp_z <=7 && temp_z >=0){
            moves.push([this.x-1, this.z+1]);
            temp_x = this.x;
            temp_z = this.z;
        }
        if(temp_x <=7 && temp_x >=0 && temp_z <=7 && temp_z >=0){
            moves.push([this.x-1, this.z-1]);
            temp_x = this.x;
            temp_z = this.z;
        }
        return moves;
    }

}