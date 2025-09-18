import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID
} from '@env';

// Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  storageBucket: `${FIREBASE_PROJECT_ID}.firebasestorage.app`
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore with forced long polling (no WebSockets)
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true, 
});

// Initialize Firebase Storage
const storage = getStorage(app);

export { app, db, storage };