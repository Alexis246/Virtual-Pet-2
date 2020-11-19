class Food {
    constructor(){
    this.foodStock=0;
    this.lastFed;
    this.milkImg = loadImage('images/Milk.png');
    }

   updateFoodStock(foodStock){
    this.foodStock=foodStock;
   }

   deductFood(){
     if(this.foodStock>0){
      this.foodStock=this.foodStock-1;
     }
    }

    getFoodStock(){
      return this.foodStock;
    }

    display(){
      var x=80,y=250;
      
      imageMode(CENTER);
      
      if(this.foodStock!=0){
        for(var i=0;i<this.foodStock;i++){
          if(i%10==0){
            x=80;
            y=y+50;
          }
          image(this.milkImg,x,y,50,50);
          x=x+30;
        }
      }
    }
    
}