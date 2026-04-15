import React, { createContext, useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AddSkill from './components/AddSkill';
import SkillDetails from './components/SkillDetails';
import ManagerView from './components/ManagerView';
import './App.css';

export const ThemeContext = createContext();

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode') === 'true';
    setDarkMode(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
<Router>
        <div className="min-h-screen bg-gradient-to-br from-background to-primary/10">
          <Navbar />
          <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route
                path="/"
                element={<Navigate to={localStorage.getItem('token') ? '/dashboard' : '/login'} replace />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/dashboard/*"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add-skill"
                element={
                  <ProtectedRoute>
                    <AddSkill />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/skills/:id"
                element={
                  <ProtectedRoute>
                    <SkillDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/manager"
                element={
                  <ProtectedRoute>
                    <ManagerView />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </main>
          <Toaster position="top-right" />
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;
