function setup() {
    // Setup canvas size and any other initializations
    createCanvas(400, 400);
    background(220);
    stroke(0);
    strokeWeight(4);
    noFill();
}

function draw() {
    // allow user to draw on the canvas and make it stay

    if (mouseIsPressed) {
        stroke(0);
        strokeWeight(4);
        line(pmouseX, pmouseY, mouseX, mouseY);
    }

    // allow it to stay on the canvas
    if (keyIsPressed) {
        if (key === 'c') {
            clear();
            background(220);
        }
    }
}

function downloadSVG() {
    // download canvas without bg as svg
    save('drawing.svg');
}