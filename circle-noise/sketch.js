var t;

function setup() {
    createCanvas(1000, 1000);
    background(0);
    stroke(255, 5);
    noFill();
    t = 0;
    frameRate(25);
    let JSON = ('../pi-hole-data.json');
    pi_data = loadJSON(JSON);
}

function draw() {
    let queries_blocked = pi_data.queries;
    // print(queries_blocked);
    translate(width / 2, height / 2);
    beginShape();
	int(queries_blocked);
	// print(queries_blocked);
	var _anglesharp = map(queries_blocked, 0, 8000, 0, 3500)
	print(_anglesharp);
    for (var i = 0; i < 2500; i++) {
        var ang = map(i, 1000, 180, 0, PI); //choose sharpness of angle
        var rad = 500 * noise(i * 0.007, t * 0.008);
        var x = rad * sin(ang);
        var y = rad * cos(ang);
        curveVertex(x, y);
		
    }
    endShape(CLOSE);

    t += 1;

    //   // clear the background every 600 frames using mod (%) operator
    //   if (frameCount % 600 == 0) {
    // 	background(255);
    //   }

}