var bg,bg_image;
var monkey,monkey_image;
var ground;
var bananasGroup,banana_image;
var obstaclesGroup,obstacle_image;
var gameOver;
var score;

function preload()
{
  bg_image = loadImage("jungle.jpg") ;
monkey_image = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  banana_image = loadImage("Banana.png");
  obstacle_image = loadImage("stone.png")
}

function setup() 
{
  createCanvas(800,400);
  
  bg = createSprite(400,0,800,400);
  bg.addImage("background",bg_image);
  bg.velocityX = -4
  bg.scale = 1.5
  bg.x = bg.width/2


  ground = createSprite(400,350,800,10);
  ground.velocityX = -4
  ground.visible = 1
  ground.x = ground.width/2
  ground.visible = 0

  monkey = createSprite(50,349,0,0);
  monkey.addAnimation("monkeyrunning",monkey_image)
  monkey.scale = 0.07
  
  bananasGroup = new Group()
  obstaclesGroup = new Group()
  
  score = 0
}


function draw()
{
  background(255);
  
  if(bg.x<0)
  {bg.x = bg.width/2}
  
  if(ground.x<0)
  {ground.x = ground.width/2}
  
  monkey.collide(ground)
  monkey.velocityY = 6
   
  if(keyDown("space")&&monkey.y>150)
  {monkey.velocityY = -100}
  
  if(monkey.isTouching(bananasGroup))
  {
  score = score + 2
  bananasGroup.destroyEach()
  }
  
  switch(score)
  {
    case 10: monkey.scale = 0.12
    break;
    case 20: monkey.scale = 0.14
    break;
    case 30: monkey.scale = 0.16
    break;
    case 40: monkey.scale = 0.18
    break;
    default:break;
  }
  
  if(monkey.isTouching(obstaclesGroup))
  {
  monkey.scale = 0.07
  }
  
  spawnBananas()
  spawnObstacles()
  
  drawSprites()
      
  stroke("white")
  textSize(20)
  fill("white")      
  text("Score="+score,500,50)
}

function spawnBananas()
{
  if(frameCount%80===0)
  {var banana = createSprite(800,random(150,250))
   banana.addImage("banana",banana_image)
   banana.scale = 0.07
   banana.velocityX = -4
   banana.lifetime = 200
   bananasGroup.add(banana)
  }
}

function spawnObstacles()
{
  if(frameCount%300===0)
  {var obstacle = createSprite(800,random(290,340))
   obstacle.addImage("obstacle",obstacle_image)
   obstacle.scale = 0.21
   obstacle.velocityX = -4
   obstacle.lifetime = 200
   obstaclesGroup.add(obstacle) 
  }
 }