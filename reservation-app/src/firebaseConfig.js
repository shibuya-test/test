// Firebase SDKのインポート（Firestore用）
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
  measurementId: "G-XJJJ6RCXLF"  // Firebase Analyticsを使う場合のみ必要
};

// Firebaseアプリの初期化
const app = initializeApp(firebaseConfig);

// Firestoreの初期化
const db = getFirestore(app);

export { db };
