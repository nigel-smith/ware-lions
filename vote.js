// vote.js
import { db, auth } from './firebase.js';
import { collection, doc, setDoc, getDoc, deleteDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const playerSelect = document.getElementById('player-select');
const voteBtn = document.getElementById('vote-btn');
const removeBtn = document.getElementById('remove-vote-btn');

async function loadPlayers() {
  const playersSnap = await getDocs(collection(db, 'players'));
  playerSelect.innerHTML = '';
  playersSnap.forEach(doc => {
    const opt = document.createElement('option');
    opt.value = doc.id;
    opt.textContent = doc.data().name;
    playerSelect.appendChild(opt);
  });
}

voteBtn.addEventListener('click', async () => {
  const playerId = playerSelect.value;
  const userId = auth.currentUser.uid;
  const voteRef = doc(db, 'votes', `${userId}`);
  await setDoc(voteRef, {
    playerId,
    matchId: 'current', // Replace with actual match ID
    timestamp: Date.now()
  });
  alert('Vote submitted!');
});

removeBtn.addEventListener('click', async () => {
  const userId = auth.currentUser.uid;
  const voteRef = doc(db, 'votes', `${userId}`);
  await deleteDoc(voteRef);
  alert('Vote removed.');
});

export { loadPlayers };
