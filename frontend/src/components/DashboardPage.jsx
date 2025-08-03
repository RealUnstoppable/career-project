import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function DashboardPage() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [goals, setGoals] = useState([]);
  const { authToken } = useAuth();
  const [title, setTitle] = useState('');
  const [metric, setMetric] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!authToken) return;
      try {
        // FIX: Corrected the API endpoints
        const [jobsResponse, goalsResponse] = await Promise.all([
          axios.get('https://career-compass-backend-ew6d.onrender.com/api/saved-jobs/', {
            headers: { 'Authorization': `Token ${authToken}` }
          }),
          axios.get('https://career-compass-backend-ew6d.onrender.com/api/goals/', {
            headers: { 'Authorization': `Token ${authToken}` }
          })
        ]);
        setSavedJobs(jobsResponse.data);
        setGoals(goalsResponse.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      }
    };
    fetchData();
  }, [authToken]);

  const handleGoalSubmit = async (e) => {
    e.preventDefault();
    try {
      // FIX: Corrected the API endpoint
      const response = await axios.post('https://career-compass-backend-ew6d.onrender.com/api/goals/',
        { title: title, target_metric: metric, target_value: value },
        { headers: { 'Authorization': `Token ${authToken}` } }
      );
      setGoals([...goals, response.data]);
      setTitle('');
      setMetric('');
      setValue('');
    } catch (error) {
      console.error("Failed to create goal", error);
      alert("Could not create goal.");
    }
  };

  return (
    <div className="dashboard-grid">
      <div className="dashboard-column">
        <h2>Your Saved Jobs</h2>
        {savedJobs.length > 0 ? (
          savedJobs.map(job => (
            <div key={job.id} className="saved-job-card">
              <h4>{job.job_title}</h4>
              <p>{job.company_name} - {job.state}</p>
              <p>Salary: ${job.estimated_salary.toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p>You have no saved jobs yet.</p>
        )}
      </div>
      <div className="dashboard-column">
        <h2>Your Goals</h2>
        <form onSubmit={handleGoalSubmit} className="goal-form">
          <h4>Add a New Goal</h4>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Goal Title (e.g., Learn React)" required />
          <input type="text" value={metric} onChange={e => setMetric(e.target.value)} placeholder="Target Metric (e.g., Complete Course)" required />
          <input type="text" value={value} onChange={e => setValue(e.target.value)} placeholder="Target Value (e.g., By December)" required />
          <button type="submit">Add Goal</button>
        </form>
        {goals.length > 0 ? (
          goals.map(goal => (
            <div key={goal.id} className="goal-card">
              <h4>{goal.title}</h4>
              <p>{goal.target_metric}: {goal.target_value}</p>
              <span>Status: {goal.status}</span>
            </div>
          ))
        ) : (
          <p>You have not set any goals.</p>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;