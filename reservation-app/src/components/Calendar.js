import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Calendar.css"; // スタイルを別ファイルに分けます

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate(); // 予約フォームへの遷移に使います

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

  // サンプル予約状況データをすべて「○」に変更
  const reservationData = {
    "2024-10-08": Array(20).fill("○"), // 20個の○をすべての日付に設定
    "2024-10-09": Array(20).fill("○"),
    "2024-10-10": Array(20).fill("○"),
    "2024-10-11": Array(20).fill("○"),
    "2024-10-12": Array(20).fill("○"),
    "2024-10-13": Array(20).fill("○"),
    "2024-10-14": Array(20).fill("○"),
  };

  const handleCellClick = (date, time) => {
    setSelectedDate(`${date} ${time}`);
    navigate(`/reservation?date=${date}&time=${time}`); // 予約フォームへ遷移
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
                const status = reservationData[dateKey]?.[timeSlots.indexOf(time)] || "×"; // 予約状況がなければ "×"
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
