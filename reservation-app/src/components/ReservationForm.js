// ReservationForm.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // ページ遷移用
import { db } from '../firebase'; // Firestoreのデータベース
import './ReservationForm.css'; // CSSを適用

const ReservationForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { date, time } = location.state; // カレンダーから選択された日時を取得

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Firestoreに予約情報を保存
    try {
      await db.collection('reservations').add({
        name,
        email,
        date,
        time,
      });

      // Firestoreに保存後、予約確認ページに遷移
      navigate('/confirmation', { state: { name, email, date, time } });
    } catch (error) {
      alert('予約の保存に失敗しました。もう一度お試しください。');
    }
  };

  return (
    <div>
      <h1>予約フォーム</h1>
      <form onSubmit={handleSubmit}>
        <label>名前:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>メールアドレス:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>予約日: {date}</label>
        <label>予約時間: {time}</label>
        <button type="submit">予約する</button>
      </form>
    </div>
  );
};

export default ReservationForm;
