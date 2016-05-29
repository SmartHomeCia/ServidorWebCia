//variaveis globais
var bathroom = 0;
var bedroom = 0;
var kitchen = 0;
var roomOne = 0;
var roomTwo = 0;
var valorCheck = 0;
var volume = 0;
var volume_ar = 0;
var connection_lamp_all = 0;
var statusCurtain = 0;
var tv = 0;
var ar = 0;
var socket = io.connect();

socket.on('connect', function(data) {
  console.log("Conectado");
  socket.on('allLamp',function(data){
    if(data.lamp_all_conect == 5){
      modifyLamps(1, 5);
      statusLampOn("lampbathroom");
      statusLampOn("lampkitchen");
      statusLampOn("lampbedroom");
      statusLampOn("lamp2Sala");
      statusLampOn("lamp1Sala");
    }else if(data.lamp_all_conect != 0){
      connection_lamp_all = data.lamp_all_conect;
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
    }
    status();
 });

 socket.on('curtain_channel',function(data){
    data.sts_curtain == 0 ? document.getElementById("curtain_img").src = "img/cortina-fechada.png" : document.getElementById("curtain_img").src = "img/cortina-aberta.png";
    statusCurtain = data.sts_curtain;
  });
});

socket.on('lamp_All', function(lamps) {
 if (lamps == "lampBathroom"){
  acenderLampBathroom();
 }else if (lamps == "lampKitchen"){
    acenderLampkitchen();
 }else if (lamps == "lampBedroom"){
    acenderLampbedroom();
 }else if (lamps == "lampRoomOne"){
    acenderLamproomOne();
 }else if (lamps == "lampRoomTwo"){
    acenderLamproomTwo();
 }else if(lamps == "lamp_All_Home"){
    controlAllLamps();
 }
});

socket.on('curtain_func',function(curtain_data){
  if(curtain_data == "control_Curtain"){
    activeCurtain();
  }
});

//FUNÇAO LAMPADA bathroom
function acenderLampBathroom() {
  if (bathroom == 0) {
    bathroom = 1;
    connection_lamp_all += 1;
    statusLampOn("lampbathroom"); 
  } else {
    bathroom = 0;
    statusLampOff("lampbathroom");
    connection_lamp_all -= 1;
  }
  block("lampbathroom");
  status();
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
  } else {
    kitchen = 0;
    statusLampOff("lampkitchen");
    connection_lamp_all -= 1;
  }
  block("lampkitchen");
  status();
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
  } else {
    bedroom = 0;
    statusLampOff("lampbedroom");
    connection_lamp_all -= 1;
  }
  block("lampbedroom");
  status();
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
  } else {
    roomOne = 0;
    statusLampOff("lamp1Sala");
    connection_lamp_all -= 1;
  }
  block("lamp1Sala");
  status();
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
  } else {
    roomTwo = 0;
    statusLampOff("lamp2Sala");
    connection_lamp_all -= 1;
  }
  block("lamp2Sala");
  status();
}

function sendLampRoomTwo(){
  socket.emit('lamp_All', "lampRoomTwo");
}

function status() {
  if (connection_lamp_all == 5) {
    document.getElementById("cmn-toggle-2").checked = true;
    valorCheck = 1;
  } else if (connection_lamp_all < 5) {
    var checkStatus = document.getElementById("cmn-toggle-2").checked;
    if (checkStatus == true) {
      valorCheck = 0;
      document.getElementById("cmn-toggle-2").checked = false;
    }
  }
}

//FUNÇAO DE TODAS AS LAMPADAS
function controlAllLamps() {
  if (valorCheck == 0) {
    statusLampOn("lampbathroom");
    statusLampOn("lampkitchen");
    statusLampOn("lampbedroom");
    statusLampOn("lamp2Sala");
    statusLampOn("lamp1Sala");
    modifyLamps(1,5);
  }else {
    statusLampOff("lampbathroom");
    statusLampOff("lampkitchen");
    statusLampOff("lampbedroom");
    statusLampOff("lamp2Sala");
    statusLampOff("lamp1Sala");
    modifyLamps(0,0);
  }
  block("cmn-toggle-2");
  block_all();
  status();
}

function sendLamp_All(){
  socket.emit('lamp_All',"lamp_All_Home");
}

function modifyLamps(un_lamp,un_all_lamp){
  bathroom = un_lamp;
  kitchen = un_lamp;
  bedroom = un_lamp;
  roomOne = un_lamp;
  roomTwo = un_lamp;
  valorCheck = un_lamp;
  connection_lamp_all = un_all_lamp;
}

function statusLampOff(idLampOffimg){
  document.getElementById(idLampOffimg).src = "img/leddesligada.png";
}

function statusLampOn(idLampOnimg) {
  document.getElementById(idLampOnimg).src = "img/ledligada.png";
}

//FUNCAO CORTINA
function activeCurtain() {
  if (statusCurtain == 0) {
    document.getElementById("curtain_img").src = "img/cortina-aberta.png";
    statusCurtain = 1;
    block("curtain_img");
  } else {
    document.getElementById("curtain_img").src = "img/cortina-fechada.png";
    statusCurtain = 0;
    block("curtain_img");
  }
}

function sendCurtain(){
  socket.emit('curtain_func',"control_Curtain");
}

//tv
function activeTvCia() {
  btntvimg = document.getElementById('tv_img');
  if (tv === 0) {
    tv = 1;
    btntvimg.src = "img/tvciaOn.png";
    document.getElementById('collapse_tv').style.display = "block";
 } else {
    tv = 0;
    btntvimg.src = "img/tvciaOff.png";
    document.getElementById('collapse_tv').style.display = "none";
  }
}

function Increase(){
  if(volume >= 100){}
  else{
    volume++;
    document.getElementById("volume_tv").innerHTML = volume;
  }
}

function decrease(){
  if(volume <= 0){}
  else{
    volume--;
    document.getElementById("volume_tv").innerHTML = volume;
  }
}

//AR
function activeArCia() {
  btnArimg = document.getElementById('ar_img');
  if (ar === 0) {
    ar = 1;
    btnArimg.src = "img/ar_on.jpg";
    document.getElementById('collapse_ar').style.display = "block";
 } else {
    ar = 0;
    btnArimg.src = "img/ar_off.jpg";
    document.getElementById('collapse_ar').style.display = "none";
  }
}

function Increase_ar(){
  if(volume_ar >= 100){}
  else{
    volume_ar++;
    document.getElementById("volume_ar").innerHTML = volume_ar;
  }
}

function decrease_ar(){
  if(volume_ar <= 0){}
  else{
    volume_ar--;
    document.getElementById("volume_ar").innerHTML = volume_ar;
  }
}

//FUNÇÃO PARA BLOQUEAR EM 5 SEGUNDOS
function block(id_func){
  document.getElementById(id_func).disabled = true;
  document.getElementById(id_func).style.cursor = "not-allowed";
  setTimeout(function(){ 
    document.getElementById(id_func).disabled = false;
    document.getElementById(id_func).style.cursor = "pointer";
  }, 5000);
}

function block_all(){
  block("lampbathroom");
  block("lampkitchen");
  block("lampbedroom");
  block("lamp1Sala");
  block("lamp2Sala");
}