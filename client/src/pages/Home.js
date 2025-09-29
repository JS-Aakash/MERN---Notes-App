import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import AppCalendar from '../components/AppCalendar';
import NoteCard from '../components/NoteCard';
import NoteForm from '../components/NoteForm';
import { toast } from 'react-toastify'; // Add toast

const Home = () => {
  const { user, logout } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem('token');
        const dateStr = selectedDate.toISOString().split('T')[0];
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/notes?date=${dateStr}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotes(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
          toast.error('Session expired. Please log in again.');
          logout();
          navigate('/auth');
        } else {
          toast.error('Failed to fetch notes.');
        }
      }
    };

    fetchNotes();
  }, [user, selectedDate, navigate, logout]);

  const handleAddNote = async (noteData) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/notes`,
        noteData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const dateStr = selectedDate.toISOString().split('T')[0];
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/notes?date=${dateStr}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data);
      toast.success('Note added successfully!');
    } catch (err) {
      toast.error('Failed to add note.');
    }
  };

  const handleUpdateNote = async (noteData) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/notes/${noteToEdit._id}`,
        noteData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const dateStr = selectedDate.toISOString().split('T')[0];
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/notes?date=${dateStr}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data);
      toast.success('Note updated successfully!');
    } catch (err) {
      toast.error('Failed to update note.');
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(notes.filter((note) => note._id !== id));
      toast.success('Note deleted successfully!');
    } catch (err) {
      toast.error('Failed to delete note.');
    }
  };

  if (!user) return null;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Notes App</h1>
        <button
          onClick={() => {
            logout();
            toast.info('Logged out successfully.');
          }}
          className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <AppCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </div>
        <div className="md:w-2/3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              Notes for {selectedDate.toLocaleDateString()}
            </h2>
            <button
              onClick={() => {
                setNoteToEdit(null);
                setIsModalOpen(true);
              }}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Add Note
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative">
            {notes.length === 0 ? (
              <p className="text-gray-500">No notes for this date.</p>
            ) : (
              notes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onEdit={(note) => {
                    setNoteToEdit(note);
                    setIsModalOpen(true);
                  }}
                  onDelete={handleDeleteNote}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <NoteForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={noteToEdit ? handleUpdateNote : handleAddNote}
        noteToEdit={noteToEdit}
      />
    </div>
  );
};

export default Home;