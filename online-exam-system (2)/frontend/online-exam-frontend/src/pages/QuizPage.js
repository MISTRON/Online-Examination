// QuizPage.js - Take a quiz and submit answers
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const QuizPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5000/api/questions/${examId}`)
      .then(res => setQuestions(res.data))
      .catch(err => console.error('Failed to load questions', err));
  }, [examId]);

  const handleOptionChange = (qid, selected) => {
    setAnswers({ ...answers, [qid]: selected });
  };

  const handleSubmit = async () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    let score = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correct_answer) score++;
    });
    const total = questions.length;
    await axios.post('http://localhost:5000/api/results/submit', {
      user_id: storedUser.id,
      exam_id: parseInt(examId),
      score,
      total
    });
    navigate(`/result/${storedUser.id}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Quiz #{examId}</h2>
      {questions.map((q, idx) => (
        <div key={q.id} className="mb-4 p-4 border rounded">
          <p className="mb-2 font-medium">{idx + 1}. {q.question}</p>
          {['a', 'b', 'c', 'd'].map(opt => (
            <label key={opt} className="block mb-1">
              <input
                type="radio"
                name={`question-${q.id}`}
                value={opt}
                checked={answers[q.id] === opt}
                onChange={() => handleOptionChange(q.id, opt)}
                className="mr-2"
              />
              {q[`option_${opt}`]}
            </label>
          ))}
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Submit Quiz
      </button>
    </div>
  );
};

export default QuizPage;
