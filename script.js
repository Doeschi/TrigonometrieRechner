const RADIUS = 200;
const ANGLE_DECIMALS = 4;
const TRIGEOMETRY_FUNCTIONS_DECIMALS = 10;

let canvas;

const slider = document.getElementById("angleSlider");

const noneButton = document.getElementById("noneButton");
const sinusButton = document.getElementById("sinusButton");
const cosinusButton = document.getElementById("cosinusButton");

const angleInput1 = document.getElementById("angleInput_1");
const angleInput2 = document.getElementById("angleInput_2");

const sinusOutput = document.getElementById("sinusOutput");
const cosinusOutput = document.getElementById("cosinusOutput");
const tangensOutput = document.getElementById("tangensOutput");

function setup() {
    canvas = createCanvas(4 * RADIUS, 4 * RADIUS);
    canvas.parent("sketchHolder");

    slider.max = 360 - pow(10, -ANGLE_DECIMALS);
    slider.step = pow(10, -ANGLE_DECIMALS);

    angleMode(DEGREES);
    noFill();
    setOutput();
    handleSlider();
}

function draw() {
  function drawGrid() {
      stroke(220);
      for (let x = 0; x < width; x += 10) {
          line(x, 0, x, height);
      }

      for (let y = 0; y < height; y += 10) {
          line(0, y, width, y);
      }
      stroke(150);

      line(width / 2, 0, width / 2, height);
      line(0, height / 2, width, height / 2);

      stroke(0);
  }
  function drawCircle() {
    function drawRADIUSLines(x, y) {
        line(0, 0, x, y);
        if (sinusButton.checked) {
            stroke(0, 0, 0, 100)
            line(0, 0, -x, y);
        } else if (cosinusButton.checked) {
            stroke(0, 0, 0, 100);
            line(0, 0, x, -y);
        }
        stroke(0);
    }
    function drawSinusLines(x, y) {
        stroke(214, 15, 1);
        line(x, y, x, 0);
        if (sinusButton.checked) {
            stroke(214, 15, 1, 100);
            line(-x, y, -x, 0);
        } else if (cosinusButton.checked) {
            stroke(214, 15, 1, 100);
            line(x, 0, x, -y);
        }
        stroke(0)
    }

    function drawCosinusLines(x, y) {
        stroke(29, 48, 255);
        line(0, 0, x, 0);
        if (sinusButton.checked) {
            stroke(29, 48, 255, 100);
            line(0, 0, -x, 0);
        }
        stroke(0);
    }
      translate(width / 2, height / 2);
      stroke(0);

      circle(0, 0, RADIUS * 2);
      let x = cos(-slider.value) * RADIUS;
      let y = sin(-slider.value) * RADIUS;

      drawRADIUSLines(x, y);
      drawSinusLines(x, y);
      drawCosinusLines(x, y);

      stroke(0);
      translate(-(width / 2), -(height / 2));
  }
    background(255);
    drawGrid();
    drawCircle();
}


function handleInput1() {
    if (angleInput1.value === "") {
        slider.value = "0";
        angleInput2.value = "";
        return;
    }

    if (sinusButton.checked || cosinusButton.checked) {
        angleInput2.value = roundNumber(calculateOtherAngle(angleInput1.value % 360), ANGLE_DECIMALS);
    }
    slider.value = angleInput1.value % 360;
    setOutput();
}

function handleInput2() {
    if (angleInput2.value === "") {
        slider.value = "0";
        angleInput1.value = "";
        return;
    }

    if (sinusButton.checked || cosinusButton.checked) {
        angleInput1.value = roundNumber(calculateOtherAngle(angleInput2.value % 360), ANGLE_DECIMALS);
    }
    slider.value = angleInput2.value % 360;
    setOutput();
}

function handleSlider() {
    angleInput1.value = roundNumber(slider.value, ANGLE_DECIMALS);
    if (sinusButton.checked || cosinusButton.checked) {
        angleInput2.value = roundNumber(calculateOtherAngle(slider.value % 360), ANGLE_DECIMALS);
    } else {
        angleInput2.value = "";
    }
    setOutput();
}

function calculateOtherAngle(angle) {
    if (sinusButton.checked) {
        return calculateOtherSinusAngle(angle);
    } else if (cosinusButton.checked) {
        return 360 - angle;
    }
}

function calculateOtherSinusAngle(angle) {
    if (angle >= 0 && angle < 180) {
        return 180 - angle;
    } else if (angle >= 180 && angle < 360) {
        return 360 - (angle - 180);
    }
}

function setOutput() {
    sinusOutput.innerText = "Sinus: " + roundNumber(sin(slider.value), TRIGEOMETRY_FUNCTIONS_DECIMALS);
    cosinusOutput.innerText = "Cosinus: " + roundNumber(cos(slider.value), TRIGEOMETRY_FUNCTIONS_DECIMALS);
    tangensOutput.innerText = "Tangens: " + roundNumber(tan(slider.value), TRIGEOMETRY_FUNCTIONS_DECIMALS);
}

function roundNumber(number, decimals) {
    return round(number * pow(10, decimals)) / pow(10, decimals);
}

function mousePressed() {
    if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100) {
        fullscreen(!fullscreen());
    }
}
