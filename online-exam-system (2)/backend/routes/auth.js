// routes/auth.js - Handles login and registration
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = express.Router();

// Register (Student or Admin)
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) return res.status(400).json({ msg: 'All fields are required.' });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, email, hashedPassword, role], (err, result) => {
      if (err) return res.status(500).json({ msg: 'Database error.', err });
      res.status(201).json({ msg: 'User registered successfully.' });
    });
  } catch (error) {
    res.status(500).json({ msg: 'Server error.', error });
  }
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ msg: 'Email and password are required.' });

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ msg: 'Database error.' });
    if (results.length === 0) return res.status(401).json({ msg: 'Invalid credentials.' });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ msg: 'Invalid credentials.' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.SESSION_SECRET, { expiresIn: '2h' });
    res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
  });
});

module.exports = router;
