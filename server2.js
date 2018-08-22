var express    = require('express');        // call express
var app        = express();     
bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8080;        // set our port
app.listen(port);

var myVar = setInterval(myTimer, 3000);
var myCount = 0
function myTimer() {
myCount=myCount+1;

// Call URL Main Production
var http = require("https");
var options = {
  "method": "GET",
  "hostname": "bim360dm-dev.autodesk.com",
  "port": null,
  "path": "/health?self=true",// path completo
  "headers": {
    "cache-control": "no-cache",
    "postman-token": "d2e9c889-b3f6-3821-f571-4ce8643d942a"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
// aca se convierten los datos en presentación

var jsonn = JSON.parse(body);

k=jsonn.status.workers.length; // Cantidad de entornos activos
//console.log(k);
var j=1;
var i=1;l1=0,l2=0,l3=0,l4=0,l5=0;
jsonn.status.workers.forEach(function(item) {
     //jsonn.status.workers[item]
    var resp3 = item;
     for(var arreglo in resp3) {
                   //console.log(" Environment : " + j + " = " + arreglo);
                   j=j+1;
                   var l=1;
                   for(var elemento in resp3[arreglo]){
                       // console.log( l+ "=" + resp3[arreglo][elemento]);
                        const statusEnv= resp3[arreglo][elemento];
                        switch (l) {
                            case 1:
                                if(statusEnv=="OK"){l1=l1+1}else{l1=l1};
                                break;
                            case 2:
                                if(statusEnv=="OK"){l2=l2+1}else{l2=l2};
                                break;
                            case 3:
                                if(statusEnv=="OK"){l3=l3+1}else{l3=l3};
                                break;
                            case 4:
                                if(statusEnv=="OK"){l4=l4+1}else{l4=l4};
                                break;
                            case 5:
                                if(statusEnv=="OK"){l5=l5+1}else{l5=l5};
                                break;
                        }
                        l=l+1;
                        i=i+1;
                   }
               
                }         
});

//Status data for Dashboard Production

console.log("Service time:" + jsonn.time);
console.log("Service name:" + jsonn.service);
console.log("Service environment:" + jsonn.environment);
console.log("Service Status Overall:" + jsonn.status.overall);
console.log("Service Active Records Status:" + jsonn.status.active_record);
console.log("Service Redis Status:" + jsonn.status.redis);
console.log("Service Workers | Operations:" + k + "|" +(i-1));
console.log("Issue Ping Good Status: "+ Math.round(l1/k*100,-2) +" %");
console.log("Dos Ping Good Status: "+ Math.round(l2/k*100,-2) +" %");
console.log("Folder Notification Good Status: "+ Math.round(l3/k*100,-2) +" %");
console.log("ACM Good Status: "+ Math.round(l4/k*100,-2) +" %");
console.log("OSS Ping Good Status: "+ Math.round(l5/k*100,-2) +" %");
console.log("");
//***
  });
});

//const url2 = 'https://commands.bim360dm-dev.autodesk.com/health'; // Global body call
var http2 = require("https");
var options2 = {
    "method": "GET",
    "hostname": "commands.bim360dm-dev.autodesk.com",
    "port": null,
    "path": "/health",
    "headers": {
      "cache-control": "no-cache",
      "postman-token": "289519ed-c664-8ff3-afcb-b679e7eeebf7"
  }
};

var req2 = http2.request(options2, function (res2) {
  var chunks2 = [];

  res2.on("data", function (chunk2) {
    chunks2.push(chunk2);
  });

  res2.on("end", function () {
    var body2 = Buffer.concat(chunks2);
// aca se convierten los datos en presentación

var jsonn2 = JSON.parse(body2);
console.log("Service time:" + jsonn2.time);
console.log("Service name:" + jsonn2.service);
console.log("Service environment:" + jsonn2.environment);
console.log("Service DB Status:"+ jsonn2.status.db.status);
console.log("Service Overall Status:"+ jsonn2.status.overall);
console.log("");
console.log(myCount);
    });
});
req.end();
req2.end();

if(myCount==20){
    clearInterval(myVar);
    //colocar aca el resultado global de la consulta
};

}