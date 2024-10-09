// src/components/ReservationList.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';  // Firebase設定をインポート

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);  // ローディング状態を追加
  const [error, setError] = useState(null);  // エラー状態を追加

  // Firestoreから予約データを取得する関数
  const fetchReservations = async () => {
    setError(null);  // エラーをクリア
    setLoading(true);  // ローディング開始
    try {
      const querySnapshot = await getDocs(collection(db, 'reservations'));
      const reservationData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReservations(reservationData);
    } catch (e) {
      console.error("Error fetching documents: ", e);
      setError('予約データの取得に失敗しました。');
    } finally {
      setLoading(false);  // ローディング終了
    }
  };

  // コンポーネントがマウントされたときにデータを取得する
  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <div>
      <h2>予約リスト</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}  {/* エラーメッセージの表示 */}
      {loading ? (
        <p>読み込み中...</p>  // ローディング表示
      ) : (
        <ul>
          {reservations.length === 0 ? (
            <p>予約データがありません。</p>
          ) : (
            reservations.map((reservation) => (
              <li key={reservation.id}>
                <strong>{reservation.name}</strong> さん - 予約日時: {reservation.reservationDate} {reservation.reservationTime}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default ReservationList;
