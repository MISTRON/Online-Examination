// routes/users.js - User profile and management
const express = require('express');
const db = require('../db');
const router = express.Router();

// Get current user by ID
router.get('/:id', (req, res) => {
  const userId = req.params.id;
  const sql = 'SELECT id, name, email, role FROM users WHERE id = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ msg: 'Database error.', err });
    if (results.length === 0) return res.status(404).json({ msg: 'User not found.' });
    res.json(results[0]);
  });
});

// Admin: Get all users
router.get('/', (req, res) => {
  const sql = 'SELECT id, name, email, role FROM users';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ msg: 'Database error.', err });
    res.json(results);
  });
});

module.exports = router;
