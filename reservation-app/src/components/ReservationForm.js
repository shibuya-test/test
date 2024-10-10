// src/components/ReservationForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigateフックをインポート
import { db } from '../firebase'; // Firestoreをインポート
import { collection, addDoc } from 'firebase/firestore';
import './ReservationForm.css';

const ReservationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');  // 予約日
  const [time, setTime] = useState('');  // 予約時間
  const navigate = useNavigate(); // navigate関数を取得

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Firestoreに予約情報を保存
      await addDoc(collection(db, 'reservations'), {
        name,
        email,
        date,
        time,
      });

      // 予約情報を確認ページに渡しつつ遷移する
      navigate('/confirmation', { state: { name, email, date, time } });
    } catch (error) {
      console.error('予約の保存に失敗しました:', error);
      alert('予約の保存に失敗しました。もう一度お試しください。');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>名前:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)} // 変更を反映
        required
      />

      <label>メールアドレス:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} // 変更を反映
        required
      />

      <label>予約日:</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)} // 変更を反映
        required
      />

      <label>予約時間:</label>
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)} // 変更を反映
        required
      />

      <button type="submit">予約する</button>
    </form>
  );
};

export default ReservationForm;
