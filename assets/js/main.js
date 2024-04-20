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
import {
  calcAccuracy,
  closeStatsModal,
  countMistakes,
  countWordsPerMinute,
  hasImproved,
  populate,
  setTimerValue,
  showResultModal,
  showStatsModal
} from './utils.js';
import { TEST_TIME } from './constants.js';

const stats = new Stats();

let timeLeft = TEST_TIME;
let charCount = 0;
let interval;

const startTimer = () => {
  document.removeEventListener('keydown', startTimer);
  setTimerValue(timeLeft);

  interval = setInterval(() => {
    if (timeLeft === 0) {
      document.removeEventListener('keydown', handleTyping);

      const id = stats.getNextId();
      const mistakes = countMistakes();
      const wpm = countWordsPerMinute(charCount, mistakes);
      const accuracy = calcAccuracy(charCount, mistakes);
      const result = { id: id, wpm: wpm, accuracy: accuracy };
      const improved = hasImproved(stats.getLastResult(), result);

      stats.save(result);
      showResultModal(result, improved);
      clearInterval(interval);
    }

    timeLeft--;
    setTimerValue(timeLeft);
  }, 1000);

  timer.classList.remove('invisible');
};

const handleTyping = (event) => {
  if (event.key === 'Escape') {
    return resetTest();
  }

  if (event.key === 'Enter') {
    return restartTest();
  }

  const letters = textPrompt.querySelectorAll('.letter');

  if (
    letters[charCount].innerText === event.key ||
    (letters[charCount].innerHTML === '&nbsp;' && event.key === ' ')
  ) {
    letters[charCount].classList.add('text-light-green', 'correct');
    charCount++;
  } else if (event.key === 'Backspace') {
    if (charCount === 0) {
      return;
    }

    charCount--;
    letters[charCount].classList.remove(
      'text-light-green',
      'text-light-red',
      'bg-light-red',
      'incorrect',
      'correct'
    );
  } else {
    if (letters[charCount].innerHTML === '&nbsp;') {
      letters[charCount].classList.add('bg-light-red', 'incorrect');
    } else {
      letters[charCount].classList.add('text-light-red', 'incorrect');
    }
    charCount++;
  }

  caret.style.left = `${letters[charCount].offsetLeft}px`;

  if (letters[charCount].offsetTop !== 6) {
    caret.style.top = `42px`;
  } else {
    caret.style.top = `${letters[charCount].offsetTop}px`;
  }

  letters[charCount].scrollIntoView({ block: 'center' });
};

const restartTest = async () => {
  clearInterval(interval);

  timeLeft = TEST_TIME;
  charCount = 0;

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
  document.addEventListener('keydown', startTimer);
  document.addEventListener('keydown', handleTyping);
};

const resetTest = async () => {
  clearInterval(interval);

  timeLeft = TEST_TIME;
  charCount = 0;

  populate();

  timer.classList.add('invisible');
  caret.style.left = '0px';
  caret.style.top = '6px';
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
