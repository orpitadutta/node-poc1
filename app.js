var http = require('http');
var url = require('url');
var events = require('events');
var fs = require('fs');

http.createServer(function(request, response){
    response.writeHead(200, { 'Content-Type': 'text/html' });
    var myReadStream;
    var datetime = new Date();
    var days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var day = "/" +days[datetime.getDay()].toLowerCase().trim();
    console.log("myurl" + request.url + "gh", request.url+ "nm  " + day);

    if(request.url == "/" || request.url == "/favicon.ico"){
        myReadStream = fs.createReadStream(__dirname + '/pages/home.html','utf8');
        myReadStream.pipe(response);
    }
    else if(request.url == "/portfolio"){
        myReadStream = fs.createReadStream(__dirname + '/pages/portfolio.html','utf8');
        myReadStream.pipe(response);
    }
    else if(request.url == "/about"){
        myReadStream = fs.createReadStream(__dirname + '/pages/about.html','utf8');
        myReadStream.pipe(response);
    }
    else if(request.url == day){
        response.write(`<html><head><style>div.centre {
            width: 200px;
            display: block;
            background-color: #eaf1a9;
            margin-left: auto;
            margin-right: auto;
            text-align: center;
          }</style></head><body>`);
        response.write(`<a href="/" style="background-color:rgb(238, 255, 0);color: black; padding: 8px 20px; text-decoration:none;
        font-weight:bold;
        border-radius:5px;
        cursor:pointer; float:right; margin-right: 100px;"> Back</a>
        <div class="centre">`+
        " <p> Time: " +datetime.toLocaleTimeString()+"</p>"+
        "</div>"
        );
        response.end('</body></html>');
    }
    else{
        response.write('<html><head></head><body>');
        response.write(`<a href="/" style="background-color:rgb(238, 255, 0);color: black; padding: 8px 20px; text-decoration:none;
        font-weight:bold;
        border-radius:5px;
        cursor:pointer; float:right; margin-right: 100px;"> Back</a>
        <div class="centre">`+
        "<p> Not current day. Please go Back...!!</p>"+
        "</div>");
        response.end('</body></html>');
    }
    
}).listen(8080);

console.log('Server is running at http://127.0.0.1:8080/ ');