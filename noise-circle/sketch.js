var t;
let processed;
function setup() {
  createCanvas(400, 400);
  background(35);
  stroke(255, 15);
  noFill();
  t = 0;
  frameRate(25);
  data = loadJSON('../pi-hole-data.json')
  print(data);
  let processed = data.queries;
  print(processed);
}

function draw() {
  translate(width/2, height/2);
  beginShape();
  for (var i = 0; i < 6000; i++) {
    var ang = map(i, 0, 300, 0, PI);
    var rad = 200 * noise(i * 0.01, t * 0.005);
    var x = rad * cos(ang);
    var y = rad * sin(ang);
    curveVertex(x, y);
  }
  endShape(CLOSE);

  t += 1;

//   // clear the background every 600 frames using mod (%) operator
//   if (frameCount % 600 == 0) {
// 	background(255);
//   }

}

