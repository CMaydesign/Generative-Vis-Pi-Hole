var t;

function setup() {
    createCanvas(1000, 1000);
    background(255);
    stroke(0, 15);
    noFill();
    t = 0;
    frameRate(25);
    let JSON = ('../pi-hole-data.json');
    pi_data = loadJSON(JSON);
}

function draw() {
    let queries_blocked = pi_data.queries;
    print(queries_blocked);
    translate(width / 2, height / 2);
    beginShape();
    for (var i = 0; i < queries_blocked; i++) {
        var ang = map(i, 0, 180, 0, PI);
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