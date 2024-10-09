// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // ルーティング用のインポート
import ReservationForm from './components/ReservationForm';
import ReservationList from './components/ReservationList';
import Calendar from './components/Calendar'; // カレンダーコンポーネントをインポート

function App() {
  return (
    <Router>
      <div>
        <h1>予約システム</h1>
        <Routes>
          {/* "/" でカレンダーを表示 */}
          <Route path="/" element={<Calendar />} />
          {/* "/reservation" で予約フォームを表示 */}
          <Route path="/reservation" element={<ReservationForm />} />
          {/* "/list" で予約リストを表示 */}
          <Route path="/list" element={<ReservationList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
