// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBJCjmvPsEaSpTOl9kE2ioeXYbxdUG6Xo8",
  authDomain: "noctify-43111.firebaseapp.com",
  projectId: "noctify-43111",
  storageBucket: "noctify-43111.firebasestorage.app",
  messagingSenderId: "264347647237",
  appId: "1:264347647237:web:bf95a8748fc717f9e04b6c"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
