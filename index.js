//import { start } from "repl";

// obter o código da biblioteca
var five = require("johnny-five");
var mqtt = require("mqtt")
// criar uma instância que representa nossa placa
var board = new five.Board({
  port: "COM5" // substitua pela porta a qual seu Arduino estiver conectado
});


  board.on("ready", function() {
    //board do jfive pronta
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
              ledV.off();
              console.log("Portao fechado");
          }else{
              servo.to(90, 1 * 1000);
              portaoAberto = true;
              ledV.on();
              console.log("Portao Aberto");
          };
          
        });

        button.on("up", function(){
          console.log("Up");
        });

        button.on("hold", function(){
          console.log("Hold");
        });

        var client = mqtt.connect("mqtt://test.mosquitto.org");

        client.on("connect", function(){
          console.log("mqtt connectado");
  
          client.subscribe('codexp1-portao');
          function callback(topic, payload){
            // 1 para fechar o portao
            //0 para fechar
            var msg = payload.toString();
            if (msg === "1"){
              abrirPortao();
            }else {
              console.log(topic);
              console.log(msg);
            }
          }
          client.on("message", callback);
// vincular código a ser rodado quando a comunicação com a placa começar

    });

});

