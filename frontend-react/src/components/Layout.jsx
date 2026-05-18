import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import BottomBar from './BottomBar';

export default function Layout({ user, onLogout }) {
  return (
    <div className="app-layout">
      {/* Top Navigation Header */}
      <Header user={user} onLogout={onLogout} />

      {/* Main Container holding Sidebar and Outlet Content */}
      <div className="main-content-wrapper">
        <Sidebar />
        
        <div className="page-container">
          <Outlet />
        </div>
      </div>

      {/* Mobile Bottom Navigation Menu */}
      <BottomBar />
    </div>
  );
}
