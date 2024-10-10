// src/components/Calendar.js
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import "./Calendar.css";  // スタイル

const Calendar = () => {
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();
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
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"
  ];

  // Firestoreから予約データを取得
  useEffect(() => {
    const fetchReservations = async () => {
      const querySnapshot = await getDocs(collection(db, 'reservations'));
      const data = querySnapshot.docs.map((doc) => doc.data());
      setReservations(data);
    };
    fetchReservations();
  }, []);

  // 予約済みか確認する関数
  const isReserved = (date, time) => {
    return reservations.some(
      (res) => res.reservationDate === date && res.reservationTime === time
    );
  };

  // 日付と時間を選択して予約フォームに遷移
  const handleCellClick = (date, time) => {
    navigate(`/reservation?date=${date}&time=${time}`);
  };

  return (
    <div>
      <h1>予約カレンダー</h1>
      <table className="calendar-table">
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
                const status = isReserved(dateKey, time) ? "×" : "○";
                return (
                  <td
                    key={index}
                    className={status === "○" ? "available" : "unavailable"}
                    onClick={status === "○" ? () => handleCellClick(dateKey, time) : null}
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
