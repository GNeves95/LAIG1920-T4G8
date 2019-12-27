class ChessKing extends ChessPiece {
    constructor(scene, id, white, x, y, z, obj) {
        super(scene, id, white, x, y, z, obj);
    }

    getPossibleMoves(){
        moves = [];
        temp_x = x;
        temp_z = z;

        if(temp_x <=7 && temp_x >=0 && temp_z <=7 && temp_z >=0){
            moves.push[x+1, z];
            temp_x = x;
            temp_z = z;
        }
        if(temp_x <=7 && temp_x >=0 && temp_z <=7 && temp_z >=0){
            moves.push[x-1, z];
            temp_x = x;
            temp_z = z;
        }
        if(temp_x <=7 && temp_x >=0 && temp_z <=7 && temp_z >=0){
            moves.push[x, z+1];
            temp_x = x;
            temp_z = z;
        }
        if(temp_x <=7 && temp_x >=0 && temp_z <=7 && temp_z >=0){
            moves.push[x, z-1];
            temp_x = x;
            temp_z = z;
        }
        if(temp_x <=7 && temp_x >=0 && temp_z <=7 && temp_z >=0){
            moves.push[x+1, z-1];
            temp_x = x;
            temp_z = z;
        }
        if(temp_x <=7 && temp_x >=0 && temp_z <=7 && temp_z >=0){
            moves.push[x+1, z+1];
            temp_x = x;
            temp_z = z;
        }
        if(temp_x <=7 && temp_x >=0 && temp_z <=7 && temp_z >=0){
            moves.push[x-1, z+1];
            temp_x = x;
            temp_z = z;
        }
        if(temp_x <=7 && temp_x >=0 && temp_z <=7 && temp_z >=0){
            moves.push[x-1, z-1];
            temp_x = x;
            temp_z = z;
        }
    }

}