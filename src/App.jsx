import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { TicketProvider } from './context/TicketContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TicketList from './pages/TicketList';
import TicketDetail from './pages/TicketDetail';
import './index.css';

// Navigation component that shows only when logged in
const Navigation = ({ user, onLogout }) => {
  const location = useLocation();
  
  // Don't show navigation on landing or login pages
  if (location.pathname === '/' || location.pathname === '/login') {
    return null;
  }

  return (
    <nav className="main-nav">
      <div className="nav-container">
        <div className="nav-left">
          <div className="logo">
            <span>🎫</span>
            <h1>Support<span>Pro</span></h1>
          </div>
        </div>
        
        <div className="nav-center">
          <a href="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>
            Dashboard
          </a>
          <a href="/tickets" className={`nav-link ${location.pathname.startsWith('/tickets') ? 'active' : ''}`}>
            Tickets
          </a>
          <a href="#" className="nav-link">Analytics</a>
          <a href="#" className="nav-link">Customers</a>
        </div>
        
        <div className="nav-right">
          <span className="user-info">
            👤 {user?.name || 'User'}
          </span>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

function App() {
  const user = JSON.parse(localStorage.getItem('supportProUser') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('supportProUser');
    window.location.href = '/login';
  };

  return (
    <TicketProvider>
      <Router>
        <div className="app">
          <Navigation user={user} onLogout={handleLogout} />
          
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route 
                path="/dashboard" 
                element={
                  user ? <Dashboard /> : <Navigate to="/login" />
                } 
              />
              <Route 
                path="/tickets" 
                element={
                  user ? <TicketList /> : <Navigate to="/login" />
                } 
              />
              <Route 
                path="/tickets/new" 
                element={
                  user ? <TicketDetail /> : <Navigate to="/login" />
                } 
              />
              <Route 
                path="/tickets/:id" 
                element={
                  user ? <TicketDetail /> : <Navigate to="/login" />
                } 
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          
          <footer className="app-footer">
            <p>© 2026 SupportPro - Inc. All rights reserved </p>
          </footer>
        </div>
      </Router>
    </TicketProvider>
  );
}

export default App;