// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC1tuJHvGKHeWqsdYM9pgbtyMWReBAWW5Q",
  authDomain: "ware-lions---stripes-ppom.firebaseapp.com",
  projectId: "ware-lions---stripes-ppom",
  storageBucket: "ware-lions---stripes-ppom.firebasestorage.app",
  messagingSenderId: "464224024213",
  appId: "1:464224024213:web:e4e31c579cbab4fa8f0d9c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
