import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { StickyNoteIcon, CalendarIcon, RepeatIcon, XIcon } from 'lucide-react';

const NoteForm = ({ isOpen, onClose, onSubmit, noteToEdit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [startDate, setStartDate] = useState('');
  const [recurrence, setRecurrence] = useState('one-time');

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
      setStartDate(new Date(noteToEdit.startDate).toISOString().split('T')[0]);
      setRecurrence(noteToEdit.recurrence);
    } else {
      setTitle('');
      setContent('');
      setStartDate('');
      setRecurrence('one-time');
    }
  }, [noteToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit({ title, content, startDate: new Date(startDate), recurrence });
      toast.success(noteToEdit ? 'Note updated successfully!' : 'Note added successfully!');
      onClose();
    } catch (err) {
      toast.error('Failed to save note. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-50 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className={`fixed inset-0 z-50 overflow-y-auto ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } transition-opacity duration-300`}
      >
        <div className="flex min-h-full items-center justify-center p-4">
          <div 
            className={`relative bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 transform transition-all duration-300 ${
              isOpen ? 'scale-100' : 'scale-95'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <StickyNoteIcon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {noteToEdit ? 'Edit Note' : 'Add New Note'}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {noteToEdit ? 'Update your note details' : 'Create a new note'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <XIcon className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Title Field */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <StickyNoteIcon className="h-4 w-4" />
                  <span>Title (Optional)</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 text-gray-900 bg-white"
                  placeholder="Enter a title for your note..."
                />
              </div>

              {/* Content Field */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <StickyNoteIcon className="h-4 w-4" />
                  <span>Content *</span>
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 text-gray-900 bg-white resize-none"
                  rows={4}
                  required
                  placeholder="Write your note content here..."
                />
              </div>

              {/* Date Field */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <CalendarIcon className="h-4 w-4" />
                  <span>Start Date *</span>
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 bg-white"
                  required
                />
              </div>

              {/* Recurrence Field */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <RepeatIcon className="h-4 w-4" />
                  <span>Recurrence *</span>
                </label>
                <select
                  value={recurrence}
                  onChange={(e) => setRecurrence(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 bg-white"
                  required
                >
                  <option value="one-time">📝 One-Time</option>
                  <option value="daily">📅 Daily</option>
                  <option value="weekly">📆 Weekly</option>
                  <option value="monthly">🗓️ Monthly</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm"
                >
                  {noteToEdit ? 'Update Note' : 'Add Note'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteForm;