var a = -2;
var b = -2.4;
var c = 1.1;
var d = -0.9;
var X, Y;

function clifford(x0, y0, a, b, c, d, iters) {
  var x = x0;
  var y = y0;
  
  for (i = 0; i < iters; i++) {
    var xt = x;
    
    x = sin(a*y) + c*cos(a*x);
    y = sin(b*xt) + d*cos(b*y)
  }
  
  point(map(x, -2.5, 2.5, 0, width), map(y, -2.5, 2.5, height, 0));
}

function setup() {
  createCanvas(800, 800);
  background(255);
  
  noLoop();
}

function draw() {
  stroke(0, 20);
  
  for (j = 0; j < 1000; j++) {
    X = random(-10, 10);
    Y = random(-10, 10);

    clifford(X, Y, a, b, c, d, 100);
  }
}