// src/components/ReservationForm.js
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';  // Firebase設定をインポート

const ReservationForm = () => {
  // フォームの状態を管理
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [reservationDate, setReservationDate] = useState('');
  const [reservationTime, setReservationTime] = useState('');
  const [loading, setLoading] = useState(false);  // ローディング状態を追加
  const [error, setError] = useState(null);  // エラー状態を追加

  // 予約データをFirestoreに送信する関数
  const handleSubmit = async (e) => {
    e.preventDefault();  // フォームのデフォルト送信を無効化
    setLoading(true);  // ローディング開始
    setError(null);  // エラーをクリア

    try {
      // Firestoreの "reservations" コレクションにドキュメントを追加
      const docRef = await addDoc(collection(db, 'reservations'), {
        name: name,
        email: email,
        reservationDate: reservationDate,
        reservationTime: reservationTime,
      });
      console.log("Document written with ID: ", docRef.id);
      alert('予約が完了しました！');
      
      // フォームのリセット
      setName('');
      setEmail('');
      setReservationDate('');
      setReservationTime('');
    } catch (e) {
      console.error("Error adding document: ", e);
      setError('予約に失敗しました。再度お試しください。');
    } finally {
      setLoading(false);  // ローディング終了
    }
  };

  return (
    <div>
      <h2>予約フォーム</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}  {/* エラーメッセージの表示 */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>名前:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            disabled={loading}  // ローディング中は入力を無効化
          />
        </div>
        <div>
          <label>メールアドレス:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            disabled={loading}
          />
        </div>
        <div>
          <label>予約日:</label>
          <input 
            type="date" 
            value={reservationDate} 
            onChange={(e) => setReservationDate(e.target.value)} 
            required 
            disabled={loading}
          />
        </div>
        <div>
          <label>予約時間:</label>
          <input 
            type="time" 
            value={reservationTime} 
            onChange={(e) => setReservationTime(e.target.value)} 
            required 
            disabled={loading}
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
