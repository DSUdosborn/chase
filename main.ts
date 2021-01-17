function checkCDPutABarrier2 () {
    if (gameOver) {
        return
    }
    if (CDTime == 0) {
        for (let 索引3 = 0; 索引3 <= PLAYER_BARRIER_NUM; 索引3++) {
            tempBarrier = barriers[索引3]
            if (tempBarrier.get(LedSpriteProperty.Brightness) == 0) {
                tempBarrier.set(LedSpriteProperty.Brightness, BARRIER_BRIGHTNESS)
                tempBarrier.set(LedSpriteProperty.X, lastEscapeX)
                tempBarrier.set(LedSpriteProperty.Y, lastEscapeY)
                CDTime = CD_TIME
                return
            }
        }
    }
}
function getDirection2 () {
    if (Math.abs(input.acceleration(Dimension.X)) >= Math.abs(input.acceleration(Dimension.Y))) {
        if (input.acceleration(Dimension.X) > ACCELLARATION_THRESHOLD) {
            direction = "right"
        } else if (input.acceleration(Dimension.X) < 0 - ACCELLARATION_THRESHOLD) {
            direction = "left"
        } else {
            direction = "none"
        }
    } else {
        if (input.acceleration(Dimension.Y) > ACCELLARATION_THRESHOLD) {
            direction = "down"
        } else if (input.acceleration(Dimension.Y) < 0 - ACCELLARATION_THRESHOLD) {
            direction = "up"
        } else {
            direction = "none"
        }
    }
}
function checkCatched2 () {
    gameOver = chaser.isTouching(escaper)
}
input.onButtonPressed(Button.A, function () {
    if (!(gameOver)) {
        checkCDPutABarrier2()
    }
})
function hitBarrierTest2 () {
    isHitBarrier = false
    for (let tempBarrier2 of barriers) {
        if (tempBarrier2.get(LedSpriteProperty.Brightness) != 0) {
            if (tempBarrier2.isTouching(tempSprite)) {
                isHitBarrier = true
                hittedBarrier = tempBarrier2
                return
            }
        }
    }
}
function coolDown2 () {
    if (CDTime > 0) {
        CDTime += 0 - (input.runningTime() - lastTime)
        if (CDTime < 0) {
            CDTime = 0
        }
    }
    lastTime = input.runningTime()
}
function showGameOver2 () {
    basic.showIcon(IconNames.Sad)
    music.beginMelody(music.builtInMelody(Melodies.Wawawawaa), MelodyOptions.Once)
}
function moveEscaper2 () {
    deltaX = 0
    deltaY = 0
    if (direction == "up") {
        if (escaper.get(LedSpriteProperty.Y) == 0) {
            return
        }
        deltaY = -1
    } else if (direction == "down") {
        if (escaper.get(LedSpriteProperty.Y) == 4) {
            return
        }
        deltaY = 1
    } else if (direction == "left") {
        if (escaper.get(LedSpriteProperty.X) == 0) {
            return
        }
        deltaX = -1
    } else if (direction == "right") {
        if (escaper.get(LedSpriteProperty.X) == 4) {
            return
        }
        deltaX = 1
    } else {
        return
    }
    lastEscapeXBak = lastEscapeX
    lastEscapeYBak = lastEscapeY
    lastEscapeX = escaper.get(LedSpriteProperty.X)
    lastEscapeY = escaper.get(LedSpriteProperty.Y)
    escaper.set(LedSpriteProperty.X, escaper.get(LedSpriteProperty.X) + deltaX)
    escaper.set(LedSpriteProperty.Y, escaper.get(LedSpriteProperty.Y) + deltaY)
    tempSprite = escaper
    hitBarrierTest2()
    if (isHitBarrier) {
        escaper.set(LedSpriteProperty.X, lastEscapeX)
        escaper.set(LedSpriteProperty.Y, lastEscapeY)
        lastEscapeX = lastEscapeXBak
        lastEscapeY = lastEscapeYBak
        hittedBarrier.set(LedSpriteProperty.Brightness, 0)
    }
}
// 作者：seesea <seesea@gmail.com>
// 
// 日期：2019-04-15
// 
// 功能：实现一个追逐游戏
function startCountDown2 () {
    for (let 索引2 = 0; 索引2 <= 2; 索引2++) {
        basic.showNumber(3 - 索引2)
        basic.pause(300)
    }
}
function applyEscaperStatus2 () {
    if (CDTime > 0) {
        if (escaper.get(LedSpriteProperty.Brightness) > CD_BRIGHTNESS) {
            escaper.change(LedSpriteProperty.Brightness, 0 - CD_BRIGHTNESS_DELTA)
            if (escaper.get(LedSpriteProperty.Brightness) <= CD_BRIGHTNESS) {
                escaper.set(LedSpriteProperty.Brightness, ESCAPTER_BRIGHTNESS)
            }
        }
    } else {
        escaper.set(LedSpriteProperty.Brightness, ESCAPTER_BRIGHTNESS)
    }
}
function moveChaser2 () {
    deltaX = 0
    deltaY = 0
    if (chaser.get(LedSpriteProperty.X) < escaper.get(LedSpriteProperty.X)) {
        deltaX = 1
    } else if (chaser.get(LedSpriteProperty.X) > escaper.get(LedSpriteProperty.X)) {
        deltaX = -1
    }
    if (chaser.get(LedSpriteProperty.Y) < escaper.get(LedSpriteProperty.Y)) {
        deltaY = 1
    } else if (chaser.get(LedSpriteProperty.Y) > escaper.get(LedSpriteProperty.Y)) {
        deltaY = -1
    }
    if (deltaX != 0 || deltaY != 0) {
        if (Math.randomBoolean()) {
            deltaX = 0
        } else {
            deltaY = 0
        }
    }
    chaser.set(LedSpriteProperty.X, chaser.get(LedSpriteProperty.X) + deltaX)
    chaser.set(LedSpriteProperty.Y, chaser.get(LedSpriteProperty.Y) + deltaY)
    tempSprite = chaser
    hitBarrierTest2()
    if (isHitBarrier) {
        chaser.set(LedSpriteProperty.X, chaser.get(LedSpriteProperty.X) - deltaX)
        chaser.set(LedSpriteProperty.Y, chaser.get(LedSpriteProperty.Y) - deltaY)
        hittedBarrier.set(LedSpriteProperty.Brightness, 0)
    }
}
let chaserStep = 0
let escaperStep = 0
let lastEscapeYBak = 0
let lastEscapeXBak = 0
let deltaY = 0
let deltaX = 0
let lastTime = 0
let hittedBarrier: game.LedSprite = null
let isHitBarrier = false
let direction = ""
let lastEscapeY = 0
let lastEscapeX = 0
let tempBarrier: game.LedSprite = null
let tempSprite: game.LedSprite = null
let barriers: game.LedSprite[] = []
let escaper: game.LedSprite = null
let chaser: game.LedSprite = null
let CDTime = 0
let gameOver = false
let CD_BRIGHTNESS_DELTA = 0
let CD_TIME = 0
let CD_BRIGHTNESS = 0
let ESCAPTER_BRIGHTNESS = 0
let PLAYER_BARRIER_NUM = 0
let BARRIER_BRIGHTNESS = 0
let ACCELLARATION_THRESHOLD = 0
startCountDown2()
let 索引 = 0
ACCELLARATION_THRESHOLD = 200
let SYS_BARRIER_NUM = 3
BARRIER_BRIGHTNESS = 20
PLAYER_BARRIER_NUM = 3
ESCAPTER_BRIGHTNESS = 255
CD_BRIGHTNESS = 20
CD_TIME = 3000
CD_BRIGHTNESS_DELTA = 50
let STEP = 100
gameOver = false
let chaserSpeed = 30
let escaperSpeed = 100
CDTime = 0
chaser = game.createSprite(0, 0)
escaper = game.createSprite(0, 3)
chaser.set(LedSpriteProperty.Blink, 10)
barriers = []
for (let index = 0; index < PLAYER_BARRIER_NUM; index++) {
    tempSprite = game.createSprite(0, 0)
    tempSprite.set(LedSpriteProperty.Brightness, 0)
    barriers.push(tempSprite)
}
for (let index = 0; index < SYS_BARRIER_NUM; index++) {
    tempSprite = game.createSprite(Math.randomRange(1, 3), Math.randomRange(1, 3))
    tempSprite.set(LedSpriteProperty.Brightness, BARRIER_BRIGHTNESS)
    barriers.push(tempSprite)
}
basic.forever(function () {
    if (gameOver) {
        return
    }
    getDirection2()
    escaperStep += escaperSpeed
    if (chaserStep >= STEP) {
        moveChaser2()
        chaserStep += 0 - STEP
    }
    chaserStep += chaserSpeed
    checkCatched2()
    if (gameOver) {
        game.setScore(input.runningTime() / 100)
        showGameOver2()
        game.gameOver()
        return
    }
    if (escaperStep >= STEP) {
        moveEscaper2()
        escaperStep += 0 - STEP
    }
    coolDown2()
    applyEscaperStatus2()
    basic.pause(100)
})
