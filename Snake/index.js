var map = document.getElementById("map")
var score_element = document.getElementById("score")
var end_text = document.getElementById("end")

var score = 0
var OVER = false

var y = 25
var x = 0

var direction = NaN
var snake = []

var apple = NaN
var apple_x = NaN
var apple_y = NaN

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

function moveSnake() {
    switch (direction) {
        case "Down":
            y += 25
            if (y == 500) {
                y = 0
            }
            break
        case "Up":
            y -= 25
            if (y == -25) {
                y = 475
            }
            break
        case "Right":
            x += 25
            if (x == 500) {
                x = 0
            }
            break
        case "Left":
            x -= 25
            if (x == -25) {
                x = 475
            }
            break
    }

    if (snake.length > 1) {
        var lastElement = snake.pop()
        snake.unshift(lastElement)
    }

    snake[0].style.top = y + "px"
    snake[0].style.left = x + "px"

    checkCollision()

    if (y == apple_y && x == apple_x) {
        growSnake()
        getApple()
    }

    if (!OVER) {
        setTimeout(moveSnake, 50)
    } else {
        end_text.style.display = "inline"
    }
}

function growSnake() {
    part = document.createElement("div")
    part.className = "snake_body"
    part.style.top = y + "px"
    part.style.left = x + "px"

    snake.push(part)
    map.appendChild(part)

    score += 1
    score_element.innerHTML = "Score: " + score 
}

function getApple() {
    if (typeof(apple) == "object") {
        apple.remove()
    }

    apple = document.createElement("div")
    apple.className = "apple"

    apple_x = getRandomInt(20) * 25
    apple_y = getRandomInt(20) * 25

    apple.style.top = apple_y + "px"
    apple.style.left = apple_x + "px"

    map.appendChild(apple)
}

function checkCollision() {
    const [, ...no_head] = snake
    for (let part of no_head) {
        if (part.style.top == y + "px" && part.style.left == x + "px") {
            OVER = true
        }
    }
}

window.addEventListener("keydown", function(event) {
    switch (event.key) {
        case "ArrowDown":
            if (direction != "Up" || snake.length == 1) {
                direction = "Down"
            }
            break
        case "ArrowUp":
            if (direction != "Down" || snake.length == 1) {
                direction = "Up"
            }
            break
        case "ArrowLeft":
            if (direction != "Right" || snake.length == 1) {
                direction = "Left"
            }
            break
        case "ArrowRight":
            if (direction != "Left" || snake.length == 1) {
                direction = "Right"
            }
            break
        default:
            return
    }
})


// main
getApple()
growSnake()
moveSnake()