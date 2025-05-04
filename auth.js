// auth.js
import { auth } from './firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const logoutBtn = document.getElementById('logout-btn');

export function initAuthHandlers() {
  loginBtn.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    signInWithEmailAndPassword(auth, email, password)
      .catch(err => alert(err.message));
  });

  signupBtn.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    createUserWithEmailAndPassword(auth, email, password)
      .catch(err => alert(err.message));
  });

  logoutBtn.addEventListener('click', () => {
    signOut(auth);
  });

  onAuthStateChanged(auth, user => {
    if (user) {
      document.getElementById('login-section').style.display = 'none';
      document.getElementById('vote-section').style.display = 'block';
      document.getElementById('admin-link').style.display = 'block';
    } else {
      document.getElementById('login-section').style.display = 'block';
      document.getElementById('vote-section').style.display = 'none';
      document.getElementById('admin-link').style.display = 'none';
    }
  });
}
