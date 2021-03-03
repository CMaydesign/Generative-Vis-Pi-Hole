let result;

function preload() {
    result = loadStrings('pi-hole-data.txt');
    print(result)
}

function setup() {
    var width = window.innerWidth,
        height = window.innerHeight;
    createCanvas(width, height);
    smooth();
    frameRate(50);

    clearBackground();
    // global vars

    var
        _num = 10
    _angnoise = 0
    _radiusnoise = 0
    _xnoise = 0
    _ynoise = 0
    _angle = -PI / 2
    _radius = 100
    _strokeCol = 254
    _strokeChange = -1
    _angnoise = random(10);
    _radiusnoise = random(10);
    _xnoise = random(10);
    _ynoise = random(10);
    queries_blocked = 0;
}

function clearBackground() {
    background(255);
}

function draw() {
    queries_blocked = loadStrings('pi-hole-data.txt')
        // print(queries_blocked);
    _radiusnoise += 0.005;
    _radius = (noise(queries_blocked) * 550) + 1;
    _angnoise += 0.005;
    _angle += (noise(_angnoise) * 6) - 3;
    if (_angle > 360) { _angle -= 360; }
    if (_angle < 0) { _angle += 360; }
    // print(radius);
    // wobble centre
    _xnoise += 0.01;
    _ynoise += 0.01;
    var
        centreX = width / 2 + (noise(_xnoise) * 100) - 50;
    centreY = height / 2 + (noise(_ynoise) * 100) - 50;

    rad = radians(_angle);
    x1 = centreX + (_radius * cos(rad));
    y1 = centreY + (_radius * sin(rad));

    // opposite end of line
    opprad = rad + PI;
    x2 = centreX + (_radius * cos(opprad));
    y2 = centreY + (_radius * sin(opprad));

    noFill();
    _strokeCol += _strokeChange;
    if (_strokeCol > 254) { _strokeChange *= -1; }
    if (_strokeCol < 0) { _strokeChange *= -1; }
    stroke(_strokeCol, 60);
    strokeWeight(1);
    line(x1, y1, x2, y2);
}



function mousePressed() {
    clearBackground();
}