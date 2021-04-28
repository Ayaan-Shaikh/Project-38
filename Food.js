class Food{
    constructor(){}


display(){
  fill("red");
  
 
  var button=createButton("Feed The Dog");
  button.position(380,125);

  if(button.mousePressed(function(){
    foodS=foodS-1;
    gameState=1;
    database.ref('/').update({'gameState':gameState})
  }));


  
  var addFood=createButton("Add Food");
  addFood.position(490,125);

  if(addFood.mousePressed(function(){
       foodS=foodS+1;
       gameState=2;
       database.ref('/').update({'gameState':gameState});
  }));
  
  
 
  }
}