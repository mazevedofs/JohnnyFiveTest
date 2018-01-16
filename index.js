//import { start } from "repl";

// obter o código da biblioteca
const five = require("johnny-five");

// criar uma instância que representa nossa placa
const board = new five.Board({
  port: "COM5" // substitua pela porta a qual seu Arduino estiver conectado
});

// vincular código a ser rodado quando a comunicação com a placa começar
board.on("ready", function() {

  // vincular uma variável do tipo Led que controla o pino 13
  const led = new five.Led(13);
  console.log("Placa pronta");


  var portaoAberto;
  var ledV = new five.Led(4);
  var button = new five.Button(2);
  var servo = new five.Servo({
      pin: 3,
      startAt: 19
  });

  button.on("down", function () {
    if (portaoAberto){
        servo.to(19, 1 * 1000);
        portaoAberto = false;
        ledV.on();
        console.log("Portao fechado");
    }else{
        servo.to(90, 1 * 1000);
        portaoAberto = true;
        ledV.off();
        console.log("Portao Aberto");
    };
    
  });

  button.on("up", function(){
    console.log("Up");
  });

  button.on("hold", function(){
    console.log("Hold");
  })


  // piscar o led a cada 500ms
  led.blink(500);
});

