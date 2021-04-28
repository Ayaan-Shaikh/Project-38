var  dog,dogImg,happyDog;
var  bedroom,garden,washroom,livingRoom;
var  database,foodS,foodStock;
var  dogHappyImg;
var milk,milkImg;
var gameState;



function preload()
{
 dogImg=loadImage("Images/Dog.png")
 happyDog=loadImage("Images/happyDog.png");
 milkImg=loadImage("Images/milk.png");
 bedroom=loadImage("Images/Bed Room.png")
 garden=loadImage("Images/Garden.png")
 washroom=loadImage("Images/WashRoom.png")
 livingRoom=loadImage("Images/Living Room.png")
 
}


function setup() {
  database=firebase.database();
  createCanvas(550,610);

  foodObj = new Food();

  dog=createSprite(250,480,20,20);
  dog.addImage(dogImg);
  dog.scale=0.3
	
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  foodStock.set(20);

   milkBottle1=createSprite(140,435,10,10);
   milkBottle1.addImage(milkImg);
   milkBottle1.scale=0.025;


   milkBottle2=createSprite(160,255,10,10);
   milkBottle2.addImage(milkImg);
   milkBottle2.scale=0.025;
   milkBottle2.visible=false;

   


    fedTime=database.ref('FeedTime');
    fedTime.on("value",function(data){
    lastFed=data.val();
  });  

    readState=database.ref('gameState');
    readState.on("value",function(data){
    gameState=data.val();
  });

}


function draw() {  
 background("yellow");
  
  foodObj.display();
  writeStock(foodS);

  if(foodS==0){
    dog.addImage(happyDog);
    milkBottle2.visible=false;
  }else{
    dog.addImage(dogImg);
    milkBottle2.visible=true;
  }

  var gameStateRef=database.ref('gameState');
gameStateRef.on('value',function(data){
  gameState=data.val();
});

    if(gameState==1){
      dog.addImage(happyDog);
      dog.scale=0.2;
      dog.y=250;
    }
  if(gameState==2){
    dog.addImage(dogImg);
    dog.scale=0.175;
    milkBottle2.visible=false;
    dog.y=250;
      }

    var Bath=createButton("I Want To Take Bath")  
      Bath.position(570,125);
      if(Bath.mousePressed(function(){
        gameState=3;
        database.ref('/').update({'gameState':gameState});
        }));
        
   if(gameState===3){
     dog.addImage(washroom);
     dog.scale=1;
     milkBottle2.visible=false;
   }

   var sleep=createButton("I Am Very Sleepy");
   sleep.position(710,125);
   if(sleep.mousePressed(function(){
     gameState=4;
     database.ref('/').update({'gameState':gameState});
   }));
   if(gameState===4){
     dog.addImage(bedroom);
     dog.scale=1;
     milkBottle2.visible=false;
   }

   var Play=createButton("Lets play !");
   Play.position(500,160);
   if(Play.mousePressed(function(){
     gameState=5;
     database.ref('/').update({'gameState':gameState});
   }));
   if(gameState===5){
     dog.addImage(livingRoom);
     dog.scale=1;
     milkBottle2.visible=false;
   }
 

   var PlayInGarden=createButton("Lets Play In The Park")
    PlayInGarden.position(585,160);
    if(PlayInGarden.mousePressed(function(){
      gameState=6;
      database.ref('/').update({'gameState':gameState});
      }));
      if(gameState===6){
        dog.y=175;
        dog.addImage(garden);
        dog.scale=1;
        milkBottle2.visible=false;
      }  
 
  drawSprites();
  textSize(17);
  fill("black");
  text("Milk Bottles Remaining "+foodS,170,440);
   }



 function readStock(data)
    {
  foodS=data.val();
     }



function writeStock(x)
     {
  database.ref('/').update({
    food:x
  })
      }

