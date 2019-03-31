// @ts-nocheck
'use strict';

var tileCount = 10;

var tileWidth;
var tileHeight;
var shapeSize = 50;
var newShapeSize = shapeSize;
var shapeAngle = 0;
var maxDist;
var currentShape;
var shapes;

var sizeMode = 0;

// Audio
var mySound;

// Animated values must be an object
let angle = {r: 0};

function preload () {
  shapes = [];
  shapes.push(loadImage('data/shape1.svg'));

  soundFormats('mp3', 'ogg');
  mySound = loadSound('data/554__bebeto__ambient-loop.mp3');
}

function setup () {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  // set the current shape to the first in the array
  currentShape = shapes[0];
  tileWidth = width / tileCount;
  tileHeight = height / tileCount;
  maxDist = sqrt(pow(width, 2) + pow(height, 2));
  mySound.setVolume(0.1);
  mySound.playMode('sustain');
  mySound.loop();
  mySound.pause();

  new TWEEN.Tween(angle) // Create a new tween that modifies 'coords'.
    .to({r: 360}, mySound.duration() * 1000) // Move to (300, 200) in 1 second.
    .repeat(Infinity)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();
}

function draw () {
  clear();
  TWEEN.update(mySound.currentTime() * 1000);

  for (var gridY = 0; gridY < tileCount; gridY++) {
    for (var gridX = 0; gridX < tileCount; gridX++) {

      var posX = tileWidth * gridX + tileWidth / 2;
      var posY = tileHeight * gridY + tileWidth / 2;

      var a = radians(angle.r);

      if (sizeMode == 0) newShapeSize = shapeSize;
      if (sizeMode == 1) newShapeSize = shapeSize * 1.5 - map(dist(mouseX, mouseY, posX, posY), 0, 500, 5, shapeSize);
      if (sizeMode == 2) newShapeSize = map(dist(mouseX, mouseY, posX, posY), 0, 500, 5, shapeSize);

      push();
      translate(posX, posY);
      rotate(a);
      noStroke();
      image(currentShape, 0, 0, newShapeSize, newShapeSize * 2);
      pop();
    }
  }
}

function keyReleased () {
  if (key == ' ') {
    // TODO: When resuming the sound it should always be resumed at the position paused previously
    // Right now it sometimes restarts
    if (mySound.isPaused() || !mySound.isPlaying()) {
      mySound.loop();
    } else {
      mySound.pause();
    }
  }

  if (keyCode == UP_ARROW) shapeSize += 5;
  if (keyCode == DOWN_ARROW) shapeSize = max(shapeSize - 5, 5);
  if (keyCode == LEFT_ARROW) shapeAngle += 5;
  if (keyCode == RIGHT_ARROW) shapeAngle -= 5;
}

// dynamically adjust the canvas to the window
function windowResized () {
  resizeCanvas(windowWidth, windowHeight);
}
