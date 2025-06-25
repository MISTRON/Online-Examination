// Dashboard.js - Student/Admin dashboard
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return navigate('/login');
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    // Example: fetch exams list
    axios.get('http://localhost:5000/api/questions')
      .then(res => setExams(res.data))
      .catch(err => console.error('Error fetching exams', err));
  }, [navigate]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.name}</h1>
      {user?.role === 'admin' ? (
        <p className="mb-4">You are logged in as an <strong>Admin</strong>.</p>
      ) : (
        <>
          <p className="mb-4">You are logged in as a <strong>Student</strong>.</p>
          <h2 className="text-xl font-semibold mb-2">Available Quizzes:</h2>
          <ul className="space-y-2">
            {exams.map((exam) => (
              <li key={exam.id} className="border p-3 rounded shadow">
                <p>{exam.question.substring(0, 50)}...</p>
                <button
                  className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  onClick={() => navigate(`/quiz/${exam.exam_id}`)}
                >
                  Start Quiz #{exam.exam_id}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Dashboard;
