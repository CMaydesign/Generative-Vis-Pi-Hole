scaleIt = 400;
let queries;


function setup() {
    createCanvas(800, 800);
    background(20);
    colorMode(HSB);
    strokeWeight(0.01);
    smooth();
}

function draw() {
    queries = loadStrings('../pi-hole-data.txt')
        //print(queries);
    let blocked = map(6500, 0, 10000, 0, 10);
    var k = blocked;
    print(k);
    translate(width / 2, height / 2);
    //scale(width/2, height/2);
    var t = frameCount / 120.0;
    x = cos(k * t) * sin(t) * scaleIt;
    y = cos(k * t) * cos(t) * scaleIt;
    stroke(255);
    line(0, 0, x, y);
}