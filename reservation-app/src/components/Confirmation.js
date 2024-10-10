import React from 'react';
import { useLocation } from 'react-router-dom'; // 予約情報を受け取るためにuseLocationを使用

const Confirmation = () => {
  const location = useLocation(); // location.state から予約情報を取得
  const { name, email, date, time } = location.state || {}; // デフォルトで空オブジェクトを使う

  if (!name || !email || !date || !time) {
    return <p>予約情報がありません。</p>;
  }

  return (
    <div>
      <h2>予約が完了しました！</h2>
      <p>名前: {name}</p>
      <p>メールアドレス: {email}</p>
      <p>予約日: {date}</p>
      <p>予約時間: {time}</p>
    </div>
  );
};

export default Confirmation;
