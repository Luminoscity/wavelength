var canvas = document.getElementById('wave');
var ctx = canvas.getContext("2d");
var cw = canvas.width;
var ch = canvas.height;

var binW = 45;
var recW = (binW / 1000) * cw;
var recW2 = 3 * binW;
var recW3 = 5 * binW;



function position(x) {
	return 5 + (x / 1005) * cw;
}

function draw(x) {
	posx = position(x)
	ctx.beginPath();
	ctx.fillStyle = "#f9c508";
	ctx.fillRect(posx - recW3 / 2, 0, recW3, 150);
	ctx.stroke();

	ctx.beginPath();
	ctx.fillStyle = "#ff7c34";
	ctx.fillRect(posx - recW2 / 2, 0, recW2, 150);
	ctx.stroke();

	ctx.beginPath();
	ctx.fillStyle = "#b6d4ed";
	ctx.fillRect(posx - recW / 2, 0, recW, 150);
	ctx.stroke();

	ctx.font = "24px sans-serif";
	ctx.fillStyle = "#000000";
	ctx.textAlign = "center";
	ctx.fillText('4', posx, 24);
	ctx.fillText('3', posx + 45, 24);
	ctx.fillText('3', posx - 45, 24);
	ctx.fillText('2', posx + 90, 24);
	ctx.fillText('2', posx - 90, 24);
}

function drawguess() {
	clearboard()
	draw(randpos)

	var guess = document.getElementById("guesser").value
	ctx.beginPath();
	ctx.fillStyle = "#d42838";
	ctx.fillRect(position(guess) - 2, 30, 4, 120);
	ctx.stroke();

	score(randpos, guess)


}

var points = 0

function score(randpos, guess) {
	let dist = Math.abs(randpos - guess) / binW;
	if (dist <= 0.5) {
		points = 4;
	} else if (dist <= 1.5) {
		points = 3;
	} else if (dist <= 2.5) {
		points = 2;
	} else {
		points = 0;
	}
	document.getElementById("score").textContent = points + " points" + ("!".repeat(Math.max(points - 1, 0)));
}

function button_peek() {
	draw(randpos);
	document.getElementById("guesser").value = randpos;
	document.getElementById("guessdisp").value = Math.floor(randpos / 10);
}

function button_guess() {
	drawguess();
}

function update_seed() {
	Math.seedrandom();
	$("#seed").val(Math.floor(Math.random() * RandSeedRange));
	document.getElementById("guesser").value = 500;
	document.getElementById("guessdisp").value = 50;
	fire();
}

function update_seed_visibility() {
	var checkbox = document.getElementById("show-seed");
	var seedBox = document.getElementById("seedContainer");
	if (checkbox.checked == true) {
		seedBox.style.visibility = "visible";
	} else {
		seedBox.style.visibility = "hidden";
	}
}

function update_percentages() {
	var checkbox = document.getElementById("percentages");
	var text = document.getElementById("guessdisp");
	if (checkbox.checked == true) {
		text.style.display = "block";
	} else {
		text.style.display = "none";
	}
}

function button_clear() {
	clearboard();
	document.getElementById("guesser").value = 500;
	document.getElementById("guessdisp").value = 50;
}
