let canvas = document.getElementById('scrGame');
let ctx = canvas.getContext('2d');
let box = 16;
let direction;
let speed = 1000 / 10;
let score = 0;
var isGameOver = false

document.addEventListener('keydown', keyPressed)

//Objeto cobrinha.
let snake = [];
snake[0] = {
    x: 4 * box,
    y: 0 * box
}

//Cria comida.
let food = {
    x: Math.floor(Math.random() * 15 +1) * box,
    y: Math.floor(Math.random() * 15 +1) * box
}

let foodBonus = {
    x: Math.floor(Math.random() * 15 +1) * box,
    y: Math.floor(Math.random() * 15 +1) * box
}

//Cria background canvas.
function mkBG() {
    ctx.fillStyle = 'rgb(15, 5, 50)';
    ctx.fillRect(0, 0, 32 * box, 32 * box);
}

//Cria cobrinha.
function mkSnake() {
    for( let i = 0; i < snake.length; i++) {
    ctx.fillStyle = 'rgb(225, 225, 225)';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

//Cria comida.
function drawFood() {
    ctx.fillStyle = 'rgb(255, 50, 50)';
    ctx.fillRect(food.x, food.y, box, box);
}

//Cria bonus.
function bonus() {
    ctx.fillStyle = 'rgb(255, 255, 50)';
    ctx.fillRect(foodBonus.x, foodBonus.y, box, box);
}

//Tela de pontuação.
function scoreGame() {
    ctx.font = "12px Impact";
    ctx.fillText("Score: " + Math.floor(score), 390, 15,); 
}

//Cria tela de game over.
function gameOver() {
    ctx.font = "32px Impact";
    ctx.fillText("Game Over", 190, 215,); 
}

//Comandos de movimento.
function keyPressed(key) {
    if(key.keyCode == 37 && direction != 'R') direction = 'L'
    if(key.keyCode == 38 && direction != 'D') direction = 'U'
    if(key.keyCode == 39 && direction != 'L') direction = 'R'
    if(key.keyCode == 40 && direction != 'U') direction = 'D'
    if(key.keyCode == 82) speed = 10, game()
}

//Função Principal.
function game() {

    if(snake[0].x > 28 * box && direction == 'R') snake[0].x = 0;
    if(snake[0].x < 0 * box && direction == 'L') snake[0].x = 28 * box;
    if(snake[0].y > 16 * box && direction == 'D') snake[0].y = 0;
    if(snake[0].y < 0 * box && direction == 'U') snake[0].y = 16 * box;

    for( i = 1; i < snake.length; i++) {
        if( snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            isGameOver = true
            clearInterval(initGame);
            setTimeout(() => {
            window.location.reload();
           }, 3000)                      
        }
    }

    mkBG();
    mkSnake();
    drawFood();
    scoreGame();

    //Reinicia após o fim do jogo.
    if(isGameOver){
        ctx.font = "64px Impact";
        ctx.textAlign = "center";
        ctx.strokeStyle = "yellow";
        ctx.strokeText("Game Over", 230, 150,); 
        ctx.font = "32px Impact";
        ctx.strokeText("Your score is: " + score, 230, 200,); 
    }

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == 'L') snakeX -= box;
    if(direction == 'R') snakeX += box;
    if(direction == 'U') snakeY -= box;
    if(direction == 'D') snakeY += box;

    if(snakeX != food.x || snakeY != food.y) { 
        snake.pop();
 
    } else {
        food.x = Math.floor(Math.random() * 15 +1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box;
        score += 1
    }

    if(snakeX != foodBonus.x || snakeY != foodBonus.y) { 
    }
    else{
        foodBonus.x = Math.floor(Math.random() * 15 +1) * box;
        foodBonus.y = Math.floor(Math.random() * 15 +1) * box;
        score += 4
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

    //Gambiarra para gerar bonus
    switch(score){
        case   4: bonus(); break;
        case   9: bonus(); break;
        case  18: bonus(); break;
        case  25: bonus(); break;
        case  46: bonus(); break;
        case  91: bonus(); break;
        case 126: bonus(); break;
        case 158: bonus(); break;
        case 195: bonus(); break;
        case 260: bonus(); break;
        case 290: bonus(); break;
        case 311: bonus(); break;
        case 335: bonus(); break;
        case 360: bonus(); break; //Impossivel chegar aqui
    }
};

let initGame = setInterval(game, speed)

