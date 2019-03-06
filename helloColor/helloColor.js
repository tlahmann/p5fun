'use strict'

function setup () {
    createCanvas(720, 720);
    noCursor();

    colorMode(HSB, 360, 100, 100);
    rectMode(CENTER);
}

function draw () {
    background(mouseY / 2, 100, 100);

    noStroke();
    fill(360 - mouseY / 2, 100, 100);
    rect(360, 360, mouseX + 1, mouseX + 1);
    stroke(0, 0, 0);
    line(mouseX, mouseY - 10, mouseX, mouseY + 10);
    line(mouseX - 10, mouseY, mouseX + 10, mouseY);
}
