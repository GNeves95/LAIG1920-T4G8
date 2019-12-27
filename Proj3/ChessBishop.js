class ChessBishop extends ChessPiece {
    constructor(scene, id, white, x, y, z, obj) {
        super(scene, id, white, x, y, z, obj);
    }

    getPossibleMoves(){
        //bispo está no [2, y, 0]
        moves = [];
        var temp_x = x;
        var temp_z = z;
        while(temp_x < 7 && temp_z < 7){
            temp_x++;
            temp_z++;
            moves.push[temp_x, temp_z];
        }
        temp_x = x;
        temp_z = z;
        while(temp_x < 7 && temp_z > 0){
            temp_x++;
            temp_z--;
            moves.push[temp_x, temp_z];
        }
        temp_x = x;
        temp_z = z;
        while(temp_x > 0 && temp_z < 7){
            temp_x--;
            temp_z++;
            moves.push[temp_x, temp_z];
        }
        temp_x = x;
        temp_z = z;
        while(temp_x > 0 && temp_z > 0){
            temp_x--;
            temp_z--;
            moves.push[temp_x, temp_z];
        }
    }
}