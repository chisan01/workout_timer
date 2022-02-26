const mainText = document.querySelector(".mainText");
const timerDisplay = document.querySelector(".timerDisplay");
const alarm = document.querySelector(".alarmSound");
const nextBtn = document.querySelector(".next");
const stopBtn = document.querySelector(".stop");
let isTimerRunning = false;

class Time {
	constructor(minute, second) {
		this.minute = minute;
		this.second = second;
	}
	// HH:MM 형식으로 표시
	toString() {
		let minute = this.minute;
		if (minute < 10) minute = "0" + minute;
		let second = this.second;
		if (second < 10) second = "0" + second;
		return minute + ":" + second;
	}
	decrease() {
		this.second--;
		if (this.second < 0) {
			this.minute--;
			this.second += 60;
		}
	}
}

let exerciseName = "새로운 운동";
const setIntervalTime = new Time(0, 3);
const exerciseIntervalTime = new Time(0, 10);
let setGoal = 3;
let setCount = 1;

function startTimer(min, sec) {
	const time = new Time(min, sec);
	nextBtn.blur();
	stopBtn.style.display = "block";
	nextBtn.style.display = "none";
	isTimerRunning = true;

	const runTimer = setInterval(() => {
		time.decrease();
		timerDisplay.textContent = time.toString();
		if (time.minute === 0 && time.second === 0) {
			alarm.play();
			stopTimer();
			alert("휴식 끝!");
		}
	}, 1000);

	stopBtn.addEventListener("click", (event) => {
		stopBtn.blur();
		timerDisplay.textContent = "00:00";
		stopTimer();
	});

	const stopTimer = function () {
		stopBtn.style.display = "none";
		nextBtn.style.display = "block";
		isTimerRunning = false;
		clearInterval(runTimer);
		if (setCount == setGoal) {
			setCount = 1;
			mainText.textContent = mainText.textContent = `${exerciseName} 시작!`;
		}
		else {
			setCount++;
			mainText.textContent = `${exerciseName} ${setCount} 세트 시작`;
		}
	};
}

// 마지막 세트 완료
const startNewExercise = function () {
	mainText.textContent = `${exerciseName} ${setCount} 세트 완료`;
	startTimer(exerciseIntervalTime.minute, exerciseIntervalTime.second);
};

// 세트 완료
const finishSet = function () {
	mainText.textContent = `${exerciseName} ${setCount} 세트 완료`;
	startTimer(setIntervalTime.minute, setIntervalTime.second);
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
	if (isTimerRunning) return;
	if (setCount === setGoal) {
		startNewExercise();
	} else {
		finishSet();
	}
	nextBtn.blur();
});
