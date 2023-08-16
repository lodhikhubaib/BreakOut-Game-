let grid = document.querySelector(".grid");

for(let i = 1; i <= 64; i++){
    let div =document.createElement('div');
    grid.appendChild(div);
}

let ball = document.querySelector('.ball'),
ballDirectonX = 1,
ballDirectonY = 1,
count = 0;

let blocks = document.querySelectorAll('.grid div');

let paddle = document.querySelector('.paddle');

function moveBall(){
    let ballleft = parseInt(window.getComputedStyle(ball).getPropertyValue('left'));
    let balltop = parseInt(window.getComputedStyle(ball).getPropertyValue('top'));

    ball.style.left = (ballleft + (5 * ballDirectonX)) + 'px';
    ball.style.top = (balltop + (5 * ballDirectonY)) + 'px';
}

function changedirection(){
    let ballleft = parseInt(window.getComputedStyle(ball).getPropertyValue('left'));
    let balltop = parseInt(window.getComputedStyle(ball).getPropertyValue('top'));
    let ballwidth = parseInt(window.getComputedStyle(ball).getPropertyValue('width'));
    let ballheight = parseInt(window.getComputedStyle(ball).getPropertyValue('height'));

    if(ballleft < 0 || ballleft > window.innerWidth - ballwidth){
        ballDirectonX = -ballDirectonX;
    }
    if(balltop < 0 ||balltop > window.innerHeight - ballheight){
        ballDirectonY = -ballDirectonY;
    }
}

function removeball(){
    blocks.forEach(block => {
        let blockPos = block.getBoundingClientRect();
        let ballPos = ball.getBoundingClientRect();

        if(blockPos.left < ballPos.right && blockPos.top < ballPos.bottom && blockPos.right > ballPos.left && blockPos.bottom> ballPos.top && !block.classList.contains('remove')){
            block.classList.add('remove');
            ballDirectonY = -ballDirectonY;
            count++;
        }

    });
}

function movepaddle(e){
    let mousePos = {
        x: e.clientX,
        y: e.clientY
    }
    if(mousePos.x > 0 && mousePos.x < window.innerWidth - 70){
        paddle.style.left = mousePos.x - 30 + 'px';
    } 
}

function collision(){
    let paddlePos = paddle.getBoundingClientRect();
    ballPos = ball.getBoundingClientRect();

    if(paddlePos.left < ballPos.right && paddlePos.top < ballPos.bottom && paddlePos.right > ballPos.left && paddlePos.bottom > ballPos.top){
        ballDirectonY = -ballDirectonY;
    }
}

function gameOver(){
    let balltop = parseInt(window.getComputedStyle(ball).getPropertyValue('top'));
    let ballheight = parseInt(window.getComputedStyle(ball).getPropertyValue('height'));

    if(balltop > window.innerHeight - ballheight){
        alert('Game Over');
        location.reload();
    }
}

function checkwin(){
    if(count == 64){
        alert('You Win!!!!!!!!!!');
        location.reload();
    }
}

function startgame(){
    moveBall();
    changedirection();
    removeball();
    collision();
    gameOver();
    checkwin();
}

document.addEventListener('mousemove',movepaddle);

setInterval(startgame, 20);

