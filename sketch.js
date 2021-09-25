var edges;
var back,backImg;
var Bob, bobImg;
var coin, coinImg;
var obstacle, ob1, ob2, ob3, ob4, ob5, ob6, ob7;
var invisibleGround;
var gamestate="PLAY";
var overImg, over;
var score=0;

function preload(){

  backImg = loadImage("images/back.jpg");
  bobImg = loadAnimation("images/runner_01.png","images/runner_02.png","images/runner_03.png","images/runner_04.png","images/runner_05.png","images/runner_06.png","images/runner_07.png","images/runner_08.png");
  coinImg = loadAnimation("images/ccc_03.png","images/ccc_04.png","images/ccc_05.png","images/ccc_06.png","images/ccc_07.png","images/ccc_08.png");

  ob1= loadImage("images/ob_03.png");
  ob2= loadImage("images/ob_05.png");
  ob3= loadImage("images/ob_07.png");
  ob4= loadImage("images/ob_08.png");
  ob5= loadImage("images/ob_09.png");
  ob6= loadImage("images/ob_10.png");
  ob7= loadImage("images/ob_11.png");

  overImg= loadImage("images/gameover.png");
}

function setup(){
  createCanvas(600,600);
  
  back = createSprite(100,100);
  back.addImage("bg",backImg);
  back.scale = 1.5;

  invisibleGround= createSprite(80,550,200,20);
  invisibleGround.visible= false;

  over= createSprite(300,300);
  over.addImage("overrr",overImg);
  over.visible= false;

  bob= createSprite(70,480);
  bob.addAnimation("bobs",bobImg);

  obGroup= new Group();
  coinGroup= new Group();

  edges = createEdgeSprites();
}

function draw(){
  background("lightgray");
 
  if(gamestate==="PLAY"){
    back.velocityX = -7;
    if(back.x <0){
      back.x = back.width/2;
    }
  
    if(keyDown("space")){
      bob.velocityY= -15;
    }
    bob.velocityY+=0.5;
  
    if(obGroup.isTouching(bob)){
      gamestate="END";
    }
   
    coiny();
    spawnOb();
  }
  if(gamestate==="END"){
     over.visible= true;
     back.velocityX=0;
     obGroup.setVelocityXEach(0);
     coinGroup.setVelocityXEach(0);
  }
  
  bob.collide(invisibleGround);

  drawSprites();

  text(mouseX+","+mouseY,mouseX,mouseY);
}

function coiny(){
  if(frameCount %80===0){
    coin= createSprite(650,380);
    coin.addAnimation("coins",coinImg);
    coin.velocityX= -6;
    coin.scale= 0.18;

    coinGroup.add(coin);
  }
}

function spawnOb(){
  if(frameCount %100===0){
    obstacle= createSprite(610,518);
    obstacle.velocityX= -6;

    var rand= Math.round(random(1,7));

    switch(rand){
      case 1: obstacle.addImage(ob1);
      break;
      case 2: obstacle.addImage(ob2);
      break;
      case 3: obstacle.addImage(ob3);
      break;
      case 4: obstacle.addImage(ob4);
      break;
      case 5: obstacle.addImage(ob5);
      break;
      case 6: obstacle.addImage(ob6);
      break;
      case 7: obstacle.addImage(ob7);
      break;
      default:break;
    }
    obGroup.add(obstacle);
    obGroup.lifetime= -10;
  }
}