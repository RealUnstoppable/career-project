import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CalculatorForm from './components/CalculatorForm';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import './App.css';
import DashboardPage from './components/DashboardPage';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <div className="card">
          <Routes>
            <Route path="/" element={<CalculatorForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </div>
      </main>
    </>
  );
}

export default App;