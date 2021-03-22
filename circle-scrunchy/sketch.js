var num = 40,
    circles = 80,
    frames = 60,
    theta = 0,
    data = 0

function setup() {
    createCanvas(540, 540)
}

function draw() {
    randomSeed(1)
    background(0)
    noStroke()
    var angle = 0
    for (let j = 0; j < circles; j++) {
        fill(255, 25)
        var r = random(TWO_PI)
        beginShape(TRIANGLE_STRIP)
        var r2 = random(30, 50)
        for (let i = 0; i < num; i++) {
            angle = TWO_PI / num * i + r
            var offSet = TWO_PI / num * i
            d = 120 + cos(offSet * 3) * r2
            x = width / 2 + sin(theta + offSet) * 10 + sin(angle) * d
            y = height / 2 + cos(theta + offSet) * 10 + cos(angle) * d
            vertex(x, y)
            ellipse(x, y, 3, 3)
        }
        endShape(CLOSE)
    }
    theta += TWO_PI / frames
        //if (frameCount <= frames) saveFrame("imge-###.gif");
}