//variaveis globais
var bathroom;
var bedroom;
var kitchen;
var roomOne;
var roomTwo;
var connection_lamp_all;
var statusCurtain;
var tv = 0;
var valorCheck = "";
var socket = io.connect();

socket.on('connect', function(data) {
  console.log("Conectado");
  socket.on('allLamp',function(data){
    data.lampBathroom == 0 ? statusLampOff("lampbathroom") : statusLampOn("lampbathroom");
        bathroom = data.lampBathroom;
    data.lampKitchen == 0 ? statusLampOff("lampkitchen") : statusLampOn("lampkitchen");
        kitchen = data.lampKitchen;
    data.lampBedroom == 0 ? statusLampOff("lampbedroom") : statusLampOn("lampbedroom");
        bedroom = data.lampBedroom;
    data.lampRoomOne == 0 ? statusLampOff("lamp1Sala") : statusLampOn("lamp1Sala");
        roomOne = data.lampRoomOne;
    data.lampRoomTwo == 0 ? statusLampOff("lamp2Sala") : statusLampOn("lamp2Sala");
        roomTwo = data.lampRoomTwo;
       console.log(data);
 });
});

socket.on('lamp_All', function(lamps) {
 console.log(lamps);
 if (lamps == "lampBathroom"){
  acenderLampBathroom();
 }
});

//FUNÇAO LAMPADA bathroom
function acenderLampBathroom() {
    if (bathroom == 0) {
        bathroom = 1;
        connection_lamp_all += 1;
        statusLampOn("lampbathroom");
        status();
    } else {
        bathroom = 0;
        statusLampOff("lampbathroom");
        connection_lamp_all -= 1;
        status();
    }

}
function sendLampBathroom(){
  socket.emit('lamp_All', "lampBathroom");
}
// FUNÇAO DA LAMPADA DA kitchen
function acenderLampkitchen() {
    if (kitchen == 0) {
        kitchen = 1;
        statusLampOn("lampkitchen");
        connection_lamp_all += 1;
        status();
    } else {
        kitchen = 0;
        statusLampOff("lampkitchen");
        connection_lamp_all -= 1;
        status();
    }
}
function sendLampKitchen(){
  socket.emit('lamp_All', "lampKitchen");
}

// FUNÇAO DA LAMPADA DO bedroom
function acenderLampbedroom() {
    if (bedroom == 0) {
        bedroom = 1;
        statusLampOn("lampbedroom");
        connection_lamp_all += 1;
        status();
    } else {
        bedroom = 0;
        statusLampOff("lampbedroom");
        connection_lamp_all -= 1;
        status();
    }
}

function sendLampBedroom(){
  socket.emit('lamp_All', "lampBedroom");
}

// FUNÇAO DA LAMPADA 1 DA SALA
function acenderLamproomOne() {
    if (roomOne == 0) {
        roomOne = 1;
        statusLampOn("lamp1Sala");
        connection_lamp_all += 1;
        status();
    } else {
        roomOne = 0;
        statusLampOff("lamp1Sala");
        connection_lamp_all -= 1;
        status();
    }
}

function sendLampRoomOne(){
  socket.emit('lamp_All', "lampRoomOne");
}

//FUNÇAO DA LAMPADA 2 DA SALA
function acenderLamproomTwo() {
    if (roomTwo == 0) {
        roomTwo = 1;
        statusLampOn("lamp2Sala");
        connection_lamp_all += 1;
        status();
    } else {
        roomTwo = 0;
        statusLampOff("lamp2Sala");
        connection_lamp_all -= 1;
        status();
    }
}

function sendLampRoomTwo(){
  socket.emit('lamp_All', "lampRoomTwo");
}

function status() {
    if (connection_lamp_all == 5) {
        document.getElementById("cmn-toggle-2").checked = true;
    } else if (connection_lamp_all < 5) {
        var checkStatus = document.getElementById("cmn-toggle-2").checked;
        if (checkStatus == true) {
            document.getElementById("cmn-toggle-2").checked = false;
        }
    } else {
        return;
    }
}
//FUNÇAO DE TODAS AS LAMPADAS
function controlAllLamps() {
    valorCheck = document.getElementById("cmn-toggle-2").checked;

    if (valorCheck == true) {
        statusLampOn("lampbathroom");
        statusLampOn("lampkitchen");
        statusLampOn("lampbedroom");
        statusLampOn("lamp2Sala");
        statusLampOn("lamp1Sala");

        bathroom = 1;
        kitchen = 1;
        bedroom = 1;
        roomOne = 1;
        roomTwo = 1;
        connection_lamp_all = 5;
    } else {
        statusLampOff("lampbathroom");
        statusLampOff("lampkitchen");
        statusLampOff("lampbedroom");
        statusLampOff("lamp2Sala");
        statusLampOff("lamp1Sala");

        bathroom = 0;
        kitchen = 0;
        bedroom = 0;
        roomOne = 0;
        roomTwo = 0;
        connection_lamp_all = 0;
    }
}

//FUNCAO CORTINA
function activeCurtain() {
    if (statusCurtain == 0) {
        document.getElementById("curtain_img").src = "img/cortina-aberta.png";
        statusCurtain = 1;
    } else {
        document.getElementById("curtain_img").src = "img/cortina-fechada.png";
        statusCurtain = 0;
    }
}

function acaoBtn() {
    btntvimg = document.getElementById('tv_img');
    if (tv === 0) {
        tv = 1;
        btntvimg.src = "img/tvligada.png";
    } else {
        tv = 0;
        btntvimg.src = "img/tvdesligada.png";
    }
}

function statusLampOff(idLampOffimg){
  document.getElementById(idLampOffimg).src = "img/leddesligada.png";
}

function statusLampOn(idLampOnimg) {
    document.getElementById(idLampOnimg).src = "img/ledligada.png";
}