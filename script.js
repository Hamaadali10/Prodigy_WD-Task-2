let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let paused = false;
let lapCounter = 0;

const minutesLabel = document.getElementById('minutes');
const secondsLabel = document.getElementById('seconds');
const millisecondsLabel = document.getElementById('milliseconds');

function startTimer() {
  if (!running) {
    startTime = new Date().getTime();
    tInterval = setInterval(updateTime, 10);
    running = true;
    paused = false;
    document.getElementById('startBtn').innerText = 'Lap';
  } else {
    recordLap();
  }
}

function pauseTimer() {
  if (!paused) {
    clearInterval(tInterval);
    paused = true;
    running = false;
    document.getElementById('startBtn').innerText = 'Start';
  }
}

function resetTimer() {
  clearInterval(tInterval);
  running = false;
  paused = false;
  difference = 0;
  lapCounter = 0;
  minutesLabel.innerText = '00';
  secondsLabel.innerText = '00';
  millisecondsLabel.innerText = '00';
  document.getElementById('laps').innerHTML = '';
  document.getElementById('startBtn').innerText = 'Start';
}

function updateTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  const milliseconds = Math.floor((difference % 1000) / 10);

  minutesLabel.innerText = pad(minutes);
  secondsLabel.innerText = pad(seconds);
  millisecondsLabel.innerText = pad(milliseconds);
}

function pad(num) {
  return num < 10 ? '0' + num : num;
}

function recordLap() {
  lapCounter++;
  const lapTime = `${pad(minutesLabel.innerText)}:${pad(secondsLabel.innerText)}:${pad(millisecondsLabel.innerText)}`;
  const lapItem = document.createElement('li');
  lapItem.innerText = `Lap ${lapCounter}: ${lapTime}`;
  document.getElementById('laps').appendChild(lapItem);
}

document.getElementById('startBtn').addEventListener('click', startTimer);
document.getElementById('pauseBtn').addEventListener('click', pauseTimer);
document.getElementById('resetBtn').addEventListener('click', resetTimer);
