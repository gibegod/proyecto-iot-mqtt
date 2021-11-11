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


    var voltaje = getRandomArbitrary(13, 19)
    var corriente = getRandomArbitrary(140.0,150.0)
    var potencia = voltaje * corriente
    var energia = potencia
    var carga_bateria = getRandomArbitrary(26,100)

    var json = `{"voltaje": ${voltaje},"corriente": ${corriente},"potencia": ${potencia},"energia": ${energia}, "carga_bateria": ${carga_bateria}}`
    
    console.log(json)
    client.publish('EmpresaIoT/oficinas2/bateria_inversor', json);
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