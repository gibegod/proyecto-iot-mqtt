var mqtt = require('mqtt')

var client = mqtt.connect('mqtt://test.mosquitto.org');

client.on('connect', function () {

  console.log("Conectado");

  var contador = 0;
  var intervalo;
  function mensaje() {
    client.publish('EmpresaIoT/edificio1/pan-bat', Math.random().toFixed(2).toString());
    contador++;
    if (contador >= 10) {
      clearInterval(intervalo);
    }
  }
  
  function intervalo() {
    intervalo = setInterval(mensaje, 5000);
  }

  intervalo();
})

//SSL
// var mqtt    = require('mqtt');
// const fs = require('fs');
// var caFile = fs.readFileSync("ca.crt");

// var options={
// clientId:"mqttjs01",
// //port:8883,
// //host:'192.168.1.71',
// //protocol:'mqtts',
// rejectUnauthorized : false,
// ca:caFile 
// }
// var client  = mqtt.connect("mqtts://192.168.1.71:8883",options);
// console.log("connected flag  " + client.connected);
// client.on("connect",function(){	
// console.log("connected  "+ client.connected);
// })
