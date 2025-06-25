-- Create Database
CREATE DATABASE IF NOT EXISTS project1;
USE project1;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  role ENUM('admin', 'student') NOT NULL
);

-- Questions Table
CREATE TABLE IF NOT EXISTS questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question TEXT NOT NULL,
  option_a VARCHAR(255),
  option_b VARCHAR(255),
  option_c VARCHAR(255),
  option_d VARCHAR(255),
  correct_answer CHAR(1),
  exam_id INT NOT NULL
);

-- Results Table
CREATE TABLE IF NOT EXISTS results (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  exam_id INT,
  score INT,
  total INT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO users (name, email, password, role) VALUES
('Admin', 'admin@example.com', '$2b$10$exampleHashedPassword', 'admin'),
('Student', 'student@example.com', '$2b$10$exampleHashedPassword', 'student');

INSERT INTO questions (question, option_a, option_b, option_c, option_d, correct_answer, exam_id) VALUES
('What is 2+2?', '3', '4', '5', '6', 'b', 1),
('Capital of India?', 'Mumbai', 'Kolkata', 'Delhi', 'Chennai', 'c', 1);
