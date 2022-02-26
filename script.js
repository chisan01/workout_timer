const mainText = document.querySelector(".mainText");
const timerDisplay = document.querySelector(".timerDisplay");
const alarm = document.querySelector(".alarmSound");
const nextBtn = document.querySelector(".next");
const stopBtn = document.querySelector(".stop");

let isTimerRunning = false;
let startTime;
let setCount = 1;

let setGoal = 3;
let setIntervalTime = 3;
let exerciseIntervalTime = 5;
let exerciseName = "새로운 운동";

function secondToString(second) {
	let minute = Math.floor(second / 60);
	second %= 60;
	if (minute < 10) minute = "0" + minute;
	if (second < 10) second = "0" + second;
	return minute + ":" + second;
}

function startTimer(timerSecond) {
	return new Promise((resolve, reject) => {
		stopBtn.style.display = "block";
		nextBtn.style.display = "none";
		isTimerRunning = true;
		startTime = Date.now();

		const runTimer = setInterval(() => {
			let remainSecond = (timerSecond - (Date.now() - startTime) / 1000).toFixed(0);
			timerDisplay.textContent = secondToString(remainSecond);
			if (remainSecond <= 0) {
				stopTimer();
			}
		}, 1000);

		stopBtn.addEventListener("click", (event) => {
			stopBtn.blur();
			stopTimer();
		});

		const stopTimer = function () {
			clearInterval(runTimer);
			alarm.play();
			stopBtn.style.display = "none";
			nextBtn.style.display = "block";
			isTimerRunning = false;
			timerDisplay.textContent = "00:00";
			resolve();
		};
	});
}

// 마지막 세트 완료
const startNewExercise = function () {
	mainText.textContent = `${exerciseName} ${setCount} 세트 완료`;
	startTimer(exerciseIntervalTime).then(() => {
		setCount = 1;
		mainText.textContent = mainText.textContent = `${exerciseName} 시작!`;
		alert("휴식 완료!");
	});
};

// 세트 완료
const finishSet = function () {
	mainText.textContent = `${exerciseName} ${setCount} 세트 완료`;
	startTimer(setIntervalTime).then(() => {
		setCount++;
		mainText.textContent = `${exerciseName} ${setCount} 세트 시작`;
		alert("휴식 완료!");
	});
};

document.addEventListener("keydown", (event) => {
	if (isTimerRunning) return;
	if (event.key == "Enter" || event.key == " ") {
		if (setCount === setGoal) {
			startNewExercise();
		} else {
			finishSet();
		}
	}
});

nextBtn.addEventListener("click", (event) => {
	nextBtn.blur();
	if (isTimerRunning) return;
	if (setCount === setGoal) {
		startNewExercise();
	} else {
		finishSet();
	}
	nextBtn.blur();
});
