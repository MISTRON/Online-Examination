// routes/results.js - Handle quiz results
const express = require('express');
const db = require('../db');
const router = express.Router();

// Submit a result
router.post('/submit', (req, res) => {
  const { user_id, exam_id, score, total } = req.body;
  if (!user_id || !exam_id || score === undefined || total === undefined) {
    return res.status(400).json({ msg: 'All fields are required.' });
  }

  const sql = 'INSERT INTO results (user_id, exam_id, score, total) VALUES (?, ?, ?, ?)';
  db.query(sql, [user_id, exam_id, score, total], (err, result) => {
    if (err) return res.status(500).json({ msg: 'Failed to submit result.', err });
    res.status(201).json({ msg: 'Result submitted successfully.' });
  });
});

// Get results by user ID
router.get('/user/:userId', (req, res) => {
  const userId = req.params.userId;
  const sql = 'SELECT * FROM results WHERE user_id = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ msg: 'Failed to fetch results.', err });
    res.json(results);
  });
});

// Get all results (admin)
router.get('/all', (req, res) => {
  const sql = `SELECT r.*, u.name, u.email FROM results r JOIN users u ON r.user_id = u.id`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ msg: 'Failed to fetch all results.', err });
    res.json(results);
  });
});

module.exports = router;
