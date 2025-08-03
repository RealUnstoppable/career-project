import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function CalculatorForm() {
  const [currentIncome, setCurrentIncome] = useState('');
  const [currentState, setCurrentState] = useState('NY');
  const [newIncome, setNewIncome] = useState('');
  const [newState, setNewState] = useState('CA');
  const [results, setResults] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');
  const [savedJobs, setSavedJobs] = useState(new Set());
  const { authToken } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    setResults(null);
    setJobs([]);

    // FIX: Corrected the API endpoint
    axios.post('https://career-compass-backend-ew6d.onrender.com/api/calculate/', {
      currentIncome,
      currentState,
      newIncome,
      newState,
    })
    .then(response => {
      setResults(response.data);
      setJobs(response.data.jobs);
    })
    .catch(err => {
      setError('An error occurred. Please try again.');
      console.error(err);
    });
  };

  const handleSaveJob = (jobToSave) => {
    if (!authToken) {
      alert('You must be logged in to save a job.');
      return;
    }

    // FIX: Corrected the API endpoint
    axios.post('https://career-compass-backend-ew6d.onrender.com/api/saved-jobs/', jobToSave, {
      headers: {
        'Authorization': `Token ${authToken}`
      }
    })
    .then(response => {
      alert(`Saved: ${jobToSave.job_title}`);
      setSavedJobs(prev => new Set(prev).add(jobToSave.job_title));
    })
    .catch(err => {
      alert('Failed to save job.');
      console.error(err);
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Your Current Situation</h3>
        <label>Annual Income:<input type="number" value={currentIncome} onChange={e => setCurrentIncome(e.target.value)} placeholder="$60000" required /></label>
        <label>State:<input type="text" value={currentState} onChange={e => setCurrentState(e.target.value)} maxLength="2" required /></label>
        <h3>New Job Offer</h3>
        <label>New Annual Income:<input type="number" value={newIncome} onChange={e => setNewIncome(e.target.value)} placeholder="$80000" required /></label>
        <label>New State:<input type="text" value={newState} onChange={e => setNewState(e.target.value)} maxLength="2" required /></label>
        <button type="submit">Calculate</button>
      </form>

      {error && <p className="error">{error}</p>}

      {results && (
        <div className="results-container">
          <div className="results">
            <h2>Comparison</h2>
            <div className="results-grid">
              <div>
                <h4>Current</h4>
                <p>Gross: ${results.current.gross_income.toLocaleString()}</p>
                <p>Net: ${results.current.net_income.toLocaleString()}</p>
                <p><b>Power: ${results.current.purchasing_power.toLocaleString()}</b></p>
              </div>
              <div>
                <h4>New Offer</h4>
                <p>Gross: ${results.new.gross_income.toLocaleString()}</p>
                <p>Net: ${results.new.net_income.toLocaleString()}</p>
                <p><b>Power: ${results.new.purchasing_power.toLocaleString()}</b></p>
              </div>
            </div>
          </div>
          <div className="jobs-list">
            <h3>Sample Job Listings</h3>
            {jobs.map((job, index) => (
              <div key={index} className="job-card">
                <h4>{job.job_title}</h4>
                <p>{job.company_name}</p>
                <p>${job.estimated_salary.toLocaleString()}</p>
                <button
                  onClick={() => handleSaveJob(job)}
                  disabled={savedJobs.has(job.job_title)}
                >
                  {savedJobs.has(job.job_title) ? 'Saved' : 'Save'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CalculatorForm;