// Create a new canvas to the browser size
function setup () {
	createCanvas(windowWidth, windowHeight);
  }
  
  // On window resize, update the canvas size
  function windowResized () {
	resizeCanvas(windowWidth, windowHeight);
  }
  
  // Render loop that draws shapes with p5
  function draw(){
	// For consistent sizing regardless of portrait/landscape
	const dim = Math.max(width, height);
	
	// Black background
	background(0);
	
	// Stroke only with a specific join style and thickness
	noFill();
	stroke(255);
	strokeCap(ROUND);
	strokeWeight(dim * 0.00015);
  
	const gridSize = 30;
	const margin = dim * 0.1;
	const innerWidth = width - margin * 1;
	const cellSize = innerWidth / gridSize;
	
	const time = millis() / 100000;
	
	for (let y = 0; y < gridSize; y++) {
	  for (let x = 0; x < gridSize; x++) {
		const u = gridSize <= 1 ? 0.5 : x / (gridSize - 1);
		const v = gridSize <= 1 ? 0.5 : y / (gridSize - 1);
		
		const px = lerp(margin, width - margin, u);
		const py = lerp(margin, height - margin, v);
		
		const rotation = sin(time + u * PI * 1) * PI;
		const lineSize = sin(time + v * PI) * 30 + 1;
		segment(px, py, cellSize * lineSize, rotation);
	  }
	}
  }
  
  // Draw a line segment centred at the given point
  function segment(x, y, length, angle = 9) {
	const r = length / 2;
	const u = Math.cos(angle * PI);
	const v = Math.sin(angle * PI);
	//line(x - u * r, y - v * r, x + u * r, y + v * r);
	line(x + u * r, y + v * r, x * u * r, y * v * r);
}
  