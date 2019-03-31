// @ts-nocheck
'use strict';

let logo = {r1: 0, r2: 0, alpha: 0};
let animation0, animation1;

let maxSize = 100;
let weight = 25;

function setup () {
  // Full available space as canvas
  createCanvas(windowWidth, windowHeight);

  strokeWeight(weight);

  animation0 = new TWEEN.Tween(logo) // Create a new tween that modifies 'logo'.
    .to({r1: maxSize, alpha: 255}, 500) // Animate radius and alpha in 0.5 second.
    .delay(1000);
  animation1 = new TWEEN.Tween(logo) // Create a new tween that modifies 'logo'.
    .to({r2: maxSize + weight * 0.6}, 400) // Animate second radius in 0.4 second.
    .delay(2000)
    .easing(TWEEN.Easing.Quadratic.Out);

  animation0.chain(animation1);

  animation0.start();
}

function draw () {
  clear();
  // Animate dependng on current elapsed time
  TWEEN.update(millis());

  // outer circle
  stroke(25, logo.alpha);
  noFill();
  circle(windowWidth / 2 - maxSize * 0.76, windowHeight / 2, logo.r1);
  circle(windowWidth / 2 + maxSize * 0.76, windowHeight / 2, logo.r1);
  circle(windowWidth / 2 - maxSize * 2.3, windowHeight / 2, logo.r1);
  circle(windowWidth / 2 + maxSize * 2.3, windowHeight / 2, logo.r1);

  // Inner Circle
  noStroke();
  fill(255);
  circle(windowWidth / 2 - maxSize * 0.76, windowHeight / 2, logo.r2);
  circle(windowWidth / 2 + maxSize * 0.76, windowHeight / 2, logo.r2);
  circle(windowWidth / 2 - maxSize * 2.3, windowHeight / 2, logo.r2);
  circle(windowWidth / 2 + maxSize * 2.3, windowHeight / 2, logo.r2);
}

// dynamically adjust the canvas to the window
function windowResized () {
  resizeCanvas(windowWidth, windowHeight);
}
