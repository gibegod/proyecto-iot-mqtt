var mqtt = require('mqtt')
var client = mqtt.connect('ws://test.mosquitto.org:8080');

client.on('connect', function () {
  var contador = 0;
  var intervalo;
  function mensaje() {
    client.publish('clienteFabrica/', Math.random().toString());
    contador++;
    if (contador >= 10) {
      clearInterval(intervalo);
    }
  }
  
  function intervalo() {
    intervalo=setInterval(mensaje, 2000);
  }

  intervalo();
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(topic + " - " + message.toString())
  //client.end()
})
