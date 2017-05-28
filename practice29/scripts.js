let countdown;
const display = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds){
	clearInterval(countdown);
	const now = Date.now();
	const then = now + seconds * 1000;

	displayTimeLeft(seconds);
	displayTimeEnd(then);
	countdown = setInterval(() => {
		const secondsLeft = Math.round((then - Date.now()) / 1000);
		if (secondsLeft <= 0) {
			clearInterval(countdown);
		}
		displayTimeLeft(secondsLeft);
	}, 1000)
}

function displayTimeLeft(sec){
	const min = Math.floor(sec / 60);
	const secLeft = sec % 60;
	const displayTime = `${min}:${secLeft >= 10 ? '' : '0'}${secLeft}`;
	document.title = displayTime;
	display.textContent = displayTime;
}

function displayTimeEnd(timestamp){
	const end = new Date(timestamp);
	const hour = end.getHours();
	const min = end.getMinutes();
	endTime.textContent = `Be back at ${hour}:${min >= 10 ? '' : '0'}${min}`
}

function startTimer(){
	timer(parseInt(this.dataset.time));
}

buttons.forEach((button) => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit', function (e){
	e.preventDefault();
	const min = this.minutes.value;
	timer(min * 60);
	this.reset();
})
