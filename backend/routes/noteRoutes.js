const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { createNote, getNotes, updateNote, deleteNote } = require('../controllers/noteController');

const router = express.Router();

router.use(protect);

router.route('/').get(getNotes);
router.route('/').post(createNote);
router.route('/:id').put(updateNote);
router.route('/:id').delete(deleteNote);
module.exports = router;