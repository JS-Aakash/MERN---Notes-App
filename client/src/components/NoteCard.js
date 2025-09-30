import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { StickyNoteIcon, EditIcon, TrashIcon, CalendarIcon } from 'lucide-react';

const NoteCard = ({ note, onEdit, onDelete }) => {
    const nodeRef = useRef(null);

    const recurrenceColors = {
        'one-time': 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', // Yellow sticky note
        'daily': 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', // Blue sticky note
        'weekly': 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)', // Green sticky note
        'monthly': 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)', // Pink sticky note
        'default': 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)', // Gray fallback
    };

    // Define text colors for contrast
    const textColors = {
        'one-time': 'text-gray-900',
        'daily': 'text-gray-900',
        'weekly': 'text-gray-900',
        'monthly': 'text-gray-900',
        default: 'text-gray-900',
    };

    // Return null if note is invalid
    if (!note || !note.recurrence || !note.content || !note.startDate) {
        console.warn('Invalid note data:', note);
        return null;
    }

    // Get color class, fallback to default if recurrence is invalid
    const colorClass = recurrenceColors[note.recurrence] || recurrenceColors.default;

     return (
        <Draggable nodeRef={nodeRef}>
            <div
                ref={nodeRef}
                className={`group relative rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-move transform hover:-translate-y-1 hover:rotate-1 min-w-[280px] max-w-[320px] overflow-hidden`}
                style={{
                    background: recurrenceColors[note.recurrence] || recurrenceColors.default,
                }}
            >
                {/* Card Header */}
                <div className="p-4 pb-2">
                    <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                            <StickyNoteIcon className="h-5 w-5 text-gray-700" />
                            <h3 className="font-bold text-gray-900 text-lg truncate">
                                {note.title || 'Untitled Note'}
                            </h3>
                        </div>
                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit(note);
                                }}
                                className="p-1.5 hover:bg-white/50 rounded-lg transition-colors duration-200"
                                title="Edit note"
                            >
                                <EditIcon className="h-4 w-4 text-gray-700" />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(note._id);
                                }}
                                className="p-1.5 hover:bg-white/50 rounded-lg transition-colors duration-200"
                                title="Delete note"
                            >
                                <TrashIcon className="h-4 w-4 text-red-600" />
                            </button>
                        </div>
                    </div>
                    
                    {/* Recurrence Badge */}
                    <div className="inline-flex items-center space-x-1 px-2 py-1 bg-white/80 rounded-full text-xs font-medium text-gray-700 mb-3">
                        <span className="text-sm">
                            {note.recurrence === 'one-time' && '📝'}
                            {note.recurrence === 'daily' && '📅'}
                            {note.recurrence === 'weekly' && '📆'}
                            {note.recurrence === 'monthly' && '🗓️'}
                        </span>
                        <span className="capitalize">{note.recurrence}</span>
                    </div>
                </div>

                {/* Card Content */}
                <div className="px-4 pb-3">
                    <p className="text-gray-800 leading-relaxed mb-3 line-clamp-4 font-medium">
                        {note.content}
                    </p>
                    
                    {/* Date Info */}
                    <div className="flex items-center space-x-2 text-xs text-gray-700 bg-white/90 rounded-lg px-2 py-1.5">
                        <CalendarIcon className="h-3 w-3" />
                        <span>{new Date(note.startDate).toLocaleDateString()}</span>
                    </div>
                </div>

                {/* Card Footer */}
                <div className="px-4 py-3 bg-white/30 border-t border-white/50">
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-700 font-medium">
                            Drag to move
                        </span>
                        <div className="flex space-x-2">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit(note);
                                }}
                                className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
                            >
                                Edit
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(note._id);
                                }}
                                className="text-xs font-medium text-red-600 hover:text-red-700 transition-colors duration-200"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg" />
            </div>
        </Draggable>
    );
};

export default NoteCard;