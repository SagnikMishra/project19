var tower;
var towerImg;
var doorImg;
var door;
var doorGroup;
var climber,climberImg,climberGroup;
var ghost,ghostImg;
var invblock,invblockGroup;
var gameState="PLAY";
var music;
function preload(){
  towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  ghostImg=loadImage("ghost-standing.png");
  music=loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,500);
  
  music.loop();
  
  tower=createSprite(300,300);
  tower.addImage("t1",towerImg);
  tower.velocityY=1;
  
  doorGroup=new Group();
  
  climberGroup=new Group();
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage("g1",ghostImg);
  ghost.scale=0.3;
  
  invblockGroup=new Group();
  
  climberGroup.debug=true;
}

function draw(){
  background(0);
  if(tower.y>400){
    tower.y=300;
  }
  if(gameState==="PLAY"){
    
  
  if(keyDown("left")){
    ghost.x=ghost.x-3;
  }
  
  if(keyDown("right")){
    ghost.x=ghost.x+3;
  }
  
  if(keyDown("space")){
    ghost.velocityY=-3;
  }
  ghost.velocityY=ghost.velocityY+0.3;
    
  if(ghost.isTouching(climberGroup)){
    ghost.velocityY=0;
  }
  if(invblockGroup.isTouching(ghost) || ghost.y>500){
    ghost.visible=false;
    gameState="end";
  }
  spawnDoors();
  }
  if(gameState==="end"){
    tower.destroy();
    doorGroup.destroyEach();
    climberGroup.destroyEach();
    fill("yellow");
    textSize(30);
    text("Game Over",230,250);
  }
  drawSprites();
}

function spawnDoors(){
  if(frameCount%240===0){
  var door=createSprite(200,-50);
  door.addImage("d1",doorImg);
  invblock=createSprite(200,15);
    
  door.x=Math.round(random(120,400)); 
  door.velocityY=1;
  door.lifetime=800;
  doorGroup.add(door);
  var climber=createSprite(200,10);
  climber.addImage("c1",climberImg);
  climber.velocityY=1;
  climber.lifetime=800;
  climberGroup.add(climber);
  climber.x=door.x;
  invblock.width=climber.width;
  invblock.height=2;
  invblock.x=climber.x;
  invblock.velocityY=1;
  invblock.lifetime=800;
  invblock.visible=false;
  
  }
}






