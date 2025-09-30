import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

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
    <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <CalendarIcon className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Calendar</h3>
        </div>
        <div className="flex items-center space-x-1 text-sm text-gray-600">
          <span className="inline-flex items-center space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Has notes</span>
          </span>
        </div>
      </div>
      
      <div className="calendar-container">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          className="custom-calendar w-full border-0"
          tileContent={tileContent}
          prevLabel={<ChevronLeftIcon className="h-4 w-4" />}
          nextLabel={<ChevronRightIcon className="h-4 w-4" />}
          prev2Label={null}
          next2Label={null}
        />
      </div>
      
      <style jsx>{`
        .custom-calendar {
          background: transparent;
          border: none;
          border-radius: 0;
          font-family: inherit;
        }
        
        .custom-calendar .react-calendar__navigation {
          display: flex;
          height: 44px;
          margin-bottom: 1em;
          background: transparent;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .custom-calendar .react-calendar__navigation button {
          color: #374151;
          font-weight: 600;
          font-size: 14px;
          background: transparent;
          border: none;
          padding: 0.5em 1em;
          transition: all 0.2s ease;
        }
        
        .custom-calendar .react-calendar__navigation button:hover {
          background-color: #f3f4f6;
          border-radius: 6px;
        }
        
        .custom-calendar .react-calendar__navigation button:disabled {
          background-color: transparent;
          color: #d1d5db;
        }
        
        .custom-calendar .react-calendar__month-view__weekdays {
          text-align: center;
          text-transform: uppercase;
          font-weight: 600;
          font-size: 12px;
          color: #6b7280;
          padding: 0.5em 0;
        }
        
        .custom-calendar .react-calendar__month-view__weekdays__weekday {
          padding: 0.5em 0;
        }
        
        .custom-calendar .react-calendar__month-view__days__day {
          position: relative;
          padding: 0.5em;
          border-radius: 8px;
          transition: all 0.2s ease;
          color: #374151;
          font-size: 14px;
        }
        
        .custom-calendar .react-calendar__month-view__days__day:hover {
          background-color: #f3f4f6;
        }
        
        .custom-calendar .react-calendar__month-view__days__day--weekend {
          color: #ef4444;
        }
        
        .custom-calendar .react-calendar__month-view__days__day--neighboringMonth {
          color: #d1d5db;
        }
        
        .custom-calendar .react-calendar__month-view__days__day--active {
          background-color: #3b82f6 !important;
          color: white !important;
          font-weight: 600;
        }
        
        .custom-calendar .react-calendar__month-view__days__day--active:hover {
          background-color: #2563eb !important;
        }
        
        .custom-calendar .react-calendar__tile {
          max-width: 100%;
          padding: 0;
        }
        
        .custom-calendar .react-calendar__tile:enabled:hover,
        .custom-calendar .react-calendar__tile:enabled:focus {
          background-color: #f3f4f6;
          border-radius: 8px;
        }
        
        .custom-calendar .react-calendar__tile--now {
          background-color: #dbeafe;
          border-radius: 8px;
          font-weight: 600;
        }
        
        .custom-calendar .react-calendar__tile--now:hover {
          background-color: #bfdbfe;
        }
        
        .custom-calendar .react-calendar__tile--hasActive {
          background-color: #3b82f6;
          color: white;
          border-radius: 8px;
        }
        
        .custom-calendar .react-calendar__tile--hasActive:hover {
          background-color: #2563eb;
        }
        
        .custom-calendar .react-calendar__month-view__days__day--neighboringMonth {
          color: #d1d5db;
        }
        
        .custom-calendar .react-calendar__month-view__days__day--neighboringMonth:hover {
          background-color: transparent;
        }
      `}</style>
    </div>
  );
};

export default AppCalendar;