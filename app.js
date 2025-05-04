// app.js
import { initAuthHandlers } from './auth.js';
import { loadPlayers } from './vote.js';

window.addEventListener('DOMContentLoaded', () => {
  initAuthHandlers();
  loadPlayers();

  // Basic match timer
  const timerEl = document.getElementById('timer');
  let startTime;

  function startTimer() {
    startTime = Date.now();
    setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const minutes = Math.floor(elapsed / 60);
      const seconds = elapsed % 60;
      timerEl.textContent = `Match Time: ${minutes}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
  }

  startTimer();
});
