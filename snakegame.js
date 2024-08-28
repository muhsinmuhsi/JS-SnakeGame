const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");
const canvasize=600
canvas.width=canvasize;
canvas.height=canvasize;

const snakebox=20;
const totalmoves= canvasize/snakebox;

const apple= new Image();

apple.src='./imeges/apple.png';

let dead= new Audio();
let eat= new Audio();
let up=new Audio();
let down=new Audio();
let left=new Audio();
let right=new Audio();

dead.src="./audio/dead.mp3";
eat.src="./audio/eat.mp3";
up.src="./audio/up.mp3";
down.src="./audio/down.mp3";
left.src="./audio/left.mp3";
right.src="./audio/right.mp3";

//define snake

let snake =[];
snake[0]={
    x:9*snakebox,
    y:10*snakebox
};

//create foode

let food={

}
 getfood();
// score

let scr=0;


//snake direction

let dir="";

document.addEventListener("keydown",direction);

function direction(){
    let key =event.which;

    if(key==37&&key!=="RIGHT"){
        dir="LEFT";
        left.play();
        console.log("left clicked");
    }else if(key==38&&key!=="DOWN"){
        dir="UP";
        up.play();
    }else if(key==39&&key!=="LEFT"){
        dir="RIGHT";
        right.play();
    }else if(key==40&&key!=="UP"){
        dir="DOWN";
        down.play();
    }
}

function getfood(){
    food={
        x: Math.floor( Math.random()*(totalmoves-2-3) + 3)*snakebox,
        y: Math.floor( Math.random()*(totalmoves-2-3) + 3)*snakebox
        
    }
}

function collationDetection(head,ar){
    for(i=0;i<ar.length;++i){
        if(ar[i].x == head.x && ar[i].y == head.y ){
            return true;
        }
    }
    return false;
}

function render(){
    ctx.fillStyle="#dcdcdc";
    ctx.fillRect(0,0,canvasize,canvasize);

    for(let i=0;i<snake.length;++i){
        ctx.fillStyle= i==0?"#4CAF50":"white";
        ctx.fillRect(snake[i].x,snake[i].y,snakebox,snakebox);

        ctx.strokeStyle="#E91E63";
        ctx.strokeRect(snake[i].x,snake[i].y,snakebox,snakebox)
    }
    ctx.drawImage(apple,food.x,food.y,snakebox,snakebox);

    let snakex=snake[0].x;
    let snakey=snake[0].y;

    if(dir=="LEFT")snakex-=snakebox;
    if(dir=="RIGHT")snakex+=snakebox;
    if(dir=="UP")snakey-=snakebox;
    if(dir=="DOWN")snakey+=snakebox;

    //if snake eat food

    if(snakex==food.x&&snakey==food.y){
       scr++;
        eat.play();
        getfood();
    }else{
        snake.pop();
    }

    let newHead={
        x:snakex,
        y:snakey
    };

    if(snakex<0|| snakex>=canvasize || snakey<0 || snakey>=canvasize|| collationDetection(newHead,snake)){
        gameover();
        return
    }

    snake.unshift(newHead);
    
    ctx.fillStyle ="balck"; 
    ctx.font="40px tahoma";
    ctx.fillText(scr,10,40);

}
render();

var gm=setInterval(render,100)

function gameover(){
    clearInterval(gm);
    dead.play();
    ctx.fillStyle="black"
    ctx.font="40px tahoma"
    ctx.fillText("Game over ",canvasize/2-100,canvasize/2);

}

