var mqtt = require('mqtt')

var options = {
  port: 1883,
  username: 'username1',
  password: 'username1'
}

var client = mqtt.connect('mqtt://localhost', options);

client.on('connect', function () {
  var contador = 0;
  var intervalo;

  function mensaje() {
    client.publish('EmpresaIoT/edificio1/bat-inv', Math.random().toFixed(2).toString());
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

