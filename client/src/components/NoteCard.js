import React, { useRef } from 'react';
import Draggable from 'react-draggable';

const NoteCard = ({ note, onEdit, onDelete }) => {
    const nodeRef = useRef(null);

    // Define recurrence colors with a default fallback
    const recurrenceColors = {
        'one-time': 'bg-yellow-200',
        daily: 'bg-blue-200',
        weekly: 'bg-green-200',
        monthly: 'bg-pink-200',
        default: 'bg-gray-200', // Fallback for invalid recurrence
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
                className={`p-4 rounded-lg shadow-md ${colorClass} transform rotate-1 hover:rotate-0 transition-transform min-w-[200px] max-w-[250px] cursor-move`}
            >
                <h3 className="font-bold">{note.title || 'Untitled'}</h3>
                <p className="mt-2">{note.content}</p>
                <p className="text-sm text-gray-600 mt-2">
                    {new Date(note.startDate).toLocaleDateString()} ({note.recurrence})
                </p>
                <div className="mt-4 flex justify-end space-x-2">
                    <button
                        onClick={() => onEdit(note)}
                        className="text-blue-500 hover:underline"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(note._id)}
                        className="text-red-500 hover:underline"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </Draggable>
    );
};

export default NoteCard;