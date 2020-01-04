class Comms {
    constructor(scene) {
        this.answer = '';
        this.hasResponse = false;
        this.scene = scene;
    }

    getPrologRequest(requestString, onSuccess, onError, port) {
        var requestPort = port || 8080
        var request = new XMLHttpRequest();
        var auxScene = this.scene;
        //request.open('POST', 'http://localhost:' + requestPort + '/' + requestString, true);

        request.open('POST', 'http://localhost:' + requestPort + '/', true);

        request.onload = onSuccess || function (data) { console.log("Request successful. Reply: " + data.target.response); this.hasResponse = true; this.answer = data.target.response; auxScene.newAnswer = data.target.response;};
        request.onerror = onError || function () { console.log("Error waiting for response"); };

        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.send(requestString);
    }

    makeRequest(message) {
        // Get Parameter Values 
        //var requestString = document.querySelector("#query_field").value;
        //console.log(requestString);

        // Make Request 
        //console.log(message);
        this.hasResponse = false;
        this.getPrologRequest(message/*, this.handleReply*/);
    }

    //Handle the Reply 
    handleReply(data) {
        //document.querySelector("#query_result").innerHTML = data.target.response;
        console.log(data.target.response);
        this.answer = data.target.response;
        this.hasResponse = true;
    }
}