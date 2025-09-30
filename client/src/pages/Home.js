import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import AppCalendar from '../components/AppCalendar';
import NoteCard from '../components/NoteCard';
import NoteForm from '../components/NoteForm';
import { toast } from 'react-toastify';
import { StickyNoteIcon, LogOutIcon, PlusIcon, CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <StickyNoteIcon className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Notes App</h1>
            </div>
            <button
              onClick={() => {
                logout();
                toast.info('Logged out successfully.');
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 shadow-sm"
            >
              <LogOutIcon className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Calendar */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <div className="flex items-center space-x-2 mb-4">
                <CalendarIcon className="h-5 w-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">Calendar</h2>
              </div>
              <AppCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:w-2/3">
            {/* Date Header and Add Button */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Notes for {format(selectedDate, 'MMMM d, yyyy')}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {notes.length} {notes.length === 1 ? 'note' : 'notes'} for this date
                  </p>
                </div>
                <button
                  onClick={() => {
                    setNoteToEdit(null);
                    setIsModalOpen(true);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
                >
                  <PlusIcon className="h-4 w-4" />
                  <span>Add Note</span>
                </button>
              </div>
            </div>

            {/* Notes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {notes.length === 0 ? (
                <div className="col-span-full">
                  <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                    <StickyNoteIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No notes for this date</h3>
                    <p className="text-gray-600 mb-6">Create your first note by clicking the "Add Note" button above.</p>
                    <button
                      onClick={() => {
                        setNoteToEdit(null);
                        setIsModalOpen(true);
                      }}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm mx-auto"
                    >
                      <PlusIcon className="h-4 w-4" />
                      <span>Add Your First Note</span>
                    </button>
                  </div>
                </div>
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
      </main>

      {/* Note Form Modal */}
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