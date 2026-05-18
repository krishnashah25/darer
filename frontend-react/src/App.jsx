import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Browse from './pages/Browse';
import StreamView from './pages/StreamView';
import Activity from './pages/Activity';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Verify from './pages/Verify';

export default function App() {
  const [user, setUser] = useState(null);

  // Check for stored user session on initial load
  useEffect(() => {
    const cachedUser = localStorage.getItem('darer_user');
    if (cachedUser) {
      try {
        setUser(JSON.parse(cachedUser));
      } catch (e) {
        console.error('Failed to parse cached user:', e);
      }
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('darer_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('darer_user');
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Main Application Routes structured within Layout */}
        <Route path="/" element={<Layout user={user} onLogout={handleLogout} />}>
          <Route index element={<Home />} />
          <Route path="browse" element={<Browse />} />
          <Route path="activity" element={<Activity user={user} />} />
          <Route path="stream/:username" element={<StreamView user={user} />} />
          <Route path="profile/:username" element={<Profile />} />
          
          {/* Auth Pages mapped inside layout container */}
          <Route 
            path="login" 
            element={user ? <Navigate to="/" replace /> : <Login onLoginSuccess={handleLoginSuccess} />} 
          />
          <Route 
            path="signup" 
            element={user ? <Navigate to="/" replace /> : <Signup />} 
          />
          <Route path="verify" element={<Verify />} />
        </Route>

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
