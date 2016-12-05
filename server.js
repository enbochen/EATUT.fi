var express = require('express'),
    port = process.env.PORT || 3000,  
    app = express.createServer();

app.get('/', function(request, response) {
    response.sendfile(__dirname + '/index.html');
}).configure(function() {
    app.use('/img', express.static(__dirname + '/img'));
}).listen(port);