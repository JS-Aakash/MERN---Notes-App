const Note = require('../models/Note');

const getNotes = async (req, res) => {
    const userId = req.user.id;
    const { date } = req.query;

    try {
        let notes = await Note.find({ user: userId });

        if (date) {
            const queryDate = new Date(date);
            queryDate.setHours(0, 0, 0, 0);

            notes = notes.filter(note => {
                const start = new Date(note.startDate);
                start.setHours(0, 0, 0, 0);
                start.setDate(start.getDate() - 1); // subtract 1 day

                if (start > queryDate) return false;

                switch (note.recurrence) {
                    case 'one-time':
                        return start.getTime() === queryDate.getTime();
                    case 'daily':
                        return true;
                    case 'weekly':
                        return queryDate.getDay() === start.getDay();
                    case 'monthly':
                        return queryDate.getDate() === start.getDate();
                    default:
                        return false;
                }
            });
        }

        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const createNote = async (req, res) => {
  const { title, content, startDate, recurrence } = req.body;
  try {
    const note = await Note.create({
      user: req.user.id,
      title,
      content,
      startDate: new Date(startDate),
      recurrence,
    });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateNote = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findById(id);
    if (!note || note.user.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Note not found' });
    }

    const updatedNote = await Note.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findById(id);
    if (!note || note.user.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Note not found' });
    }

    await Note.findByIdAndDelete(id);
    res.json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getNotes, createNote, updateNote, deleteNote };