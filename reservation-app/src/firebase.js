// src/firebase.js
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Firebaseアプリが初期化されていない場合のみ初期化
const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Firestoreのインスタンスを取得
const db = getFirestore(firebaseApp);

export { db };
