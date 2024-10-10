// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Calendar from './components/Calendar';
import ReservationForm from './components/ReservationForm';

function App() {
  return (
    <Router>
      <div>
        <h1>予約システム</h1>
        <Routes>
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/reservation" element={<ReservationForm />} />
          <Route path="/" element={<Calendar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
