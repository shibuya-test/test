import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';  // Firebase設定をインポート

const ReservationForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [reservationDate, setReservationDate] = useState(queryParams.get('date') || '');
  const [reservationTime, setReservationTime] = useState(queryParams.get('time') || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await addDoc(collection(db, 'reservations'), {
        name,
        email,
        reservationDate,
        reservationTime,
      });
      alert('予約が完了しました！');
      navigate('/'); // 予約完了後にカレンダーに戻る
    } catch (e) {
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
            onChange={(e) => setReservationDate(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>予約時間:</label>
          <input 
            type="time" 
            value={reservationTime} 
            onChange={(e) => setReservationTime(e.target.value)} 
            required 
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
