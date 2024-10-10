// src/components/ReservationForm.js
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';  // Firebase設定をインポート
import { useNavigate, useLocation } from 'react-router-dom';

const ReservationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  // URLから予約日と時間を取得
  const queryParams = new URLSearchParams(location.search);
  const reservationDate = queryParams.get('date') || '';
  const reservationTime = queryParams.get('time') || '';

  // 予約データをFirestoreに送信する関数
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Firestoreの "reservations" コレクションにドキュメントを追加
      await addDoc(collection(db, 'reservations'), {
        name,
        email,
        reservationDate,
        reservationTime
      });
      alert('予約が完了しました！');

      // フォームのリセット
      setName('');
      setEmail('');

      // カレンダー画面に遷移
      navigate('/calendar');
    } catch (e) {
      console.error("Error adding document: ", e);
      setError('予約に失敗しました。再度お試しください。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>予約フォーム</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>名前:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>メールアドレス:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>予約日:</label>
          <input 
            type="date" 
            value={reservationDate} 
            disabled
          />
        </div>
        <div>
          <label>予約時間:</label>
          <input 
            type="time" 
            value={reservationTime} 
            disabled
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? '送信中...' : '予約する'}
        </button>
      </form>
    </div>
  );
};

export default ReservationForm;
