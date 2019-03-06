function setup () {
    createCanvas(720, 720);

    colorMode(HSB, 360, 100, 100);
    rectMode(CENTER);
    noStroke();
}

function draw () {
    background(mouseX / 2, 100, 100);

    fill(360 - mouseX / 2, 100, 100);
    rect(360, 360, mouseY + 1, mouseY + 1);
}
