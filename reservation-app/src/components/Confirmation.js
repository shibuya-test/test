// Confirmation.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const Confirmation = () => {
  const location = useLocation();
  const { name, email, date, time } = location.state;

  return (
    <div>
      <h1>予約が完了しました</h1>
      <p>名前: {name}</p>
      <p>メールアドレス: {email}</p>
      <p>予約日: {date}</p>
      <p>予約時間: {time}</p>
    </div>
  );
};

export default Confirmation;
