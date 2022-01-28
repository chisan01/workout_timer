let setCount = 0;
const setCountText = document.querySelector(".setCountText");
const nextSetBtn = document.querySelector(".nextSet");
const nextExerciseBtn = document.querySelector(".nextExercise");
const timerDisplay = document.querySelector(".timerDisplay");
const alarm = document.querySelector(".alarmSound");
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

function startTimer(minute, second) {
	const time = new Time(minute, second);
	stopBtn.style.display = "block"; // 정지
	isTimerRunning = true;
	const runTimer = setInterval(() => {
		if (time.minute === 0 && time.second === 0) {
			alarm.play();
            timerDisplay.textContent = "00:00";
			stopBtn.style.display = "none";
			isTimerRunning = false;
			alert("휴식 끝!");
			clearInterval(runTimer);
        }
        else {
            time.decrease();
            timerDisplay.textContent = time.toString();
        }
	}, 1000);
	
	stopBtn.addEventListener('click', event => {
		clearInterval(runTimer);
		stopBtn.blur();
		stopBtn.style.display = "none";
		timerDisplay.textContent = "00:00";
		isTimerRunning = false;
	});
}

const startNewExercise = () => {
	setCount = 0;
	setCountText.textContent = "새로운 운동 시작!";
	// 운동 간 휴식시간 타이머 작동
	startTimer(1, 30); // 1분 30초
};

const finishSet = () => {
	setCount++;
    setCountText.textContent = `${setCount}번째 세트 완료`;
    // 세트 간 휴식시간 타이머 작동	
	startTimer(0, 30); // 30초
};

document.addEventListener("keydown", (event) => {
	if (isTimerRunning) return;
	if (event.key == "Enter" || event.key == " ") {
		finishSet();
	}
	if (event.key == "r") {
		startNewExercise();
	}
});

nextExerciseBtn.addEventListener("click", (event) => {
	if (isTimerRunning) return;
	startNewExercise();
	nextExerciseBtn.blur();
});
nextSetBtn.addEventListener("click", (event) => {
	if (isTimerRunning) return;
	finishSet();
	nextSetBtn.blur();
});
