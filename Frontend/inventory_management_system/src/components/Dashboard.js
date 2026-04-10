import React from 'react';

export default function Dashboard() {
  const role = localStorage.getItem('role') || 'guest';
  const name = localStorage.getItem('userName') || 'User';

  return (
    <div className="dashboard-page container mt-5">
      <h2>Dashboard</h2>
      <p>Welcome back, <strong>{name}</strong>!</p>
      <p>Your role is <strong>{role}</strong>.</p>
      <p>Use the navigation to manage products or view app content.</p>
    </div>
  );
}
