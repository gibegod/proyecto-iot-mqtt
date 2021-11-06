var mqtt = require('mqtt');

const accountSid = 'AC11aa1588dd04bd98c2609a7d9171907f'; // Your Account SID from www.twilio.com/console
const authToken = '50c3b25e3fe0cff16c6df0770f5aa43d'; // Your Auth Token from www.twilio.com/console
const twilio = require('twilio')(accountSid, authToken);

var options = {
  port: 1883,
  username: 'username1',
  password: 'username1'
}

var client = mqtt.connect('mqtt://localhost', options);

client.on('connect', function () {
  // client.subscribe('EmpresaIoT/edificio1/pan-bat', function (err) {
  //   // if (!err) {
  //   //   client.publish('TemperaturaTest', '800')
  //   // }
  // })

  client.subscribe('EmpresaIoT/edificio1/bat-inv', function (err) {
    // if (!err) {
    //   client.publish('TemperaturaTest', '800')
    // }
  })
})

client.on('message', function (topic, message) {

  if(parseFloat(message) > 0.5){
    twilio.messages.create({
      from: 'whatsapp:+14155238886',
      body: topic + " - " + message.toString(),
      to: 'whatsapp:+5491138140403'
    }).then(m => console.log(m.sid));
  }

  // message is Buffer
  console.log(topic + " - " + message.toString())
  //client.end()
})