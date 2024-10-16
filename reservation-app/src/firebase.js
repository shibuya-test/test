import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// Firebaseの設定
const firebaseConfig = {
  apiKey: "AIzaSyBEhepfXcFjJ7YI18kv56_NTKCZc5lsKik",
  authDomain: "kensyuu-project.firebaseapp.com",
  projectId: "kensyuu-project",
  storageBucket: "kensyuu-project.appspot.com",
  messagingSenderId: "805435556353",
  appId: "1:805435556353:web:7d0641c7c00f190a75f600",
  measurementId: "G-XJJJ6RCXLF"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export { db };
