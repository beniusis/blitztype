import {
  resetBtn,
  restartBtn,
  resultModal,
  resultModalCloseBtn,
  statsModalCloseBtn,
  textPrompt,
  timer,
  viewStatisticsBtn
} from './elements.js';
import Stats from './stats.js';
import Result from './result.js';
import {
  calcAccuracy,
  closeStatsModal,
  countMistakes,
  countWordsPerMinute,
  hasImproved,
  populate,
  showResultModal,
  showStatsModal,
  waitFor
} from './utils.js';

const stats = new Stats();

let timeLeft = 60;
let charCount = 0;
let previousResult = stats.getLastResult();
let newResult;
let stopTimerInterval = false;

const startTimer = () => {
  document.removeEventListener('keydown', startTimer);
  timer.classList.remove('invisible');

  const interval = setInterval(() => {
    if (stopTimerInterval) {
      stopTimerInterval = false;
      clearInterval(interval);
    }

    timer.innerText = timeLeft;

    // Check if there is no time left. If so, then the typing speed test is finished - calculate the results and show them.
    if (timeLeft === 0) {
      document.removeEventListener('keydown', handleTyping);
      const id = stats.getNextId();
      const mistakes = countMistakes();
      const wpm = countWordsPerMinute(charCount, mistakes);
      const accuracy = calcAccuracy(charCount, mistakes);
      newResult = new Result(id, wpm, accuracy);
      const improved = hasImproved(previousResult, newResult);
      stats.save(newResult);
      showResultModal(newResult, improved);
      clearInterval(interval);
    }

    timeLeft--;
  }, 1000);
};

const handleTyping = (e) => {
  if (e.key === 'Escape') return resetTest();
  else if (e.key === 'Enter') return restartTest();

  const letters = textPrompt.querySelectorAll('.letter');

  letters[charCount].scrollIntoView({ behavior: 'smooth', block: 'center' });

  if (letters[charCount].offsetTop !== 6) caret.style.top = `42px`;

  if (
    letters[charCount].innerText === e.key ||
    (letters[charCount].innerHTML === '&nbsp;' && e.key === ' ')
  ) {
    caret.style.left = `${letters[charCount].offsetLeft + 13}px`;
    letters[charCount].classList.add('text-light-green', 'correct');
    charCount++;
  } else if (e.key === 'Backspace') {
    if (charCount === 0) return;
    caret.style.left = `${letters[charCount].offsetLeft - 13}px`;
    charCount--;
    letters[charCount].classList.remove(
      'text-light-green',
      'text-light-red',
      'bg-light-red',
      'incorrect',
      'correct'
    );
  } else {
    caret.style.left = `${letters[charCount].offsetLeft + 13}px`;
    if (letters[charCount].innerHTML === '&nbsp;') {
      letters[charCount].classList.add('bg-light-red', 'incorrect');
    } else {
      letters[charCount].classList.add('text-light-red', 'incorrect');
    }
    charCount++;
  }
};

const restartTest = async () => {
  timeLeft = 60;
  charCount = 0;
  stopTimerInterval = true;
  timer.classList.add('invisible');
  caret.style.left = '0px';
  caret.style.top = '6px';
  document.querySelectorAll('.incorrect, .correct').forEach((element) => {
    element.classList.remove(
      'text-light-green',
      'text-light-red',
      'correct',
      'incorrect',
      'bg-light-red'
    );
  });

  // wait for 1s, so the timer interval is cleared
  await waitFor(1000);
  stopTimerInterval = false;
  document.addEventListener('keydown', startTimer);
  document.addEventListener('keydown', handleTyping);
};

const resetTest = async () => {
  timeLeft = 60;
  charCount = 0;
  stopTimerInterval = true;
  timer.classList.add('invisible');
  caret.style.left = '0px';
  caret.style.top = '6px';
  textPrompt.innerHTML = '';
  populate();

  // wait for 1s, so the timer interval is cleared
  await waitFor(1000);
  stopTimerInterval = false;
  document.addEventListener('keydown', startTimer);
  document.addEventListener('keydown', handleTyping);
};

populate();

document.addEventListener('keydown', startTimer);
document.addEventListener('keydown', handleTyping);

resultModalCloseBtn.addEventListener('click', () => {
  resultModal.classList.remove('flex');
  resultModal.classList.add('hidden');
  resetTest();
});

viewStatisticsBtn.addEventListener('click', () => {
  showStatsModal(stats.data);
});

statsModalCloseBtn.addEventListener('click', () => {
  closeStatsModal();
});

resetBtn.addEventListener('click', () => {
  resetTest();
});

restartBtn.addEventListener('click', () => {
  restartTest();
});
