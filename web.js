var http = require("http"),
    express = require("express")
    jsdom = require("jsdom")
    app = express(),
    port = process.env.PORT || 5000;

app.use(express.logger());

app.get('/', function(request, response) {
    console.log("Getting " + request.query.q);
    jsdom.env(request.query.q, 

        function(errors, window){
            response.header('Content-Type', 'application/json');
            response.header('Access-Control-Allow-Origin:', '*');
            response.send({title: window.document.title});
    });
});


app.listen(port, function() {
    console.log("Listening on " + port);
});


