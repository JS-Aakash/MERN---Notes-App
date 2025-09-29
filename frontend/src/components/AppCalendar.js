import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

const AppCalendar = ({ selectedDate, setSelectedDate }) => {
  const [markedDates, setMarkedDates] = useState([]);

  useEffect(() => {
    const fetchNotesForMonth = async () => {
      try {
        const token = localStorage.getItem('token');
        const startOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
        const endOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
        const dates = [];
        
        // Generate all dates in the current month
        for (let d = new Date(startOfMonth); d <= endOfMonth; d.setDate(d.getDate() + 1)) {
          const dateStr = d.toISOString().split('T')[0];
          const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/notes?date=${dateStr}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.data.length > 0) {
            dates.push(new Date(dateStr));
          }
        }
        setMarkedDates(dates);
      } catch (err) {
        console.error('Error fetching notes for calendar:', err);
      }
    };

    if (localStorage.getItem('token')) {
      fetchNotesForMonth();
    }
  }, [selectedDate]);

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const isMarked = markedDates.some(
        (markedDate) => markedDate.toDateString() === date.toDateString()
      );
      return isMarked ? <div className="h-1 w-1 bg-blue-500 rounded-full mx-auto mt-1"></div> : null;
    }
    return null;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        className="w-full"
        tileContent={tileContent}
      />
    </div>
  );
};

export default AppCalendar;