var covid, covidImg;
var doctor, doctorImg;
var house, houseImg;
var sanitizer, sanitizerImg;
var scenery, sceneryImg;
var sanitizerGroup, covidGroup;

var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score;

function preload() {
doctorImg = loadImage("Doctor.png");
covidImg = loadImage("Covid-19.png");
houseImg = loadImage("House.png");
sanitizerImg = loadImage("Sanitizer.png")
sceneryImg = loadImage("scenery.png")
}

function setup() {
  createCanvas(1300,600);

   doctor = createSprite(400, 300, 50,50);
   doctor.addImage(doctorImg);
   doctor.scale = 0.5

   house = createSprite(160,300,100,20);
   house.addImage(houseImg)
   house.scale = 0.6

   scenery = createSprite(0,0,1600,1600);
   scenery.addImage(sceneryImg);
   scenery.scale = 1.5;
   scenery.depth = scenery.depth-5

   sanitizerGroup = createGroup();
   covidGroup = createGroup();


}

function draw() {
  background("sceneryImg");  

  if (gameState===PLAY){

    score = 0;

    scenery.visible = true;

    doctor.y = World.mouseY;
    
    if(keyDown("space")){
      shootSanitizer();
    }

    if (frameCount % 60 === 0) {
      covidObstacles();
    }

    if(sanitizerGroup.isTouching(covidGroup)){
      covidGroup.destroyEach();
      sanitizerGroup.destroyEach();

    }

    if(covidGroup.isTouching(house)){
      gameState=END;
    }


  }

  if (gameState===END){
    covidGroup.destroyEach();
    sanitizerGroup.destroyEach();
    doctor.velocityY=0;
    text("You Lost   Press up arrow to restart",650,300);
    stroke("red");
    textSize(60);
    scenery.visible=false;

    if(keyDown(UP_ARROW)){
      gameState=PLAY;
    }
  }



  drawSprites();
}

function shootSanitizer(){
 var  sanitizer = createSprite(500,50, 50,20)
  sanitizer.y= doctor.y    
  sanitizer.addImage(sanitizerImg)
  sanitizer.scale = 0.2
  sanitizer.velocityX= 7
  sanitizerGroup.add(sanitizer)
}

function covidObstacles(){
  var covid = createSprite(1290, random(20,580),20, 20);
   covid.addImage(covidImg);
   covid.scale = 0.5
   covid.velocityX = -8;
   covid.lifetime = 2000;
   covidGroup.add(covid);
}