// admin.js
import { db } from './firebase.js';
import { collection, addDoc, getDocs, doc, deleteDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const playerList = document.getElementById('player-list');
const newPlayerInput = document.getElementById('new-player');
const addPlayerBtn = document.getElementById('add-player');
const officialMotmSelect = document.getElementById('official-motm');

async function loadPlayers() {
  const playersSnap = await getDocs(collection(db, 'players'));
  playerList.innerHTML = '';
  officialMotmSelect.innerHTML = '';
  playersSnap.forEach(docSnap => {
    const li = document.createElement('li');
    li.className = 'flex justify-between items-center p-2 border-b';
    li.textContent = docSnap.data().name;
    const del = document.createElement('button');
    del.textContent = 'Remove';
    del.className = 'text-red-500 hover:text-red-700 ml-4 text-sm';
    del.onclick = async () => {
      await deleteDoc(doc(db, 'players', docSnap.id));
      loadPlayers();
    };
    li.appendChild(del);
    playerList.appendChild(li);

    const opt = document.createElement('option');
    opt.value = docSnap.id;
    opt.textContent = docSnap.data().name;
    officialMotmSelect.appendChild(opt);
  });
}

addPlayerBtn.addEventListener('click', async () => {
  const name = newPlayerInput.value.trim();
  if (!name) return;
  await addDoc(collection(db, 'players'), { name });
  newPlayerInput.value = '';
  loadPlayers();
});

// Match info
const saveMatchBtn = document.getElementById('save-match-info');
saveMatchBtn.addEventListener('click', async () => {
  const name = document.getElementById('opponent-name').value;
  const location = document.getElementById('opponent-location').value;
  await setDoc(doc(db, 'matchInfo', 'current'), { name, location });
  alert('Match info saved.');
});

// Official MoTM
const setMotmBtn = document.getElementById('set-motm');
setMotmBtn.addEventListener('click', async () => {
  const playerId = officialMotmSelect.value;
  await setDoc(doc(db, 'motm', 'official'), { playerId });
  alert('Official Man of the Match saved.');
});

loadPlayers();
