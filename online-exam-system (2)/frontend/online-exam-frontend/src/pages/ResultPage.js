// ResultPage.js - View quiz results
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ResultPage = () => {
  const { userId } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/results/user/${userId}`)
      .then(res => setResults(res.data))
      .catch(err => console.error('Failed to fetch results', err));
  }, [userId]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Quiz Results</h2>
      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul className="space-y-4">
          {results.map((r, index) => (
            <li key={r.id} className="border rounded p-4">
              <p className="font-semibold">Attempt #{index + 1}</p>
              <p>Score: {r.score} / {r.total}</p>
              <p>Date: {new Date(r.timestamp).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResultPage;
