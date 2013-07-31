var http = require("http"),
    express = require("express")
    jsdom = require("jsdom")
    app = express(),
    port = process.env.PORT || 5000;

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.use(allowCrossDomain);
app.use(express.logger());
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
    console.log("Getting " + request.query.q);
    jsdom.env(request.query.q, 

        function(errors, window){
            if(window){
                response.send({title: window.document.title});
            } else {
                response.send({title: ""});
            }
    });
});


app.listen(port, function() {
    console.log("Listening on " + port);
});


