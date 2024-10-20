//create the game canvas.
const canvas1 = document.getElementById("myCanvas1");
const ctx1 = canvas1.getContext("2d");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
//setting positions for farmland - obviously it has to be perfectly centered.
let x = (canvas1.width / 2) - 125;
let y = (canvas1.height / 2) - 125;
var colour = "#709900";
var score = 0;
var adder = 1;

//declaring all the different 'characters' ,if you like, for the game.
const grass = document.getElementById("grass");
const herb = document.getElementById("herb");
const wheat = document.getElementById("wheat");
const empty = document.getElementById("empty");
var origintime = 14;
var timeToUpgradeLeft = 4;
var crop = empty;

var idk = false;
var planted1 = false;
var planted2 = false;
var field2 = false;

//shop section
setInterval(shopAvailable, 10)
function shopAvailable() {
  if (score >= 5) {
    if (timeToUpgradeLeft > 0) {
      document.getElementById("timeUpgrade").disabled = false;
    }
    else{
      document.getElementById("timeUpgrade").innerHTML = "Maximum Level Reached";
    }
    document.getElementById("yieldUpgrade").disabled = false;
  }
  if (score >= 50 && idk == false) {
    document.getElementById("newField").disabled = false;
  }
}
function upgradeTime() {
  origintime -= 2;
  timeToUpgradeLeft -= 1;
  timeleft = origintime;
  score -= 5;
  document.getElementById("score").innerHTML = "score: "+score;
  document.getElementById("timeUpgrade").disabled = true;
  document.getElementById("yieldUpgrade").disabled = true;
  document.getElementById("newField").disabled = true;
  document.getElementById("timeversion2million").innerHTML = "Current time to grow is "+(origintime+1)+" seconds."
}

function upgradeYield() {
  adder += 1;
  score -= 5;
  document.getElementById("score").innerHTML = "score: "+score;
  document.getElementById("timeUpgrade").disabled = true;
  document.getElementById("yieldUpgrade").disabled = true;
  document.getElementById("newField").disabled = true;
  document.getElementById("Jairajisbadatmaths").innerHTML = "Current harvest rate is &#8353;"+adder+"."
}


//game loop - Edward can explain what that means since he's apparently an expert... (jokes)
setInterval(draw, 10);

//draw the game.
function draw() {
  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
  ctx1.beginPath();
  ctx1.drawImage(grass, x, y, 250, 250);
  ctx1.drawImage(crop, x+15, y+20, 220, 220);
  ctx1.closePath();
}

//plant a seed
function plant() {
  if (planted1 == false) {
    crop = herb;
    setTimeout(planted1 = true, 0)
    if (planted2 == true || field2 == false) {
      document.getElementById("Plant").disabled = true;
    }
    sleep((origintime+1)*1000).then(() => { 
      crop = wheat; 
      document.getElementById("Harvest").disabled = false;
      document.getElementById("a").innerHTML = "Harvest Ready!"
    })
  }
  else {
    plant2();
  }
}

//collect the seed and updae the score.
function harvest() {
  if (crop == wheat && crop2 == wheat) {
    crop = empty;
    document.getElementById("a").innerHTML = "No harvests available yet.";
    document.getElementById("Harvest").disabled = true;
    document.getElementById("Plant").disabled = false;
    score += adder;
    document.getElementById("score").innerHTML = "(MuadhCoin) : "+score;
    timeleft = origintime;
    planted1 = false;
    planted2 = false;
    crop2 = empty;
  }
  else if (crop == wheat && crop2 != wheat) {
    crop = empty;
    document.getElementById("a").innerHTML = "No harvests available yet.";
    document.getElementById("Harvest").disabled = true;
    document.getElementById("Plant").disabled = false;
    score += adder;
    document.getElementById("score").innerHTML = "(MuadhCoin) : "+score;
    timeleft = origintime;
    planted1 = false;
  }
  else {
    harvest2()
  }
}

//BREAKER
//BREAKER
//Code to add new canvases... this is gonna get complicated really fast.
//BREAKER
//BREAKER

const canvas2 = document.getElementById("myCanvas2");
const ctx2 = canvas2.getContext("2d");

let x2 = (canvas1.width / 2) - 125;
let y2 = (canvas1.height / 2) - 125;
var timeToUpgradeLeft2 = 4;
var crop2 = empty;
 
function newField2() {
  document.getElementById("newField").innerHTML = "Purchased"
  canvas2.style.display = "inline";
  idk = true;
  score -= 50;
  field2 = true;
  document.getElementById("score").innerHTML = "(MuadhCoin) : "+score;
  origintime = 14;
  timeleft = origintime;
  timeToUpgradeLeft = 4;
  adder = 2;
  draw2();
  setInterval(draw2, 10)
  document.getElementById("timeUpgrade").disabled = true;
  document.getElementById("yieldUpgrade").disabled = true;
  document.getElementById("newField").disabled = true;
}

function draw2() {
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  ctx2.beginPath();
  ctx2.drawImage(grass, x2, y2, 250, 250);
  ctx2.drawImage(crop2, x2+15, y2+20, 220, 220);
  ctx2.closePath();
}

function plant2() {
  if (planted2 == false) {
    planted2 = true;
    crop2 = herb;
    if (planted1 == true) {
      document.getElementById("Plant").disabled = true;
    }
    sleep((origintime+1)*1000).then(() => { 
      crop2 = wheat; 
      document.getElementById("Harvest").disabled = false;
      document.getElementById("a").innerHTML = "Harvest Ready!"
    })
  }
}

function harvest2() {
  if (crop2 == wheat) {
    crop2 = empty;
    planted2 = false;
    document.getElementById("a").innerHTML = "No harvests available yet.";
    document.getElementById("Harvest").disabled = true;
    document.getElementById("Plant").disabled = false;
    score += adder;
    document.getElementById("score").innerHTML = "(MuadhCoin) : "+score;
    timeleft = origintime;
  }
  else{
    return;
  }
}

//checks to make sure no one even thinks about breaking the game!

setInterval(check, 10)
function check() {
  if (crop != empty && crop2 != empty) {
    document.getElementById("Plant").disabled = true;
  }
  if (crop == empty) {
    planted1 = false;
  }
  if (crop2 == empty) {
    planted2 = false;
  }
}