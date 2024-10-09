// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebaseの設定情報
const firebaseConfig = {
  apiKey: "AIzaSyBEhepfXcFjJ7YI18kv56_NTKCZc5lSkik",
  authDomain: "kensyuu-project.firebaseapp.com",
  projectId: "kensyuu-project",
  storageBucket: "kensyuu-project.appspot.com",
  messagingSenderId: "805435556353",
  appId: "1:805435556353:web:7d0641c7c00f190a75f600",
  measurementId: "G-XJJJ6RCXLF"
};

// Firebaseの初期化
const firebaseApp = initializeApp(firebaseConfig);

// Firestoreの初期化
const db = getFirestore(firebaseApp);

export { db };
