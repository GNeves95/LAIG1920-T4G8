class PawnObj extends ObjFile{
    constructor(){
        super();
        var xmlhttp = new XMLHttpRequest();
        var body;
        xmlhttp.open("GET", "chess_pawn.obj", false);
        xmlhttp.send();
        xmlhttp.onload = function () {
            if (xmlhttp.status != 200) { // analyze HTTP status of the response
                console.log(`Error ${xmlhttp.status}: ${xmlhttp.statusText}`); // e.g. 404: Not Found
            } else { // show the result
                console.log(`Done, got ${xmlhttp.response.length} bytes`); // responseText is the server
            }
        };

        body = xmlhttp.response;
        super.parseObj(body);
    }
}