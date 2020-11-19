var dog, happyDog;
var database;
var foodS, foodStock;
var foodObj;
var fedTime, lastFed;

function preload()
{
  database = firebase.database();

	dogImg=loadImage("images/dogImg.png");
  happyDogImg=loadImage("images/dogImg1.png");

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}

function setup() {
  createCanvas(500, 500);
  dog=createSprite(200,200,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;
  foodObj = new Food();

  addFoodButton=createButton("Add Food");
  addFoodButton.position(250,25);
  addFoodButton.mousePressed(addFoods);

  feedButton=createButton("Feed");
  feedButton.position(325,25);
  feedButton.mousePressed(feedDog);
}


function draw() {  
  background(rgb(46, 139, 87));
  drawSprites();

  textSize(35);
  stroke("black");
  fill("black");
  text("Food: " + foodS, 50, 50);
  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val()
  })

  fill("black");
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 150,100);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",150,100);
   }else{
     text("Last Feed : "+ lastFed + " AM", 150,100);
   }
  
  foodObj.display();
}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  if (foodS > 0){
  dog.addImage(happyDogImg);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS,
    FeedTime:hour()
  })
}