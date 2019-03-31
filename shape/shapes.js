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

function preload () {
  shapes = [];
  shapes.push(loadImage('data/shape1.svg'));
}

function setup () {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  // set the current shape to the first in the array
  currentShape = shapes[0];
  tileWidth = width / tileCount;
  tileHeight = height / tileCount;
  maxDist = sqrt(pow(width, 2) + pow(height, 2));
}

function draw () {
  clear();

  for (var gridY = 0; gridY < tileCount; gridY++) {
    for (var gridX = 0; gridX < tileCount; gridX++) {

      var posX = tileWidth * gridX + tileWidth / 2;
      var posY = tileHeight * gridY + tileWidth / 2;

      // calculate angle between mouse position and actual position of the shape
      var angle = atan2(mouseY - posY, mouseX - posX) + (shapeAngle * (PI / 180));

      if (sizeMode == 0) newShapeSize = shapeSize;
      if (sizeMode == 1) newShapeSize = shapeSize * 1.5 - map(dist(mouseX, mouseY, posX, posY), 0, 500, 5, shapeSize);
      if (sizeMode == 2) newShapeSize = map(dist(mouseX, mouseY, posX, posY), 0, 500, 5, shapeSize);

      push();
      translate(posX, posY);
      rotate(angle);
      noStroke();
      image(currentShape, 0, 0, newShapeSize, newShapeSize * 2);
      pop();
    }
  }
}

function keyReleased () {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (key == 'd' || key == 'D') sizeMode = (sizeMode + 1) % 3;
  if (key == 'g' || key == 'G') {
    tileCount += 5;
    if (tileCount > 20) {
      tileCount = 10;
    }
    tileWidth = width / tileCount;
    tileHeight = height / tileCount;
  }

  if (key == '1') currentShape = shapes[0];

  if (keyCode == UP_ARROW) shapeSize += 5;
  if (keyCode == DOWN_ARROW) shapeSize = max(shapeSize - 5, 5);
  if (keyCode == LEFT_ARROW) shapeAngle += 5;
  if (keyCode == RIGHT_ARROW) shapeAngle -= 5;
}

// dynamically adjust the canvas to the window
function windowResized () {
  resizeCanvas(windowWidth, windowHeight);
}
