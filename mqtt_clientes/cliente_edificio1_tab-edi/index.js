var mqtt = require('mqtt')

var options = {
  port: 1883,
  username: 'username1',
  password: 'username1'
}

var client = mqtt.connect('mqtt://broker.hivemq.com');

client.on('connect', function () {
  var contador = 0;
  var intervalo;

  console.log("Conectado!")
  function mensaje() {
    console.log("publish!")

    var voltaje = getRandomArbitrary(11.8, 12.8)
    var corriente = getRandomArbitrary(15.0,25.0)
    var potencia = getRandomArbitrary(10,30)
    var energia = getRandomArbitrary(5,15)
    var carga_bateria = getRandomArbitrary(20,100)

    var json = `{"voltaje": ${voltaje},"corriente": ${corriente},"potencia": ${potencia},"energia": ${energia}}`
    
    console.log(json)
    client.publish('EmpresaIoT/oficinas/tablero_oficina', json);
    contador++;
    // if (contador >= 10) {
    //   clearInterval(intervalo);
    // }
  }
  
  function intervalo() {
    intervalo = setInterval(mensaje, 3000);
  }

  intervalo();
})

function getRandomArbitrary(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

//{"voltaje": 12.5,"corriente": 10.2,"potencia": 25.5,"energia": 10.0, "temperatura": 35.0, "lux": 10 }