//get elements

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

//build functions

function togglePlay(){
	const method = video.paused ? 'play' : 'pause';
	video[method]();
}

function updateButton(){
	const icon = this.paused ? '►' : '❚ ❚';
	toggle.textContent = icon;
}

function skip(){
	console.log(this.dataset.skip);
	video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(e){
	video[e.target.name] = e.target.value;
	console.log(e.target.name);
}

function handleProgress(){
	const persent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${persent}%`;

}

function scrub(e){
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
}

//hook up the event listeners
let mousedown = false;
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', (e) => {
	
	if(mousedown){
		//console.log('hi');
		handleRangeUpdate(e);
	}
}));
ranges.forEach(range => range.addEventListener('mousedown', () => mousedown = !mousedown));
ranges.forEach(range => range.addEventListener('mouseup', () => mousedown = !mousedown));


progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = !mousedown);
progress.addEventListener('mouseup', () => mousedown = !mousedown);

