var x = 10, y = 10;
var foodX, foodY;
var canvas = document.getElementById("snakeCanva");
var snakeSegments=[]; //To store the segments of the snake
var default_direction="ArrowRight";
var IntervalId;
var score=0;

function snake() {
    var ctx=canvas.getContext("2d");
    ctx.clearRect(0,0,canvas.width,canvas.height); //To clear the canvas
    ctx.beginPath();
    ctx.arc(x,y,5,0,2*Math.PI);
    ctx.fillStyle="red";
    ctx.fill();
    ctx.stroke(); 
    for(var i=0;i<snakeSegments.length;i++){                //Just whenever snake function is called, 
         var segment=snakeSegments[i];                              //it will draw the segments of the snake
         ctx.beginPath();                                   //If exists then Increase thus pushing into the segments should check in Generation function
         ctx.arc(segment.x,segment.y,5,0,2*Math.PI);         //Or in Increase_snake_size function 
         ctx.fillStyle="red";
         ctx.fill();
         ctx.stroke();
     }
     document.getElementById("result").textContent="Score:"+score;
}

function food() {
    var ctx2 = canvas.getContext("2d");
    ctx2.fillStyle = "blue";  // Set color for snake head
    if (foodX === undefined || foodY === undefined) {
        foodX = Math.floor(Math.random() * (canvas.width - 10));
        foodY = Math.floor(Math.random() * (canvas.height - 10));
    }
    ctx2.fillRect(foodX,foodY,10,10);
}

function startMove(){
   IntervalId=setInterval(function(){
    snake_move();
   },200);
}
function stopInterval(){
    clearInterval(IntervalId);
}
function snake_move() {
    for(var i=snakeSegments.length-1;i>0;i--){
        snakeSegments[i].x=snakeSegments[i-1].x;
        snakeSegments[i].y=snakeSegments[i-1].y;
    }
    if(snakeSegments.length>0){
        snakeSegments[0].x=x;
        snakeSegments[0].y=y;
    }
    switch (default_direction) {
        case "ArrowUp":
            y -= 10;
            break;
        case "ArrowDown":
            y += 10;
            break;
        case "ArrowLeft":
            x -= 10;
            break;
        case "ArrowRight":
            x += 10;
            break;
    }
    Border();
    snake();
    food();
    increase_snake_size();

}
document.addEventListener("keydown", function (event) {
    default_direction=event.key;
    stopInterval();
    startMove();
    snake_move();
    
});
function Border(){
    if (x < 0 || x > canvas.width - 10 || y < 0 || y > canvas.height - 10) {
        alert("Game Over!!");
        stopInterval();
        playAgain();
    }
}
function selfAttack(){
    for(var i=0;i<snakeSegments.length;i++){
        if(x==snakeSegments[i].x && y==snakeSegments[i].y){
            return true;
        }
    }
    return false;
}

function die() {
    if (x < 0 || x > canvas.width - 10 || y < 0 || y > canvas.height - 10||selfAttack()) {
        alert("Game Over!!");
        document.removeEventListener("keydown", snake_move);
        stopInterval();
        playAgain();
    }
}

function playAgain(){
    var playAgain=confirm("Do you want to play Again??");
    if(playAgain){
        location.reload();
    }
    else{
        alert("Thanks for playing the game!!");
    }
}

function generateNewFood() {
    foodX = Math.floor(Math.random() * (canvas.width - 20));
    foodY = Math.floor(Math.random() * (canvas.height - 20));

}
function increase_snake_size() {
    if (x + 10 >= foodX && x <= foodX + 10 && y + 10 >= foodY && y <= foodY + 10) {
        score+=10;
        generateNewFood();
        snakeSegments.push({x:x,y:y}); //Pushing the new segment into the snakeSegments array
        //console.log(snakeSegments);
    }
}
startMove();
snake(); //To place the snake on the canvas
snake_move(); //To start making the snake move
food(); //Intially to place food on the canvas
