let count = 0;
const setCount = document.querySelector(".counter > p");
const nextSetBtn = document.querySelector(".counter");
const nextExerciseBtn = document.querySelector(".next");
const timerCount = document.querySelector(".timer2 > p");
const alarmSound = document.querySelector("audio");
const stopBtn = document.querySelector(".stop");

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

const startNewExercise = () => {
	count = 0;
	setCount.textContent = "새로운 운동 시작!";
	// 운동 간 휴식시간 타이머 작동
	const time = new Time(1, 30); // 1분 30초
	stopBtn.style.display = "block";
	const timer = setInterval(() => {
		if (time.minute === 0 && time.second === 0) {
			alarmSound.play();
			alert("휴식 끝!");
            clearInterval(timer);
            timerCount.textContent = "00:00";
			stopBtn.style.display = "none";
        }
        else {
            time.decrease();
            timerCount.textContent = time.toString();
        }
	}, 1000);
	stopBtn.addEventListener('click', event => {
		clearInterval(timer);
		timerCount.textContent = "00:00";
		stopBtn.blur();
		stopBtn.style.display = "none";
	})
};

const finishSet = () => {
	count++;
    setCount.textContent = `${count}번째 세트 완료`;
    // 세트 간 휴식시간 타이머 작동
	const time = new Time(0, 30); // 30초
	stopBtn.style.display = "block";
	const timer = setInterval(() => {
		if (time.minute === 0 && time.second === 0) {
			alarmSound.play();
			alert("휴식 끝!");
            clearInterval(timer);
            timerCount.textContent = "00:00";
			stopBtn.style.display = "none";
        }
        else {
            time.decrease();
            timerCount.textContent = time.toString();
        }
	}, 1000);
	stopBtn.addEventListener('click', event => {
		clearInterval(timer);
		timerCount.textContent = "00:00";
		stopBtn.blur();
		stopBtn.style.display = "none";
	})
};

document.addEventListener("keydown", (event) => {
	if (event.key == "Enter" || event.key == " ") {
		finishSet();
	}
	if (event.key == "r") {
		startNewExercise();
	}
});

nextExerciseBtn.addEventListener("click", (event) => {
	startNewExercise();
	nextExerciseBtn.blur();
});
nextSetBtn.addEventListener("click", (event) => {
	finishSet();
	nextSetBtn.blur();
});
