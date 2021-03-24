var inc = .1;
var incStart = 0.005;
var magInc = 0.0005;
var start = 0;
var scl = 9;
var cols, rows;
var zoff = 10;
var fps;
var particles = [];
var numParticles = 800;
var flowfield;
var flowcolorfield;
var magOff = 45;
var showField = false;


function setup() {
  createCanvas(800, 350);
  pixelDensity(1);
  cols = floor(width / scl);
  rows = floor(height / scl);
  background(0);
  let JSON = ('../pi-hole-data.json');
  pi_data = loadJSON(JSON);
  smooth();

  for (let i = 0; i < numParticles; i++) {
    particles[i] = new Particle();
  }

  flowfield = new Array(rows * cols);
  flowcolorfield = new Array(rows * cols);
}

function Particle() {
  this.pos = createVector(random(width), random(height));
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.maxSpeed = .5;

  this.prevPos = this.pos.copy();

  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.show = function(colorfield) {
    strokeWeight(1);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();
    //point(this.pos.x, this.pos.y);
  }

  this.inverseConstrain = function(pos, key, f, t) {
    if (pos[key] < f) {
      pos[key] = t;
      this.updatePrev();
    }
    if (pos[key] > t) {
      pos[key] = f;
      this.updatePrev();
    }
  }

  this.updatePrev = function() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

  this.edges = function() {
    this.inverseConstrain(this.pos, 'x', 0, width);
    this.inverseConstrain(this.pos, 'y', 0, height);
  }

  this.follow = function(vectors, colorfield) {
    let x = floor(this.pos.x / scl);
    let y = floor(this.pos.y / scl);
    let index = x + y * cols;
    let force = vectors[index];
    this.applyForce(force);
    let c = colorfield[index];
    if (c) {
      stroke(color(c[0], c[1], c[2]));
    }
  }
}

function draw() {
  let queries_blocked = pi_data.queries;

  if (showField) {
    background(0);
  } else {
    background(color(0, 0, 0, 5));
  }
  var yoff = start;
  for (let y = 0; y < rows; y++) {
    let xoff = start;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let r = noise(xoff, yoff, zoff) * 255;
      let g = noise(xoff, yoff, zoff) * 255;
      let b = noise(xoff, yoff, zoff) * 255;
      let angle = noise(xoff, yoff, zoff) * TWO_PI;
      let v = p5.Vector.fromAngle(angle); // vector from angle
      let m = map(noise(xoff, yoff, magOff), 0, 1, -5, 100);
      v.setMag(m);
      if (showField) {
        push();
        stroke(255);
        translate(x * scl, y * scl);
        rotate(v.heading());
        let endpoint = abs(m) * scl;
        line(0, 0, endpoint, 0);
        if (m < 0) {
          stroke('red');
        } else {
          stroke('green');
        }
        line(endpoint - 2, 0, endpoint, 0);
        pop();
      }
      flowfield[index] = v;
      flowcolorfield[index] = [r, g, b];
      xoff += inc;
    }
    yoff += inc;
  }
  magOff += magInc;
  zoff += incStart;
  start -= magInc;
  print(queries_blocked)
  if (!showField) {
    for (let i = 0; i < particles.length; i++) {
      particles[i].follow(flowfield, flowcolorfield);
      particles[i].update();
      particles[i].edges();
      particles[i].show();
    }

    if (random(10) > 5 && particles.length < queries_blocked) {
      let rnd = floor(noise(zoff) * 20);
      for (let i = 0; i < rnd; i++) {
        particles.push(new Particle());
      }
    } else if (particles.length > 3000) {
      let rnd = floor(random(100));
      for (let i = 0; i < rnd; i++) {
        particles.shift();
      }
    }
  }
}