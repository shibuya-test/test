// src/components/Calendar.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ページ遷移用

const Calendar = () => {
  const navigate = useNavigate();

  // カレンダーの時間帯を選択する関数
  const handleTimeSelect = (date, time) => {
    navigate('/reservation-form', { state: { date, time } });
  };

  const daysOfWeek = [
    { day: "8 (火)", date: "2024-10-08" },
    { day: "9 (水)", date: "2024-10-09" },
    { day: "10 (木)", date: "2024-10-10" },
    { day: "11 (金)", date: "2024-10-11" },
    { day: "12 (土)", date: "2024-10-12" },
    { day: "13 (日)", date: "2024-10-13" },
    { day: "14 (月)", date: "2024-10-14" },
  ];

  const timeSlots = [
    "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"
  ];

  // 予約済みかどうかをランダムで決める（○を多めに）
  const getRandomStatus = () => Math.random() < 0.7 ? "○" : "×";  // 70%が○になるように設定

  return (
    <div>
      <h1>予約カレンダー</h1>
      <table>
        <thead>
          <tr>
            <th>時間</th>
            {daysOfWeek.map((dayObj, index) => (
              <th key={index}>{dayObj.day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((time) => (
            <tr key={time}>
              <td>{time}</td>
              {daysOfWeek.map((dayObj, index) => {
                const dateKey = dayObj.date;
                const status = getRandomStatus(); // ランダムに○か×を設定
                return (
                  <td
                    key={index}
                    className={status === "○" ? "available" : "unavailable"}
                    onClick={status === "○" ? () => handleTimeSelect(dateKey, time) : null}
                  >
                    {status}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
