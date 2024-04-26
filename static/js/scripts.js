let points = [];
let real_waveform = [];
let prev_state = 0;
function setup() {
    // Setup canvas size and any other initializations
    createCanvas(600, 200);
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
        points.push({ startX: mouseX, startY: mouseY, endX: mouseX, endY: mouseY });
        console.log(points)
    }
    // if (!mouseIsPressed && points.length > 0) {
    //     let lineCoords = [];
    //     for (let i = 0; i < points.length; i++) {
    //         lineCoords.push([points[i].startX, points[i].startY]);
    //         lineCoords.push([points[i].endX, points[i].endY]);
    //     }
    //     console.log("Line object coordinates:", lineCoords);
    // }
    // allow it to stay on the canvas
    if (keyIsPressed) {
        if (key === 'c') {
            clear();
            background(220);
        }
    }
}


function mouseDragged() {
    points[points.length - 1].endX = mouseX;
    points[points.length - 1].endY = mouseY;
}

function downloadSVG() {
    // download canvas without bg as svg
    save('drawing.svg');
}

function dtwDistanceBetweenLines(lines1, lines2) {
    // Convert lines arrays to sequences of points
    const seq1 = linesToSequence(lines1);
    const seq2 = linesToSequence(lines2);

    // Calculate DTW distance between the sequences
    return dtwDistance(seq1, seq2);
}

function linesToSequence(lines) {
    let seq = [];
    for (let i = 0; i < lines.length; i++) {
        seq.push([lines[i].startX, lines[i].startY]);
        seq.push([lines[i].endX, lines[i].endY]);
    }
    return seq;
}

function dtwDistance(seq1, seq2) {
    const n = seq1.length;
    const m = seq2.length;

    // Create a 2D array to store DTW distances
    const dtw = new Array(n + 1).fill().map(() => new Array(m + 1).fill(Infinity));

    // Initialize the first element as 0
    dtw[0][0] = 0;

    // Calculate DTW distances
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            const cost = distance(seq1[i - 1], seq2[j - 1]); // Distance between two points
            dtw[i][j] = cost + Math.min(dtw[i - 1][j], dtw[i][j - 1], dtw[i - 1][j - 1]);
        }
    }

    // Return the DTW distance between the two sequences
    return dtw[n][m];
}

function distance(point1, point2) {
    const dx = point1[0] - point2[0];
    const dy = point1[1] - point2[1];
    return Math.sqrt(dx * dx + dy * dy);
}

function sendPoints() {
    // Send the points to the server
    const data = {
        points: points,
        waveform: real_waveform
    };
    console.log(data);

    // Send the data to the server
    fetch('/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            // Display the response from the server
            console.log('Server response:', data);
            const result = document.getElementById('result');
            result.innerHTML = data.result;
        });
}