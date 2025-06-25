// routes/questions.js - Manage quiz questions
const express = require('express');
const db = require('../db');
const router = express.Router();

// Get all questions (optionally by subject or exam id)
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM questions';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ msg: 'Failed to fetch questions.', err });
    res.json(results);
  });
});

// Get questions by exam id (or subject id)
router.get('/:examId', (req, res) => {
  const examId = req.params.examId;
  const sql = 'SELECT * FROM questions WHERE exam_id = ?';
  db.query(sql, [examId], (err, results) => {
    if (err) return res.status(500).json({ msg: 'Failed to fetch questions.', err });
    res.json(results);
  });
});

// Admin adds a new question
router.post('/add', (req, res) => {
  const { question, option_a, option_b, option_c, option_d, correct_answer, exam_id } = req.body;
  if (!question || !option_a || !option_b || !option_c || !option_d || !correct_answer || !exam_id) {
    return res.status(400).json({ msg: 'All fields are required.' });
  }

  const sql = 'INSERT INTO questions (question, option_a, option_b, option_c, option_d, correct_answer, exam_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [question, option_a, option_b, option_c, option_d, correct_answer, exam_id];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ msg: 'Error adding question.', err });
    res.status(201).json({ msg: 'Question added successfully.' });
  });
});

module.exports = router;
