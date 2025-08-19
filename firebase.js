import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArzAr0n0NKUorUORhpXZ_7N7ibEcoyPlE",
  authDomain: "chat-b5c00.firebaseapp.com",
  projectId: "chat-b5c00",
  messagingSenderId: "36641391992",
  appId: "1:36641391992:web:16e97062f06e76fd80f48d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore with forced long polling (no WebSockets)
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true, 
});

export { app, db };